import { NextResponse } from 'next/server';

// Minimum required app version - update this when you have breaking changes
const MIN_VERSION = '1.1.4';

// App store links
const TESTFLIGHT_URL = 'https://testflight.apple.com/join/6u5zHFms';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.rahul20patni.gratitude';

export async function GET() {
  return NextResponse.json({
    minVersion: MIN_VERSION,
    testflightUrl: TESTFLIGHT_URL,
    playStoreUrl: PLAY_STORE_URL,
  });
}

