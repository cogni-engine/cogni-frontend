'use client';

import { useMemo, useState, useEffect } from 'react';
import {
  useWorkspaces,
  useWorkspaceMutations,
} from '@/features/workspace/hooks/useWorkspaces';
import WorkspaceList from '@/features/workspace/components/WorkspaceList';
import WorkspaceForm from '@/features/workspace/components/WorkspaceForm';
import { uploadWorkspaceIcon } from '@/lib/api/workspaceApi';
import type { Workspace } from '@/types/workspace';
import SearchBar from '@/components/SearchBar';
import { useIsInputActive } from '@/stores/useGlobalUIStore';
import ScrollableView from '@/components/layout/ScrollableView';

export default function WorkspacePage() {
  const { workspaces, isLoading, isValidating, error } = useWorkspaces();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { create, update } = useWorkspaceMutations();
  const isInputActive = useIsInputActive();
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
      const title =
        workspace.type === 'dm'
          ? (workspace.dm_other_user?.name || 'Direct Message').toLowerCase()
          : (workspace.title || 'Untitled Workspace').toLowerCase();
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
  }): Promise<number | void> => {
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

    console.log('WorkspacePage: create returned workspace:', workspace);

    if (!workspace?.id) {
      throw new Error('Failed to create workspace: No workspace ID returned');
    }

    if (iconFile) {
      const { iconUrl } = await uploadWorkspaceIcon(workspace.id, iconFile);
      await update(workspace.id, { icon_url: iconUrl });
    }

    console.log('WorkspacePage: Returning workspaceId:', workspace.id);
    // Return workspace ID for navigation
    return workspace.id;
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
    <div className='flex flex-col h-full relative overflow-hidden'>
      {/* Subtle loading indicator when revalidating (mounted 時のみ表示してハイドレーションエラーを回避) */}
      {mounted && isValidating && workspaces && (
        <div className='absolute top-0 left-0 right-0 h-0.5 bg-blue-500/50 animate-pulse z-50' />
      )}
      {/* スクロール可能エリア */}
      <ScrollableView className='pb-32 md:pb-24 overflow-x-hidden'>
        {/* mounted まで固定のプレースホルダーでハイドレーションエラーを回避 */}
        {!mounted ? (
          <div className='flex justify-center py-12'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-white' />
          </div>
        ) : (
          <>
            {/* Only show loading spinner when we have no data at all (no cache) */}
            {!workspaces && isLoading && (
              <div className='flex items-center justify-center py-12'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-white'></div>
              </div>
            )}

            {/* Show workspaces immediately if we have data (from cache or fresh) */}
            {workspaces && (filteredWorkspaces.length > 0 || !isSearching) && (
              <WorkspaceList workspaces={filteredWorkspaces} />
            )}

            {/* Show "no results" message only when we have data but search yields nothing */}
            {workspaces && filteredWorkspaces.length === 0 && isSearching && (
              <div className='rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-white/70'>
                No workspaces found matching &quot;{searchQuery.trim()}&quot;.
              </div>
            )}
          </>
        )}
      </ScrollableView>

      {/* Bottom Search Bar and Create Button */}
      <div
        className={`fixed left-0 right-0 z-51 px-4 md:px-6 py-4 transition-all duration-300 ${
          isInputActive ? 'bottom-0 md:bottom-[72px]' : 'bottom-[72px]'
        }`}
      >
        <div className='relative flex items-center gap-2 max-w-7xl mx-auto'>
          <SearchBar
            placeholder='Search workspaces...'
            value={searchQuery}
            onChange={event => setSearchQuery(event.target.value)}
          />
          <WorkspaceForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            workspaces={workspaces ?? undefined}
          />
        </div>
      </div>
    </div>
  );
}
