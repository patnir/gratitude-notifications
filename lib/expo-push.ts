import { Expo } from 'expo-server-sdk';

const expo = new Expo({
  accessToken: process.env.EXPO_ACCESS_TOKEN,
});

export async function sendPushNotification(
  pushToken: string,
  title: string,
  body: string,
  data?: Record<string, any>
) {
  // Check that all your push tokens appear to be valid Expo push tokens
  if (!Expo.isExpoPushToken(pushToken)) {
    console.error(`Push token ${pushToken} is not a valid Expo push token`);
    return false;
  }

  const message = {
    to: pushToken,
    sound: 'default' as const,
    title,
    body,
    data: data || {},
    priority: 'high' as const,
    channelId: 'default',
  };

  try {
    const chunks = expo.chunkPushNotifications([message]);
    const tickets = await expo.sendPushNotificationsAsync(chunks[0]);
    
    // Check for errors
    const ticket = tickets[0];
    if (ticket.status === 'error') {
      console.error(`Error sending notification: ${ticket.message}`);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error sending push notification:', error);
    return false;
  }
}

export async function sendPushNotificationsToUsers(
  userIds: string[],
  title: string,
  body: string,
  data?: Record<string, any>,
  imageUrl?: string
) {
  const { db } = await import('./db');
  const { pushTokens: pushTokensTable } = await import('../drizzle/schema');
  const { inArray } = await import('drizzle-orm');

  if (userIds.length === 0) {
    return;
  }

  // Get push tokens for all users
  const tokens = await db
    .select({ token: pushTokensTable.token })
    .from(pushTokensTable)
    .where(inArray(pushTokensTable.userId, userIds));

  if (tokens.length === 0) {
    console.log('No push tokens found for users');
    return;
  }

  // Send notifications to all tokens
  const messages = tokens.map(({ token }) => ({
    to: token,
    sound: 'default' as const,
    title,
    body,
    data: data || {},
    priority: 'high' as const,
    channelId: 'default',
    // Rich content for iOS (requires notification service extension)
    ...(imageUrl && {
      mutableContent: true,
      richContent: { image: imageUrl },
    }),
  }));

  const chunks = expo.chunkPushNotifications(messages);
  
  for (const chunk of chunks) {
    try {
      const tickets = await expo.sendPushNotificationsAsync(chunk);
      // Handle ticket errors if needed
      tickets.forEach((ticket, index) => {
        if (ticket.status === 'error') {
          console.error(`Error sending to token ${chunk[index].to}: ${ticket.message}`);
        }
      });
    } catch (error) {
      console.error('Error sending push notifications:', error);
    }
  }
}

