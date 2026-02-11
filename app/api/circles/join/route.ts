import { circleMembers, circles, users } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { sendPushNotificationsToUsers } from '@/lib/expo-push';
import { requireAuth } from '@/lib/auth';
import { and, eq, ne } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

// Public welcome circle - don't send notifications for joins
const PUBLIC_CIRCLE_ID = 'e53e0188-00b2-48d4-bf08-1d151d91cd15';

export async function POST(request: NextRequest) {
  try {
    // Verify authentication (required: false during migration, flip to true later)
    const { auth, errorResponse } = await requireAuth(request, { required: false });
    if (errorResponse) return errorResponse;

    const { circleId, newMemberId: bodyNewMemberId } = await request.json();

    // Use authenticated userId if available, fall back to request body during migration
    const newMemberId = auth?.userId || bodyNewMemberId;

    if (!circleId || !newMemberId) {
      return NextResponse.json(
        { error: 'Missing required fields: circleId, newMemberId' },
        { status: 400 }
      );
    }

    // Skip notifications for the public welcome circle
    if (circleId === PUBLIC_CIRCLE_ID) {
      return NextResponse.json({ message: 'Skipping notifications for public circle' });
    }

    // Get circle name
    const [circle] = await db
      .select({ name: circles.name })
      .from(circles)
      .where(eq(circles.id, circleId))
      .limit(1);

    if (!circle) {
      return NextResponse.json(
        { error: 'Circle not found' },
        { status: 404 }
      );
    }

    // Get new member's display name
    const [newMember] = await db
      .select({ displayName: users.displayName })
      .from(users)
      .where(eq(users.id, newMemberId))
      .limit(1);

    const memberName = newMember?.displayName || 'Someone';

    // Get all existing circle members except the new member
    const existingMembers = await db
      .select({ userId: circleMembers.userId })
      .from(circleMembers)
      .where(
        and(
          eq(circleMembers.circleId, circleId),
          ne(circleMembers.userId, newMemberId)
        )
      );

    if (existingMembers.length === 0) {
      return NextResponse.json({ message: 'No members to notify' });
    }

    const memberIds = existingMembers.map(m => m.userId);

    // Send notifications
    const title = 'New Circle Member';
    const body = `${memberName} joined ${circle.name}`;

    try {
      await sendPushNotificationsToUsers(memberIds, title, body, {
        type: 'circle-join',
        circleId,
        newMemberId,
      });
      console.log('Circle join notifications sent to', memberIds.length, 'members');
    } catch (pushError) {
      console.error('Error sending circle join notifications:', pushError);
    }

    return NextResponse.json({
      success: true,
      notified: memberIds.length
    });
  } catch (error) {
    console.error('Error sending circle join notifications:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

