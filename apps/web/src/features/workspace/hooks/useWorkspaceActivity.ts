'use client';

import { useState, useCallback } from 'react';
import { getReactedNotificationsByWorkspace } from '@/features/notifications/api/aiNotificationsApi';
import type { WorkspaceActivity } from '@/types/notification';
import type { ReactedAINotification } from '@/features/notifications/api/aiNotificationsApi';

export function useWorkspaceActivity(workspaceId?: number) {
  const [activities, setActivities] = useState<WorkspaceActivity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = useCallback(
    async (workspaceMemberIds?: number[]) => {
      if (!workspaceId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        // If no member IDs are provided, pass undefined to show all members
        const data = await getReactedNotificationsByWorkspace(
          workspaceId,
          workspaceMemberIds && workspaceMemberIds.length > 0
            ? workspaceMemberIds
            : undefined
        );

        // Transform ReactedAINotification to WorkspaceActivity
        const transformed: WorkspaceActivity[] = data.map(
          (notification: ReactedAINotification) => ({
            id: notification.id,
            title: notification.title,
            body: notification.body || undefined,
            ai_context: notification.ai_context,
            reaction_status:
              notification.reaction_status as WorkspaceActivity['reaction_status'],
            reaction_text: notification.reaction_text,
            member_name: notification.user?.name || 'Unknown',
            member_avatar_url: notification.user?.avatar_url || undefined,
            updated_at: notification.updated_at,
            due_date: notification.due_date,
            created_at: notification.created_at,
            note_id: notification.note?.id || null,
            note_title: notification.note?.title || null,
            task_result: notification.task_result || null,
          })
        );

        setActivities(transformed);
      } catch (err) {
        console.error('Failed to fetch workspace activities:', err);
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to fetch workspace activities'
        );
      } finally {
        setLoading(false);
      }
    },
    [workspaceId]
  );

  return {
    activities,
    loading,
    error,
    fetchActivities,
  };
}
