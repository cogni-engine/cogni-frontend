'use client';

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
import type { WorkspaceActivity } from '@/types/notification';

interface ActivityItemProps {
  activity: WorkspaceActivity;
  isLast: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}

// ステータス表示（短縮版 + スタイル）
const getStatusDisplay = (status: string) => {
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
      return {
        icon: <X className='w-3 h-3' />,
        text: 'Dismissed',
        className:
          'bg-gray-500/10 border-gray-500/20 text-gray-500 dark:text-gray-400',
      };
    case 'ignored':
      return {
        icon: <X className='w-3 h-3' />,
        text: 'Ignored',
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

// タイムスタンプフォーマット
const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${month}/${day} ${hours}:${minutes}`;
};

export default function ActivityItem({
  activity,
  isLast,
  isExpanded,
  onToggle,
}: ActivityItemProps) {
  const statusDisplay = getStatusDisplay(activity.reaction_status);
  const openNoteDrawer = useGlobalUIStore(state => state.openNoteDrawer);

  const handleViewNote = () => {
    if (activity.note_id) {
      openNoteDrawer(activity.note_id);
    }
  };

  return (
    <div className='relative flex gap-3'>
      {/* Left: Status badge with connecting line */}
      <div className='flex flex-col items-center'>
        {/* Status badge */}
        <div
          className={`flex items-center justify-center gap-1.5 px-2 py-2 rounded-full border whitespace-nowrap ${statusDisplay.className}`}
        >
          <span>{statusDisplay.icon}</span>
          {/* <span className='text-xs font-medium'>{statusDisplay.text}</span> */}
        </div>

        {/* Connecting line to next item */}
        {!isLast && (
          <div className='w-px bg-border-default flex-1 min-h-[40px]' />
        )}
      </div>

      {/* Right: Content */}
      <div
        onClick={onToggle}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') onToggle();
        }}
        role='button'
        tabIndex={0}
        className='flex-1 pb-6 text-left cursor-pointer'
      >
        {/* Header: Avatar, Name, timestamp, and View Note button */}
        <div className='flex items-center justify-between mb-2'>
          <div className='flex items-center gap-2'>
            <Avatar className='h-6 w-6 border border-border-default bg-interactive-hover text-xs'>
              {activity.member_avatar_url ? (
                <AvatarImage
                  src={activity.member_avatar_url}
                  alt={activity.member_name}
                />
              ) : (
                <AvatarFallback className='text-[10px]'>
                  {getInitials(activity.member_name)}
                </AvatarFallback>
              )}
            </Avatar>
            <span className='font-medium text-sm text-text-primary'>
              {activity.member_name}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <button
              onClick={e => {
                e.stopPropagation();
                handleViewNote();
              }}
              disabled={!activity.note_id}
              className={cn(
                'flex items-center gap-1.5 px-2 py-1 text-xs text-text-secondary hover:text-text-primary hover:bg-interactive-hover rounded-md transition-colors',
                !activity.note_id && 'opacity-50 cursor-not-allowed'
              )}
              title={
                activity.note_title
                  ? `View note: ${activity.note_title}`
                  : 'View note'
              }
            >
              <FileText className='w-3.5 h-3.5' />
              <span>{activity.note_title || 'View Note'}</span>
            </button>
            <span className='text-[11px] text-text-muted'>
              {formatTimestamp(activity.updated_at)}
            </span>
          </div>
        </div>

        {/* Notification title with chevron */}
        <div className='flex items-center justify-between mb-1'>
          <p className='text-sm text-text-primary flex-1'>{activity.title}</p>
          <ChevronDown
            className={cn(
              'w-4 h-4 text-text-muted transition-transform duration-200',
              isExpanded && 'transform rotate-180'
            )}
          />
        </div>

        {/* Reaction text */}
        {activity.reaction_text && (
          <p className='text-sm text-text-secondary mb-2'>
            {activity.reaction_text}
          </p>
        )}

        {/* Expandable section */}
        <div
          className={cn(
            'grid transition-[grid-template-rows] duration-300 ease-in-out',
            isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          )}
        >
          <div className='overflow-hidden'>
            <div className='mt-3 pt-3 border-t border-border-default space-y-3'>
              {/* Body text if available */}
              {activity.body && (
                <div>
                  <div className='text-xs text-text-muted uppercase tracking-wide mb-1'>
                    Description
                  </div>
                  <p className='text-sm text-text-secondary'>{activity.body}</p>
                </div>
              )}

              {/* Dates */}
              <div className='grid grid-cols-2 gap-3 text-xs'>
                <div>
                  <div className='text-text-muted mb-0.5'>Created</div>
                  <div className='text-text-secondary'>
                    {formatTimestamp(activity.created_at)}
                  </div>
                </div>
                {activity.due_date && (
                  <div>
                    <div className='text-text-muted mb-0.5'>Due Date</div>
                    <div className='text-text-secondary'>
                      {formatTimestamp(activity.due_date)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
