'use client';

import { useParams } from 'next/navigation';
import { useState, useCallback } from 'react';
import { useSWRConfig } from 'swr';
import MemberList from '@/features/workspace/components/MemberList';
import MemberInviteDrawer from '@/features/workspace/components/MemberInviteDrawer';
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
      <MemberInviteDrawer
        isOpen={isInviteDrawerOpen}
        onClose={() => setIsInviteDrawerOpen(false)}
        workspaceId={workspaceId}
        onMembersAdded={handleMembersAdded}
      />

      <div className='h-full overflow-y-auto py-20 px-4'>
        {membersError && (
          <div className='rounded-lg p-4 text-white/60'>
            Failed to load members
          </div>
        )}
        <MemberList
          members={members}
          loading={membersLoading}
          onInviteClick={() => setIsInviteDrawerOpen(true)}
        />
      </div>
    </>
  );
}
