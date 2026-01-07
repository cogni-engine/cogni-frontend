import { createClient } from '@/lib/supabase/browserClient';
import type {
  Notification,
  NotificationStatus,
  NotificationReactionStatus,
  WorkspaceActivity,
} from '@/types/notification';

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

/**
 * Update notification reaction (complete or postpone)
 * Also marks the notification as resolved
 */
export async function updateNotificationReaction(
  id: number,
  reactionStatus: 'completed' | 'postponed',
  reactionText: string | null = null
): Promise<Notification> {
  const { data, error } = await supabase
    .from('ai_notifications')
    .update({
      reaction_status: reactionStatus as NotificationReactionStatus,
      reaction_text: reactionText,
      status: 'resolved' as NotificationStatus,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get workspace activity notifications
 * Fetches notification reactions from all workspace members using Supabase
 */
export async function getWorkspaceActivityNotifications(
  workspaceId: number
): Promise<WorkspaceActivity[]> {
  // 1. Get workspace member IDs
  const { data: members, error: memberError } = await supabase
    .from('workspace_member')
    .select('id')
    .eq('workspace_id', workspaceId);

  if (memberError) throw memberError;
  if (!members || members.length === 0) return [];

  const memberIds = members.map(m => m.id);

  // 2. Get notifications with JOIN to workspace_member and user_profile
  const { data, error } = await supabase
    .from('ai_notifications')
    .select(
      `
      *,
      workspace_member:workspace_member_id(
        id,
        user_id,
        user_profile:user_id(name, avatar_url)
      )
    `
    )
    .in('workspace_member_id', memberIds)
    .neq('reaction_status', 'None')
    .order('updated_at', { ascending: false });

  if (error) throw error;

  // 3. Transform to WorkspaceActivity type
  type NotificationWithMember = {
    id: number;
    title: string;
    body?: string;
    ai_context: string;
    reaction_status: string;
    reaction_text: string | null;
    updated_at: string;
    due_date: string;
    created_at: string;
    workspace_member?: {
      id: number;
      user_id: string;
      user_profile?: {
        name: string;
        avatar_url?: string;
      };
    };
  };

  return (data || []).map((item: NotificationWithMember) => ({
    id: item.id,
    title: item.title,
    body: item.body,
    ai_context: item.ai_context,
    reaction_status: item.reaction_status as NotificationReactionStatus,
    reaction_text: item.reaction_text,
    member_name: item.workspace_member?.user_profile?.name || 'Unknown',
    member_avatar_url: item.workspace_member?.user_profile?.avatar_url,
    updated_at: item.updated_at,
    due_date: item.due_date,
    created_at: item.created_at,
  }));
}
