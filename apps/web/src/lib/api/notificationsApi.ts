import { createClient } from '@/lib/supabase/browserClient';
import type { Notification, NotificationStatus } from '@/types/notification';

const supabase = createClient();

/**
 * Get all notifications for a specific user
 */
export async function getNotifications(
  userId: string
): Promise<Notification[]> {
  const { data, error } = await supabase
    .from('ai_notifications')
    .select('*')
    .eq('user_id', userId)
    .order('due_date', { ascending: true });

  if (error) throw error;
  return data || [];
}

/**
 * Get scheduled notifications that are past their due date
 */
export async function getScheduledNotifications(
  userId: string
): Promise<Notification[]> {
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from('ai_notifications')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'scheduled')
    .lt('due_date', now)
    .order('due_date', { ascending: true });

  if (error) throw error;
  return data || [];
}

/**
 * Get past due notifications (scheduled or sent) for notification center
 * This includes both new notifications and ones that have already been viewed
 */
export async function getPastDueNotifications(
  userId: string
): Promise<Notification[]> {
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from('ai_notifications')
    .select('*')
    .eq('user_id', userId)
    .in('status', ['scheduled', 'sent'])
    .lt('due_date', now)
    .order('due_date', { ascending: false });

  if (error) throw error;
  if (!data) return [];

  const latestByTask = data.reduce<Map<number, Notification>>(
    (acc, notification) => {
      if (!acc.has(notification.task_id)) {
        acc.set(notification.task_id, notification);
      }
      return acc;
    },
    new Map()
  );

  return Array.from(latestByTask.values()).sort(
    (a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
  );
}

/**
 * Get a single notification by ID
 */
export async function getNotification(
  id: number
): Promise<Notification | null> {
  const { data, error } = await supabase
    .from('ai_notifications')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Not found
      return null;
    }
    throw error;
  }

  return data;
}

/**
 * Mark a notification as sent
 */
export async function markNotificationAsSent(
  id: number
): Promise<Notification> {
  const { data, error } = await supabase
    .from('ai_notifications')
    .update({
      status: 'sent' as NotificationStatus,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Mark multiple notifications as sent
 */
export async function markMultipleNotificationsAsSent(
  ids: number[]
): Promise<Notification[]> {
  if (ids.length === 0) return [];

  const { data, error } = await supabase
    .from('ai_notifications')
    .update({
      status: 'sent' as NotificationStatus,
      updated_at: new Date().toISOString(),
    })
    .in('id', ids)
    .select();

  if (error) throw error;
  return data || [];
}

/**
 * Update notification status
 */
export async function updateNotificationStatus(
  id: number,
  status: NotificationStatus
): Promise<Notification> {
  const { data, error } = await supabase
    .from('ai_notifications')
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function resolveNotificationsByTask(
  userId: string,
  taskId: number
): Promise<void> {
  const { error } = await supabase
    .from('ai_notifications')
    .update({
      status: 'resolved' as NotificationStatus,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', userId)
    .eq('task_id', taskId);

  if (error) throw error;
}

/**
 * Count unread notifications (scheduled and past due date)
 */
export async function getUnreadNotificationCount(
  userId: string
): Promise<number> {
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from('ai_notifications')
    .select('task_id, status, due_date')
    .eq('user_id', userId)
    .in('status', ['scheduled', 'sent'])
    .lt('due_date', now)
    .order('due_date', { ascending: false });

  if (error) throw error;
  if (!data) return 0;

  const latestByTask = data.reduce<Map<number, NotificationStatus>>(
    (acc, notification) => {
      if (!acc.has(notification.task_id)) {
        acc.set(
          notification.task_id,
          notification.status as NotificationStatus
        );
      }
      return acc;
    },
    new Map()
  );

  return Array.from(latestByTask.values()).filter(
    status => status === 'scheduled'
  ).length;
}

/**
 * Delete a notification
 */
export async function deleteNotification(id: number): Promise<void> {
  const { error } = await supabase
    .from('ai_notifications')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
