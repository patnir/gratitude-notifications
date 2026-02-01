import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { pushTokens, notificationPreferences, gratitudeEntries } from '@/drizzle/schema';
import { Expo } from 'expo-server-sdk';
import { and, eq, sql } from 'drizzle-orm';

const expo = new Expo({
  accessToken: process.env.EXPO_ACCESS_TOKEN,
});

// Format date as "Jan 8" style
function formatShortDate(timestamp: number): string {
  const date = new Date(timestamp);
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const day = date.getDate();
  return `${month} ${day}`;
}

// GET /api/lookbacks/send
// Called by Vercel cron daily at 12 PM PT (8 PM UTC)
export async function GET(request: NextRequest) {
  // Verify CRON_SECRET (Vercel sends Authorization: Bearer <CRON_SECRET>)
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get all users who have lookbacks enabled (pastReminderEnabled = true)
    const usersWithLookbacks = await db
      .select({ userId: notificationPreferences.userId })
      .from(notificationPreferences)
      .where(eq(notificationPreferences.pastReminderEnabled, true));

    if (usersWithLookbacks.length === 0) {
      return NextResponse.json({ 
        success: true, 
        message: 'No users with lookbacks enabled',
        sent: 0 
      });
    }

    const userIds = usersWithLookbacks.map(u => u.userId);
    let successCount = 0;
    let errorCount = 0;
    let skippedNoEntries = 0;
    let skippedNoTokens = 0;

    // Process each user
    for (const userId of userIds) {
      // Get a random past entry for this user (prefer entries with images)
      let randomEntry = await db
        .select({
          id: gratitudeEntries.id,
          content: gratitudeEntries.content,
          imageUrl: gratitudeEntries.imageUrl,
          createdAt: gratitudeEntries.createdAt,
        })
        .from(gratitudeEntries)
        .where(
          and(
            eq(gratitudeEntries.userId, userId),
            sql`${gratitudeEntries.imageUrl} IS NOT NULL`
          )
        )
        .orderBy(sql`RANDOM()`)
        .limit(1);

      // If no entries with images, fall back to any entry
      if (randomEntry.length === 0) {
        randomEntry = await db
          .select({
            id: gratitudeEntries.id,
            content: gratitudeEntries.content,
            imageUrl: gratitudeEntries.imageUrl,
            createdAt: gratitudeEntries.createdAt,
          })
          .from(gratitudeEntries)
          .where(eq(gratitudeEntries.userId, userId))
          .orderBy(sql`RANDOM()`)
          .limit(1);
      }

      if (randomEntry.length === 0) {
        skippedNoEntries++;
        continue;
      }

      const entry = randomEntry[0];

      // Get push tokens for this user
      const tokens = await db
        .select({ token: pushTokens.token })
        .from(pushTokens)
        .where(eq(pushTokens.userId, userId));

      if (tokens.length === 0) {
        skippedNoTokens++;
        continue;
      }

      // Build notification
      const shortDate = formatShortDate(entry.createdAt);
      const truncatedContent = entry.content.length > 80 
        ? entry.content.substring(0, 80) + '...' 
        : entry.content;

      const messages = tokens
        .filter(({ token }) => Expo.isExpoPushToken(token))
        .map(({ token }) => ({
          to: token,
          sound: 'default' as const,
          title: 'Remember this?',
          body: `${shortDate}: ${truncatedContent}`,
          data: { type: 'lookback', entryId: entry.id },
          priority: 'high' as const,
          channelId: 'default',
          // Rich content for iOS (image attachment)
          ...(entry.imageUrl && {
            mutableContent: true,
            richContent: { image: entry.imageUrl },
          }),
        }));

      if (messages.length === 0) {
        skippedNoTokens++;
        continue;
      }

      // Send notifications
      const chunks = expo.chunkPushNotifications(messages);
      for (const chunk of chunks) {
        try {
          const tickets = await expo.sendPushNotificationsAsync(chunk);
          tickets.forEach((ticket) => {
            if (ticket.status === 'ok') {
              successCount++;
            } else {
              errorCount++;
              console.error(`Push error for user ${userId}: ${ticket.message}`);
            }
          });
        } catch (error) {
          console.error(`Error sending to user ${userId}:`, error);
          errorCount += chunk.length;
        }
      }
    }

    console.log(`Lookbacks sent: ${successCount} success, ${errorCount} errors, ${skippedNoEntries} skipped (no entries), ${skippedNoTokens} skipped (no tokens)`);

    return NextResponse.json({ 
      success: true, 
      sent: successCount,
      errors: errorCount,
      skippedNoEntries,
      skippedNoTokens,
      totalUsers: userIds.length
    });
  } catch (error) {
    console.error('Failed to send lookback notifications:', error);
    return NextResponse.json(
      { error: 'Failed to send notifications' },
      { status: 500 }
    );
  }
}
