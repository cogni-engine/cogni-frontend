'use client';

import { useState, useCallback } from 'react';
import {
  getNotifications,
  getScheduledNotifications,
  getPastDueNotifications,
  markNotificationAsSent,
  markMultipleNotificationsAsSent,
  updateNotificationStatus,
  deleteNotification,
  getUnreadNotificationCount,
} from '@/lib/api/notificationsApi';
import type { Notification, NotificationStatus } from '@/types/notification';

/**
 * Check if a notification is past its due date
 */
function isPastDue(dueDate: string): boolean {
  return new Date(dueDate) < new Date();
}

export function useNotifications(userId?: string) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch all notifications for the user
   */
  const fetchNotifications = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getNotifications(userId);
      setNotifications(data);
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
      setError(
        err instanceof Error ? err.message : 'Failed to fetch notifications'
      );
    } finally {
      setLoading(false);
    }
  }, [userId]);

  /**
   * Fetch scheduled notifications that are past their due date
   */
  const fetchScheduledNotifications = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getScheduledNotifications(userId);
      setNotifications(data);
    } catch (err) {
      console.error('Failed to fetch scheduled notifications:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to fetch scheduled notifications'
      );
    } finally {
      setLoading(false);
    }
  }, [userId]);

  /**
   * Fetch past due notifications (scheduled or sent) for notification center
   */
  const fetchPastDueNotifications = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getPastDueNotifications(userId);
      setNotifications(data);
    } catch (err) {
      console.error('Failed to fetch past due notifications:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to fetch past due notifications'
      );
    } finally {
      setLoading(false);
    }
  }, [userId]);

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

  /**
   * Mark a notification as sent
   */
  const markAsSent = useCallback(
    async (id: number) => {
      try {
        const updated = await markNotificationAsSent(id);
        setNotifications(prev => prev.map(n => (n.id === id ? updated : n)));
        await fetchUnreadCount();
      } catch (err) {
        console.error('Failed to mark notification as sent:', err);
        throw err;
      }
    },
    [fetchUnreadCount]
  );

  /**
   * Mark multiple notifications as sent
   */
  const markMultipleAsSent = useCallback(
    async (ids: number[]) => {
      if (ids.length === 0) return;

      try {
        const updated = await markMultipleNotificationsAsSent(ids);
        const updatedMap = new Map(updated.map(n => [n.id, n]));

        setNotifications(prev => prev.map(n => updatedMap.get(n.id) || n));
        await fetchUnreadCount();
      } catch (err) {
        console.error('Failed to mark notifications as sent:', err);
        throw err;
      }
    },
    [fetchUnreadCount]
  );

  /**
   * Mark all scheduled past-due notifications as sent
   */
  const markAllScheduledAsSent = useCallback(async () => {
    const scheduledIds = notifications
      .filter(n => n.status === 'scheduled' && isPastDue(n.due_date))
      .map(n => n.id);

    if (scheduledIds.length > 0) {
      await markMultipleAsSent(scheduledIds);
    }
  }, [notifications, markMultipleAsSent]);

  /**
   * Update notification status
   */
  const updateStatus = useCallback(
    async (id: number, status: NotificationStatus) => {
      try {
        const updated = await updateNotificationStatus(id, status);
        setNotifications(prev => prev.map(n => (n.id === id ? updated : n)));
        await fetchUnreadCount();
      } catch (err) {
        console.error('Failed to update notification status:', err);
        throw err;
      }
    },
    [fetchUnreadCount]
  );

  /**
   * Delete a notification
   */
  const deleteNotif = useCallback(
    async (id: number) => {
      try {
        await deleteNotification(id);
        setNotifications(prev => prev.filter(n => n.id !== id));
        await fetchUnreadCount();
      } catch (err) {
        console.error('Failed to delete notification:', err);
        throw err;
      }
    },
    [fetchUnreadCount]
  );

  /**
   * Initial fetch on mount - REMOVED to prevent infinite loops
   * Each page/component should explicitly call fetch functions as needed
   */
  // useEffect(() => {
  //   if (userId) {
  //     fetchNotifications();
  //     fetchUnreadCount();
  //   }
  // }, [userId, fetchNotifications, fetchUnreadCount]);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    fetchNotifications,
    fetchScheduledNotifications,
    fetchPastDueNotifications,
    fetchUnreadCount,
    markAsSent,
    markMultipleAsSent,
    markAllScheduledAsSent,
    updateStatus,
    deleteNotif,
    isPastDue,
  };
}
