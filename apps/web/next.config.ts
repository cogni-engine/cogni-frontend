import type { NextConfig } from 'next';

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: false, // ← 勝手に切り替えない
  cleanupOutdatedCaches: true, // ← 古いキャッシュ削除
  disable: process.env.NODE_ENV === 'development',
  buildExcludes: [/app-build-manifest\.json$/],
  publicExcludes: ['!noprecache/**/*'],
});

const nextConfig: NextConfig = {
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

export default withPWA(nextConfig);
