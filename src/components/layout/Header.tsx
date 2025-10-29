'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useThreads } from '@/hooks/useThreads';
import { useThreadContext } from '@/contexts/ThreadContext';
import { useNotifications } from '@/hooks/useNotifications';
import { useUI } from '@/contexts/UIContext';
import { createClient } from '@/lib/supabase/browserClient';

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === '/home';
  const { createThread } = useThreads();
  const { setSelectedThreadId } = useThreadContext();
  const { toggleThreadSidebar, toggleNotificationPanel } = useUI();
  const [userId, setUserId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Get notifications hook
  const { unreadCount, fetchUnreadCount } = useNotifications(
    userId || undefined
  );

  // Initialize on mount: set mounted flag and get userId
  useEffect(() => {
    setIsMounted(true);

    const getUserId = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };
    getUserId();
  }, []);

  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      });
      setCurrentTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Poll for unread notifications every 30 seconds
  useEffect(() => {
    if (!userId) return;

    fetchUnreadCount();
    const interval = setInterval(() => {
      fetchUnreadCount();
    }, 30000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

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

  return (
    <header className='flex items-center justify-between px-4 md:px-6 py-3 border-b border-white/10 bg-white/3 backdrop-blur-lg relative z-50'>
      {/* Left Side - Thread Controls + Logo */}
      <div className='flex items-center gap-4'>
        {isHomePage && isMounted && (
          <div className='flex items-center gap-2'>
            {/* Thread Sidebar Toggle */}
            <button
              onClick={toggleThreadSidebar}
              className='flex items-center gap-1.5 text-white/60 hover:text-white transition-colors group'
              title='Threads'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='w-5 h-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                />
              </svg>
            </button>

            {/* New Thread Button */}
            <button
              onClick={handleCreateThread}
              className='flex items-center gap-2 text-white/60 hover:text-white transition-colors group'
              title='New Thread'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='w-5 h-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                />
              </svg>
            </button>

            {/* Divider */}
            <div className='w-px h-5 bg-white/20'></div>
          </div>
        )}

        {/* Logo */}
        <h1 className='text-lg font-semibold text-white'>Cogno</h1>
      </div>

      {/* Right Side - Time + Notification Icon */}
      {isHomePage && isMounted && (
        <button
          onClick={toggleNotificationPanel}
          data-notification-trigger='true'
          className='flex items-center gap-2 text-white/60 hover:text-white transition-colors group relative'
        >
          <span className='text-sm font-medium'>{currentTime}</span>

          {/* Cogno Icon (Star/Comet) */}
          <div className='relative'>
            <div className='w-2 h-2 bg-white rounded-full'></div>
            <div className='absolute top-1/2 left-0 w-6 h-0.5 bg-gradient-to-r from-white/50 via-white/20 to-transparent transform -translate-y-1/2'></div>

            {/* Unread Badge */}
            {unreadCount > 0 && (
              <span className='absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold rounded-full min-w-[14px] h-[14px] flex items-center justify-center px-0.5 border border-black/50'>
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </div>
        </button>
      )}
    </header>
  );
}
