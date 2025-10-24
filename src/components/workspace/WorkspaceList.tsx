'use client';

import { useState } from 'react';
import type { Workspace } from '@/types/workspace';
import { PencilIcon, Trash2 as TrashIcon } from 'lucide-react';

interface WorkspaceListProps {
  workspaces: Workspace[];
  onEdit: (workspace: Workspace) => void;
  onDelete: (id: number) => Promise<void>;
}

export default function WorkspaceList({
  workspaces,
  onEdit,
  onDelete,
}: WorkspaceListProps) {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this workspace?')) {
      return;
    }

    setDeletingId(id);
    try {
      await onDelete(id);
    } catch (err) {
      console.error('Failed to delete workspace:', err);
      alert('Failed to delete workspace');
    } finally {
      setDeletingId(null);
    }
  };

  if (workspaces.length === 0) {
    return (
      <div className='text-center py-12'>
        <div className='text-gray-500 text-lg mb-2'>No workspaces yet</div>
        <div className='text-gray-600 text-sm'>
          Create your first workspace to get started
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      {workspaces.map(workspace => (
        <WorkspaceCard
          key={workspace.id}
          workspace={workspace}
          onEdit={onEdit}
          onDelete={handleDelete}
          isDeleting={deletingId === workspace.id}
        />
      ))}
    </div>
  );
}

interface WorkspaceCardProps {
  workspace: Workspace;
  onEdit: (workspace: Workspace) => void;
  onDelete: (id: number) => void;
  isDeleting: boolean;
}

function WorkspaceCard({
  workspace,
  onEdit,
  onDelete,
  isDeleting,
}: WorkspaceCardProps) {
  return (
    <div className='bg-white/8 backdrop-blur-md hover:bg-white/12 transition-all rounded-2xl p-5 border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]'>
      <div className='flex items-center justify-between gap-3'>
        <div className='flex-1 min-w-0'>
          <h3 className='text-base font-semibold text-white mb-1 truncate'>
            {workspace.title || 'Untitled Workspace'}
          </h3>
          <div className='flex items-center gap-2'>
            <span
              className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                workspace.type === 'personal'
                  ? 'bg-blue-500/10 text-blue-400'
                  : 'bg-purple-500/10 text-purple-400'
              }`}
            >
              {workspace.type}
            </span>
            <span className='text-xs text-gray-600'>
              {new Date(workspace.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className='flex gap-1.5 shrink-0'>
          <button
            onClick={() => onEdit(workspace)}
            disabled={isDeleting}
            className='p-2 bg-gray-950 hover:bg-gray-900 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <PencilIcon className='w-4 h-4' />
          </button>
          <button
            onClick={() => onDelete(workspace.id)}
            disabled={isDeleting}
            className='p-2 bg-red-600/10 hover:bg-red-600/20 text-red-400 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <TrashIcon className='w-4 h-4' />
          </button>
        </div>
      </div>
    </div>
  );
}
