'use client';

import { useState } from 'react';
import { JobStatusSummary, FailedJob } from '@/types/pipeline';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface JobStatusPanelProps {
  summary: JobStatusSummary[];
  failedJobs: FailedJob[];
  isLoading: boolean;
}

function formatUtc(ts: string) {
  return new Date(ts).toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
}

function formatTimestamp(ts: string | null) {
  if (!ts) return '-';
  return `${new Date(ts).toLocaleString('ja-JP', { hour12: false })} (${formatUtc(ts)})`;
}

function formatDuration(ms: number | null) {
  if (ms === null) return '-';
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

function FailedJobRow({ job }: { job: FailedJob }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className='border-b border-border last:border-0'>
      <button
        onClick={() => setExpanded(!expanded)}
        className='flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-surface-hover'
      >
        {expanded ? (
          <ChevronDown size={14} className='shrink-0 text-muted' />
        ) : (
          <ChevronRight size={14} className='shrink-0 text-muted' />
        )}
        <span className='shrink-0 text-xs text-muted'>#{job.id}</span>
        <span className='flex-1 truncate font-medium'>{job.task_name}</span>
        <span className='shrink-0 text-xs text-muted'>
          {formatDuration(job.duration_ms)}
        </span>
        <span className='shrink-0 text-xs text-muted'>
          {job.attempts} attempt{job.attempts !== 1 ? 's' : ''}
        </span>
      </button>
      {expanded && (
        <div className='space-y-3 bg-surface px-3 pb-3 pt-1'>
          <div>
            <div className='mb-1 text-xs font-medium text-muted'>
              Event Timeline
            </div>
            <div className='space-y-0.5'>
              {job.events.map((ev, i) => (
                <div key={i} className='flex items-center gap-2 text-xs'>
                  <span
                    className={`w-24 shrink-0 font-medium ${
                      ev.type === 'failed'
                        ? 'text-red-500'
                        : ev.type === 'succeeded'
                          ? 'text-green-500'
                          : ev.type === 'started'
                            ? 'text-blue-500'
                            : 'text-muted'
                    }`}
                  >
                    {ev.type}
                  </span>
                  <span className='text-muted'>{formatTimestamp(ev.at)}</span>
                </div>
              ))}
            </div>
          </div>
          {job.duration_ms !== null && (
            <div className='text-xs'>
              <span className='text-muted'>Duration: </span>
              <span className='text-foreground'>
                {formatDuration(job.duration_ms)}
              </span>
              <span className='ml-2 text-muted'>(started → failed)</span>
            </div>
          )}
          <div>
            <div className='mb-1 text-xs font-medium text-muted'>Args</div>
            <pre className='max-h-[200px] overflow-auto rounded border border-border bg-black/20 p-2 text-xs text-foreground'>
              {JSON.stringify(job.args, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export function JobStatusPanel({
  summary,
  failedJobs,
  isLoading,
}: JobStatusPanelProps) {
  const [showFailed, setShowFailed] = useState(false);

  if (isLoading) {
    return (
      <div className='flex h-32 items-center justify-center text-sm text-muted'>
        Loading job data...
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <div className='overflow-hidden rounded-lg border border-border'>
        <table className='w-full text-sm'>
          <thead>
            <tr className='border-b border-border bg-surface text-left text-xs text-muted'>
              <th className='px-3 py-2'>Task Name</th>
              <th className='px-3 py-2 text-right'>Succeeded</th>
              <th className='px-3 py-2 text-right'>Doing</th>
              <th className='px-3 py-2 text-right'>Failed</th>
              <th className='px-3 py-2 text-right'>Total</th>
            </tr>
          </thead>
          <tbody>
            {summary.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className='px-3 py-6 text-center text-sm text-muted'
                >
                  No jobs in this period
                </td>
              </tr>
            ) : (
              summary.map(row => (
                <tr
                  key={row.task_name}
                  className='border-b border-border last:border-0'
                >
                  <td className='px-3 py-2 font-medium'>{row.task_name}</td>
                  <td className='px-3 py-2 text-right text-green-500'>
                    {row.succeeded}
                  </td>
                  <td className='px-3 py-2 text-right text-yellow-500'>
                    {row.doing}
                  </td>
                  <td className='px-3 py-2 text-right text-red-500'>
                    {row.failed}
                  </td>
                  <td className='px-3 py-2 text-right font-medium'>
                    {row.total}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {failedJobs.length > 0 && (
        <div className='rounded-lg border border-border'>
          <button
            onClick={() => setShowFailed(!showFailed)}
            className='flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-medium text-red-500 transition-colors hover:bg-surface-hover'
          >
            {showFailed ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
            Failed Jobs ({failedJobs.length})
          </button>
          {showFailed && (
            <div className='border-t border-border'>
              {failedJobs.map(job => (
                <FailedJobRow key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
