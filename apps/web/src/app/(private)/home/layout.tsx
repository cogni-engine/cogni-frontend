'use client';

import {
  ReactNode,
  useEffect,
  Children,
  isValidElement,
  Fragment,
} from 'react';
import { ThreadProvider, useThreadContext } from '@/contexts/ThreadContext';
import { HomeUIProvider, useHomeUI } from '@/contexts/HomeUIContext';
import ThreadSidebar from '@/features/thread/ThreadSidebar';
import { useThreads } from '@/hooks/useThreads';
import { onHeaderEvent, HEADER_EVENTS } from '@/lib/headerEvents';

function HomeLayoutContent({ children }: { children: ReactNode }) {
  const { createThread } = useThreads();
  const { setSelectedThreadId } = useThreadContext();
  const { toggleThreadSidebar, toggleNotificationPanel } = useHomeUI();

  const handleCreateThread = async () => {
    try {
      const now = new Date();
      const dateTimeTitle = now.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });

      const newThread = await createThread(dateTimeTitle);
      // Auto-select the newly created thread
      if (newThread && newThread.id) {
        setSelectedThreadId(newThread.id);
      }
    } catch (error) {
      console.error('Failed to create thread:', error);
    }
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

  // Handle children as array (Next.js can pass arrays for parallel routes)
  const childrenArray = Children.toArray(children);

  return (
    <>
      <ThreadSidebar />
      {childrenArray.map((child, index) => {
        if (isValidElement(child) && child.key != null) {
          return child;
        }
        // Use Fragment with key for children without keys
        return <Fragment key={index}>{child}</Fragment>;
      })}
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
