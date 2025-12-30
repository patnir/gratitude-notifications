import { circleMembers, circles, users } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { sendPushNotificationsToUsers } from '@/lib/expo-push';
import { and, eq, ne } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { circleId, newMemberId } = await request.json();

    if (!circleId || !newMemberId) {
      return NextResponse.json(
        { error: 'Missing required fields: circleId, newMemberId' },
        { status: 400 }
      );
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

