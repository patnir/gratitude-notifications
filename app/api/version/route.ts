import { NextResponse } from 'next/server';

// Minimum required app version - update this when you have breaking changes
const MIN_VERSION = '1.0.8';

// TestFlight public link for your app
const TESTFLIGHT_URL = 'https://testflight.apple.com/join/6u5zHFms';

export async function GET() {
  return NextResponse.json({
    minVersion: MIN_VERSION,
    testflightUrl: TESTFLIGHT_URL,
  });
}

