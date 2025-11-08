'use client';

import { useRouter } from 'next/navigation';
import type { Workspace } from '@/types/workspace';
import { Building2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import GlassCard from '@/components/glass-card/GlassCard';

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
    <div className='flex flex-col gap-[14px]'>
      {workspaces.map(workspace => (
        <WorkspaceCard key={workspace.id} workspace={workspace} />
      ))}
    </div>
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

  const handleCardClick = () => {
    router.push(`/workspace/${workspace.id}/chat`);
  };

  return (
    <GlassCard
      onClick={handleCardClick}
      className='cursor-pointer rounded-[20px] px-5 py-[8px] '
    >
      <div className='flex items-center justify-between gap-3 py-2'>
        <div className='flex items-center gap-3 flex-1 min-w-0'>
          <Avatar className='h-10 w-10 border border-white/10 bg-white/5 uppercase text-sm tracking-wide'>
            {workspace.icon_url ? (
              <AvatarImage
                src={workspace.icon_url}
                alt={workspace.title ?? 'Workspace icon'}
              />
            ) : (
              <AvatarFallback className='bg-white/5 text-white/70'>
                <Building2 className='w-4 h-4' />
              </AvatarFallback>
            )}
          </Avatar>
          <div className='flex-1 min-w-0'>
            <h3 className='font-semibold text-white text-[17px] leading-[1.4] mb-1 truncate'>
              {workspace.title || 'Untitled Workspace'}
            </h3>
            <div className='flex items-center gap-2'>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                  workspace.type === 'personal'
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'bg-purple-600/20 text-purple-300'
                }`}
              >
                {workspace.type}
              </span>
              <span className='text-[11px] text-gray-400'>
                {new Date(workspace.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className='flex items-center gap-3 shrink-0'>
          <span
            className={`inline-flex min-w-[2.25rem] items-center justify-center rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
              hasUnread
                ? 'bg-purple-500/20 text-purple-100 shadow-[0_0_15px_rgba(192,132,252,0.35)]'
                : 'bg-white/10 text-white/40'
            }`}
          >
            {displayCount}
          </span>
        </div>
      </div>
    </GlassCard>
  );
}
