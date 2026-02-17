import useSWR from 'swr';
import { TableDetail } from '@/types/database';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error((await res.json()).error ?? res.statusText);
  return res.json();
};

export function useTableDetail(tableName: string | null) {
  const { data, error, isLoading, mutate } = useSWR<TableDetail>(
    tableName ? `/api/tables/${tableName}` : null,
    fetcher,
    { refreshInterval: 10_000 }
  );

  return {
    detail: data ?? null,
    error,
    isLoading,
    refresh: mutate,
  };
}
