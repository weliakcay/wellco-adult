import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.erotikshoptoptan.com',
        pathname: '/images/urunler/**',
      },
    ],
  },
};

export default nextConfig;
