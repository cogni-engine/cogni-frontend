'use client';

import { useParams } from 'next/navigation';

import WorkspaceSettingsClient from '@/features/workspace/WorkspaceSettingsClient';

export default function WorkspaceMenuPage() {
  const params = useParams();
  const workspaceIdParam = params.id as string | undefined;
  const workspaceId = workspaceIdParam ? Number(workspaceIdParam) : NaN;

  if (!workspaceIdParam || Number.isNaN(workspaceId)) {
    return (
      <div className='flex h-full items-center justify-center text-red-300'>
        Invalid workspace identifier.
      </div>
    );
  }

  return <WorkspaceSettingsClient workspaceId={workspaceId} />;
}
