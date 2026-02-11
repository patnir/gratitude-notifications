import { pushTokens } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Verify authentication (required: false during migration, flip to true later)
    const { auth, errorResponse } = await requireAuth(request, { required: false });
    if (errorResponse) return errorResponse;

    const { userId: bodyUserId, token, platform } = await request.json();

    // Use authenticated userId if available, fall back to request body during migration
    const userId = auth?.userId || bodyUserId;

    if (!userId || !token || !platform) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('Push token registration:', { userId }, auth ? '(authenticated)' : '(from body)');

    // Check if token already exists
    const [existing] = await db
      .select()
      .from(pushTokens)
      .where(eq(pushTokens.token, token))
      .limit(1);

    if (existing) {
      // Update existing token
      await db
        .update(pushTokens)
        .set({
          userId,
          platform,
          updatedAt: Date.now(),
        })
        .where(eq(pushTokens.id, existing.id));
    } else {
      // Insert new token
      await db.insert(pushTokens).values({
        userId,
        token,
        platform,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error registering push token:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

