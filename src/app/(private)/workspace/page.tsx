'use client';

import { useMemo, useState } from 'react';
import { useWorkspaces, useWorkspaceMutations } from '@/hooks/useWorkspace';
import WorkspaceList from '@/features/workspace/components/WorkspaceList';
import WorkspaceForm from '@/features/workspace/components/WorkspaceForm';
import { uploadWorkspaceIcon } from '@/lib/api/workspaceApi';
import type { Workspace } from '@/types/workspace';

export default function WorkspacePage() {
  const { workspaces, isLoading, error } = useWorkspaces();
  const { create, update } = useWorkspaceMutations();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWorkspaces = useMemo(() => {
    if (!workspaces) {
      return [];
    }

    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return workspaces;
    }

    return workspaces.filter(workspace => {
      const title = (workspace.title || 'Untitled Workspace').toLowerCase();
      const typeLabel = workspace.type.toLowerCase();
      return title.includes(query) || typeLabel.includes(query);
    });
  }, [workspaces, searchQuery]);

  const isSearching = searchQuery.trim().length > 0;

  const handleSubmit = async ({
    id,
    title,
    iconFile,
  }: {
    id: number | null;
    title: string;
    iconFile: File | null;
  }) => {
    if (id) {
      const updates: Partial<Pick<Workspace, 'title' | 'icon_url'>> = {
        title,
      };

      if (iconFile) {
        const { iconUrl } = await uploadWorkspaceIcon(id, iconFile);
        updates.icon_url = iconUrl;
      }

      await update(id, updates);
      return;
    }

    const workspace = await create(title);

    if (iconFile && workspace?.id) {
      const { iconUrl } = await uploadWorkspaceIcon(workspace.id, iconFile);
      await update(workspace.id, { icon_url: iconUrl });
    }
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
    <div className='flex flex-col h-full bg-gradient-to-br from-slate-950 via-black to-slate-950 text-gray-100 relative overflow-hidden'>
      {/* 固定ヘッダー（検索バー + 新規作成ボタン） */}
      <div className='relative z-20 px-4 md:px-6 pt-4 md:pt-6 pb-4 bg-gradient-to-br from-slate-950 via-black to-slate-950'>
        <div className='flex items-center justify-between w-full gap-3'>
          <div className='flex items-center bg-white/8 backdrop-blur-xl text-white px-4 py-3 rounded-4xl flex-1 border border-black focus-within:border-black shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] focus-within:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] transition-all duration-300 w-full'>
            <svg
              width='18'
              height='18'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='text-gray-400 mr-2'
            >
              <circle cx='11' cy='11' r='8'></circle>
              <path d='m21 21-4.35-4.35'></path>
            </svg>
            <input
              type='text'
              placeholder='Search workspaces...'
              value={searchQuery}
              onChange={event => setSearchQuery(event.target.value)}
              className='bg-transparent outline-none text-sm text-white w-full placeholder-gray-500'
            />
            <svg
              width='18'
              height='18'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='text-gray-400 ml-2'
            >
              <path d='M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z'></path>
              <path d='M19 10v2a7 7 0 0 1-14 0v-2'></path>
              <line x1='12' y1='19' x2='12' y2='22'></line>
            </svg>
          </div>
          <WorkspaceForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>

      {/* スクロール可能エリア */}
      <div
        className='relative z-10 flex-1 overflow-y-auto px-4 md:px-6 pb-4'
        style={{
          willChange: 'scroll-position',
          transform: 'translateZ(0)',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {isLoading && (
          <div className='flex items-center justify-center py-12'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-white'></div>
          </div>
        )}

        {!isLoading &&
          workspaces &&
          (filteredWorkspaces.length > 0 || !isSearching) && (
            <WorkspaceList workspaces={filteredWorkspaces} />
          )}

        {!isLoading &&
          workspaces &&
          filteredWorkspaces.length === 0 &&
          isSearching && (
            <div className='rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-white/70'>
              No workspaces found matching &quot;{searchQuery.trim()}&quot;.
            </div>
          )}
      </div>
    </div>
  );
}
