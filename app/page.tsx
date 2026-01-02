import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafaf8]">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5l5.5 11.5L48 18l-9 8.5 2 12.5-11-6-11 6 2-12.5-9-8.5 12.5-1.5z' fill='%230a660a' fill-opacity='1'/%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <Image
              src="/icon.png"
              alt="Grateful"
              width={40}
              height={40}
              className="rounded-xl"
            />
            <span className="font-serif text-2xl text-[#0a660a]">Grateful</span>
          </div>
        </nav>

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-32">
          <div className="max-w-2xl">
            <h1
              className="font-serif text-6xl md:text-7xl text-[#1a1a1a] leading-[1.1] opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0ms", animationFillMode: "forwards" }}
            >
              Find joy in the
              <span className="text-[#0a660a]"> little things</span>
            </h1>
            <p
              className="mt-8 text-xl text-[#4a4a4a] leading-relaxed max-w-lg opacity-0 animate-fade-in-up"
              style={{ animationDelay: "150ms", animationFillMode: "forwards" }}
            >
              A simple, beautiful gratitude journal. Write what you are thankful
              for, share with the people you love, and watch your perspective
              shift.
            </p>
            <div
              className="mt-10 flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
            >
              <a
                href="https://apps.apple.com/app/grateful"
                className="inline-flex items-center justify-center gap-2 bg-[#1a1a1a] text-white px-6 py-4 rounded-2xl text-lg font-medium hover:bg-[#333] transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Download for iOS
              </a>
            </div>
          </div>
        </div>

        {/* Decorative star */}
        <div className="absolute right-10 top-40 w-32 h-32 opacity-10 animate-float hidden lg:block">
          <svg viewBox="0 0 100 100" fill="#0a660a">
            <path d="M50 5l11 22.5L85 31l-17.5 17 4 24.5L50 61l-21.5 11.5 4-24.5L15 31l24-3.5z" />
          </svg>
        </div>
        <div
          className="absolute right-40 bottom-20 w-20 h-20 opacity-5 animate-float hidden lg:block"
          style={{ animationDelay: "1s" }}
        >
          <svg viewBox="0 0 100 100" fill="#0a660a">
            <path d="M50 5l11 22.5L85 31l-17.5 17 4 24.5L50 61l-21.5 11.5 4-24.5L15 31l24-3.5z" />
          </svg>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl text-center text-[#1a1a1a] mb-4">
            How it works
          </h2>
          <p className="text-center text-[#666] text-lg mb-16 max-w-xl mx-auto">
            Building a gratitude habit takes just a minute a day
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-[#fafaf8] border border-[#e8e8e8]">
              <div className="w-14 h-14 rounded-2xl bg-[#e8f5e8] flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-[#0a660a]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-[#1a1a1a] mb-3">
                Write daily
              </h3>
              <p className="text-[#666] leading-relaxed">
                Capture moments of gratitude in 140 characters or less. Add
                photos and your location to remember the context.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-[#fafaf8] border border-[#e8e8e8]">
              <div className="w-14 h-14 rounded-2xl bg-[#e8f5e8] flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-[#0a660a]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-[#1a1a1a] mb-3">
                Share with circles
              </h3>
              <p className="text-[#666] leading-relaxed">
                Create private circles for family or close friends. Share your
                gratitude and react to theirs with emojis.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-[#fafaf8] border border-[#e8e8e8]">
              <div className="w-14 h-14 rounded-2xl bg-[#e8f5e8] flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-[#0a660a]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-[#1a1a1a] mb-3">
                Build your streak
              </h3>
              <p className="text-[#666] leading-relaxed">
                Track consecutive days of gratitude. Get gentle reminders and
                weekly recaps of your journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 px-6 bg-[#0a660a]">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="font-serif text-3xl md:text-4xl text-white leading-relaxed">
            &ldquo;Gratitude turns what we have into enough.&rdquo;
          </blockquote>
          <cite className="mt-6 block text-[#a8d4a8] text-lg not-italic">
            - Melody Beattie
          </cite>
        </div>
      </section>

      {/* More Features */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-4xl text-[#1a1a1a] mb-6">
                Remember the good moments
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#e8f5e8] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-[#0a660a]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-[#4a4a4a] text-lg">
                    Attach photos to your entries
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#e8f5e8] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-[#0a660a]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-[#4a4a4a] text-lg">
                    Automatic location tagging
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#e8f5e8] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-[#0a660a]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-[#4a4a4a] text-lg">
                    Search through your history
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#e8f5e8] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-[#0a660a]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-[#4a4a4a] text-lg">
                    &ldquo;Remember this?&rdquo; notifications with past entries
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#e8f5e8] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-[#0a660a]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-[#4a4a4a] text-lg">
                    Share beautiful quote cards to social media
                  </span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#e8f5e8] to-[#d4ecd4] p-12 flex items-center justify-center">
                <Image
                  src="/icon.png"
                  alt="Grateful app"
                  width={200}
                  height={200}
                  className="rounded-3xl shadow-2xl animate-float"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-[#fafaf8]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-[#1a1a1a] mb-6">
            Start your gratitude practice today
          </h2>
          <p className="text-[#666] text-lg mb-10">
            Join thousands of people building a daily habit of gratitude.
          </p>
          <a
            href="https://apps.apple.com/app/grateful"
            className="inline-flex items-center justify-center gap-2 bg-[#0a660a] text-white px-8 py-4 rounded-2xl text-lg font-medium hover:bg-[#085408] transition-colors"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            Download for iOS
          </a>
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
            <span className="font-serif text-xl text-[#0a660a]">Grateful</span>
          </div>
          <p className="text-[#999] text-sm">
            Made with gratitude
          </p>
        </div>
      </footer>
    </div>
  );
}
