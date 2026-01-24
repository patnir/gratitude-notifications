import { gratitudeEntries, users } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { sendPushNotificationsToUsers } from '@/lib/expo-push';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { entryId, userId, commentPreview } = await request.json();

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

    // Send notification to entry author (only if not their own entry)
    if (entry.userId !== userId) {
      const [commenter] = await db
        .select({ displayName: users.displayName })
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

      const commenterName = commenter?.displayName || 'Someone';
      
      // Truncate comment preview if too long
      const preview = commentPreview 
        ? (commentPreview.length > 50 ? commentPreview.substring(0, 50) + '...' : commentPreview)
        : '';

      const body = preview 
        ? `${commenterName} commented: "${preview}"`
        : `${commenterName} commented on your entry`;

      await sendPushNotificationsToUsers(
        [entry.userId],
        'New Comment',
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
