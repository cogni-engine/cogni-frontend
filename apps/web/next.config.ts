import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Transpile packages from the monorepo
  transpilePackages: ['@cogni/api', '@cogni/types', '@cogni/utils'],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gtcwgwlgcphwhapmnerq.supabase.co',
        pathname: '/storage/v1/object/**', // 👈 sign と public の両方を含む
      },
      {
        protocol: 'https',
        hostname: '**.supabase.in',
        pathname: '/storage/v1/object/**',
      },
    ],
  },
};

export default nextConfig;
