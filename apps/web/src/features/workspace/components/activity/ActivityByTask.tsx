'use client';

import { useMemo, useState } from 'react';
import {
  Check,
  Clock,
  X,
  Ban,
  RefreshCw,
  FileText,
  ChevronDown,
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { getInitials } from '@/features/users/utils/avatar';
import { useGlobalUIStore } from '@/stores/useGlobalUIStore';
import { cn } from '@/lib/utils';
import type {
  WorkspaceActivity,
  NotificationReactionStatus,
} from '@/types/notification';

interface TaskGroup {
  taskId: number;
  noteTitle: string | null;
  noteId: number | null;
  latestActivity: WorkspaceActivity;
  activities: WorkspaceActivity[];
  memberNames: string[];
  memberAvatars: (string | undefined)[];
}

interface ActivityByTaskProps {
  activities: WorkspaceActivity[];
  loading: boolean;
}

const getStatusBadge = (status: NotificationReactionStatus) => {
  switch (status) {
    case 'completed':
      return {
        icon: <Check className='w-3 h-3' />,
        text: 'Done',
        className: 'bg-green-500/10 border-green-500/20 text-green-400/80',
      };
    case 'postponed':
      return {
        icon: <Clock className='w-3 h-3' />,
        text: 'Later',
        className: 'bg-orange-500/10 border-orange-500/20 text-orange-400/80',
      };
    case 'dismissed':
    case 'ignored':
      return {
        icon: <X className='w-3 h-3' />,
        text: status === 'dismissed' ? 'Dismissed' : 'Ignored',
        className:
          'bg-gray-500/10 border-gray-500/20 text-gray-500 dark:text-gray-400',
      };
    case 'rejected':
      return {
        icon: <Ban className='w-3 h-3' />,
        text: 'Rejected',
        className: 'bg-red-500/10 border-red-500/20 text-red-400/80',
      };
    case 'in_progress':
      return {
        icon: <RefreshCw className='w-3 h-3' />,
        text: 'Progress',
        className: 'bg-blue-500/10 border-blue-500/20 text-blue-400/80',
      };
    default:
      return {
        icon: null,
        text: status,
        className:
          'bg-surface-primary border-border-default text-text-secondary',
      };
  }
};

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${month}/${day} ${hours}:${minutes}`;
};

export default function ActivityByTask({
  activities,
  loading,
}: ActivityByTaskProps) {
  const [expandedTaskId, setExpandedTaskId] = useState<number | null>(null);
  const openNoteDrawer = useGlobalUIStore(state => state.openNoteDrawer);

  const taskGroups = useMemo(() => {
    const groupMap = new Map<number, TaskGroup>();

    for (const activity of activities) {
      const existing = groupMap.get(activity.task_id);
      if (existing) {
        existing.activities.push(activity);
        if (
          new Date(activity.updated_at) >
          new Date(existing.latestActivity.updated_at)
        ) {
          existing.latestActivity = activity;
        }
        if (!existing.memberNames.includes(activity.member_name)) {
          existing.memberNames.push(activity.member_name);
          existing.memberAvatars.push(activity.member_avatar_url);
        }
      } else {
        groupMap.set(activity.task_id, {
          taskId: activity.task_id,
          noteTitle: activity.note_title || null,
          noteId: activity.note_id || null,
          latestActivity: activity,
          activities: [activity],
          memberNames: [activity.member_name],
          memberAvatars: [activity.member_avatar_url],
        });
      }
    }

    return Array.from(groupMap.values()).sort(
      (a, b) =>
        new Date(b.latestActivity.updated_at).getTime() -
        new Date(a.latestActivity.updated_at).getTime()
    );
  }, [activities]);

  if (loading) {
    return (
      <div className='flex items-center justify-center py-12'>
        <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-text-primary' />
      </div>
    );
  }

  if (taskGroups.length === 0) {
    return (
      <div className='flex items-center justify-center py-12'>
        <p className='text-text-secondary text-center'>No activity yet</p>
      </div>
    );
  }

  return (
    <div className='space-y-4 py-2'>
      {taskGroups.map(group => {
        const isExpanded = expandedTaskId === group.taskId;
        const latestStatus = getStatusBadge(
          group.latestActivity.reaction_status
        );
        return (
          <div
            key={group.taskId}
            className={cn(
              'rounded-2xl',
              'border border-border-subtle',
              'bg-surface-primary dark:backdrop-blur-sm',
              'shadow-card',
              'transition-all duration-200',
              'hover:bg-surface-secondary hover:border-border-default',
              isExpanded && 'bg-surface-secondary border-border-default'
            )}
          >
            {/* Card Header */}
            <button
              onClick={() =>
                setExpandedTaskId(isExpanded ? null : group.taskId)
              }
              className='w-full px-5 py-4 text-left'
            >
              <div className='flex items-start justify-between gap-3'>
                <div className='flex-1 min-w-0'>
                  {/* Title */}
                  <div className='flex items-center gap-2 mb-2'>
                    <h3 className='text-sm font-medium text-text-primary truncate'>
                      {group.latestActivity.title}
                    </h3>
                  </div>

                  {/* Note title */}
                  {group.noteTitle && (
                    <p className='text-xs text-text-muted truncate mb-2'>
                      {group.noteTitle}
                    </p>
                  )}

                  {/* Members + timestamp */}
                  <div className='flex items-center gap-3'>
                    {/* Stacked avatars */}
                    <div className='flex -space-x-2'>
                      {group.memberAvatars.slice(0, 3).map((avatar, i) => (
                        <Avatar
                          key={i}
                          className='h-5 w-5 border border-border-default bg-interactive-hover text-[8px]'
                        >
                          {avatar ? (
                            <AvatarImage
                              src={avatar}
                              alt={group.memberNames[i]}
                            />
                          ) : (
                            <AvatarFallback className='text-[8px]'>
                              {getInitials(group.memberNames[i] || 'U')}
                            </AvatarFallback>
                          )}
                        </Avatar>
                      ))}
                      {group.memberNames.length > 3 && (
                        <div className='h-5 w-5 rounded-full bg-interactive-hover border border-border-default flex items-center justify-center text-[8px] text-text-secondary'>
                          +{group.memberNames.length - 3}
                        </div>
                      )}
                    </div>

                    <span className='text-[11px] text-text-muted'>
                      {formatTimestamp(group.latestActivity.updated_at)}
                    </span>

                    {/* Activity count */}
                    {group.activities.length > 1 && (
                      <span className='text-[11px] text-text-muted'>
                        {group.activities.length} reactions
                      </span>
                    )}
                  </div>
                </div>

                <div className='flex items-center gap-2 shrink-0'>
                  {/* Status badge */}
                  <div
                    className={cn(
                      'flex items-center gap-1 px-2 py-1 rounded-full border text-[11px]',
                      latestStatus.className
                    )}
                  >
                    {latestStatus.icon}
                    <span>{latestStatus.text}</span>
                  </div>

                  <ChevronDown
                    className={cn(
                      'w-4 h-4 text-text-muted transition-transform duration-200',
                      isExpanded && 'rotate-180'
                    )}
                  />
                </div>
              </div>
            </button>

            {/* Expanded: Activity list */}
            <div
              className={cn(
                'grid transition-[grid-template-rows] duration-300 ease-in-out',
                isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              )}
            >
              <div className='overflow-hidden'>
                <div className='px-5 pb-4 space-y-3 border-t border-border-subtle pt-3'>
                  {group.activities.map(activity => {
                    const status = getStatusBadge(activity.reaction_status);
                    return (
                      <div
                        key={activity.id}
                        className='flex items-start gap-3 text-sm'
                      >
                        <div
                          className={cn(
                            'flex items-center justify-center p-1 rounded-full border shrink-0 mt-0.5',
                            status.className
                          )}
                        >
                          {status.icon}
                        </div>

                        <div className='flex-1 min-w-0'>
                          <div className='flex items-center gap-2 mb-0.5'>
                            <Avatar className='h-4 w-4 border border-border-default bg-interactive-hover'>
                              {activity.member_avatar_url ? (
                                <AvatarImage
                                  src={activity.member_avatar_url}
                                  alt={activity.member_name}
                                />
                              ) : (
                                <AvatarFallback className='text-[8px]'>
                                  {getInitials(activity.member_name)}
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <span className='text-xs font-medium text-text-secondary'>
                              {activity.member_name}
                            </span>
                            <span className='text-[10px] text-text-muted'>
                              {formatTimestamp(activity.updated_at)}
                            </span>
                          </div>

                          {activity.reaction_text && (
                            <p className='text-xs text-text-secondary mt-1'>
                              {activity.reaction_text}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* View note button */}
                  {group.noteId && (
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        openNoteDrawer(group.noteId!);
                      }}
                      className='flex items-center gap-1.5 px-3 py-1.5 text-xs text-text-muted hover:text-text-secondary hover:bg-surface-primary rounded-lg transition-colors'
                    >
                      <FileText className='w-3.5 h-3.5' />
                      <span>View Note</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
