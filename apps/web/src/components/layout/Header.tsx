'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useNotifications } from '@/features/notifications/hooks/useNotifications';
import { useUser } from '@/hooks/useUser';
import { UserMenu } from '@/components/layout/UserMenu';
import { BellIcon, TextAlignStart } from 'lucide-react';
import {
  dispatchHeaderEvent,
  HEADER_EVENTS,
  onHeaderEvent,
} from '@/lib/headerEvents';
import FolderActionButton from '@/components/FolderActionButton';
import GlassButton from '@/components/glass-design/GlassButton';
import { getPersonalWorkspaceId } from '@/lib/cookies';
import NotificationProcessDrawer from '@/features/notifications/components/NotificationProcessDrawer';
import { getAppEventBus } from '@/lib/events/appEventBus';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isHomePage = pathname === '/home' || pathname === '/cogno';
  const isNotesPage = pathname === '/notes';
  const pageTitleMap: Record<string, string> = {
    '/notes': 'Note',
    '/workspace': 'Workspace',
    '/personal': 'Personal',
    '/user/settings': 'User Settings',
    '/user/tasks': 'My Tasks',
    '/user/organizations': 'Organizations',
    '/user/subscription': 'Subscriptions',
  };
  const pageTitle = pageTitleMap[pathname] ?? null;
  const [isMounted, setIsMounted] = useState(false);

  // Get user using SWR hook
  const { user, isLoading: isLoadingUser, error: userError } = useUser();
  const userId = user?.id ?? null;

  // Get personal workspace ID for notes page
  const personalWorkspaceId = isNotesPage ? getPersonalWorkspaceId() : null;

  const {
    notifications: pastDueNotifications,
    unreadCount,
    isLoadingNotifications,
    fetchPastDueNotifications,
    fetchUnreadCount,
  } = useNotifications(userId || undefined);
  // Initialize on mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch unread notifications when user is loaded and available
  useEffect(() => {
    if (isLoadingUser || !userId) return;
    fetchUnreadCount();
  }, [userId, isLoadingUser, fetchUnreadCount]);

  useEffect(() => {
    const unsubscribe = onHeaderEvent(
      HEADER_EVENTS.REFRESH_NOTIFICATION_COUNT,
      () => {
        if (userId && !isLoadingUser) {
          fetchUnreadCount();
        }
      }
    );

    return unsubscribe;
  }, [userId, isLoadingUser, fetchUnreadCount]);

  const handleToggleThreadSidebar = () => {
    dispatchHeaderEvent(HEADER_EVENTS.TOGGLE_THREAD_SIDEBAR);
  };

  const handleToggleNotificationPanel = useCallback(
    (notificationId?: number) => {
      if (!userId) return;

      // Emit event for tutorial tracking
      const eventBus = getAppEventBus();
      eventBus.emit({ type: 'NOTIFICATION_BELL_CLICKED' });

      // Open drawer via query params
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.set('notification', 'open');
      if (notificationId) {
        current.set('notificationId', notificationId.toString());
      }
      const search = current.toString();
      const query = search ? `?${search}` : '';
      router.push(`${pathname}${query}`, { scroll: false });

      // Fetch notifications in background
      fetchPastDueNotifications();
    },
    [userId, fetchPastDueNotifications, router, searchParams, pathname]
  );

  // Listen for external toggle events (from mobile app)
  useEffect(() => {
    const handleToggleEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{ notificationId?: number }>;
      const notificationId = customEvent.detail?.notificationId;

      handleToggleNotificationPanel(notificationId);
    };

    window.addEventListener(
      HEADER_EVENTS.TOGGLE_NOTIFICATION_PANEL,
      handleToggleEvent
    );

    return () => {
      window.removeEventListener(
        HEADER_EVENTS.TOGGLE_NOTIFICATION_PANEL,
        handleToggleEvent
      );
    };
  }, [handleToggleNotificationPanel]);

  const handleNotificationProcessed = useCallback(async () => {
    // Refresh notifications and unread count after processing
    await fetchPastDueNotifications();
    if (userId) {
      await fetchUnreadCount();
    }
  }, [fetchPastDueNotifications, userId, fetchUnreadCount]);

  // Reorder notifications to show highlighted one first (from query params)
  const orderedNotifications = useMemo(() => {
    const highlightedId = searchParams.get('notificationId');
    if (!highlightedId || pastDueNotifications.length === 0) {
      return pastDueNotifications;
    }

    const highlightedNotificationId = parseInt(highlightedId);
    const highlightedIndex = pastDueNotifications.findIndex(
      n => n.id === highlightedNotificationId
    );

    if (highlightedIndex === -1) {
      return pastDueNotifications;
    }

    // Move highlighted notification to the top
    const reordered = [...pastDueNotifications];
    const [highlighted] = reordered.splice(highlightedIndex, 1);
    return [highlighted, ...reordered];
  }, [pastDueNotifications, searchParams]);

  return (
    <header className='fixed top-0 left-0 right-0 z-110 py-3'>
      <div className='w-full md:mx-auto px-4 md:px-6'>
        <div className='flex items-center justify-between'>
          {/* Left Side - Thread Controls + Logo */}
          <div className='flex items-center gap-4'>
            {isHomePage && isMounted && (
              <div>
                {/* Thread Sidebar Toggle */}
                <GlassButton
                  onClick={handleToggleThreadSidebar}
                  title='Threads'
                  size='icon'
                  className='size-12'
                >
                  <TextAlignStart className='w-5 h-5 text-white' />
                </GlassButton>
              </div>
            )}

            {/* Logo */}
            <h1
              className={`text-lg font-semibold text-white ${pathname === '/workspace' || pathname === '/notes' || pathname === '/user/tasks' ? 'ml-2' : ''}`}
            >
              Cogno
              {pageTitle && (
                <span className='text-base text-white/60 font-normal'>
                  {' '}
                  | {pageTitle}
                </span>
              )}
            </h1>
          </div>

          <div className='flex items-center gap-2'>
            {isNotesPage && isMounted && personalWorkspaceId && (
              <FolderActionButton workspaceId={personalWorkspaceId} />
            )}
            {(isHomePage ||
              pathname === '/workspace' ||
              pathname === '/notes' ||
              pathname === '/personal') &&
              isMounted && (
                <GlassButton
                  onClick={() => handleToggleNotificationPanel()}
                  title='Notifications'
                  size='icon'
                  className='size-12'
                  data-shepherd-target='notification-bell'
                >
                  <BellIcon className='w-5 h-5 text-white' />
                  {unreadCount > 0 && (
                    <span className='absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500 border border-black/50' />
                  )}
                </GlassButton>
              )}
            {isMounted && (
              <>
                {isLoadingUser ? (
                  <div className='h-12 w-12 rounded-full border border-white/10 bg-white/5 animate-pulse' />
                ) : userError ? (
                  <div
                    className='h-12 w-12 rounded-full border border-red-500/50 bg-red-500/10'
                    title='Error loading user'
                  />
                ) : (
                  <UserMenu user={user ?? null} />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Notification Process Drawer */}
      {(isHomePage ||
        pathname === '/workspace' ||
        pathname === '/notes' ||
        pathname === '/personal') && (
        <NotificationProcessDrawer
          notifications={orderedNotifications}
          onNotificationProcessed={handleNotificationProcessed}
          isLoading={isLoadingNotifications}
        />
      )}
    </header>
  );
}
