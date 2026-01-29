'use client';

import {
  ReactNode,
  useEffect,
  Children,
  isValidElement,
  Fragment,
} from 'react';
import {
  ThreadProvider,
  useThreadContext,
} from '@/features/cogno/contexts/ThreadContext';
import { useHomeUIStore } from '@/stores/useHomeUIStore';
import ThreadSidebar from '@/features/thread/ThreadSidebar';
import { createThread } from '@/features/cogno/api/threadsApi';
import { onHeaderEvent, HEADER_EVENTS } from '@/lib/headerEvents';
import { getPersonalWorkspaceId } from '@/lib/cookies';

function HomeLayoutContent({ children }: { children: ReactNode }) {
  const { setSelectedThreadId, refetchThreads } = useThreadContext();
  const toggleThreadSidebar = useHomeUIStore(
    state => state.toggleThreadSidebar
  );
  const toggleNotificationPanel = useHomeUIStore(
    state => state.toggleNotificationPanel
  );

  const handleCreateThread = async () => {
    try {
      const workspaceId = getPersonalWorkspaceId();
      if (!workspaceId) {
        console.error('No workspace ID available');
        return;
      }

      const now = new Date();
      const dateTimeTitle = now.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });

      const newThread = await createThread(workspaceId, dateTimeTitle);
      // Auto-select the newly created thread
      if (newThread && newThread.id) {
        setSelectedThreadId(newThread.id);
        // Refetch threads to update the list
        await refetchThreads();
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
      <HomeLayoutContent>{children}</HomeLayoutContent>
    </ThreadProvider>
  );
}
