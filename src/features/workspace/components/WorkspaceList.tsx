'use client';

import { useRouter } from 'next/navigation';
import type { Workspace } from '@/types/workspace';
import { Building2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
    <div className='flex flex-col gap-4'>
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
    router.push(`/workspace/${workspace.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className='bg-white/8 backdrop-blur-md hover:bg-white/12 transition-all rounded-2xl p-5 border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] cursor-pointer'
    >
      <div className='flex items-center justify-between gap-3'>
        <div className='flex items-center gap-4 flex-1 min-w-0'>
          <Avatar className='h-12 w-12 border border-white/10 bg-white/5 uppercase text-sm tracking-wide'>
            {workspace.icon_url ? (
              <AvatarImage
                src={workspace.icon_url}
                alt={workspace.title ?? 'Workspace icon'}
              />
            ) : (
              <AvatarFallback className='bg-white/5 text-white/70'>
                <Building2 className='w-5 h-5' />
              </AvatarFallback>
            )}
          </Avatar>
          <div className='flex-1 min-w-0'>
            <h3 className='text-base font-semibold text-white mb-1 truncate'>
              {workspace.title || 'Untitled Workspace'}
            </h3>
            <div className='flex items-center gap-2'>
              <span
                className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                  workspace.type === 'personal'
                    ? 'bg-blue-500/10 text-blue-400'
                    : 'bg-purple-500/10 text-purple-400'
                }`}
              >
                {workspace.type}
              </span>
              <span className='text-xs text-gray-400'>
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
    </div>
  );
}
