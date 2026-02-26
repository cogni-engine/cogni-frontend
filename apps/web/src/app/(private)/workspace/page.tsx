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
  const { workspaces, isLoading, error } = useWorkspaces();
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
      <div className='min-h-screen bg-background flex items-center justify-center'>
        <div className='text-center'>
          <div className='text-red-500 dark:text-red-400 text-xl mb-2'>
            Failed to load workspaces
          </div>
          <div className='text-text-muted text-sm'>
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
        {/* mounted まで固定のプレースホルダーでハイドレーションエラーを回避 */}
        {!mounted || (!workspaces && isLoading) ? (
          <>
            <style>
              {`
                @keyframes shimmer {
                  0% { background-position: 100% 0; }
                  100% { background-position: -100% 0; }
                }
              `}
            </style>
            <div className='flex flex-col py-18 px-2'>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className='px-5 py-2'>
                  <div className='flex items-center gap-3 py-2'>
                    <div
                      className='h-12 w-12 rounded-full shrink-0'
                      style={{
                        background:
                          'linear-gradient(90deg, var(--surface-primary) 25%, var(--surface-secondary) 50%, var(--surface-primary) 75%)',
                        backgroundSize: '400% 100%',
                        animation: 'shimmer 2s ease-in-out infinite',
                      }}
                    />
                    <div className='flex-1 min-w-0'>
                      <div
                        className='rounded h-[21px] w-2/5 mb-1.5'
                        style={{
                          background:
                            'linear-gradient(90deg, var(--surface-primary) 25%, var(--surface-secondary) 50%, var(--surface-primary) 75%)',
                          backgroundSize: '400% 100%',
                          animation: 'shimmer 2s ease-in-out infinite',
                        }}
                      />
                      <div
                        className='rounded h-[16px] w-3/5'
                        style={{
                          background:
                            'linear-gradient(90deg, var(--surface-primary) 25%, var(--surface-secondary) 50%, var(--surface-primary) 75%)',
                          backgroundSize: '400% 100%',
                          animation: 'shimmer 2s ease-in-out infinite',
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>

            {/* Show workspaces immediately if we have data (from cache or fresh) */}
            {workspaces && (filteredWorkspaces.length > 0 || !isSearching) && (
              <WorkspaceList workspaces={filteredWorkspaces} />
            )}

            {/* Show "no results" message only when we have data but search yields nothing */}
            {workspaces && filteredWorkspaces.length === 0 && isSearching && (
              <div className='rounded-2xl border border-border-default bg-surface-primary p-8 text-center text-text-secondary'>
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
