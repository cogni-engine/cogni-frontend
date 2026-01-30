'use client';

import React from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  MessageSquare,
  FileText,
  EllipsisVertical,
  GitBranch,
} from 'lucide-react';
import GlassCard from '@/components/glass-design/GlassCard';
import GlassButton from '@/components/glass-design/GlassButton';
import { useWorkspace } from '@/hooks/useWorkspace';
import FolderActionButton from '@/components/FolderActionButton';
import WorkspaceActivityDrawer from '@/features/workspace/components/activity/WorkspaceActivityDrawer';
import WorkspaceDrawer from '@/features/workspace/components/WorkspaceDrawer';
import { WorkspaceProvider } from '@/features/workspace/contexts/WorkspaceContext';

type ViewType = 'chat' | 'notes';

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const workspaceId = parseInt(params.id as string);

  const { workspace } = useWorkspace(workspaceId);

  const getCurrentView = (): ViewType => {
    if (pathname.includes('/chat')) return 'chat';
    return 'notes';
  };

  const currentView = getCurrentView();

  const handleBackNavigation = () => {
    router.push('/workspace');
  };

  const [isActivityDrawerOpen, setIsActivityDrawerOpen] = React.useState(false);
  const [isWorkspaceDrawerOpen, setIsWorkspaceDrawerOpen] =
    React.useState(false);

  const basePath = `/workspace/${workspaceId}`;

  return (
    <WorkspaceProvider workspaceId={workspaceId} includeDeletedNotes={false}>
      <div className='flex flex-col h-full relative overflow-hidden'>
        {/* Header - Absolutely Positioned with Glass Effect */}
        <div className='absolute top-0 left-0 right-0 z-100 px-2 md:px-6 pt-4 pointer-events-none'>
          <div className='flex items-center gap-3 w-full pointer-events-auto'>
            <GlassButton
              onClick={handleBackNavigation}
              title='Go back'
              size='icon'
              className='size-12'
              data-shepherd-target='workspace-back-button'
            >
              <ArrowLeft className='w-5 h-5' />
            </GlassButton>
            <h1 className='flex-1 min-w-0 text-md font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent truncate'>
              {workspace ? workspace.title : 'Workspace'}
            </h1>
            {currentView === 'notes' && (
              <FolderActionButton workspaceId={workspaceId} />
            )}
            {currentView === 'chat' && (
              <GlassButton
                onClick={() => setIsActivityDrawerOpen(true)}
                title='Activity'
                size='icon'
                className='size-12'
              >
                <GitBranch className='w-5 h-5 text-white' />
              </GlassButton>
            )}
            <GlassButton
              onClick={() => setIsWorkspaceDrawerOpen(true)}
              title='Workspace settings'
              size='icon'
              className='size-12'
            >
              <EllipsisVertical className='w-5 h-5 text-white' />
            </GlassButton>
          </div>
        </div>

        {/* Navigation Tabs - Absolutely Positioned */}
        <div className='absolute w-full top-17 left-1/2 -translate-x-1/2 z-50 px-2 md:px-6 pointer-events-none'>
          <GlassCard className='overflow-hidden rounded-3xl border backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.15)] pointer-events-auto'>
            <div className='relative flex items-center p-1'>
              {/* Sliding background indicator */}
              <div
                className='absolute h-[calc(100%-8px)] rounded-2xl bg-white/10 backdrop-blur-sm transition-all duration-500 ease-out'
                style={{
                  width: 'calc(50% - 6px)',
                  left: currentView === 'chat' ? '4px' : 'calc(50% + 2px)',
                }}
              />

              <Link
                href={`${basePath}/chat`}
                prefetch={true}
                className={`relative z-10 flex flex-1 items-center justify-center gap-2 px-8 py-2 text-sm font-medium transition-colors duration-300 ${
                  currentView === 'chat'
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
                aria-current={currentView === 'chat' ? 'page' : undefined}
                data-shepherd-target='workspace-chat-button'
              >
                <MessageSquare className='w-4 h-4' />
                Chat
              </Link>
              <Link
                href={`${basePath}/notes`}
                prefetch={true}
                className={`relative z-10 flex flex-1 items-center justify-center gap-2 px-8 py-2 text-sm font-medium transition-colors duration-300 ${
                  currentView === 'notes'
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
                aria-current={currentView === 'notes' ? 'page' : undefined}
                data-shepherd-target='workspace-notes-button'
              >
                <FileText className='w-4 h-4' />
                Note
              </Link>
            </div>
          </GlassCard>
        </div>

        {/* Scrollable Content */}
        <div className='relative flex-1 overflow-y-auto'>{children}</div>

        {/* Workspace Activity Drawer */}
        <WorkspaceActivityDrawer
          open={isActivityDrawerOpen}
          onOpenChange={setIsActivityDrawerOpen}
          workspaceId={workspaceId}
        />

        {/* Workspace Drawer (Members + Settings) */}
        <WorkspaceDrawer
          open={isWorkspaceDrawerOpen}
          onOpenChange={setIsWorkspaceDrawerOpen}
          workspaceId={workspaceId}
        />
      </div>
    </WorkspaceProvider>
  );
}
