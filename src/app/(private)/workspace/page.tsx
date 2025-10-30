'use client';

import { useState } from 'react';
import { useWorkspaces, useWorkspaceMutations } from '@/hooks/useWorkspace';
import WorkspaceList from '@/components/workspace/WorkspaceList';
import WorkspaceForm from '@/components/workspace/WorkspaceForm';
import type { Workspace } from '@/types/workspace';

export default function WorkspacePage() {
  const { workspaces, isLoading, error } = useWorkspaces();
  const { create, update, remove } = useWorkspaceMutations();

  const [editingWorkspace, setEditingWorkspace] = useState<Workspace | null>(
    null
  );

  const handleEdit = (workspace: Workspace) => {
    setEditingWorkspace(workspace);
  };

  const handleSubmit = async (id: number | null, title: string) => {
    if (id) {
      await update(id, { title, type: 'group' });
    } else {
      await create(title);
    }
  };

  const handleEditComplete = () => {
    setEditingWorkspace(null);
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
          <WorkspaceForm
            workspace={editingWorkspace}
            onSubmit={handleSubmit}
            onEditComplete={handleEditComplete}
            isLoading={isLoading}
          />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className='flex items-center justify-center py-12'>
            <div className='text-gray-400 text-lg'>Loading workspaces...</div>
          </div>
        )}

        {/* Workspace List */}
        {!isLoading && workspaces && (
          <WorkspaceList
            workspaces={workspaces}
            onEdit={handleEdit}
            onDelete={remove}
          />
        )}
      </div>
    </div>
  );
}
