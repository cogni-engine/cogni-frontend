'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useNotifications } from '@/features/notifications/hooks/useNotifications';
import { UserMenu } from '@/components/layout/UserMenu';
import { ArrowLeft, BellIcon, TextAlignStart } from 'lucide-react';
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
import { useUserId } from '@/stores/useUserProfileStore';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/home' || pathname === '/cogno';
  const isNotesPage = pathname === '/notes';
  const isUserPage = pathname.startsWith('/user/');
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

  const userId = useUserId();

  // Get personal workspace ID for notes page
  const personalWorkspaceId = isNotesPage ? getPersonalWorkspaceId() : null;

  const {
    notifications: pastDueNotifications,
    unreadCount,
    isLoadingNotifications,
    fetchPastDueNotifications,
    fetchUnreadCount,
  } = useNotifications(userId || undefined);

  // Notification drawer state
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] =
    useState(false);
  const [highlightedNotificationId, setHighlightedNotificationId] = useState<
    number | null
  >(null);
  // Initialize on mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch unread notifications when user is loaded and available
  useEffect(() => {
    if (!userId) return;
    fetchUnreadCount();
  }, [userId, fetchUnreadCount]);

  useEffect(() => {
    const unsubscribe = onHeaderEvent(
      HEADER_EVENTS.REFRESH_NOTIFICATION_COUNT,
      () => {
        if (userId) {
          fetchUnreadCount();
        }
      }
    );

    return unsubscribe;
  }, [userId, fetchUnreadCount]);

  const handleToggleThreadSidebar = () => {
    dispatchHeaderEvent(HEADER_EVENTS.TOGGLE_THREAD_SIDEBAR);
  };

  const handleToggleNotificationPanel = useCallback(() => {
    if (!userId) return;

    // Emit event for tutorial tracking
    const eventBus = getAppEventBus();
    eventBus.emit({ type: 'NOTIFICATION_BELL_CLICKED' });

    // Open drawer immediately for instant feedback
    setIsNotificationDrawerOpen(true);

    // Fetch notifications in background
    fetchPastDueNotifications();
  }, [userId, fetchPastDueNotifications]);

  // Listen for external toggle events (from mobile app)
  useEffect(() => {
    const handleToggleEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{ notificationId?: number }>;
      const notificationId = customEvent.detail?.notificationId;

      if (notificationId) {
        setHighlightedNotificationId(notificationId);
      }

      handleToggleNotificationPanel();
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
    // Clear highlighted notification after processing
    setHighlightedNotificationId(null);
  }, [fetchPastDueNotifications, userId, fetchUnreadCount]);

  // Reorder notifications to show highlighted one first
  const orderedNotifications = useMemo(() => {
    if (!highlightedNotificationId || pastDueNotifications.length === 0) {
      return pastDueNotifications;
    }

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
  }, [pastDueNotifications, highlightedNotificationId]);

  return (
    <header className='fixed top-0 left-0 right-0 z-110 py-3'>
      <div className='w-full md:mx-auto px-4 md:px-6'>
        <div className='flex items-center justify-between'>
          {/* Left Side - Thread Controls + Logo */}
          <div className='flex items-center gap-4'>
            {isUserPage && isMounted && (
              <GlassButton
                onClick={() => router.back()}
                title='Go back'
                size='icon'
                className='size-12'
              >
                <ArrowLeft className='w-5 h-5 text-text-primary' />
              </GlassButton>
            )}
            {isHomePage && isMounted && (
              <div>
                {/* Thread Sidebar Toggle */}
                <GlassButton
                  onClick={handleToggleThreadSidebar}
                  title='Threads'
                  size='icon'
                  className='size-12'
                >
                  <TextAlignStart className='w-5 h-5 text-text-primary' />
                </GlassButton>
              </div>
            )}

            {/* Logo */}
            <h1
              className={`text-lg font-semibold text-text-primary ${pathname === '/workspace' || pathname === '/notes' || pathname === '/user/tasks' ? 'ml-2' : ''}`}
            >
              Cogno
              {pageTitle && (
                <span className='text-base text-text-secondary font-normal'>
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
                  onClick={handleToggleNotificationPanel}
                  title='Notifications'
                  size='icon'
                  className='size-12'
                  data-shepherd-target='notification-bell'
                >
                  <BellIcon className='w-5 h-5 text-text-primary' />
                  {unreadCount > 0 && (
                    <span className='absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500 border border-border-default' />
                  )}
                </GlassButton>
              )}
            {isMounted && (
              <>
                <UserMenu />
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
          open={isNotificationDrawerOpen}
          onOpenChange={setIsNotificationDrawerOpen}
          notifications={orderedNotifications}
          onNotificationProcessed={handleNotificationProcessed}
          initialNotificationId={highlightedNotificationId}
          isLoading={isLoadingNotifications}
        />
      )}
    </header>
  );
}
