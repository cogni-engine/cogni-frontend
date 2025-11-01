'use client';

import { useWorkspaces, useWorkspaceMutations } from '@/hooks/useWorkspace';
import WorkspaceList from '@/features/workspace/components/WorkspaceList';
import WorkspaceForm from '@/features/workspace/components/WorkspaceForm';

export default function WorkspacePage() {
  const { workspaces, isLoading, error } = useWorkspaces();
  const { create } = useWorkspaceMutations();

  const handleSubmit = async (id: number | null, title: string) => {
    await create(title);
  };

  if (error) {
    return (
      <div className='min-h-screen bg-black flex items-center justify-center'>
        <div className='text-center'>
          <div className='text-red-400 text-xl mb-2'>
            Failed to load workspaces
          </div>
          <div className='text-gray-400 text-sm'>
            {error instanceof Error ? error.message : 'Unknown error'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-black'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        {/* Header */}
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h1 className='text-3xl font-bold text-white mb-2'>Workspaces</h1>
          </div>
          <WorkspaceForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className='flex items-center justify-center py-12'>
            <div className='text-gray-400 text-lg'>Loading workspaces...</div>
          </div>
        )}

        {/* Workspace List */}
        {!isLoading && workspaces && <WorkspaceList workspaces={workspaces} />}
      </div>
    </div>
  );
}
