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
      return <Crown className='w-3.5 h-3.5' />;
    case 'admin':
      return <Shield className='w-3.5 h-3.5' />;
    default:
      return null;
  }
};

const getRoleBadgeStyles = (role: string) => {
  switch (role) {
    case 'owner':
      return 'bg-interactive-active text-text-primary';
    case 'admin':
      return 'bg-surface-secondary text-text-secondary';
    default:
      return 'bg-surface-secondary text-text-muted';
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
      <div className='flex justify-center py-6'>
        <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-text-primary' />
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className='text-center py-8'>
        <User className='w-12 h-12 text-text-muted mx-auto mb-3' />
        <p className='text-text-muted text-sm'>No members in this workspace</p>
      </div>
    );
  }

  return (
    <div className='space-y-0.5'>
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
          <div key={member.id} className='overflow-hidden rounded-2xl'>
            <div
              className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-colors group ${
                isConfirming ? 'bg-red-500/10' : 'hover:bg-interactive-hover'
              }`}
            >
              {/* Edit mode: minus icon */}
              {isEditing && kickable && (
                <button
                  onClick={() => handleMinusClick(member.id)}
                  className='flex-shrink-0 transition-transform'
                >
                  <MinusCircle className='w-5 h-5 text-red-400' />
                </button>
              )}

              {/* Avatar */}
              <Avatar className='h-10 w-10 border border-border-default text-sm font-medium flex-shrink-0'>
                {profile?.avatar_url ? (
                  <AvatarImage
                    src={profile.avatar_url}
                    alt={profile.name ?? 'Workspace member'}
                  />
                ) : (
                  <AvatarFallback className='bg-surface-primary'>
                    <User className='w-4 h-4 text-text-secondary' />
                  </AvatarFallback>
                )}
              </Avatar>

              {/* Name + join date */}
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium text-text-primary truncate'>
                  {profile?.name ?? 'Unknown'}
                </p>
                <p className='text-xs text-text-muted'>
                  Joined {new Date(member.created_at).toLocaleDateString()}
                </p>
              </div>

              {/* Right: DM + role badge */}
              <div className='flex items-center gap-2 flex-shrink-0'>
                {isOtherUser && !isEditing && (
                  <button
                    onClick={() => handleDmClick(member.user_id!)}
                    disabled={!!dmLoadingUserId}
                    className='p-2 rounded-full hover:bg-interactive-hover transition-colors disabled:opacity-50 opacity-0 group-hover:opacity-100'
                    title='Direct Message'
                  >
                    {dmLoadingUserId === member.user_id ? (
                      <Loader2 className='w-4 h-4 text-text-muted animate-spin' />
                    ) : (
                      <MessageCircle className='w-4 h-4 text-text-muted' />
                    )}
                  </button>
                )}
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeStyles(member.role)}`}
                >
                  {getRoleIcon(member.role)}
                  {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                </span>
              </div>
            </div>

            {/* Confirmation row */}
            {isEditing && isConfirming && kickable && (
              <div className='flex items-center justify-between px-3 py-2'>
                <span className='text-xs text-red-600 dark:text-red-300'>
                  Remove this member?
                </span>
                <div className='flex items-center gap-2'>
                  <button
                    onClick={() => setConfirmRemoveId(null)}
                    className='px-3 py-1 text-xs rounded-full text-text-secondary hover:bg-interactive-hover transition-colors'
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleRemoveConfirm(member.id)}
                    disabled={!!removingMemberId}
                    className='px-3 py-1 text-xs rounded-full bg-red-500/20 text-red-600 dark:text-red-300 hover:bg-red-500/30 transition-colors disabled:opacity-50'
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
