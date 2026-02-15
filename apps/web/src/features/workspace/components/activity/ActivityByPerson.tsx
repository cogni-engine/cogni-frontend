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

interface PersonGroup {
  memberName: string;
  memberAvatar: string | undefined;
  taskGroups: {
    taskId: number;
    noteTitle: string | null;
    noteId: number | null;
    activities: WorkspaceActivity[];
    latestActivity: WorkspaceActivity;
  }[];
  totalActivities: number;
  latestUpdated: string;
}

interface ActivityByPersonProps {
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
        className: 'bg-gray-500/10 border-gray-500/20 text-gray-400/80',
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
        className: 'bg-white/5 border-white/10 text-white/70',
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

export default function ActivityByPerson({
  activities,
  loading,
}: ActivityByPersonProps) {
  const [expandedPerson, setExpandedPerson] = useState<string | null>(null);
  const openNoteDrawer = useGlobalUIStore(state => state.openNoteDrawer);

  const personGroups = useMemo(() => {
    const personMap = new Map<string, PersonGroup>();

    for (const activity of activities) {
      const key = activity.member_name;
      const existing = personMap.get(key);

      if (existing) {
        existing.totalActivities++;
        if (new Date(activity.updated_at) > new Date(existing.latestUpdated)) {
          existing.latestUpdated = activity.updated_at;
        }

        // Group by task within person
        const taskGroup = existing.taskGroups.find(
          tg => tg.taskId === activity.task_id
        );
        if (taskGroup) {
          taskGroup.activities.push(activity);
          if (
            new Date(activity.updated_at) >
            new Date(taskGroup.latestActivity.updated_at)
          ) {
            taskGroup.latestActivity = activity;
          }
        } else {
          existing.taskGroups.push({
            taskId: activity.task_id,
            noteTitle: activity.note_title || null,
            noteId: activity.note_id || null,
            activities: [activity],
            latestActivity: activity,
          });
        }
      } else {
        personMap.set(key, {
          memberName: activity.member_name,
          memberAvatar: activity.member_avatar_url,
          taskGroups: [
            {
              taskId: activity.task_id,
              noteTitle: activity.note_title || null,
              noteId: activity.note_id || null,
              activities: [activity],
              latestActivity: activity,
            },
          ],
          totalActivities: 1,
          latestUpdated: activity.updated_at,
        });
      }
    }

    return Array.from(personMap.values())
      .sort(
        (a, b) =>
          new Date(b.latestUpdated).getTime() -
          new Date(a.latestUpdated).getTime()
      )
      .map(person => ({
        ...person,
        taskGroups: person.taskGroups.sort(
          (a, b) =>
            new Date(b.latestActivity.updated_at).getTime() -
            new Date(a.latestActivity.updated_at).getTime()
        ),
      }));
  }, [activities]);

  if (loading) {
    return (
      <div className='flex items-center justify-center py-12'>
        <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-white' />
      </div>
    );
  }

  if (personGroups.length === 0) {
    return (
      <div className='flex items-center justify-center py-12'>
        <p className='text-white/60 text-center'>No activity yet</p>
      </div>
    );
  }

  return (
    <div className='space-y-4 py-2'>
      {personGroups.map(person => {
        const isExpanded = expandedPerson === person.memberName;

        return (
          <div
            key={person.memberName}
            className={cn(
              'rounded-2xl',
              'border border-white/[0.08]',
              'bg-white/[0.02] backdrop-blur-sm',
              'shadow-[0_4px_24px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.06)]',
              'transition-all duration-200',
              'hover:bg-white/[0.04] hover:border-white/[0.12]',
              isExpanded && 'bg-white/[0.04] border-white/[0.12]'
            )}
          >
            {/* Person Header */}
            <button
              onClick={() =>
                setExpandedPerson(isExpanded ? null : person.memberName)
              }
              className='w-full px-5 py-4 text-left'
            >
              <div className='flex items-center justify-between gap-3'>
                <div className='flex items-center gap-3'>
                  <Avatar className='h-9 w-9 border border-white/20 bg-white/10'>
                    {person.memberAvatar ? (
                      <AvatarImage
                        src={person.memberAvatar}
                        alt={person.memberName}
                      />
                    ) : (
                      <AvatarFallback className='text-xs'>
                        {getInitials(person.memberName)}
                      </AvatarFallback>
                    )}
                  </Avatar>

                  <div>
                    <h3 className='text-sm font-medium text-white'>
                      {person.memberName}
                    </h3>
                    <p className='text-[11px] text-white/40'>
                      {person.taskGroups.length} task
                      {person.taskGroups.length > 1 ? 's' : ''} /{' '}
                      {person.totalActivities} reaction
                      {person.totalActivities > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                <div className='flex items-center gap-2'>
                  <span className='text-[11px] text-white/30'>
                    {formatTimestamp(person.latestUpdated)}
                  </span>
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 text-white/30 transition-transform duration-200',
                      isExpanded && 'rotate-180'
                    )}
                  />
                </div>
              </div>
            </button>

            {/* Expanded: Task groups for this person */}
            <div
              className={cn(
                'grid transition-[grid-template-rows] duration-300 ease-in-out',
                isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              )}
            >
              <div className='overflow-hidden'>
                <div className='px-5 pb-4 space-y-3 border-t border-white/[0.06] pt-3'>
                  {person.taskGroups.map(taskGroup => (
                    <div
                      key={taskGroup.taskId}
                      className='rounded-xl bg-white/[0.03] border border-white/[0.06] p-3'
                    >
                      {/* Task header */}
                      <div className='flex items-center justify-between mb-2'>
                        <div className='flex items-center gap-2 min-w-0 flex-1'>
                          <h4 className='text-xs font-medium text-white/80 truncate'>
                            {taskGroup.latestActivity.title}
                          </h4>
                        </div>
                        {taskGroup.noteId && (
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              openNoteDrawer(taskGroup.noteId!);
                            }}
                            className='flex items-center gap-1 px-2 py-0.5 text-[10px] text-white/40 hover:text-white/70 hover:bg-white/5 rounded transition-colors shrink-0'
                          >
                            <FileText className='w-3 h-3' />
                            <span>Note</span>
                          </button>
                        )}
                      </div>

                      {/* Activities in this task */}
                      <div className='space-y-2'>
                        {taskGroup.activities.map(activity => {
                          const status = getStatusBadge(
                            activity.reaction_status
                          );
                          return (
                            <div
                              key={activity.id}
                              className='flex items-start gap-2'
                            >
                              <div
                                className={cn(
                                  'flex items-center justify-center p-0.5 rounded-full border shrink-0 mt-0.5',
                                  status.className
                                )}
                              >
                                {status.icon}
                              </div>
                              <div className='flex-1 min-w-0'>
                                <div className='flex items-center gap-2'>
                                  <span className='text-[11px] text-white/50'>
                                    {formatTimestamp(activity.updated_at)}
                                  </span>
                                  <span
                                    className={cn(
                                      'text-[10px] px-1.5 py-0.5 rounded border',
                                      status.className
                                    )}
                                  >
                                    {status.text}
                                  </span>
                                </div>
                                {activity.reaction_text && (
                                  <p className='text-[11px] text-white/50 mt-0.5'>
                                    {activity.reaction_text}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
