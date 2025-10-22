import { createClient } from '@/lib/supabase/browserClient';
import type { Notification, NotificationStatus } from '@/types/notification';

const supabase = createClient();

/**
 * Get all notifications for a specific user
 */
export async function getNotifications(userId: string): Promise<Notification[]> {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('due_date', { ascending: true });

  if (error) throw error;
  return data || [];
}

/**
 * Get scheduled notifications that are past their due date
 */
export async function getScheduledNotifications(userId: string): Promise<Notification[]> {
  const now = new Date().toISOString();
  
  const { data, error } = await supabase
    .from('notifications')
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
export async function getPastDueNotifications(userId: string): Promise<Notification[]> {
  const now = new Date().toISOString();
  
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .in('status', ['scheduled', 'sent'])
    .lt('due_date', now)
    .order('due_date', { ascending: true });

  if (error) throw error;
  return data || [];
}

/**
 * Get a single notification by ID
 */
export async function getNotification(id: number): Promise<Notification | null> {
  const { data, error } = await supabase
    .from('notifications')
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
export async function markNotificationAsSent(id: number): Promise<Notification> {
  const { data, error } = await supabase
    .from('notifications')
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
export async function markMultipleNotificationsAsSent(ids: number[]): Promise<Notification[]> {
  if (ids.length === 0) return [];

  const { data, error } = await supabase
    .from('notifications')
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
    .from('notifications')
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

/**
 * Delete a notification
 */
export async function deleteNotification(id: number): Promise<void> {
  const { error } = await supabase
    .from('notifications')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

/**
 * Count unread notifications (scheduled and past due date)
 */
export async function getUnreadNotificationCount(userId: string): Promise<number> {
  const now = new Date().toISOString();
  
  const { count, error } = await supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('status', 'scheduled')
    .lt('due_date', now);

  if (error) throw error;
  return count || 0;
}

/**
 * Trigger notification - generates AI conversation response and marks as resolved
 */
export async function triggerNotification(notificationId: number, threadId: number): Promise<void> {
  const response = await fetch('http://0.0.0.0:8000/api/cogno/notification/trigger', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      notification_id: notificationId,
      thread_id: threadId,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to trigger notification');
  }
}

