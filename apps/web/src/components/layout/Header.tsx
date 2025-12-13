'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useNotifications } from '@/hooks/useNotifications';
import { createClient } from '@/lib/supabase/browserClient';
import type { User } from '@supabase/supabase-js';
import { UserMenu } from '@/components/layout/UserMenu';
import { BellIcon, Menu, PenSquare } from 'lucide-react';
import {
  dispatchHeaderEvent,
  HEADER_EVENTS,
  onHeaderEvent,
} from '@/lib/headerEvents';

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === '/home';
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
  const [currentTime, setCurrentTime] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  // Get notifications hook
  const userId = user?.id ?? null;
  const { unreadCount, fetchUnreadCount } = useNotifications(
    userId || undefined
  );

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
      setCurrentTime(formatted);
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

  const handleCreateThread = () => {
    dispatchHeaderEvent(HEADER_EVENTS.CREATE_THREAD);
  };

  const handleToggleThreadSidebar = () => {
    dispatchHeaderEvent(HEADER_EVENTS.TOGGLE_THREAD_SIDEBAR);
  };

  const handleToggleNotificationPanel = () => {
    dispatchHeaderEvent(HEADER_EVENTS.TOGGLE_NOTIFICATION_PANEL);
  };

  return (
    <header className='fixed top-0 left-0 right-0 flex items-center justify-between px-4 md:px-6 py-3 z-100'>
      {/* Left Side - Thread Controls + Logo */}
      <div className='flex items-center gap-4'>
        {isHomePage && isMounted && (
          <div className='flex items-center gap-2'>
            {/* Thread Sidebar Toggle */}
            <button
              onClick={handleToggleThreadSidebar}
              className='flex items-center gap-1.5 text-white/60 hover:text-white transition-colors group'
              title='Threads'
            >
              <Menu className='w-5 h-5' />
            </button>

            {/* New Thread Button */}
            <button
              onClick={handleCreateThread}
              className='flex items-center gap-2 text-white/60 hover:text-white transition-colors group'
              title='New Thread'
            >
              <PenSquare className='w-5 h-5' />
            </button>

            {/* Divider */}
            <div className='w-px h-5 bg-white/20'></div>
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

      <div className='flex items-center gap-3'>
        {isHomePage && isMounted && (
          <button
            onClick={handleToggleNotificationPanel}
            data-notification-trigger='true'
            className='flex items-center gap-2 text-white/60 hover:text-white transition-colors group relative'
          >
            <span className='text-sm font-medium'>{currentTime}</span>
            <BellIcon className='h-5 w-5' />
            {/* Cogno Icon (Star/Comet) */}
            <div className='relative'>
              {/* <div className='w-2 h-2 bg-white rounded-full'></div>
              <div className='absolute top-1/2 left-0 w-6 h-0.5 bg-gradient-to-r from-white/50 via-white/20 to-transparent transform -translate-y-1/2'></div> */}
              {/* Unread Badge */}
              {unreadCount > 0 && (
                <span className='absolute -top-3 right-0 h-2 w-2 rounded-full bg-red-500 border border-black/50' />
              )}
            </div>
          </button>
        )}
        {isMounted && <UserMenu user={user} />}
      </div>
    </header>
  );
}
