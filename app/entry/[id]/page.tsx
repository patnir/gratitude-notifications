import { gratitudeEntries, users } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

// Fetch entry data with author info
async function getEntry(id: string) {
  const [entry] = await db
    .select({
      id: gratitudeEntries.id,
      content: gratitudeEntries.content,
      location: gratitudeEntries.location,
      imageUrl: gratitudeEntries.imageUrl,
      circleId: gratitudeEntries.circleId,
      createdAt: gratitudeEntries.createdAt,
      userId: gratitudeEntries.userId,
    })
    .from(gratitudeEntries)
    .where(eq(gratitudeEntries.id, id))
    .limit(1);

  if (!entry) return null;

  // Only show entries that are shared to a circle (not private)
  if (!entry.circleId) return null;

  // Get author name
  const [author] = await db
    .select({ displayName: users.displayName })
    .from(users)
    .where(eq(users.id, entry.userId))
    .limit(1);

  return {
    ...entry,
    authorName: author?.displayName || 'Someone',
  };
}

// Parse location JSON
function parseLocation(locationJson: string | null): string | null {
  if (!locationJson) return null;
  try {
    const loc = JSON.parse(locationJson);
    if (loc.city && loc.state) {
      return `${loc.city}, ${loc.state}`;
    }
    if (loc.city) return loc.city;
    if (loc.address) return loc.address;
    return null;
  } catch {
    return null;
  }
}

// Format date
function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

// Generate dynamic metadata for Open Graph
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const entry = await getEntry(id);

  if (!entry) {
    return {
      title: 'Entry Not Found | Grateful',
      description: 'This gratitude entry is private or does not exist.',
    };
  }

  const description = entry.content.length > 150 
    ? entry.content.substring(0, 147) + '...' 
    : entry.content;

  // Use the entry's image if available, otherwise use app icon
  const ogImage = entry.imageUrl || 'https://grateful.so/icon.png';
  const ogImageWidth = entry.imageUrl ? 1200 : 1024;
  const ogImageHeight = entry.imageUrl ? 630 : 1024;

  return {
    title: `${entry.authorName} is grateful | Grateful`,
    description: description,
    openGraph: {
      title: `${entry.authorName} is grateful`,
      description: description,
      type: 'article',
      url: `https://grateful.so/entry/${id}`,
      images: [
        {
          url: ogImage,
          width: ogImageWidth,
          height: ogImageHeight,
          alt: entry.imageUrl ? 'Gratitude entry image' : 'Grateful App Icon',
        },
      ],
    },
    twitter: {
      card: entry.imageUrl ? 'summary_large_image' : 'summary',
      title: `${entry.authorName} is grateful`,
      description: description,
      images: [ogImage],
    },
    other: {
      'apple-itunes-app': 'app-id=YOUR_APP_ID', // TODO: Replace with actual App Store ID
    },
  };
}

export default async function EntryPage({ params }: PageProps) {
  const { id } = await params;
  const entry = await getEntry(id);

  // Deep link URL for the app
  const deepLink = `grateful://entry/${id}`;

  // App Store URL (update with actual ID when available)
  const appStoreUrl = 'https://apps.apple.com/app/gratitude/id0000000000'; // TODO: Replace with actual URL

  if (!entry) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Entry Not Available</h1>
          <p className="text-gray-600 mb-6">
            This gratitude entry is private or does not exist.
          </p>
          <Link
            href="/"
            className="inline-block bg-emerald-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-emerald-700 transition-colors"
          >
            Learn About Grateful
          </Link>
        </div>
      </div>
    );
  }

  const location = parseLocation(entry.location);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Image if present */}
          {entry.imageUrl && (
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={entry.imageUrl}
                alt="Entry image"
                fill
                className="object-cover"
                sizes="(max-width: 448px) 100vw, 448px"
              />
            </div>
          )}

          <div className="p-8">
            {/* Author */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-700 font-semibold text-lg">
                  {entry.authorName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{entry.authorName}</p>
                <p className="text-sm text-gray-500">{formatDate(entry.createdAt)}</p>
              </div>
            </div>

            {/* Content */}
            <p className="text-xl text-gray-900 leading-relaxed mb-4">
              {entry.content}
            </p>

            {/* Location */}
            {location && (
              <p className="text-sm text-gray-500 flex items-center gap-1 mb-6">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {location}
              </p>
            )}

            {/* Open in App Button */}
            <a
              href={deepLink}
              className="block w-full bg-emerald-600 text-white font-semibold px-6 py-4 rounded-full text-center hover:bg-emerald-700 transition-colors text-lg mb-3"
            >
              Open in App
            </a>

            {/* Download App Link */}
            <p className="text-gray-500 text-sm text-center">
              Don&apos;t have the app?{' '}
              <a
                href={appStoreUrl}
                className="text-emerald-600 font-semibold hover:underline"
              >
                Download Grateful
              </a>
            </p>
          </div>
        </div>

        {/* What is Grateful */}
        <div className="mt-8 text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">What is Grateful?</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            A daily gratitude journaling app where you can share what you&apos;re thankful for
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

