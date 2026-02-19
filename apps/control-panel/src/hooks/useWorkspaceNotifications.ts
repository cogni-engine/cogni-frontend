import useSWR from 'swr';
import { NotificationDetail, DateRange } from '@/types/pipeline';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error((await res.json()).error ?? res.statusText);
  return res.json();
};

export function useWorkspaceNotifications(
  workspaceId: number | null,
  range: DateRange
) {
  const { data, error, isLoading, mutate } = useSWR<NotificationDetail[]>(
    workspaceId
      ? `/api/pipeline/notifications?workspace_id=${workspaceId}&from=${range.from}&to=${range.to}`
      : null,
    fetcher,
    { refreshInterval: 30_000 }
  );

  return {
    notifications: data ?? [],
    error,
    isLoading,
    refresh: mutate,
  };
}
