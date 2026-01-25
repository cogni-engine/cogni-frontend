'use client';

import { useState, useCallback } from 'react';
import { getUnreadNotificationCount } from '@/lib/api/notificationsApi';
import {
  getPastDueNotifications,
  type AINotification,
} from '@/features/notifications/api/aiNotificationsApi';

/**
 * Hook for managing notifications
 * Currently used only in Header component
 */
export function useNotifications(userId?: string) {
  const [notifications, setNotifications] = useState<AINotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  /**
   * Fetch past due notifications using new SQLAlchemy-based endpoint
   * Includes task_result data and intelligent deduplication
   */
  const fetchPastDueNotifications = useCallback(async () => {
    try {
      // Use new backend endpoint (no userId needed - uses JWT)
      const data = await getPastDueNotifications();
      console.log('[useNotifications] Fetched notifications:', {
        count: data.length,
        ids: data.map(n => n.id),
        hasTaskResult: data.map(n => ({ id: n.id, hasResult: !!n.task_result })),
      });
      setNotifications(data);
    } catch (err) {
      console.error('Failed to fetch past due notifications:', err);
    }
  }, []); // No userId dependency - JWT handles auth

  /**
   * Fetch unread notification count
   */
  const fetchUnreadCount = useCallback(async () => {
    if (!userId) return;

    try {
      const count = await getUnreadNotificationCount(userId);
      setUnreadCount(count);
    } catch (err) {
      console.error('Failed to fetch unread count:', err);
    }
  }, [userId]);

  return {
    notifications,
    unreadCount,
    fetchPastDueNotifications,
    fetchUnreadCount,
  };
}
