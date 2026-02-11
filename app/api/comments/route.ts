import { entryComments, gratitudeEntries, users } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { sendPushNotificationsToUsers } from '@/lib/expo-push';
import { requireAuth } from '@/lib/auth';
import { and, eq, ne } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Verify authentication (required: false during migration, flip to true later)
    const { auth, errorResponse } = await requireAuth(request, { required: false });
    if (errorResponse) return errorResponse;

    const { entryId, userId: bodyUserId, commentContent } = await request.json();

    // Use authenticated userId if available, fall back to request body during migration
    const userId = auth?.userId || bodyUserId;

    if (!entryId || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get entry to find author
    const [entry] = await db
      .select()
      .from(gratitudeEntries)
      .where(eq(gratitudeEntries.id, entryId))
      .limit(1);

    if (!entry) {
      return NextResponse.json(
        { error: 'Entry not found' },
        { status: 404 }
      );
    }

    // Get commenter's display name (used for both notification types)
    const [commenter] = await db
      .select({ displayName: users.displayName })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    const commenterName = commenter?.displayName || 'Someone';
    const body = commentContent || 'New comment';

    // Send notification to entry author (only if not their own entry)
    if (entry.userId !== userId) {
      const title = `${commenterName} commented on your entry`;

      await sendPushNotificationsToUsers(
        [entry.userId],
        title,
        body,
        { type: 'comment', entryId, userId }
      );
    }

    // Send notifications to previous commenters (excluding current commenter and entry author)
    const previousCommenters = await db
      .selectDistinct({ userId: entryComments.userId })
      .from(entryComments)
      .where(
        and(
          eq(entryComments.entryId, entryId),
          ne(entryComments.userId, userId), // Exclude current commenter
          ne(entryComments.userId, entry.userId) // Exclude entry author (already notified above)
        )
      );

    if (previousCommenters.length > 0) {
      const previousCommenterIds = previousCommenters.map(c => c.userId);
      const title = `${commenterName} also commented`;

      await sendPushNotificationsToUsers(
        previousCommenterIds,
        title,
        body,
        { type: 'comment', entryId, userId }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending comment notification:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
