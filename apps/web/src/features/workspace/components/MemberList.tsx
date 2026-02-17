'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { WorkspaceMember } from '@/types/workspace';
import {
  User,
  Crown,
  Shield,
  MessageCircle,
  Loader2,
  MinusCircle,
} from 'lucide-react';
import {
  findOrCreateDmWorkspace,
  removeWorkspaceMember,
} from '@/lib/api/workspaceApi';
import { getCurrentUserId } from '@/lib/cookies';
import { mutate } from 'swr';

interface MemberListProps {
  members: WorkspaceMember[];
  workspaceId: number;
  workspaceType?: 'group' | 'personal' | 'dm';
  isEditing?: boolean;
  loading?: boolean;
}

const getRoleIcon = (role: string) => {
  switch (role) {
    case 'owner':
      return <Crown className='w-4 h-4 text-yellow-400' />;
    case 'admin':
      return <Shield className='w-4 h-4 text-blue-400' />;
    default:
      return <User className='w-4 h-4 text-text-muted' />;
  }
};

const getRoleBadgeStyles = (role: string) => {
  switch (role) {
    case 'owner':
      return 'bg-yellow-500/20 text-yellow-300';
    case 'admin':
      return 'bg-blue-500/20 text-blue-300';
    default:
      return 'bg-gray-500/20 text-text-secondary';
  }
};

const ROLE_RANK: Record<string, number> = { owner: 3, admin: 2, member: 1 };

function canKick(currentRole: string, targetRole: string): boolean {
  if (targetRole === 'owner') return false;
  return (ROLE_RANK[currentRole] ?? 0) >= (ROLE_RANK[targetRole] ?? 0);
}

export default function MemberList({
  members,
  workspaceId,
  workspaceType,
  isEditing = false,
  loading,
}: MemberListProps) {
  const router = useRouter();
  const currentUserId = getCurrentUserId();
  const [dmLoadingUserId, setDmLoadingUserId] = useState<string | null>(null);
  const [removingMemberId, setRemovingMemberId] = useState<number | null>(null);
  const [confirmRemoveId, setConfirmRemoveId] = useState<number | null>(null);

  const currentMember = members.find(m => m.user_id === currentUserId);
  const currentRole = currentMember?.role ?? 'member';

  const handleDmClick = async (userId: string) => {
    if (dmLoadingUserId) return;
    setDmLoadingUserId(userId);
    try {
      const result = await findOrCreateDmWorkspace(userId);
      mutate('/workspaces');
      router.push(`/workspace/${result.workspace_id}/chat`);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : JSON.stringify(error);
      console.error('Failed to create DM:', message);
    } finally {
      setDmLoadingUserId(null);
    }
  };

  const handleMinusClick = (memberId: number) => {
    setConfirmRemoveId(prev => (prev === memberId ? null : memberId));
  };

  const handleRemoveConfirm = async (memberId: number) => {
    if (removingMemberId) return;
    setRemovingMemberId(memberId);
    try {
      await removeWorkspaceMember(workspaceId, memberId);
      mutate(`/workspaces/${workspaceId}/members`);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : JSON.stringify(error);
      console.error('Failed to remove member:', message);
    } finally {
      setRemovingMemberId(null);
      setConfirmRemoveId(null);
    }
  };

  if (loading) {
    return (
      <div className='flex justify-center py-4'>
        <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-text-primary'></div>
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className='text-center py-8'>
        <User className='w-12 h-12 text-text-muted mx-auto mb-3' />
        <p className='text-text-muted'>No members in this workspace</p>
      </div>
    );
  }

  return (
    <div className='space-y-2'>
      {members.map(member => {
        const profile = member.user_profile ?? member.agent_profile ?? null;
        const isOtherUser =
          member.user_id &&
          member.user_id !== currentUserId &&
          !member.agent_id;
        const kickable =
          workspaceType !== 'dm' &&
          isOtherUser &&
          canKick(currentRole, member.role);
        const isConfirming = confirmRemoveId === member.id;
        const isRemoving = removingMemberId === member.id;

        return (
          <div
            key={member.id}
            className='relative overflow-hidden rounded-lg border border-border-default bg-surface-primary hover:bg-interactive-hover transition-colors'
          >
            <div className='flex items-center p-4'>
              {/* Edit mode: minus icon on left */}
              {isEditing && kickable && (
                <button
                  onClick={() => handleMinusClick(member.id)}
                  className='mr-3 flex-shrink-0 transition-transform'
                >
                  <MinusCircle className='w-5 h-5 text-red-400' />
                </button>
              )}

              {/* Avatar + info */}
              <div className='flex items-center gap-3 flex-1 min-w-0'>
                <Avatar className='h-10 w-10 border border-border-default bg-interactive-hover text-sm font-medium flex-shrink-0'>
                  {profile?.avatar_url ? (
                    <AvatarImage
                      src={profile.avatar_url}
                      alt={profile.name ?? 'Workspace member'}
                    />
                  ) : (
                    <AvatarFallback>
                      <User className='w-4 h-4 text-text-secondary' />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className='min-w-0'>
                  <p className='text-text-primary font-medium truncate'>
                    {profile?.name ?? 'Unknown'}
                  </p>
                  <p className='text-sm text-text-muted'>
                    Joined {new Date(member.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Right side: actions + role badge */}
              <div className='flex items-center gap-2 flex-shrink-0'>
                {isOtherUser && !isEditing && (
                  <button
                    onClick={() => handleDmClick(member.user_id!)}
                    disabled={!!dmLoadingUserId}
                    className='p-2 rounded-lg hover:bg-interactive-hover transition-colors disabled:opacity-50'
                    title='Direct Message'
                  >
                    {dmLoadingUserId === member.user_id ? (
                      <Loader2 className='w-4 h-4 text-text-muted animate-spin' />
                    ) : (
                      <MessageCircle className='w-4 h-4 text-text-muted' />
                    )}
                  </button>
                )}
                {getRoleIcon(member.role)}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeStyles(member.role)}`}
                >
                  {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                </span>
              </div>
            </div>

            {/* Confirmation bar: slides down when minus is clicked */}
            {isEditing && isConfirming && kickable && (
              <div className='flex items-center justify-between px-4 py-3 bg-red-500/10 border-t border-red-500/20'>
                <span className='text-sm text-red-600 dark:text-red-300'>
                  Remove this member?
                </span>
                <div className='flex items-center gap-2'>
                  <button
                    onClick={() => setConfirmRemoveId(null)}
                    className='px-3 py-1 text-xs rounded-md text-text-secondary hover:bg-interactive-hover transition-colors'
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleRemoveConfirm(member.id)}
                    disabled={!!removingMemberId}
                    className='px-3 py-1 text-xs rounded-md bg-red-500/20 text-red-600 dark:text-red-300 hover:bg-red-500/30 transition-colors disabled:opacity-50'
                  >
                    {isRemoving ? (
                      <Loader2 className='w-3 h-3 animate-spin inline' />
                    ) : (
                      'Remove'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
