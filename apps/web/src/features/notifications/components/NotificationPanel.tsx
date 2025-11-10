'use client';

import { useEffect, useState, useRef } from 'react';
import { useUI } from '@/contexts/UIContext';
import { useThreadContext } from '@/contexts/ThreadContext';
import { createClient } from '@/lib/supabase/browserClient';
import {
  getPastDueNotifications,
  markMultipleNotificationsAsSent,
  updateNotificationStatus,
} from '@/lib/api/notificationsApi';
import type { Notification, NotificationStatus } from '@/types/notification';

// propsでsendMessageを受け取る
type NotificationPanelProps = {
  sendMessage: (content: string, notificationId?: number) => Promise<void>;
};

export default function NotificationPanel({
  sendMessage,
}: NotificationPanelProps) {
  const { isNotificationPanelOpen, closeNotificationPanel } = useUI();
  const { selectedThreadId } = useThreadContext();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

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
      const uniqueByTask = dedupeByTask(fetchedNotifications);
      setNotifications(uniqueByTask);

      // Mark scheduled notifications as sent
      const scheduledIds = uniqueByTask
        .filter(
          n => n.status === 'scheduled' && new Date(n.due_date) < new Date()
        )
        .map(n => n.id);

      if (scheduledIds.length > 0) {
        const updatedNotifications =
          await markMultipleNotificationsAsSent(scheduledIds);
        setNotifications(prev => {
          const merged = prev.map(notification => {
            const updated = updatedNotifications.find(
              u => u.id === notification.id
            );
            return updated || notification;
          });
          return dedupeByTask(merged);
        });
      }
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
    } catch (error) {
      console.error('Failed to trigger notification:', error);
    }
  };

  function dedupeByTask(notifications: Notification[]): Notification[] {
    const lookup = notifications.reduce<Record<number, Notification>>(
      (acc, notification) => {
        const existing = acc[notification.task_id];
        if (!existing) {
          acc[notification.task_id] = notification;
          return acc;
        }

        const existingTime = new Date(existing.due_date).getTime();
        const currentTime = new Date(notification.due_date).getTime();

        if (currentTime >= existingTime) {
          acc[notification.task_id] = notification;
        }

        return acc;
      },
      {}
    );

    return Object.values(lookup);
  }
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
              <div
                key={notification.id}
                className='p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 cursor-pointer'
                onClick={() => handleNotificationClick(notification.id)}
              >
                <div className='flex items-start justify-between gap-2'>
                  <h4 className='text-sm text-white/90 font-medium flex-1 line-clamp-2'>
                    {notification.title}
                  </h4>
                  {notification.status === 'scheduled' && (
                    <span className='text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 whitespace-nowrap'>
                      NEW
                    </span>
                  )}
                </div>
                <div className='text-[11px] text-white/40 mt-1'>
                  {formatDate(notification.due_date)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
