'use client';

import { useState, useCallback } from 'react';
import { getWorkspaceActivityNotifications } from '@/lib/api/notificationsApi';
import type { WorkspaceActivity } from '@/types/notification';

export function useWorkspaceActivity(workspaceId?: number) {
  const [activities, setActivities] = useState<WorkspaceActivity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = useCallback(async () => {
    if (!workspaceId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getWorkspaceActivityNotifications(workspaceId);
      setActivities(data);
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
  }, [workspaceId]);

  return {
    activities,
    loading,
    error,
    fetchActivities,
  };
}
