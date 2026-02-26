'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import MemberList from '@/features/workspace/components/MemberList';
import MemberInviteDrawer from '@/features/workspace/components/MemberInviteDrawer';
import GlassCard from '@/components/glass-design/GlassCard';
import GlassButton from '@/components/glass-design/GlassButton';
import { useWorkspaceContext } from '@/features/workspace/contexts/WorkspaceContext';
import { useWorkspace } from '@/hooks/useWorkspace';

export default function WorkspaceMembersPage() {
  const params = useParams();
  const workspaceId = parseInt(params.id as string);

  const [isEditing, setIsEditing] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const { members, membersLoading, membersError } = useWorkspaceContext();
  const { workspace } = useWorkspace(workspaceId);

  const canEdit = workspace?.type !== 'dm' && members.length > 1;

  return (
    <div className='h-full overflow-y-auto py-20 px-4'>
      {membersError && (
        <div className='mb-4 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-sm text-red-600 dark:text-red-300'>
          Failed to load members
        </div>
      )}

      <GlassCard className='rounded-3xl border border-border-default'>
        {/* Header */}
        <div className='flex items-center justify-between px-4 py-3'>
          <div className='flex items-center gap-2'>
            <h2 className='text-base font-semibold text-text-primary'>
              Members
            </h2>
            {!membersLoading && members.length > 0 && (
              <span className='text-xs text-text-muted'>{members.length}</span>
            )}
          </div>
          <div className='flex items-center gap-1.5'>
            {workspace?.type !== 'dm' && (
              <GlassButton
                onClick={() => setIsInviteOpen(true)}
                size='sm'
                className='gap-1.5 px-3'
              >
                <Plus className='w-3.5 h-3.5' />
                Invite
              </GlassButton>
            )}
            {canEdit && (
              <GlassButton
                onClick={() => setIsEditing(prev => !prev)}
                variant='ghost'
                size='sm'
                className='px-3'
              >
                {isEditing ? 'Done' : 'Edit'}
              </GlassButton>
            )}
          </div>
        </div>

        {/* List */}
        <div className='px-2 pb-2'>
          <MemberList
            members={members}
            workspaceId={workspaceId}
            workspaceType={workspace?.type}
            isEditing={isEditing}
            loading={membersLoading}
          />
        </div>
      </GlassCard>

      <MemberInviteDrawer
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        workspaceId={workspaceId}
      />
    </div>
  );
}
