import { circleMembers, gratitudeEntries, users } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { sendPushNotificationsToUsers } from '@/lib/expo-push';
import { and, eq, ne } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { entryId, circleId, authorId } = body;

    console.log('Received notification request:', { entryId, circleId, authorId });

    if (!entryId || !circleId || !authorId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get the entry to verify it exists and get content
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

    // Get author's display name
    const [author] = await db
      .select({ displayName: users.displayName })
      .from(users)
      .where(eq(users.id, authorId))
      .limit(1);

    const authorName = author?.displayName || 'Someone';

    // Get all circle members except the author
    const members = await db
      .select({ userId: circleMembers.userId })
      .from(circleMembers)
      .where(
        and(
          eq(circleMembers.circleId, circleId),
          ne(circleMembers.userId, authorId)
        )
      );

    if (members.length === 0) {
      return NextResponse.json({ message: 'No members to notify' });
    }

    const memberIds = members.map(m => m.userId);

    // Truncate content for notification
    const truncatedContent = entry.content.length > 100
      ? entry.content.substring(0, 100) + '...'
      : entry.content;

    // Format notification
    const title = 'New Gratitude Entry';
    const body = `${authorName} says "${truncatedContent}"`;

    // Send notifications
    try {
      await sendPushNotificationsToUsers(memberIds, title, body, {
        type: 'circle-entry',
        circleId,
        entryId,
        authorId,
      });
      console.log('Notifications sent successfully to', memberIds.length, 'members');
    } catch (pushError) {
      console.error('Error in sendPushNotificationsToUsers:', pushError);
      // Still return success since entry was created, just notifications failed
    }

    return NextResponse.json({
      success: true,
      notified: memberIds.length
    });
  } catch (error) {
    console.error('Error sending notifications:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

