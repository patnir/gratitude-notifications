import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { entryReactions, gratitudeEntries, users } from '@/drizzle/schema';
import { eq, and } from 'drizzle-orm';
import { sendPushNotificationsToUsers } from '@/lib/expo-push';

export async function POST(request: NextRequest) {
  try {
    const { entryId, userId, emoji } = await request.json();

    if (!entryId || !userId || !emoji) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate emoji
    const validEmojis = ['👍', '❤️', '😊', '🙏', '🎉'];
    if (!validEmojis.includes(emoji)) {
      return NextResponse.json(
        { error: 'Invalid emoji' },
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

    // Check if user already has a reaction
    const [existing] = await db
      .select()
      .from(entryReactions)
      .where(and(
        eq(entryReactions.entryId, entryId),
        eq(entryReactions.userId, userId)
      ))
      .limit(1);

    let action: 'added' | 'updated' | 'removed';
    
    if (existing) {
      if (existing.emoji === emoji) {
        // Remove reaction (toggling same emoji)
        await db.delete(entryReactions).where(eq(entryReactions.id, existing.id));
        action = 'removed';
      } else {
        // Change emoji
        await db.update(entryReactions)
          .set({ emoji })
          .where(eq(entryReactions.id, existing.id));
        action = 'updated';
      }
    } else {
      // Add new reaction
      await db.insert(entryReactions).values({ entryId, userId, emoji });
      action = 'added';
    }

    // Send notification to entry author (only if not their own entry and reaction was added/updated)
    if (entry.userId !== userId && action !== 'removed') {
      const [reactor] = await db
        .select({ displayName: users.displayName })
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

      const reactorName = reactor?.displayName || 'Someone';

      await sendPushNotificationsToUsers(
        [entry.userId],
        'New Reaction',
        `${reactorName} reacted ${emoji} to your entry`,
        { type: 'reaction', entryId, emoji, userId }
      );
    }

    return NextResponse.json({ 
      success: true, 
      action,
      emoji: action === 'removed' ? null : emoji
    });
  } catch (error) {
    console.error('Error handling reaction:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

