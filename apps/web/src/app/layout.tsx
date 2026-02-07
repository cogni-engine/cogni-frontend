import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/providers/QueryProvider';
import { ServiceWorkerRegistration } from '@/components/ServiceWorkerRegistration';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Cogni',
    template: '%s | Cogni',
  },
  description:
    'Cogni keeps your team aligned with collaborative workspaces, notes, and AI assistance.',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Cogni',
  },
};

export const viewport: Viewport = {
  themeColor: '#0B0F1A',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 初回訪問時もできるだけ早く SW を登録し、オフライン再訪問でオフライン画面を表示できるようにする */}
        <Script
          id='sw-register'
          strategy='beforeInteractive'
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js',{scope:'/'});}`,
          }}
        />
        <ServiceWorkerRegistration />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
