'use client';

import { PipelineTotals } from '@/types/pipeline';

interface PipelineTotalsBarProps {
  totals: PipelineTotals | null;
  isLoading: boolean;
}

interface StatCardProps {
  label: string;
  value: number;
  color?: string;
}

function StatCard({ label, value, color }: StatCardProps) {
  return (
    <div className='rounded-lg border border-border bg-surface p-3'>
      <div className='text-xs text-muted'>{label}</div>
      <div
        className={`mt-1 text-lg font-semibold ${color ?? 'text-foreground'}`}
      >
        {value.toLocaleString()}
      </div>
    </div>
  );
}

export function PipelineTotalsBar({
  totals,
  isLoading,
}: PipelineTotalsBarProps) {
  if (isLoading || !totals) {
    return (
      <div className='grid grid-cols-7 gap-2'>
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className='h-[72px] animate-pulse rounded-lg border border-border bg-surface'
          />
        ))}
      </div>
    );
  }

  return (
    <div className='grid grid-cols-7 gap-2'>
      <StatCard label='Raw Events' value={totals.raw_events} />
      <StatCard label='Semantic Events' value={totals.semantic_events} />
      <StatCard label='Tasks' value={totals.tasks} />
      <StatCard label='Notifications' value={totals.notifications} />
      <StatCard
        label='Jobs OK'
        value={totals.jobs_succeeded}
        color='text-green-500'
      />
      <StatCard
        label='Jobs Doing'
        value={totals.jobs_doing}
        color='text-yellow-500'
      />
      <StatCard
        label='Jobs Failed'
        value={totals.jobs_failed}
        color='text-red-500'
      />
    </div>
  );
}
