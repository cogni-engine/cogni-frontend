'use client';

import { ReactNode, useEffect } from 'react';
import { ThreadProvider } from '@/features/cogno/contexts/ThreadContext';
import { HomeUIProvider, useHomeUI } from '@/contexts/HomeUIContext';
import ThreadSidebar from '@/features/cogno/components/ThreadSidebar';
import { onHeaderEvent, HEADER_EVENTS } from '@/lib/headerEvents';

function HomeLayoutContent({ children }: { children: ReactNode }) {
  const { toggleThreadSidebar, toggleNotificationPanel } = useHomeUI();

  // Listen to header events
  useEffect(() => {
    const unsubscribeToggleSidebar = onHeaderEvent(
      HEADER_EVENTS.TOGGLE_THREAD_SIDEBAR,
      toggleThreadSidebar
    );
    const unsubscribeToggleNotification = onHeaderEvent(
      HEADER_EVENTS.TOGGLE_NOTIFICATION_PANEL,
      toggleNotificationPanel
    );

    return () => {
      unsubscribeToggleSidebar();
      unsubscribeToggleNotification();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ThreadSidebar />
      {children}
    </>
  );
}

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <ThreadProvider>
      <HomeUIProvider>
        <HomeLayoutContent>{children}</HomeLayoutContent>
      </HomeUIProvider>
    </ThreadProvider>
  );
}
