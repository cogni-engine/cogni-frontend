'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useNotifications } from '@/features/notifications/hooks/useNotifications';
import { createClient } from '@/lib/supabase/browserClient';
import type { User } from '@supabase/supabase-js';
import { UserMenu } from '@/components/layout/UserMenu';
import { BellIcon, TextAlignStart } from 'lucide-react';
import {
  dispatchHeaderEvent,
  HEADER_EVENTS,
  onHeaderEvent,
} from '@/lib/headerEvents';
import FolderActionButton from '@/components/FolderActionButton';
import GlassButton from '@/components/glass-design/GlassButton';
import { useNoteFolders } from '@/features/notes/hooks/useNoteFolders';
import { useNotes } from '@/features/notes/hooks/useNotes';
import { getPersonalWorkspaceId } from '@/lib/cookies';
import NotificationProcessDrawer from '@/features/notifications/components/NotificationProcessDrawer';
import { getAppEventBus } from '@/lib/events/appEventBus';

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === '/home' || pathname === '/cogno';
  const isNotesPage = pathname === '/notes';
  const pageTitleMap: Record<string, string> = {
    '/notes': 'Note',
    '/workspace': 'Workspace',
    '/personal': 'Personal',
    '/user/settings': 'User Settings',
    '/user/tasks': 'My Tasks',
  };
  const pageTitle = pageTitleMap[pathname] ?? null;
  const [user, setUser] = useState<User | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Get folders for notes page
  const personalWorkspaceId = isNotesPage ? getPersonalWorkspaceId() : null;
  const {
    folders,
    updateFolder,
    deleteFolder,
    createFolder: createFolderHook,
    refetch: refetchFolders,
  } = useNoteFolders({
    workspaceId: personalWorkspaceId || 0,
    autoFetch: isNotesPage && !!personalWorkspaceId,
  });

  // Get deleted notes count for trash folder
  const { notes } = useNotes({
    workspaceId: personalWorkspaceId || 0,
    includeDeleted: true,
    autoFetch: isNotesPage && !!personalWorkspaceId,
  });
  const trashCount = isNotesPage
    ? notes.filter(note => note.deleted_at).length
    : 0;

  // Wrap createFolder to refetch after creation
  const createFolder = async (title: string) => {
    const newFolder = await createFolderHook(title);
    await refetchFolders();
    // Dispatch event to notify NotesProvider to refetch
    window.dispatchEvent(new CustomEvent('folders-updated'));
    return newFolder;
  };

  // Wrap updateFolder and deleteFolder similarly
  const handleUpdateFolder = async (id: number, title: string) => {
    const updated = await updateFolder(id, title);
    await refetchFolders();
    window.dispatchEvent(new CustomEvent('folders-updated'));
    return updated;
  };

  const handleDeleteFolder = async (id: number) => {
    await deleteFolder(id);
    await refetchFolders();
    window.dispatchEvent(new CustomEvent('folders-updated'));
  };

  // Get notifications hook
  // Note: userId is still needed for fetchUnreadCount (old Supabase API)
  // fetchPastDueNotifications now uses JWT-based backend endpoint
  const userId = user?.id ?? null;
  const {
    notifications: pastDueNotifications,
    fetchPastDueNotifications,
    fetchUnreadCount,
  } = useNotifications(userId || undefined);

  // Notification drawer state
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] =
    useState(false);

  // Initialize on mount: set mounted flag and get userId
  useEffect(() => {
    setIsMounted(true);

    const getUserData = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    };
    getUserData();
  }, []);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now
        .toLocaleString('en-US', {
          ...(isMobile ? {} : { weekday: 'short' }),
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
        .replace(/,/g, '');
      // Time updated but not currently displayed
      void formatted; // Suppress unused variable warning
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [isMobile]);

  // Fetch unread notifications when user detected
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

  const handleToggleNotificationPanel = async () => {
    if (!userId) return;

    // Emit event for tutorial tracking
    const eventBus = getAppEventBus();
    eventBus.emit({ type: 'NOTIFICATION_BELL_CLICKED' });

    // Fetch notifications and open drawer
    await fetchPastDueNotifications();
    setIsNotificationDrawerOpen(true);
  };

  const handleNotificationProcessed = async () => {
    // Refresh notifications and unread count after processing
    await fetchPastDueNotifications();
    if (userId) {
      await fetchUnreadCount();
    }
  };

  return (
    <header className='fixed top-0 left-0 right-0 z-110 py-3'>
      <div className='w-full md:max-w-7xl md:mx-auto px-4 md:px-6'>
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
            {isNotesPage && isMounted && (
              <FolderActionButton
                folders={folders}
                onUpdateFolder={handleUpdateFolder}
                onDeleteFolder={handleDeleteFolder}
                onCreateFolder={createFolder}
                trashCount={trashCount}
                onTrashClick={() => {
                  window.dispatchEvent(
                    new CustomEvent('trash-folder-selected')
                  );
                }}
              />
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
                  <BellIcon className='w-5 h-5 text-white' />
                </GlassButton>
              )}
            {isMounted && <UserMenu user={user} />}
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
          notifications={pastDueNotifications}
          onNotificationProcessed={handleNotificationProcessed}
        />
      )}
    </header>
  );
}
