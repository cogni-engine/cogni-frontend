import useSWR from 'swr';
import { JobStatusSummary, FailedJob, DateRange } from '@/types/pipeline';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error((await res.json()).error ?? res.statusText);
  return res.json();
};

interface JobsData {
  summary: JobStatusSummary[];
  failedJobs: FailedJob[];
}

export function usePipelineJobs(range: DateRange) {
  const { data, error, isLoading, mutate } = useSWR<JobsData>(
    `/api/pipeline/jobs?from=${range.from}&to=${range.to}`,
    fetcher,
    { refreshInterval: 30_000 }
  );

  return {
    summary: data?.summary ?? [],
    failedJobs: data?.failedJobs ?? [],
    error,
    isLoading,
    refresh: mutate,
  };
}
