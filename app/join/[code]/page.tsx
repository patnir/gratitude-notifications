import { circleMembers, circles } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { Metadata } from 'next';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ code: string }>;
}

// Fetch circle data
async function getCircle(code: string) {
  const [circle] = await db
    .select()
    .from(circles)
    .where(eq(circles.inviteCode, code.toUpperCase()))
    .limit(1);

  if (!circle) return null;

  // Get member count
  const members = await db
    .select()
    .from(circleMembers)
    .where(eq(circleMembers.circleId, circle.id));

  return {
    ...circle,
    memberCount: members.length,
  };
}

// Generate dynamic metadata for Open Graph
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params;
  const circle = await getCircle(code);

  if (!circle) {
    return {
      title: 'Circle Not Found | Gratitude',
      description: 'This invite link is invalid or has expired.',
    };
  }

  return {
    title: `Join ${circle.name} | Gratitude`,
    description: `You've been invited to join "${circle.name}" on Gratitude - a daily gratitude journaling app. ${circle.memberCount} ${circle.memberCount === 1 ? 'member' : 'members'} already sharing gratitude together.`,
    openGraph: {
      title: `Join ${circle.name} on Gratitude`,
      description: `You've been invited to join "${circle.name}" - ${circle.memberCount} ${circle.memberCount === 1 ? 'member' : 'members'} sharing gratitude together.`,
      type: 'website',
      url: `https://grateful.so/join/${code}`,
    },
    twitter: {
      card: 'summary',
      title: `Join ${circle.name} on Gratitude`,
      description: `You've been invited to join "${circle.name}" - ${circle.memberCount} ${circle.memberCount === 1 ? 'member' : 'members'} sharing gratitude together.`,
    },
    other: {
      'apple-itunes-app': 'app-id=YOUR_APP_ID', // TODO: Replace with actual App Store ID
    },
  };
}

export default async function JoinCirclePage({ params }: PageProps) {
  const { code } = await params;
  const circle = await getCircle(code);

  // Deep link URL for the app
  const deepLink = `gratitude://circle/join/${code}`;
  
  // App Store URL (update with actual ID when available)
  const appStoreUrl = 'https://apps.apple.com/app/gratitude/id0000000000'; // TODO: Replace with actual URL

  if (!circle) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Circle Not Found</h1>
          <p className="text-gray-600 mb-6">
            This invite link is invalid or has expired. Please ask for a new invite code.
          </p>
          <Link
            href="/"
            className="inline-block bg-emerald-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-emerald-700 transition-colors"
          >
            Learn About Gratitude
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          {/* Icon */}
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: getCircleColor(circle.color) + '20' }}
          >
            <svg 
              className="w-10 h-10" 
              style={{ color: getCircleColor(circle.color) }}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>

          {/* Circle Name */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Join "{circle.name}"
          </h1>
          
          {/* Member Count */}
          <p className="text-gray-600 mb-6">
            {circle.memberCount} {circle.memberCount === 1 ? 'person' : 'people'} sharing gratitude together
          </p>

          {/* Invite Code Display */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-1">Invite Code</p>
            <p className="text-2xl font-mono font-bold tracking-wider text-gray-900">
              {circle.inviteCode}
            </p>
          </div>

          {/* Open in App Button */}
          <a
            href={deepLink}
            className="block w-full text-white font-semibold px-6 py-4 rounded-full mb-3 transition-colors text-lg"
            style={{ backgroundColor: getCircleColor(circle.color) }}
          >
            Open in App
          </a>

          {/* Download App Link */}
          <p className="text-gray-500 text-sm">
            Don't have the app?{' '}
            <a 
              href={appStoreUrl}
              className="font-semibold hover:underline"
              style={{ color: getCircleColor(circle.color) }}
            >
              Download Gratitude
            </a>
          </p>
        </div>

        {/* What is Gratitude */}
        <div className="mt-8 text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">What is Gratitude?</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            A daily gratitude journaling app where you can share what you're thankful for 
            with your closest circles - family, friends, and loved ones.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-400 text-xs">
          <p>grateful.so</p>
        </div>
      </div>
    </div>
  );
}

// Helper to get circle color
function getCircleColor(colorName: string): string {
  const colors: Record<string, string> = {
    green: '#0a660a',
    blue: '#2563eb',
    purple: '#7c3aed',
    pink: '#db2777',
    red: '#dc2626',
    orange: '#ea580c',
    yellow: '#ca8a04',
    teal: '#0d9488',
    brown: '#92400e',
    gray: '#6b7280',
  };
  return colors[colorName] || colors.green;
}

