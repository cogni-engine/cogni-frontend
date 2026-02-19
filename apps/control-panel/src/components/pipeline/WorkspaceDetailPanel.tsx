'use client';

import { useState, useMemo } from 'react';
import {
  WorkspaceFunnelRow,
  NotificationDetail,
  DateRange,
} from '@/types/pipeline';
import { useWorkspaceNotifications } from '@/hooks/useWorkspaceNotifications';
import { X, ChevronDown, ChevronRight, ArrowRight, User } from 'lucide-react';

interface WorkspaceDetailPanelProps {
  workspace: WorkspaceFunnelRow;
  range: DateRange;
  onClose: () => void;
}

function formatUtc(ts: string | null) {
  if (!ts) return '-';
  const d = new Date(ts);
  return d.toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
}

function formatLocal(ts: string | null) {
  if (!ts) return '-';
  return new Date(ts).toLocaleString('ja-JP', { hour12: false });
}

function Timestamp({ value }: { value: string | null }) {
  if (!value) return <span>-</span>;
  return (
    <span>
      <span className='text-foreground'>{formatLocal(value)}</span>
      <span className='ml-1.5 text-muted'>({formatUtc(value)})</span>
    </span>
  );
}

function FunnelStep({
  label,
  value,
  isLast,
}: {
  label: string;
  value: number;
  isLast?: boolean;
}) {
  return (
    <>
      <div className='flex flex-col items-center'>
        <div className='text-lg font-semibold text-foreground'>{value}</div>
        <div className='text-xs text-muted'>{label}</div>
      </div>
      {!isLast && <ArrowRight size={14} className='shrink-0 text-muted' />}
    </>
  );
}

function NotificationRow({ notif }: { notif: NotificationDetail }) {
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
        <div className='min-w-0 flex-1'>
          <div className='truncate font-medium'>{notif.title}</div>
          <div className='flex items-center gap-1.5 text-xs text-muted'>
            <User size={10} />
            {notif.member_name}
          </div>
        </div>
        <span
          className={`shrink-0 rounded px-1.5 py-0.5 text-xs ${
            notif.status === 'sent'
              ? 'bg-green-500/10 text-green-500'
              : notif.status === 'resolved'
                ? 'bg-blue-500/10 text-blue-500'
                : 'bg-yellow-500/10 text-yellow-500'
          }`}
        >
          {notif.status}
        </span>
      </button>
      {expanded && (
        <div className='space-y-1.5 bg-surface px-3 pb-3 pt-1 text-xs'>
          <div>
            <span className='text-muted'>To: </span>
            <span className='font-medium text-foreground'>
              {notif.member_name}
            </span>
          </div>
          <div>
            <span className='text-muted'>Task: </span>
            <span className='text-foreground'>{notif.task_title}</span>
            <span className='ml-1 text-muted'>#{notif.task_id}</span>
          </div>
          {notif.body && (
            <div>
              <span className='text-muted'>Body: </span>
              <span className='text-foreground'>{notif.body}</span>
            </div>
          )}
          <div>
            <span className='text-muted'>Due: </span>
            <Timestamp value={notif.due_date} />
          </div>
          <div>
            <span className='text-muted'>Created: </span>
            <Timestamp value={notif.created_at} />
          </div>
          {notif.reaction_text && (
            <div>
              <span className='text-muted'>Reaction: </span>
              <span className='text-foreground'>{notif.reaction_text}</span>
              {notif.reacted_at && (
                <span className='ml-1'>
                  <span className='text-muted'>at </span>
                  <Timestamp value={notif.reacted_at} />
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function WorkspaceDetailPanel({
  workspace,
  range,
  onClose,
}: WorkspaceDetailPanelProps) {
  const { notifications, isLoading } = useWorkspaceNotifications(
    workspace.workspace_id,
    range
  );
  const [filterMember, setFilterMember] = useState<string | null>(null);

  const members = useMemo(() => {
    const map = new Map<string, number>();
    for (const n of notifications) {
      map.set(n.member_name, (map.get(n.member_name) ?? 0) + 1);
    }
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [notifications]);

  const filtered = filterMember
    ? notifications.filter(n => n.member_name === filterMember)
    : notifications;

  return (
    <div className='flex h-full flex-col overflow-hidden rounded-lg border border-border'>
      {/* Header */}
      <div className='flex items-center justify-between border-b border-border px-4 py-3'>
        <div>
          <h3 className='text-sm font-semibold text-foreground'>
            {workspace.workspace_title}
          </h3>
          <p className='text-xs text-muted'>#{workspace.workspace_id}</p>
        </div>
        <button
          onClick={onClose}
          className='rounded p-1 text-muted transition-colors hover:bg-surface-hover hover:text-foreground'
        >
          <X size={14} />
        </button>
      </div>

      {/* Funnel summary */}
      <div className='border-b border-border px-4 py-3'>
        <div className='flex items-center justify-between gap-2'>
          <FunnelStep label='Raw' value={workspace.raw_events_total} />
          <FunnelStep
            label='Semantic'
            value={workspace.semantic_events_total}
          />
          <FunnelStep label='Tasks' value={workspace.tasks_count} />
          <FunnelStep
            label='Notifs'
            value={workspace.notifications_count}
            isLast
          />
        </div>
        <div className='mt-2 flex gap-4 text-xs text-muted'>
          <span>Note: {workspace.raw_events_note}</span>
          <span>Message: {workspace.raw_events_message}</span>
        </div>
      </div>

      {/* Member filter */}
      {members.length > 1 && (
        <div className='flex flex-wrap gap-1 border-b border-border px-4 py-2'>
          <button
            onClick={() => setFilterMember(null)}
            className={`rounded-full px-2.5 py-0.5 text-xs transition-colors ${
              filterMember === null
                ? 'bg-accent-dim text-accent'
                : 'text-muted hover:bg-surface-hover hover:text-foreground'
            }`}
          >
            All ({notifications.length})
          </button>
          {members.map(([name, count]) => (
            <button
              key={name}
              onClick={() =>
                setFilterMember(filterMember === name ? null : name)
              }
              className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs transition-colors ${
                filterMember === name
                  ? 'bg-accent-dim text-accent'
                  : 'text-muted hover:bg-surface-hover hover:text-foreground'
              }`}
            >
              <User size={10} />
              {name} ({count})
            </button>
          ))}
        </div>
      )}

      {/* Notifications */}
      <div className='flex-1 overflow-y-auto'>
        <div className='px-4 py-2 text-xs font-medium text-muted'>
          Notifications ({filtered.length})
        </div>
        {isLoading ? (
          <div className='flex h-24 items-center justify-center text-sm text-muted'>
            Loading...
          </div>
        ) : filtered.length === 0 ? (
          <div className='flex h-24 items-center justify-center text-sm text-muted'>
            No notifications
          </div>
        ) : (
          filtered.map(n => <NotificationRow key={n.id} notif={n} />)
        )}
      </div>
    </div>
  );
}
