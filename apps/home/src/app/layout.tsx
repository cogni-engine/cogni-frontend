import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { ClientLayout } from './client-layout';
import { detectLanguage } from '../lib/language';

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
    default: 'Cogno',
    template: '%s | Cogno',
  },
  description:
    'Cogno keeps your team aligned with collaborative workspaces, notes, and AI assistance.',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Cogno',
  },
};

export const viewport: Viewport = {
  themeColor: '#0B0F1A',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Detect language on the server for SSR
  const language = await detectLanguage();

  return (
    <html lang={language}>
      <head>
        <Script
          id='apollo-tracker'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,o.onload=function(){window.trackingFunctions.onLoad({appId:"698a2f7cab71e4001978f951"})},document.head.appendChild(o)}initApollo();`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientLayout initialLanguage={language}>{children}</ClientLayout>
      </body>
    </html>
  );
}
