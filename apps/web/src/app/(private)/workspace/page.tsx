'use client';

import { useMemo, useState } from 'react';
import { useWorkspaces, useWorkspaceMutations } from '@/hooks/useWorkspace';
import WorkspaceList from '@/features/workspace/components/WorkspaceList';
import WorkspaceForm from '@/features/workspace/components/WorkspaceForm';
import {
  uploadWorkspaceIcon,
  addWorkspaceMembers,
} from '@/lib/api/workspaceApi';
import type { Workspace } from '@/types/workspace';
import SearchBar from '@/components/SearchBar';
import { useGlobalUI } from '@/contexts/GlobalUIContext';
import ScrollableView from '@/components/layout/ScrollableView';

export default function WorkspacePage() {
  const { workspaces, isLoading, error } = useWorkspaces();
  const { create, update } = useWorkspaceMutations();
  const { isInputActive } = useGlobalUI();
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
    selectedUserIds,
  }: {
    id: number | null;
    title: string;
    iconFile: File | null;
    selectedUserIds?: string[];
  }) => {
    if (id) {
      // Edit mode - no member addition
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

    // Create mode
    const workspace = await create(title);

    if (!workspace?.id) {
      throw new Error('Failed to create workspace');
    }

    // Upload icon if provided
    if (iconFile) {
      const { iconUrl } = await uploadWorkspaceIcon(workspace.id, iconFile);
      await update(workspace.id, { icon_url: iconUrl });
    }

    // Add members if provided (using Supabase RPC function)
    if (selectedUserIds && selectedUserIds.length > 0) {
      try {
        await addWorkspaceMembers(workspace.id, selectedUserIds);
      } catch (error) {
        console.error('Failed to add members to workspace:', error);
        // Don't throw - workspace is already created, just log the error
      }
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
    <div className='flex flex-col h-full relative overflow-hidden'>
      {/* スクロール可能エリア */}
      <ScrollableView className='pb-32 md:pb-24 overflow-x-hidden'>
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
      </ScrollableView>

      {/* Bottom Search Bar and Create Button */}
      <div
        className={`fixed left-0 right-0 z-100 px-4 md:px-6 py-4 transition-all duration-300 ${
          isInputActive ? 'bottom-0 md:bottom-[72px]' : 'bottom-[72px]'
        }`}
      >
        <div className='relative flex items-center gap-2 max-w-7xl mx-auto'>
          <SearchBar
            placeholder='Search workspaces...'
            value={searchQuery}
            onChange={event => setSearchQuery(event.target.value)}
          />
          <WorkspaceForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
