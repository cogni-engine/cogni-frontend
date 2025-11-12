'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useDrag } from '@use-gesture/react';
import { X as XIcon } from 'lucide-react';
import { useHomeUI } from '@/contexts/HomeUIContext';
import { useThreadContext } from '@/contexts/ThreadContext';
import { createClient } from '@/lib/supabase/browserClient';
import {
  getPastDueNotifications,
  markMultipleNotificationsAsSent,
  updateNotificationStatus,
  resolveNotificationsByTask,
} from '@/lib/api/notificationsApi';
import type { Notification, NotificationStatus } from '@/types/notification';
import { dispatchHeaderEvent, HEADER_EVENTS } from '@/lib/headerEvents';

// propsでsendMessageを受け取る
type NotificationPanelProps = {
  sendMessage: (content: string, notificationId?: number) => Promise<void>;
};

export default function NotificationPanel({
  sendMessage,
}: NotificationPanelProps) {
  const { isNotificationPanelOpen, closeNotificationPanel } = useHomeUI();
  const { selectedThreadId } = useThreadContext();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const scheduledIdsRef = useRef<number[]>([]);

  const refreshScheduledIds = useCallback((items: Notification[]) => {
    scheduledIdsRef.current = items
      .filter(
        n => n.status === 'scheduled' && new Date(n.due_date) < new Date()
      )
      .map(n => n.id);
  }, []);

  // Get userId
  useEffect(() => {
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

  // Load notifications when panel opens
  useEffect(() => {
    if (isNotificationPanelOpen && userId) {
      loadNotifications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNotificationPanelOpen, userId]);

  const markScheduledAsSent = useCallback(async () => {
    const ids = scheduledIdsRef.current;
    scheduledIdsRef.current = [];
    if (ids.length === 0) return;

    try {
      await markMultipleNotificationsAsSent(ids);
      setNotifications(prev => {
        const next = prev.map(notification =>
          ids.includes(notification.id)
            ? { ...notification, status: 'sent' as NotificationStatus }
            : notification
        );
        refreshScheduledIds(next);
        return next;
      });
      dispatchHeaderEvent(HEADER_EVENTS.REFRESH_NOTIFICATION_COUNT);
    } catch (error) {
      console.error('Failed to mark notifications as sent:', error);
    }
  }, [refreshScheduledIds]);

  useEffect(() => {
    if (!isNotificationPanelOpen) {
      void markScheduledAsSent();
    }
  }, [isNotificationPanelOpen, markScheduledAsSent]);

  // Handle click outside
  useEffect(() => {
    if (!isNotificationPanelOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Ignore clicks on the notification trigger button
      if (target.closest('[data-notification-trigger="true"]')) {
        return;
      }

      // Close if clicked outside the panel
      if (panelRef.current && !panelRef.current.contains(target)) {
        closeNotificationPanel();
      }
    };

    // Add slight delay to prevent immediate closing
    setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNotificationPanelOpen, closeNotificationPanel]);

  const loadNotifications = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const fetchedNotifications = await getPastDueNotifications(userId);
      setNotifications(fetchedNotifications);
      refreshScheduledIds(fetchedNotifications);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const handleNotificationClick = async (notificationId: number) => {
    if (!selectedThreadId) {
      console.error('No thread selected');
      return;
    }

    try {
      // 1. パネルを即座に閉じる
      closeNotificationPanel();

      // 2. HomePageのsendMessageを使って通知メッセージを送信（同じインスタンス）
      await sendMessage('', notificationId);

      // 3. 通知をresolvedに更新
      await updateNotificationStatus(
        notificationId,
        'resolved' as NotificationStatus
      );
      setNotifications(prev => {
        const next = prev.filter(notification => notification.id !== notificationId);
        refreshScheduledIds(next);
        return next;
      });
      dispatchHeaderEvent(HEADER_EVENTS.REFRESH_NOTIFICATION_COUNT);
    } catch (error) {
      console.error('Failed to trigger notification:', error);
    }
  };

  const handleDismissNotification = useCallback(
    async (notification: Notification) => {
      if (!userId) return;
      try {
        await resolveNotificationsByTask(userId, notification.task_id);
        setNotifications(prev => {
          const next = prev.filter(n => n.task_id !== notification.task_id);
          refreshScheduledIds(next);
          return next;
        });
        dispatchHeaderEvent(HEADER_EVENTS.REFRESH_NOTIFICATION_COUNT);
      } catch (error) {
        console.error('Failed to dismiss notification:', error);
      }
    },
    [refreshScheduledIds, userId]
  );

  return (
    <div
      ref={panelRef}
      className={`fixed right-4 w-94 max-h-100 bg-black/30 backdrop-blur-sm border border-black/10 rounded-2xl shadow-2xl transition-all duration-300 ease-in-out z-50 ${
        isNotificationPanelOpen
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      {/* Content */}
      <div className='overflow-y-auto max-h-100 p-3'>
        {loading ? (
          <div className='flex justify-center items-center py-8'>
            <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-black'></div>
          </div>
        ) : notifications.length === 0 ? (
          <div className='text-center py-8'>
            <div className='text-white/40 text-sm mb-2'>通知はありません</div>
            <div className='text-white/30 text-xs'>
              新しい通知があるとここに表示されます
            </div>
          </div>
        ) : (
           <div className='space-y-2'>
            {notifications.map(notification => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                isScheduled={notification.status === 'scheduled'}
                formatDate={formatDate}
                onOpen={() => handleNotificationClick(notification.id)}
                onDismiss={() => handleDismissNotification(notification)}
              />
            ))}
           </div>
         )}
       </div>
     </div>
   );
 }

type NotificationItemProps = {
  notification: Notification;
  isScheduled: boolean;
  formatDate: (value: string) => string;
  onOpen: () => void;
  onDismiss: () => void;
};

const CLEAR_REVEAL_DISTANCE = 24;
const CLEAR_ACTIVATE_DISTANCE = 96;

function NotificationItem({
  notification,
  isScheduled,
  formatDate,
  onOpen,
  onDismiss,
}: NotificationItemProps) {
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [showClear, setShowClear] = useState(false);

  const dismiss = useCallback(() => {
    setSwipeOffset(0);
    setShowClear(false);
    onDismiss();
  }, [onDismiss]);

  const bind = useDrag(
    ({ movement: [movementX = 0], last, tap }) => {
      const clampedMovement = Math.min(movementX, 0);
      const distance = Math.abs(clampedMovement);

      if (last) {
        if (distance >= CLEAR_ACTIVATE_DISTANCE) {
          dismiss();
          return;
        }

        if (distance >= CLEAR_REVEAL_DISTANCE) {
          setSwipeOffset(-72);
          setShowClear(true);
        } else {
          setSwipeOffset(0);
          setShowClear(false);
          if (tap) {
            onOpen();
          }
        }

        return;
      }

      setSwipeOffset(Math.max(clampedMovement, -120));
      setShowClear(distance > CLEAR_REVEAL_DISTANCE);
    },
    { axis: 'x', filterTaps: true, threshold: 5 }
  );

  return (
    <div className='relative touch-pan-y select-none'>
      <div
        className={`absolute inset-y-0 right-0 flex items-center pr-3 transition-opacity duration-200 ${
          showClear ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          type='button'
          onClick={event => {
            event.stopPropagation();
            dismiss();
          }}
          className='rounded-2xl bg-white/10 px-4 py-2 text-xs font-medium text-white/80 shadow-[0_8px_16px_rgba(0,0,0,0.25)]'
        >
          Clear
        </button>
      </div>
      <div
        {...bind()}
        className={`relative group p-3 rounded-2xl transition-colors border cursor-pointer ${
          isScheduled
            ? 'bg-white/10 border-white/25 shadow-[0_0_16px_rgba(255,255,255,0.12)] hover:bg-white/12'
            : 'bg-white/5 border-white/5 hover:bg-white/7'
        }`}
        style={{
          transform: `translateX(${swipeOffset}px)`,
          touchAction: 'pan-y',
        }}
        onClick={() => {
          if (!showClear && swipeOffset === 0) {
            onOpen();
          }
        }}
      >
        <button
          type='button'
          onClick={event => {
            event.stopPropagation();
            dismiss();
          }}
          className='absolute -top-1 -left-3 flex h-5 w-5 items-center justify-center rounded-full border border-white/10 bg-white/20 text-white/70 opacity-0 transition-opacity duration-150 group-hover:opacity-100 focus-visible:opacity-100'
          aria-label='Dismiss notification'
        >
          <XIcon className='h-3.5 w-3.5' strokeWidth={2.5} />
        </button>
        <h4 className='text-sm text-white/90 font-medium line-clamp-2 pr-6'>
          {notification.title}
        </h4>
        <div className='text-[11px] text-white/40 mt-1'>
          {formatDate(notification.due_date)}
        </div>
      </div>
    </div>
  );
}
