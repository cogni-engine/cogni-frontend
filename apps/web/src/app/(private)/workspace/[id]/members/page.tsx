'use client';

import { useParams } from 'next/navigation';
import { useState, useCallback } from 'react';
import { useSWRConfig } from 'swr';
import MemberList from '@/features/workspace/components/MemberList';
import MemberInviteDrawer from '@/features/workspace/components/MemberInviteDrawer';
import { Plus } from 'lucide-react';
import GlassButton from '@/components/glass-design/GlassButton';
import { useWorkspaceContext } from '@/features/workspace/contexts/WorkspaceContext';
export default function WorkspaceMembersPage() {
  const params = useParams();
  const workspaceId = parseInt(params.id as string);
  const { mutate } = useSWRConfig();

  const [isInviteDrawerOpen, setIsInviteDrawerOpen] = useState(false);

  const { members, membersLoading, membersError } = useWorkspaceContext();

  const handleMembersAdded = useCallback(async () => {
    await mutate(`/workspaces/${workspaceId}/members`);
  }, [workspaceId, mutate]);

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
          <h2 className='text-xl font-semibold text-white'>Members</h2>
          <GlassButton
            onClick={() => setIsInviteDrawerOpen(true)}
            title='Invite'
            className='gap-2 px-4'
          >
            <Plus className='w-5 h-5 text-white' />
            Invite
          </GlassButton>
        </div>

        {membersError && (
          <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-300'>
            Failed to load members
          </div>
        )}
        <MemberList members={members} loading={membersLoading} />
      </div>
    </>
  );
}
