'use client';

import React from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import {
  ArrowLeft,
  MessageSquare,
  FileText,
  EllipsisVertical,
  Users,
  Settings,
} from 'lucide-react';
import GlassCard from '@/components/glass-design/GlassCard';
import GlassButton from '@/components/glass-design/GlassButton';
import { useWorkspace } from '@/hooks/useWorkspace';
import FolderActionButton from '@/components/FolderActionButton';
import { useNoteFolders } from '@/features/notes/hooks/useNoteFolders';
import { useNotes } from '@/features/notes/hooks/useNotes';

type ViewType = 'chat' | 'notes' | 'members' | 'menu';

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

  const {
    folders,
    updateFolder,
    deleteFolder,
    createFolder: createFolderHook,
    refetch: refetchFolders,
  } = useNoteFolders({
    workspaceId: workspaceId || 0,
  });

  // Get deleted notes count for trash folder
  const { notes } = useNotes({
    workspaceId: workspaceId || 0,
    includeDeleted: true,
  });
  const trashCount = notes.filter(note => note.deleted_at).length;

  // Wrap createFolder to refetch and notify
  const createFolder = async (title: string) => {
    const newFolder = await createFolderHook(title);
    await refetchFolders();
    window.dispatchEvent(new CustomEvent('folders-updated'));
    return newFolder;
  };

  const handleUpdateFolder = async (id: number, title: string) => {
    const updated = await updateFolder(id, title);
    await refetchFolders();
    window.dispatchEvent(new CustomEvent('folders-updated'));
    return updated;
  };

  const handleDeleteFolder = async (id: number) => {
    await deleteFolder(id);
    await refetchFolders();
    window.dispatchEvent(new CustomEvent('folders-updated'));
  };

  const getCurrentView = (): ViewType => {
    if (pathname.includes('/members')) return 'members';
    if (pathname.includes('/menu')) return 'menu';
    if (pathname.includes('/chat')) return 'chat';
    return 'notes';
  };

  const currentView = getCurrentView();

  const handleBackNavigation = () => {
    if (currentView === 'members' || currentView === 'menu') {
      router.push(`${basePath}/chat`);
      return;
    }

    router.push('/workspace');
  };

  const handleViewChange = (view: ViewType) => {
    const basePath = `/workspace/${workspaceId}`;
    switch (view) {
      case 'notes':
        router.push(`${basePath}/notes`);
        break;
      case 'chat':
        router.push(`${basePath}/chat`);
        break;
      case 'members':
        router.push(`${basePath}/members`);
        break;
      case 'menu':
        router.push(`${basePath}/menu`);
        break;
    }
  };

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setIsMenuOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const basePath = `/workspace/${workspaceId}`;
  console.log(workspace);

  return (
    <div className='flex flex-col h-full relative overflow-hidden'>
      {/* Header - Absolutely Positioned with Glass Effect */}
      <div className='absolute top-0 left-0 right-0 z-100 px-4 md:px-6 pt-4 md:pt-6 pointer-events-none'>
        <div className='flex items-center gap-3 w-full pointer-events-auto'>
          <GlassButton
            onClick={handleBackNavigation}
            title='Go back'
            size='icon'
            className='size-12'
          >
            <ArrowLeft className='w-5 h-5' />
          </GlassButton>
          <h1 className='flex-1 min-w-0 text-xl font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent truncate'>
            {workspace ? workspace.title : 'Workspace'}
          </h1>
          {currentView === 'notes' && (
            <FolderActionButton
              folders={folders}
              onUpdateFolder={handleUpdateFolder}
              onDeleteFolder={handleDeleteFolder}
              onCreateFolder={createFolder}
              trashCount={trashCount}
              onTrashClick={() => {
                window.dispatchEvent(new CustomEvent('trash-folder-selected'));
              }}
            />
          )}
          <div className='relative' ref={menuRef}>
            <GlassButton
              onClick={() => setIsMenuOpen(prev => !prev)}
              aria-haspopup='menu'
              aria-expanded={isMenuOpen}
              aria-label='Open workspace menu'
              title='More actions'
              className='size-12'
            >
              <EllipsisVertical className='w-5 h-5 text-white' />
            </GlassButton>
            {isMenuOpen && (
              <div className='absolute right-0 mt-2 z-110'>
                <GlassCard role='menu' className='w-40 rounded-lg p-1'>
                  <button
                    role='menuitem'
                    onClick={() => {
                      setIsMenuOpen(false);
                      router.push(`${basePath}/members`);
                    }}
                    className='w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-white/10 rounded-md flex items-center gap-2'
                  >
                    <Users className='w-4 h-4' />
                    Members
                  </button>
                  <button
                    role='menuitem'
                    onClick={() => {
                      setIsMenuOpen(false);
                      router.push(`${basePath}/menu`);
                    }}
                    className='w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-white/10 rounded-md flex items-center gap-2'
                  >
                    <Settings className='w-4 h-4' />
                    Settings
                  </button>
                </GlassCard>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs - Absolutely Positioned */}
      {(currentView === 'chat' || currentView === 'notes') && (
        <div className='absolute w-full top-17 left-1/2 -translate-x-1/2 z-50 px-4 md:px-6 pointer-events-none'>
          <GlassCard className='flex w-full divide-x divide-white/10 overflow-hidden rounded-3xl border backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.15)] pointer-events-auto'>
            <button
              onClick={() => handleViewChange('chat')}
              className={`flex flex-1 items-center justify-center gap-2 px-8 py-2.5 text-sm font-medium transition-all duration-300 ${
                currentView === 'chat'
                  ? 'text-white bg-white/10'
                  : 'text-gray-400 hover:text-white bg-black/10'
              }`}
              aria-current={currentView === 'chat' ? 'page' : undefined}
            >
              <MessageSquare className='w-4 h-4' />
              Chat
            </button>
            <button
              onClick={() => handleViewChange('notes')}
              className={`flex flex-1 items-center justify-center gap-2 px-8 py-2.5 text-sm font-medium transition-all duration-300 ${
                currentView === 'notes'
                  ? 'text-white bg-white/10'
                  : 'text-gray-400 hover:text-white bg-black/10'
              }`}
              aria-current={currentView === 'notes' ? 'page' : undefined}
            >
              <FileText className='w-4 h-4' />
              Notes
            </button>
          </GlassCard>
        </div>
      )}

      {/* Scrollable Content */}
      <div className='relative flex-1 overflow-y-auto'>{children}</div>
    </div>
  );
}
