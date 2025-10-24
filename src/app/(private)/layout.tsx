import React from 'react';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import ThreadSidebar from '@/components/thread/ThreadSidebar';
import NotificationPanel from '@/components/notifications/NotificationPanel';
import { ThreadProvider } from '@/contexts/ThreadContext';
import { UIProvider } from '@/contexts/UIContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThreadProvider>
      <UIProvider>
        <div className='flex flex-col h-screen bg-black text-gray-200 relative'>
          {/* Thread Sidebar */}
          <ThreadSidebar />

          {/* Main Layout */}
          <div className='flex flex-col h-screen'>
            {/* Header */}
            <Header />

            {/* Main */}
            <main className='flex-1 overflow-hidden'>{children}</main>

            {/* Bottom Navigation */}
            <BottomNav />
          </div>

          {/* Notification Panel */}
          <NotificationPanel />
        </div>
      </UIProvider>
    </ThreadProvider>
  );
}
