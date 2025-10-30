'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import ThreadSidebar from '@/features/thread/ThreadSidebar';
import { ThreadProvider } from '@/contexts/ThreadContext';
import { UIProvider } from '@/contexts/UIContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showTopLevelChrome =
    pathname === '/home' || pathname === '/notes' || pathname === '/workspace';
  return (
    <ThreadProvider>
      <UIProvider>
        <div className='flex flex-col h-screen bg-black text-gray-200 relative'>
          {/* Thread Sidebar */}
          <ThreadSidebar />

          {/* Main Layout */}
          <div className='flex flex-col h-screen'>
            {/* Header */}
            {showTopLevelChrome && <Header />}

            {/* Main */}
            <main className='flex-1 overflow-hidden'>{children}</main>

            {/* Bottom Navigation */}
            {showTopLevelChrome && <BottomNav />}
          </div>
        </div>
      </UIProvider>
    </ThreadProvider>
  );
}
