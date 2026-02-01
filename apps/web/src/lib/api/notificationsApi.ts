import { createClient } from '@/lib/supabase/browserClient';
import type {
  NotificationReactionStatus,
  WorkspaceActivity,
} from '@/types/notification';

const supabase = createClient();

// API base URL with fallback (same pattern as onboardingApi.ts)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Count unread notifications (scheduled and past due date)
 */
export async function getUnreadNotificationCount(
  userId: string
): Promise<number> {
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from('ai_notifications')
    .select('id')
    .eq('user_id', userId)
    .eq('status', 'scheduled')
    .lt('due_date', now);

  if (error) throw error;
  return data?.length || 0;
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

  // 2. Get notifications with JOIN to workspace_member, user_profile and agent_profile
  const { data, error } = await supabase
    .from('ai_notifications')
    .select(
      `
      *,
      workspace_member:workspace_member_id(
        id,
        user_id,
        agent_id,
        user_profile:user_id(name, avatar_url),
        agent_profile:agent_id(name, avatar_url)
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
      user_id: string | null;
      agent_id: string | null;
      user_profile?: {
        name: string;
        avatar_url?: string;
      } | null;
      agent_profile?: {
        name: string;
        avatar_url?: string;
      } | null;
    };
  };

  return (data || []).map((item: NotificationWithMember) => {
    // Prefer agent_profile for agents (Mike, Lisa), fall back to user_profile
    const memberName =
      item.workspace_member?.agent_profile?.name ||
      item.workspace_member?.user_profile?.name ||
      'Unknown';
    const memberAvatarUrl =
      item.workspace_member?.agent_profile?.avatar_url ||
      item.workspace_member?.user_profile?.avatar_url;

    return {
      id: item.id,
      title: item.title,
      body: item.body,
      ai_context: item.ai_context,
      reaction_status: item.reaction_status as NotificationReactionStatus,
      reaction_text: item.reaction_text,
      member_name: memberName,
      member_avatar_url: memberAvatarUrl,
      updated_at: item.updated_at,
      due_date: item.due_date,
      created_at: item.created_at,
    };
  });
}

/**
 * Generate tutorial task and notification from onboarding note
 * Uses the same pattern as generateFirstNote in onboardingApi.ts
 */
export async function createTutorialNotification(
  onboardingSessionId: string,
  userId: string,
  locale: string
): Promise<{ taskId: number; notificationId: number }> {
  console.log('[API] createTutorialNotification - Request:', {
    onboardingSessionId,
    userId,
    locale,
    url: `${API_BASE_URL}/api/onboarding/generate-tutorial-notification`,
  });

  const response = await fetch(
    `${API_BASE_URL}/api/onboarding/generate-tutorial-notification`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        onboarding_session_id: onboardingSessionId,
        user_id: userId,
        locale: locale,
      }),
      signal: AbortSignal.timeout(30000), // 30 second timeout (same as generateFirstNote)
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error('[API] createTutorialNotification - Error:', {
      status: response.status,
      statusText: response.statusText,
      body: errorText,
    });
    // Same error format as onboardingApi.ts
    throw new Error(
      `Failed to create tutorial notification: ${response.status} ${errorText}`
    );
  }

  const data = await response.json();

  // Response contains arrays (tasks[], notifications[])
  const tasks = data.tasks || [];
  const notifications = data.notifications || [];

  console.log('[API] createTutorialNotification - Success:', {
    taskIds: tasks.map((t: { id: number }) => t.id),
    notificationIds: notifications.map((n: { id: number }) => n.id),
  });

  // Return first items for backwards compatibility
  return {
    taskId: tasks[0]?.id,
    notificationId: notifications[0]?.id,
  };
}
