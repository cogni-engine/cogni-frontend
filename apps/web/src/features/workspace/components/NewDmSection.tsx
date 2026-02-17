'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Loader2, MessageCircle } from 'lucide-react';
import useSWR from 'swr';
import {
  getAllWorkspaceMembersForUser,
  findOrCreateDmWorkspace,
} from '@/lib/api/workspaceApi';
import { mutate } from 'swr';
import type { Workspace } from '@/types/workspace';

interface NewDmSectionProps {
  workspaces: Workspace[] | undefined;
}

export default function NewDmSection({ workspaces }: NewDmSectionProps) {
  const router = useRouter();
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  const { data: allMembers } = useSWR(
    '/all-workspace-members',
    getAllWorkspaceMembersForUser
  );

  const unconnectedMembers = useMemo(() => {
    if (!allMembers) return [];
    const existingDmUserIds = new Set(
      (workspaces ?? [])
        .filter(w => w.type === 'dm' && w.dm_other_user?.user_id)
        .map(w => w.dm_other_user!.user_id)
    );
    return allMembers.filter(
      m => m.user_id && !existingDmUserIds.has(m.user_id)
    );
  }, [allMembers, workspaces]);

  const handleSelectUser = async (userId: string) => {
    if (!userId || loadingUserId) return;
    setLoadingUserId(userId);
    try {
      const result = await findOrCreateDmWorkspace(userId);
      mutate('/workspaces');
      router.push(`/workspace/${result.workspace_id}/chat`);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : JSON.stringify(error);
      console.error('Failed to create DM workspace:', message);
    } finally {
      setLoadingUserId(null);
    }
  };

  if (!unconnectedMembers.length) return null;

  return (
    <div className='px-4 pb-4'>
      <div className='flex items-center gap-2 mb-3 px-1'>
        <MessageCircle className='w-3.5 h-3.5 text-text-muted' />
        <h3 className='text-xs font-medium text-text-muted uppercase tracking-wider'>
          New Message
        </h3>
      </div>
      <div className='flex gap-4 overflow-x-auto pb-2 scrollbar-hide'>
        {unconnectedMembers.map(member => {
          const profile = member.user_profile;
          const isLoading = loadingUserId === member.user_id;
          const initial = profile?.name
            ? profile.name.charAt(0).toUpperCase()
            : null;

          return (
            <button
              key={member.user_id}
              onClick={() => member.user_id && handleSelectUser(member.user_id)}
              disabled={!!loadingUserId}
              className='flex flex-col items-center gap-1.5 min-w-[60px] max-w-[60px] group disabled:opacity-50'
            >
              <div className='relative'>
                <Avatar className='h-12 w-12 border border-border-default bg-surface-primary transition-all duration-200 group-hover:border-border-default group-hover:scale-105'>
                  {profile?.avatar_url ? (
                    <AvatarImage
                      src={profile.avatar_url}
                      alt={profile.name ?? 'User'}
                    />
                  ) : (
                    <AvatarFallback className='bg-surface-primary text-text-secondary text-sm'>
                      {initial || <User className='w-4 h-4' />}
                    </AvatarFallback>
                  )}
                </Avatar>
                {isLoading && (
                  <div className='absolute inset-0 flex items-center justify-center bg-dialog-overlay rounded-full'>
                    <Loader2 className='w-4 h-4 text-text-primary animate-spin' />
                  </div>
                )}
              </div>
              <span className='text-[11px] text-text-muted truncate w-full text-center leading-tight group-hover:text-text-secondary transition-colors'>
                {profile?.name ?? 'Unknown'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
