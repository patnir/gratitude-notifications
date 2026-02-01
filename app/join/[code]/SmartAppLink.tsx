'use client';

import { useEffect, useState } from 'react';

interface SmartAppLinkProps {
  deepLink: string;
  appStoreUrl: string;
  playStoreUrl: string;
  circleColor: string;
}

export default function SmartAppLink({
  deepLink,
  appStoreUrl,
  playStoreUrl,
  circleColor,
}: SmartAppLinkProps) {
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Detect platform
  const getStoreUrl = () => {
    if (typeof window === 'undefined') return appStoreUrl;
    
    const userAgent = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);
    
    if (isIOS) return appStoreUrl;
    if (isAndroid) return playStoreUrl;
    
    // Default to App Store for desktop/unknown
    return appStoreUrl;
  };

  const handleOpenApp = () => {
    setIsRedirecting(true);
    
    const storeUrl = getStoreUrl();
    const startTime = Date.now();
    
    // Try to open the deep link
    window.location.href = deepLink;
    
    // Set a timeout to redirect to app store if the app didn't open
    // If the app opens, this page will be backgrounded and the timeout won't fire
    // (or will fire but the redirect won't be visible)
    setTimeout(() => {
      // Check if we're still on this page (app didn't open)
      // The page being visible means the deep link didn't work
      if (document.visibilityState === 'visible' || document.hidden === false) {
        // Additional check: if very little time passed, the app likely didn't open
        const elapsed = Date.now() - startTime;
        if (elapsed < 2000) {
          window.location.href = storeUrl;
        }
      }
      setIsRedirecting(false);
    }, 1500);
  };

  return (
    <div>
      {/* Open in App Button */}
      <button
        onClick={handleOpenApp}
        disabled={isRedirecting}
        className="block w-full text-white font-semibold px-6 py-4 rounded-2xl mb-4 transition-colors text-lg hover:opacity-90 disabled:opacity-70"
        style={{ backgroundColor: circleColor }}
      >
        {isRedirecting ? 'Opening...' : 'Open in App'}
      </button>

      {/* Download App Links */}
      <p className="text-[#999] text-sm">
        Don&apos;t have the app? Download on{' '}
        <a
          href={appStoreUrl}
          className="font-semibold hover:underline"
          style={{ color: circleColor }}
        >
          App Store
        </a>
        {' '}or{' '}
        <a
          href={playStoreUrl}
          className="font-semibold hover:underline"
          style={{ color: circleColor }}
        >
          Google Play
        </a>
      </p>
    </div>
  );
}
