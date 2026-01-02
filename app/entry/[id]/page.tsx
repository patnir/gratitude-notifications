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

  // Use the entry content as the title (truncate if needed for OG title ~70 chars ideal)
  const title = entry.content.length > 70 
    ? entry.content.substring(0, 67) + '...' 
    : entry.content;

  // Longer description for the body
  const description = entry.content.length > 150 
    ? entry.content.substring(0, 147) + '...' 
    : entry.content;

  // Use the entry's image if available, otherwise use app icon
  const ogImage = entry.imageUrl || 'https://grateful.so/icon.png';
  const ogImageWidth = entry.imageUrl ? 1200 : 1024;
  const ogImageHeight = entry.imageUrl ? 630 : 1024;

  return {
    title: `${title} | Grateful`,
    description: `${entry.authorName} on Grateful`,
    openGraph: {
      title: title,
      description: `${entry.authorName} on Grateful`,
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
      title: title,
      description: `${entry.authorName} on Grateful`,
      images: [ogImage],
    },
  };
}

export default async function EntryPage({ params }: PageProps) {
  const { id } = await params;
  const entry = await getEntry(id);

  // Deep link URL for the app
  const deepLink = `grateful://entry/${id}`;

  // App Store URL
  const appStoreUrl = 'https://apps.apple.com/app/grateful';

  if (!entry) {
    return (
      <div className="min-h-screen bg-[#fafaf8] flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl border border-[#e8e8e8] p-8 text-center">
          <div className="w-16 h-16 bg-[#f5f5f5] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-[#999]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#1a1a1a] mb-3 tracking-tight">Entry Not Available</h1>
          <p className="text-[#666] mb-8 leading-relaxed">
            This gratitude entry is private or does not exist.
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

  const location = parseLocation(entry.location);

  return (
    <div className="min-h-screen bg-[#fafaf8] flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Card */}
        <div className="bg-white rounded-3xl border border-[#e8e8e8] overflow-hidden">
          {/* Image if present */}
          {entry.imageUrl && (
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={entry.imageUrl}
                alt="Entry image"
                fill
                className="object-cover"
                sizes="(max-width: 448px) 100vw, 448px"
                unoptimized
              />
            </div>
          )}

          <div className="p-8">
            {/* Author */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#e8f5e8] rounded-2xl flex items-center justify-center">
                <span className="text-[#0a660a] font-semibold text-lg">
                  {entry.authorName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-semibold text-[#1a1a1a]">{entry.authorName}</p>
                <p className="text-sm text-[#999]">{formatDate(entry.createdAt)}</p>
              </div>
            </div>

            {/* Content */}
            <p className="text-xl text-[#1a1a1a] leading-relaxed mb-6">
              {entry.content}
            </p>

            {/* Location */}
            {location && (
              <p className="text-sm text-[#999] flex items-center gap-2 mb-8">
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
              className="block w-full bg-[#0a660a] text-white font-semibold px-6 py-4 rounded-2xl text-center hover:bg-[#085408] transition-colors text-lg mb-4"
            >
              Open in App
            </a>

            {/* Download App Link */}
            <p className="text-[#999] text-sm text-center">
              Don&apos;t have the app?{' '}
              <a
                href={appStoreUrl}
                className="text-[#0a660a] font-semibold hover:underline"
              >
                Download Grateful
              </a>
            </p>
          </div>
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
