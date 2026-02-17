'use client';

import { useParams } from 'next/navigation';
import { useState, useCallback } from 'react';
import { useSWRConfig } from 'swr';
import MemberList from '@/features/workspace/components/MemberList';
import MemberInviteDrawer from '@/features/workspace/components/MemberInviteDrawer';
import { Plus } from 'lucide-react';
import GlassButton from '@/components/glass-design/GlassButton';
import { useWorkspaceContext } from '@/features/workspace/contexts/WorkspaceContext';
import { useWorkspace } from '@/hooks/useWorkspace';

export default function WorkspaceMembersPage() {
  const params = useParams();
  const workspaceId = parseInt(params.id as string);
  const { mutate } = useSWRConfig();

  const [isInviteDrawerOpen, setIsInviteDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { members, membersLoading, membersError } = useWorkspaceContext();
  const { workspace } = useWorkspace(workspaceId);

  const handleMembersAdded = useCallback(async () => {
    await mutate(`/workspaces/${workspaceId}/members`);
  }, [workspaceId, mutate]);

  const canEdit = workspace?.type !== 'dm' && members.length > 1;

  return (
    <>
      {/* Member Invite Drawer */}
      <MemberInviteDrawer
        isOpen={isInviteDrawerOpen}
        onClose={() => setIsInviteDrawerOpen(false)}
        workspaceId={workspaceId}
        onMembersAdded={handleMembersAdded}
      />

      <div className='h-full overflow-y-auto space-y-6 py-20 px-4'>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold text-text-primary'>Members</h2>
          <div className='flex items-center gap-2'>
            {canEdit && (
              <GlassButton
                onClick={() => setIsEditing(prev => !prev)}
                className='px-4'
              >
                {isEditing ? 'Done' : 'Edit'}
              </GlassButton>
            )}
            <GlassButton
              onClick={() => setIsInviteDrawerOpen(true)}
              title='Invite'
              className='gap-2 px-4'
            >
              <Plus className='w-5 h-5 text-text-primary' />
              Invite
            </GlassButton>
          </div>
        </div>

        {membersError && (
          <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-600 dark:text-red-300'>
            Failed to load members
          </div>
        )}
        <MemberList
          members={members}
          workspaceId={workspaceId}
          workspaceType={workspace?.type}
          isEditing={isEditing}
          loading={membersLoading}
        />
      </div>
    </>
  );
}
