import { createClient } from '@/lib/supabase/browserClient';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://0.0.0.0:8000';

const supabase = createClient();

export interface TaskResult {
  id: number;
  task_id: number;
  result_title: string;
  result_text: string;
  executed_at: string;
  created_at: string;
}

export interface AINotification {
  id: number;
  title: string;
  ai_context: string;
  body: string | null;
  due_date: string;
  task_id: number;
  task_result_id: number | null;
  user_id: string;
  workspace_member_id: number | null;
  status: 'scheduled' | 'sent' | 'resolved';
  reaction_status: 'None' | 'completed' | 'postponed' | 'dismissed';
  reaction_text: string | null;
  created_at: string;
  updated_at: string;
  task_result: TaskResult | null;
}

export interface CompleteNotificationResponse {
  completed_notification_id: number;
  resolved_notification_ids: number[];
  message: string;
}

export interface PostponeNotificationResponse {
  postponed_notification_id: number;
  resolved_notification_ids: number[];
  message: string;
}

export interface ReactedAINotification {
  id: number;
  title: string;
  ai_context: string;
  body: string | null;
  due_date: string;
  task_id: number;
  user_id: string;
  workspace_member_id: number | null;
  status: 'scheduled' | 'sent' | 'resolved';
  reaction_status: 'None' | 'completed' | 'postponed' | 'dismissed';
  reaction_text: string | null;
  created_at: string;
  updated_at: string;
  note: {
    id: number;
    title: string | null;
  } | null;
  user: {
    id: string;
    name: string | null;
    avatar_url: string | null;
  } | null;
  task_result: TaskResult | null;
}

/**
 * Get all past due notifications for the current authenticated user
 */
export async function getPastDueNotifications(): Promise<AINotification[]> {
  // Get the current session to access the JWT token
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('Not authenticated');
  }

  const response = await fetch(
    `${API_BASE_URL}/api/ai-notifications/past-due`,
    {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to fetch past due notifications: ${response.status} - ${errorText}`
    );
  }

  const data = await response.json();
  return data;
}

/**
 * Complete a notification and resolve all previous notifications from the same task
 */
export async function completeNotification(
  notificationId: number
): Promise<CompleteNotificationResponse> {
  // Get the current session to access the JWT token
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('Not authenticated');
  }

  const response = await fetch(
    `${API_BASE_URL}/api/ai-notifications/${notificationId}/complete`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to complete notification: ${response.status} - ${errorText}`
    );
  }

  const data = await response.json();
  return data;
}

/**
 * Postpone a notification with user's reaction text and resolve all previous notifications from the same task
 */
export async function postponeNotification(
  notificationId: number,
  reactionText: string
): Promise<PostponeNotificationResponse> {
  // Get the current session to access the JWT token
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('Not authenticated');
  }

  const response = await fetch(
    `${API_BASE_URL}/api/ai-notifications/${notificationId}/postpone`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reaction_text: reactionText,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to postpone notification: ${response.status} - ${errorText}`
    );
  }

  const data = await response.json();
  return data;
}

/**
 * Get all reacted notifications for a workspace
 * Returns notifications with note and user information
 */
export async function getReactedNotificationsByWorkspace(
  workspaceId: number,
  workspaceMemberIds?: number[]
): Promise<ReactedAINotification[]> {
  // Get the current session to access the JWT token
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('Not authenticated');
  }

  // Build query params
  const queryParams = new URLSearchParams();
  if (workspaceMemberIds && workspaceMemberIds.length > 0) {
    workspaceMemberIds.forEach(id =>
      queryParams.append('workspace_member_ids', id.toString())
    );
  }

  const url = `${API_BASE_URL}/api/ai-notifications/workspace/${workspaceId}/reacted${queryParams.toString() ? '?' + queryParams.toString() : ''}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to fetch reacted notifications: ${response.status} - ${errorText}`
    );
  }

  const data = await response.json();
  return data;
}
