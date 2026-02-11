import { entryReactions, gratitudeEntries, users } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { sendPushNotificationsToUsers } from '@/lib/expo-push';
import { requireAuth } from '@/lib/auth';
import { and, eq, inArray } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Verify authentication (required: false during migration, flip to true later)
    const { auth, errorResponse } = await requireAuth(request, { required: false });
    if (errorResponse) return errorResponse;

    const { searchParams } = new URL(request.url);
    const entryIdsParam = searchParams.get('entryIds');
    // Use authenticated userId if available, fall back to query param during migration
    const userId = auth?.userId || searchParams.get('userId');

    if (!entryIdsParam) {
      return NextResponse.json(
        { error: 'Missing entryIds parameter' },
        { status: 400 }
      );
    }

    const entryIds = entryIdsParam.split(',').filter(Boolean);
    if (entryIds.length === 0) {
      return NextResponse.json({ reactions: {}, userReactions: {} });
    }

    // Get all reactions for these entries
    const allReactions = await db
      .select()
      .from(entryReactions)
      .where(inArray(entryReactions.entryId, entryIds));

    // Group by entryId and emoji, count each
    const reactions: Record<string, Record<string, number>> = {};
    allReactions.forEach(r => {
      if (!reactions[r.entryId]) reactions[r.entryId] = {};
      reactions[r.entryId][r.emoji] = (reactions[r.entryId][r.emoji] || 0) + 1;
    });

    // Get user's reactions if userId provided
    const userReactions: Record<string, string | null> = {};
    if (userId) {
      const userReactionRows = await db
        .select()
        .from(entryReactions)
        .where(
          and(
            inArray(entryReactions.entryId, entryIds),
            eq(entryReactions.userId, userId)
          )
        );

      entryIds.forEach(entryId => {
        const userReaction = userReactionRows.find(r => r.entryId === entryId);
        userReactions[entryId] = userReaction?.emoji || null;
      });
    } else {
      // If no userId, set all to null
      entryIds.forEach(entryId => {
        userReactions[entryId] = null;
      });
    }

    return NextResponse.json({ reactions, userReactions });
  } catch (error) {
    console.error('Error fetching reactions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication (required: false during migration, flip to true later)
    const { auth, errorResponse } = await requireAuth(request, { required: false });
    if (errorResponse) return errorResponse;

    const { entryId, userId: bodyUserId, emoji, action } = await request.json();

    // Use authenticated userId if available, fall back to request body during migration
    const userId = auth?.userId || bodyUserId;

    if (!entryId || !userId || !emoji) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Only send notification if reaction was added (not removed)
    if (action === 'removed') {
      return NextResponse.json({ success: true });
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending reaction notification:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

