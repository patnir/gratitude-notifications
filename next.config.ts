import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-6d45957254cf4079bab8f194fdd6ec27.r2.dev',
      },
    ],
  },
};

export default nextConfig;
