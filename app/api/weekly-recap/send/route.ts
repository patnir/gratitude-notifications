import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { pushTokens } from '@/drizzle/schema';
import { Expo } from 'expo-server-sdk';

const expo = new Expo({
  accessToken: process.env.EXPO_ACCESS_TOKEN,
});

// POST /api/weekly-recap/send
// Sends weekly recap notification to all users
// Protected by CRON_SECRET for Vercel cron jobs
export async function POST(request: NextRequest) {
  // Verify cron secret (Vercel sends this header for cron jobs)
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get all push tokens
    const allTokens = await db
      .select({ token: pushTokens.token })
      .from(pushTokens);

    if (allTokens.length === 0) {
      return NextResponse.json({ 
        success: true, 
        message: 'No push tokens found',
        sent: 0 
      });
    }

    // Build notification messages
    const messages = allTokens
      .filter(({ token }) => Expo.isExpoPushToken(token))
      .map(({ token }) => ({
        to: token,
        sound: 'default' as const,
        title: 'Your week in gratitude',
        body: 'Your weekly recap is ready.',
        data: { type: 'weekly-recap' },
        priority: 'high' as const,
        channelId: 'default',
      }));

    if (messages.length === 0) {
      return NextResponse.json({ 
        success: true, 
        message: 'No valid push tokens',
        sent: 0 
      });
    }

    // Send in chunks
    const chunks = expo.chunkPushNotifications(messages);
    let successCount = 0;
    let errorCount = 0;

    for (const chunk of chunks) {
      try {
        const tickets = await expo.sendPushNotificationsAsync(chunk);
        tickets.forEach((ticket) => {
          if (ticket.status === 'ok') {
            successCount++;
          } else {
            errorCount++;
            console.error(`Push error: ${ticket.message}`);
          }
        });
      } catch (error) {
        console.error('Error sending chunk:', error);
        errorCount += chunk.length;
      }
    }

    console.log(`Weekly recap sent: ${successCount} success, ${errorCount} errors`);

    return NextResponse.json({ 
      success: true, 
      sent: successCount,
      errors: errorCount,
      total: messages.length
    });
  } catch (error) {
    console.error('Failed to send weekly recap notifications:', error);
    return NextResponse.json(
      { error: 'Failed to send notifications' },
      { status: 500 }
    );
  }
}

// Also support GET for manual testing (with secret)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Forward to POST handler
  return POST(request);
}

