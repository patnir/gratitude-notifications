"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const posts = [
  "/posts/100.png",
  "/posts/101.png",
  "/posts/103.png",
  "/posts/104.png",
  "/posts/105.png",
  "/posts/106.png",
  "/posts/107.png",
  "/posts/108.png",
  "/posts/109.png",
  "/posts/110.png",
  "/posts/111.png",
  "/posts/112.png",
];

export default function RotatingPosts() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % posts.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[280px] h-[605px] mx-auto">
      {/* Phone frame */}
      <div className="absolute inset-0 bg-[#1a1a1a] rounded-[3rem] shadow-2xl border-[8px] border-[#1a1a1a]">
        {/* Screen area with image */}
        <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-[#fafaf8]">
          {/* All images stacked, only current one visible */}
          {posts.map((post, index) => (
            <div
              key={post}
              className={`absolute inset-0 transition-opacity duration-500 ${index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
            >
              <Image
                src={post}
                alt="Gratitude post"
                fill
                className="object-cover"
                priority={index < 3}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full" />
    </div>
  );
}
