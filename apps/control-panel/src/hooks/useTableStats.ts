import useSWR from 'swr';
import { TableInfo } from '@/types/database';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error((await res.json()).error ?? res.statusText);
  return res.json();
};

export function useTableStats() {
  const { data, error, isLoading, mutate } = useSWR<TableInfo[]>(
    '/api/tables',
    fetcher,
    { refreshInterval: 10_000 }
  );

  return {
    tables: data ?? [],
    error,
    isLoading,
    refresh: mutate,
  };
}
