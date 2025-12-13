'use client';

import { ReactNode, useEffect } from 'react';
import { ThreadProvider, useThreadContext } from '@/contexts/ThreadContext';
import { HomeUIProvider, useHomeUI } from '@/contexts/HomeUIContext';
import ThreadSidebar from '@/features/thread/ThreadSidebar';
import { onHeaderEvent, HEADER_EVENTS } from '@/lib/headerEvents';

function HomeLayoutContent({ children }: { children: ReactNode }) {
  const { setSelectedThreadId } = useThreadContext();
  const { toggleThreadSidebar, toggleNotificationPanel } = useHomeUI();

  const handleCreateThread = () => {
    setSelectedThreadId('new');
  };

  // Listen to header events
  useEffect(() => {
    const unsubscribeCreate = onHeaderEvent(
      HEADER_EVENTS.CREATE_THREAD,
      handleCreateThread
    );
    const unsubscribeToggleSidebar = onHeaderEvent(
      HEADER_EVENTS.TOGGLE_THREAD_SIDEBAR,
      toggleThreadSidebar
    );
    const unsubscribeToggleNotification = onHeaderEvent(
      HEADER_EVENTS.TOGGLE_NOTIFICATION_PANEL,
      toggleNotificationPanel
    );

    return () => {
      unsubscribeCreate();
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
