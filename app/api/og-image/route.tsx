import { NextRequest, NextResponse } from 'next/server';

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

// Helper to get darker shade for gradient
function getDarkerShade(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  const darker = (val: number) => Math.max(0, Math.floor(val * 0.7));

  return `#${darker(r).toString(16).padStart(2, '0')}${darker(g).toString(16).padStart(2, '0')}${darker(b).toString(16).padStart(2, '0')}`;
}

function generateCircleInviteSVG(circleName: string, circleColor: string): string {
  const color = CIRCLE_COLORS[circleColor] || CIRCLE_COLORS.green;
  const darkerColor = getDarkerShade(color);

  // Escape special characters in circle name for SVG
  const escapedName = circleName
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

  return `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${darkerColor};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color};stop-opacity:1" />
    </linearGradient>
    <style>
      .title { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-weight: 700; }
      .subtitle { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-weight: 400; }
      .branding { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-weight: 600; }
    </style>
  </defs>
  
  <!-- Background with gradient -->
  <rect width="1200" height="630" fill="url(#bgGradient)"/>
  
  <!-- Main content - centered -->
  <g transform="translate(600, 315)">
    <!-- Circle icon -->
    <g transform="translate(0, -100)">
      <circle cx="0" cy="0" r="50" fill="rgba(255,255,255,0.15)"/>
      <g transform="translate(-30, -30) scale(2.5)">
        <path stroke-linecap="round" stroke-linejoin="round" stroke="white" stroke-width="2" fill="none" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </g>
    </g>
    
    <!-- "Join" text -->
    <text x="0" y="0" class="subtitle" font-size="28" fill="rgba(255,255,255,0.9)" text-anchor="middle">
      Join
    </text>
    
    <!-- Circle name -->
    <text x="0" y="55" class="title" font-size="56" fill="white" text-anchor="middle" letter-spacing="-0.02em">
      ${escapedName}
    </text>
    
    <!-- Branding at bottom -->
    <g transform="translate(0, 130)">
      <text x="0" y="0" class="branding" font-size="18" fill="rgba(255,255,255,0.7)" text-anchor="middle">
        grateful.so
      </text>
    </g>
  </g>
</svg>
  `.trim();
}

function generateDefaultSVG(): string {
  return `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Green gradient background -->
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#0a660a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2d8659;stop-opacity:1" />
    </linearGradient>
    <!-- Text styles -->
    <style>
      .quote { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-weight: 400; }
      .attribution { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-weight: 400; }
      .tagline { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-weight: 400; }
      .domain { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-weight: 400; }
    </style>
  </defs>
  
  <!-- Background with gradient -->
  <rect width="1200" height="630" fill="url(#bgGradient)"/>
  
  <!-- Main quote content - centered -->
  <g transform="translate(600, 200)">
    <!-- Quote text -->
    <text x="0" y="0" class="quote" font-size="40" fill="white" text-anchor="middle" letter-spacing="-0.01em">
      "Great weather"
    </text>
    
    <!-- Attribution -->
    <text x="0" y="80" class="attribution" font-size="18" fill="rgba(255,255,255,0.8)" text-anchor="middle">
      Rahul • Dec 30
    </text>
    
    <!-- Location -->
    <text x="0" y="110" class="attribution" font-size="18" fill="rgba(255,255,255,0.8)" text-anchor="middle">
      Cancún, Mexico
    </text>
  </g>
  
  <!-- Divider line -->
  <line x1="300" y1="420" x2="900" y2="420" stroke="rgba(255,255,255,0.5)" stroke-width="1"/>
  
  <!-- Bottom section -->
  <g transform="translate(600, 480)">
    <!-- Tagline -->
    <text x="0" y="0" class="tagline" font-size="14" fill="rgba(255,255,255,0.9)" text-anchor="middle">
      Share gratitude daily
    </text>
    
    <!-- Logo and domain -->
    <g transform="translate(0, 35)">
      <!-- Star logo from icon.svg - scaled and positioned -->
      <g transform="translate(-60, -12) scale(0.8)">
        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" 
              fill="white" 
              opacity="0.9"/>
      </g>
      <!-- Domain -->
      <text x="20" y="5" class="domain" font-size="12" fill="rgba(255,255,255,0.8)" text-anchor="start">
        grateful.so
      </text>
    </g>
  </g>
</svg>
  `.trim();
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type');

  let svg: string;

  if (type === 'circle') {
    const circleName = searchParams.get('name') || 'Circle';
    const circleColor = searchParams.get('color') || 'green';

    svg = generateCircleInviteSVG(circleName, circleColor);
  } else {
    svg = generateDefaultSVG();
  }

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}

