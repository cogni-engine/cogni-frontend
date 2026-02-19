'use client';

import { useState } from 'react';
import { NotificationDetail, DateRange } from '@/types/pipeline';
import { useWorkspaceNotifications } from '@/hooks/useWorkspaceNotifications';
import { ChevronDown, ChevronRight, X } from 'lucide-react';

interface NotificationDrawerProps {
  workspaceId: number;
  workspaceTitle: string;
  range: DateRange;
  onClose: () => void;
}

function formatTimestamp(ts: string | null) {
  if (!ts) return '-';
  return new Date(ts).toLocaleString();
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
        <span className='flex-1 truncate font-medium'>{notif.title}</span>
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
        <div className='space-y-1 bg-surface px-3 pb-3 pt-1 text-xs'>
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
            <span className='text-foreground'>
              {formatTimestamp(notif.due_date)}
            </span>
          </div>
          {notif.reaction_text && (
            <div>
              <span className='text-muted'>Reaction: </span>
              <span className='text-foreground'>{notif.reaction_text}</span>
              {notif.reacted_at && (
                <span className='ml-1 text-muted'>
                  at {formatTimestamp(notif.reacted_at)}
                </span>
              )}
            </div>
          )}
          <div>
            <span className='text-muted'>Created: </span>
            <span className='text-foreground'>
              {formatTimestamp(notif.created_at)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export function NotificationDrawer({
  workspaceId,
  workspaceTitle,
  range,
  onClose,
}: NotificationDrawerProps) {
  const { notifications, isLoading } = useWorkspaceNotifications(
    workspaceId,
    range
  );

  return (
    <div className='rounded-lg border border-border'>
      <div className='flex items-center justify-between border-b border-border px-3 py-2'>
        <h3 className='text-sm font-semibold text-foreground'>
          Notifications — {workspaceTitle}
          <span className='ml-1.5 text-xs font-normal text-muted'>
            #{workspaceId}
          </span>
        </h3>
        <button
          onClick={onClose}
          className='rounded p-1 text-muted transition-colors hover:bg-surface-hover hover:text-foreground'
        >
          <X size={14} />
        </button>
      </div>
      <div className='max-h-[400px] overflow-y-auto'>
        {isLoading ? (
          <div className='flex h-24 items-center justify-center text-sm text-muted'>
            Loading notifications...
          </div>
        ) : notifications.length === 0 ? (
          <div className='flex h-24 items-center justify-center text-sm text-muted'>
            No notifications in this period
          </div>
        ) : (
          notifications.map(n => <NotificationRow key={n.id} notif={n} />)
        )}
      </div>
    </div>
  );
}
