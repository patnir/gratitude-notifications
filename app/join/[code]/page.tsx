import { circleMembers, circles } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { Metadata } from 'next';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ code: string }>;
}

// Circle colors matching the app
const CIRCLE_COLORS: Record<string, string> = {
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
      title: 'Circle Not Found | Grateful',
      description: 'This invite link is invalid or has expired.',
    };
  }

  const ogImageUrl = `https://grateful.so/api/og-image?type=circle&name=${encodeURIComponent(circle.name)}&color=${circle.color}`;

  return {
    title: `Join ${circle.name} | Grateful`,
    description: `You've been invited to join "${circle.name}" on Grateful - a daily gratitude journaling app. ${circle.memberCount} ${circle.memberCount === 1 ? 'member' : 'members'} already sharing gratitude together.`,
    openGraph: {
      title: `Join ${circle.name} on Grateful`,
      description: `You've been invited to join "${circle.name}" - ${circle.memberCount} ${circle.memberCount === 1 ? 'member' : 'members'} sharing gratitude together.`,
      type: 'website',
      url: `https://grateful.so/join/${code}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `Join ${circle.name} on Grateful`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Join ${circle.name} on Grateful`,
      description: `You've been invited to join "${circle.name}" - ${circle.memberCount} ${circle.memberCount === 1 ? 'member' : 'members'} sharing gratitude together.`,
      images: [ogImageUrl],
    },
  };
}

export default async function JoinCirclePage({ params }: PageProps) {
  const { code } = await params;
  const circle = await getCircle(code);

  // Deep link URL for the app
  const deepLink = `grateful://circle/join/${code}`;

  // App Store URL
  const appStoreUrl = 'https://apps.apple.com/app/grateful';

  if (!circle) {
    return (
      <div className="min-h-screen bg-[#fafaf8] flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl border border-[#e8e8e8] p-8 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#1a1a1a] mb-3 tracking-tight">Circle Not Found</h1>
          <p className="text-[#666] mb-8 leading-relaxed">
            This invite link is invalid or has expired. Please ask for a new invite code.
          </p>
          <Link
            href="/"
            className="inline-block bg-[#0a660a] text-white font-semibold px-8 py-4 rounded-2xl hover:bg-[#085408] transition-colors"
          >
            Learn About Grateful
          </Link>
        </div>
      </div>
    );
  }

  const circleColor = CIRCLE_COLORS[circle.color] || CIRCLE_COLORS.green;

  return (
    <div className="min-h-screen bg-[#fafaf8] flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Card */}
        <div className="bg-white rounded-3xl border border-[#e8e8e8] p-8 text-center">
          {/* Circle Icon */}
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: circleColor + '15' }}
          >
            <svg
              className="w-10 h-10"
              style={{ color: circleColor }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>

          {/* Circle Name */}
          <h1 className="text-2xl font-bold text-[#1a1a1a] mb-2 tracking-tight">
            Join &quot;{circle.name}&quot;
          </h1>

          {/* Member Count */}
          <p className="text-[#666] mb-8">
            {circle.memberCount} {circle.memberCount === 1 ? 'person' : 'people'} sharing gratitude together
          </p>

          {/* Open in App Button */}
          <a
            href={deepLink}
            className="block w-full text-white font-semibold px-6 py-4 rounded-2xl mb-4 transition-colors text-lg hover:opacity-90"
            style={{ backgroundColor: circleColor }}
          >
            Open in App
          </a>

          {/* Download App Link */}
          <p className="text-[#999] text-sm">
            Don&apos;t have the app?{' '}
            <a
              href={appStoreUrl}
              className="font-semibold hover:underline"
              style={{ color: circleColor }}
            >
              Download Grateful
            </a>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-[#0a660a] font-semibold text-sm hover:underline">
            grateful.so
          </Link>
        </div>
      </div>
    </div>
  );
}
