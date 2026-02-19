import useSWR from 'swr';
import {
  WorkspaceFunnelRow,
  PipelineTotals,
  DateRange,
} from '@/types/pipeline';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error((await res.json()).error ?? res.statusText);
  return res.json();
};

interface FunnelData {
  workspaces: WorkspaceFunnelRow[];
  totals: PipelineTotals | null;
}

export function usePipelineFunnel(range: DateRange) {
  const { data, error, isLoading, mutate } = useSWR<FunnelData>(
    `/api/pipeline/funnel?from=${range.from}&to=${range.to}`,
    fetcher,
    { refreshInterval: 30_000 }
  );

  return {
    workspaces: data?.workspaces ?? [],
    totals: data?.totals ?? null,
    error,
    isLoading,
    refresh: mutate,
  };
}
