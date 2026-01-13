'use client';

import { useRouter } from 'next/navigation';
import type { Workspace } from '@/types/workspace';
import { Building2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import GlassCard from '@/components/glass-design/GlassCard';

import { FlatList, FlatListItem } from '@/components/FlatList';

interface WorkspaceListProps {
  workspaces: Workspace[];
}

export default function WorkspaceList({ workspaces }: WorkspaceListProps) {
  if (workspaces.length === 0) {
    return (
      <div className='text-center py-12'>
        <div className='text-gray-500 text-lg mb-2'>No workspaces yet</div>
        <div className='text-gray-600 text-sm'>
          Create your first workspace to get started
        </div>
      </div>
    );
  }

  return (
    <FlatList className='py-18 px-2'>
      {workspaces.map(workspace => (
        <WorkspaceCard key={workspace.id} workspace={workspace} />
      ))}
    </FlatList>
  );
}

interface WorkspaceCardProps {
  workspace: Workspace;
}

function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  const router = useRouter();
  const unreadCount = workspace.unread_count ?? 0;
  const hasUnread = unreadCount > 0;
  const displayCount = unreadCount > 99 ? '99+' : unreadCount;
  const memberCount = workspace.member_count ?? 0;
  const showMemberCount = memberCount >= 3;

  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const dateOnly = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const diffTime = today.getTime() - dateOnly.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      // Within a week - show day name
      const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
      return days[date.getDay()];
    } else {
      // Older than a week - show month/day
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${month}/${day}`;
    }
  };

  const formattedDate = formatDate(workspace.workspace_messages_updated_at);

  const handleCardClick = () => {
    router.push(`/workspace/${workspace.id}/chat`);
  };

  return (
    <FlatListItem onClick={handleCardClick} className='-mx-5 px-5'>
      <div className='flex items-center justify-between gap-3 py-2'>
        <div className='flex items-center gap-3 flex-1 min-w-0'>
          <Avatar className='h-12 w-12 uppercase text-sm tracking-wide border-0 bg-white/10'>
            {workspace.icon_url ? (
              <AvatarImage
                src={workspace.icon_url}
                alt={workspace.title ?? 'Workspace icon'}
              />
            ) : (
              <AvatarFallback className='bg-white/10 text-white/90'>
                <Building2 className='w-4 h-4' />
              </AvatarFallback>
            )}
          </Avatar>
          <div className='flex-1 min-w-0'>
            <div className='flex flex-col gap-0.5'>
              <div className='flex items-center gap-2'>
                <h3 className='font-semibold text-white/90 text-[15px] leading-[1.4] truncate'>
                  {workspace.title || 'Untitled Workspace'}
                </h3>
                {showMemberCount && (
                  <span className='font-semibold text-[15px] text-white/80 shrink-0 leading-[1.4]'>
                    ({memberCount})
                  </span>
                )}
              </div>
              {workspace.latest_message_text && (
                <div className='text-[12px] text-gray-400 truncate'>
                  {workspace.latest_message_text}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='flex flex-col items-end shrink-0'>
          <div className='text-[11px] text-gray-400 leading-[14px] h-[16px] flex items-center mb-2 -mt-1'>
            {formattedDate}
          </div>
          <div className='h-5 flex items-center'>
            {hasUnread && (
              <span className='inline-flex items-center justify-center rounded-full bg-white text-black text-xs font-semibold min-w-[20px] h-5 px-2'>
                {displayCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </FlatListItem>
  );
}
