import Image from "next/image";
import RotatingPosts from "./components/RotatingPosts";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafaf8]">
      {/* Hero Section - Full viewport height */}
      <section className="min-h-screen flex flex-col">
        {/* Nav */}
        <nav className="flex items-center justify-between px-6 py-6 max-w-6xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <Image
              src="/icon.png"
              alt="Grateful"
              width={40}
              height={40}
              className="rounded-xl"
            />
            <span className="text-2xl font-semibold text-[#0a660a]">Grateful</span>
          </div>
          {/* Mobile: App store icon buttons */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href="https://testflight.apple.com/join/6u5zHFms"
              className="flex items-center justify-center w-11 h-11 bg-[#1a1a1a] rounded-xl"
            >
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
              </svg>
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.rahul20patni.gratitude"
              className="flex items-center justify-center w-11 h-11 bg-[#1a1a1a] rounded-xl"
            >
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
              </svg>
            </a>
          </div>
        </nav>

        {/* Hero content */}
        <div className="flex-1 flex flex-col lg:flex-row items-center justify-center px-6 pb-8 lg:pb-16">
          {/* Mobile: stacked layout (heading -> phone -> button) */}
          {/* Desktop: side by side */}
          <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-6 lg:gap-16 items-center">
            {/* Copy - on mobile appears first, on desktop left side */}
            <div className="text-center lg:text-left order-1 lg:order-1">
              <h1
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a] leading-[1.1] tracking-tight opacity-0 animate-fade-in-up"
                style={{ animationDelay: "0ms", animationFillMode: "forwards" }}
              >
                Share gratitude with your people.
              </h1>
              <p
                className="hidden lg:block mt-6 text-xl text-[#4a4a4a] leading-relaxed max-w-lg mx-auto lg:mx-0 opacity-0 animate-fade-in-up"
                style={{ animationDelay: "150ms", animationFillMode: "forwards" }}
              >
                A private space for family and close friends to share what you&apos;re grateful for, every day.
              </p>
              {/* Buttons - hidden on mobile, shown on desktop */}
              <div
                className="mt-8 opacity-0 animate-fade-in-up hidden lg:flex gap-3"
                style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
              >
                <a
                  href="https://testflight.apple.com/join/6u5zHFms"
                  className="inline-flex items-center justify-center gap-2 bg-[#1a1a1a] text-white px-6 py-4 rounded-2xl text-lg font-medium hover:bg-[#333] transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  App Store
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.rahul20patni.gratitude"
                  className="inline-flex items-center justify-center gap-2 bg-[#1a1a1a] text-white px-6 py-4 rounded-2xl text-lg font-medium hover:bg-[#333] transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                  </svg>
                  Google Play
                </a>
              </div>
            </div>

            {/* Phone mockup - middle on mobile, right on desktop */}
            <div
              className="order-2 lg:order-2 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
            >
              <RotatingPosts />
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="pb-8 flex justify-center">
          <div className="animate-bounce">
            <svg
              className="w-6 h-6 text-[#999]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* How it works - Below the fold */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1a1a1a] mb-16 tracking-tight">
            How it works
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="relative w-44 h-[380px] mx-auto mb-6 rounded-3xl overflow-hidden shadow-xl border border-[#e8e8e8]">
                <Image
                  src="/screenshot_post_100.png"
                  alt="Share your gratitude"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-[#1a1a1a] mb-2">
                Share daily moments
              </h3>
              <p className="text-[#666] text-sm leading-relaxed">
                Post what you&apos;re grateful for. Add a photo if you want.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="relative w-44 h-[380px] mx-auto mb-6 rounded-3xl overflow-hidden shadow-xl border border-[#e8e8e8]">
                <Image
                  src="/screenshot_feed_100.png"
                  alt="See your circle's posts"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-[#1a1a1a] mb-2">
                See what others share
              </h3>
              <p className="text-[#666] text-sm leading-relaxed">
                Your circle&apos;s gratitudes appear in a simple feed.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="relative w-44 h-[380px] mx-auto mb-6 rounded-3xl overflow-hidden shadow-xl border border-[#e8e8e8]">
                <Image
                  src="/screenshot_profile_100.png"
                  alt="Your profile"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-[#1a1a1a] mb-2">
                Track your journey
              </h3>
              <p className="text-[#666] text-sm leading-relaxed">
                See your gratitude history and stats on your profile.
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="relative w-44 h-[380px] mx-auto mb-6 rounded-3xl overflow-hidden shadow-xl border border-[#e8e8e8]">
                <Image
                  src="/screenshot_stats_100.png"
                  alt="Track your streaks"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-[#1a1a1a] mb-2">
                Build the habit
              </h3>
              <p className="text-[#666] text-sm leading-relaxed">
                Track streaks and see weekly recaps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="py-24 px-6 bg-[#fafaf8]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6 tracking-tight">
            Start sharing with your circle
          </h2>
          <p className="text-[#666] text-lg mb-10">
            Private, simple, and made for the people you actually care about.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://testflight.apple.com/join/6u5zHFms"
              className="inline-flex items-center justify-center gap-2 bg-[#0a660a] text-white px-8 py-4 rounded-2xl text-lg font-medium hover:bg-[#085408] transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              App Store
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.rahul20patni.gratitude"
              className="inline-flex items-center justify-center gap-2 bg-[#0a660a] text-white px-8 py-4 rounded-2xl text-lg font-medium hover:bg-[#085408] transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
              </svg>
              Google Play
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-white border-t border-[#e8e8e8]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/icon.png"
              alt="Grateful"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="text-xl font-semibold text-[#0a660a]">Grateful</span>
          </div>
          <div className="flex gap-6 text-sm text-[#666]">
            <a href="/privacy" className="hover:text-[#1a1a1a] transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-[#1a1a1a] transition-colors">Terms</a>
            <a href="/contact" className="hover:text-[#1a1a1a] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
