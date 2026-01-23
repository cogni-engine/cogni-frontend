'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Check, Clock, X, Ban, RefreshCw, FileText } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { getInitials } from '@/features/users/utils/avatar';
import { useGlobalUIStore } from '@/stores/useGlobalUIStore';
import GlassCard from '@/components/glass-design/GlassCard';
import { AIMessageView } from '@/features/cogno/components/AIMessageView';
import { cn } from '@/lib/utils';
import type { WorkspaceActivity } from '@/types/notification';

interface ActivityItemProps {
  activity: WorkspaceActivity;
  isLast: boolean;
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
        className: 'bg-gray-500/10 border-gray-500/20 text-gray-400/80',
      };
    case 'ignored':
      return {
        icon: <X className='w-3 h-3' />,
        text: 'Ignored',
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

// タイムスタンプフォーマット
const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${month}/${day} ${hours}:${minutes}`;
};

export default function ActivityItem({ activity, isLast }: ActivityItemProps) {
  const statusDisplay = getStatusDisplay(activity.reaction_status);
  const openNoteDrawer = useGlobalUIStore(state => state.openNoteDrawer);
  const [showFullScreenResult, setShowFullScreenResult] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle full screen animation
  useEffect(() => {
    if (showFullScreenResult) {
      requestAnimationFrame(() => {
        setIsAnimatingIn(true);
      });
    } else {
      setIsAnimatingIn(false);
    }
  }, [showFullScreenResult]);

  const handleViewNote = () => {
    if (activity.note_id) {
      openNoteDrawer(activity.note_id);
    }
  };

  const taskResult = activity.task_result
    ? {
        result_title: activity.task_result.result_title,
        result_text: activity.task_result.result_text,
      }
    : null;

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
          <div className='w-px bg-white/10 flex-1 mt-2 min-h-[40px]' />
        )}
      </div>

      {/* Right: Content */}
      <div className='flex-1 pb-6'>
        {/* Header: Avatar, Name, timestamp, and View Note button */}
        <div className='flex items-center justify-between mb-2'>
          <div className='flex items-center gap-2'>
            <Avatar className='h-6 w-6 border border-white/20 bg-white/10 text-xs'>
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
            <span className='font-medium text-sm text-white'>
              {activity.member_name}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            {activity.note_id && (
              <button
                onClick={handleViewNote}
                className='flex items-center gap-1.5 px-2 py-1 text-xs text-white/60 hover:text-white/90 hover:bg-white/10 rounded-md transition-colors'
                title={
                  activity.note_title
                    ? `View note: ${activity.note_title}`
                    : 'View note'
                }
              >
                <FileText className='w-3.5 h-3.5' />
                <span>{activity.note_title || 'View Note'}</span>
              </button>
            )}
            <span className='text-[11px] text-white/40'>
              {formatTimestamp(activity.updated_at)}
            </span>
          </div>
        </div>

        {/* Notification title */}
        <p className='text-sm text-white/90 mb-1'>{activity.title}</p>

        {/* Task Result - File Card Style */}
        {taskResult && (
          <GlassCard
            className={cn(
              'relative group overflow-hidden cursor-pointer',
              'flex items-center gap-3',
              'backdrop-blur-xl border border-black rounded-3xl',
              'px-6 py-3 mt-2',
              'hover:bg-white/2 transition-all'
            )}
            onClick={() => setShowFullScreenResult(true)}
          >
            <FileText className='w-5 h-5' />
            <div className='flex-1 min-w-0 overflow-hidden'>
              <p className='text-sm text-white font-medium truncate'>
                Task Result
              </p>
              <p className='text-xs text-white/40 truncate'>
                Tap to view details
              </p>
            </div>
          </GlassCard>
        )}

        {/* Reaction text */}
        {activity.reaction_text && (
          <p className='text-sm text-white/70'>{activity.reaction_text}</p>
        )}
      </div>

      {/* Full Screen Task Result Modal */}
      {mounted &&
        showFullScreenResult &&
        taskResult &&
        createPortal(
          <div
            className={cn(
              'fixed inset-0 z-10000 flex flex-col bg-black/95 backdrop-blur-sm',
              'transition-all duration-300 ease-out',
              isAnimatingIn
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-full'
            )}
          >
            {/* Header with Close Button */}
            <div
              className={cn(
                'flex items-center justify-between p-4 border-b border-white/10',
                'transition-all duration-200 ease-out delay-100',
                isAnimatingIn
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 -translate-y-4'
              )}
            >
              <div className='space-y-1'>
                <div className='text-xs text-white/40 uppercase tracking-wide'>
                  Task Result
                </div>
                <h2 className='font-semibold text-lg text-white'>
                  {taskResult.result_title}
                </h2>
              </div>
              <button
                onClick={() => setShowFullScreenResult(false)}
                className='p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all'
              >
                <X className='w-6 h-6' />
              </button>
            </div>

            {/* Scrollable Content */}
            <div
              className={cn(
                'flex-1 overflow-y-auto p-6',
                'transition-all duration-500'
              )}
            >
              <div className='max-w-3xl mx-auto'>
                <AIMessageView content={taskResult.result_text} />
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
