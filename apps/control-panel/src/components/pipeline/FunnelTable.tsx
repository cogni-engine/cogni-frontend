'use client';

import { WorkspaceFunnelRow } from '@/types/pipeline';

interface FunnelTableProps {
  workspaces: WorkspaceFunnelRow[];
  isLoading: boolean;
  selectedWorkspaceId: number | null;
  onSelectWorkspace: (id: number | null) => void;
}

export function FunnelTable({
  workspaces,
  isLoading,
  selectedWorkspaceId,
  onSelectWorkspace,
}: FunnelTableProps) {
  if (isLoading) {
    return (
      <div className='flex h-40 items-center justify-center text-sm text-muted'>
        Loading funnel data...
      </div>
    );
  }

  if (workspaces.length === 0) {
    return (
      <div className='flex h-40 items-center justify-center text-sm text-muted'>
        No pipeline activity in this period
      </div>
    );
  }

  return (
    <div className='overflow-hidden rounded-lg border border-border'>
      <table className='w-full text-sm'>
        <thead>
          <tr className='border-b border-border bg-surface text-left text-xs text-muted'>
            <th className='px-3 py-2'>Workspace</th>
            <th className='px-3 py-2 text-right'>Raw (Note)</th>
            <th className='px-3 py-2 text-right'>Raw (Msg)</th>
            <th className='px-3 py-2 text-right'>Raw Total</th>
            <th className='px-3 py-2 text-right'>Semantic</th>
            <th className='px-3 py-2 text-right'>Tasks</th>
            <th className='px-3 py-2 text-right'>Notifs</th>
          </tr>
        </thead>
        <tbody>
          {workspaces.map(row => {
            const active = selectedWorkspaceId === row.workspace_id;
            return (
              <tr
                key={row.workspace_id}
                onClick={() =>
                  onSelectWorkspace(active ? null : row.workspace_id)
                }
                className={`cursor-pointer border-b border-border last:border-0 transition-colors ${
                  active
                    ? 'bg-accent-dim text-accent'
                    : 'hover:bg-surface-hover'
                }`}
              >
                <td className='px-3 py-2 font-medium'>
                  {row.workspace_title}
                  <span className='ml-1.5 text-xs text-muted'>
                    #{row.workspace_id}
                  </span>
                </td>
                <td className='px-3 py-2 text-right'>{row.raw_events_note}</td>
                <td className='px-3 py-2 text-right'>
                  {row.raw_events_message}
                </td>
                <td className='px-3 py-2 text-right font-medium'>
                  {row.raw_events_total}
                </td>
                <td className='px-3 py-2 text-right'>
                  {row.semantic_events_total}
                </td>
                <td className='px-3 py-2 text-right'>{row.tasks_count}</td>
                <td className='px-3 py-2 text-right'>
                  {row.notifications_count}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
