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
import { useWorkspaceNotes } from '@/hooks/useWorkspaceNotes';

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

  const { workspace } = useWorkspaceNotes(workspaceId);

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

  return (
    <div className='flex flex-col h-full bg-gradient-to-br from-slate-950 via-black to-slate-950 text-gray-100 p-4 md:p-6 relative overflow-hidden'>
      {/* Background Stars */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-1 h-1 bg-white/20 rounded-full animate-pulse'></div>
        <div className='absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-white/30 rounded-full animate-pulse delay-1000'></div>
        <div className='absolute bottom-1/4 left-1/3 w-0.5 h-0.5 bg-white/15 rounded-full animate-pulse delay-2000'></div>
        <div className='absolute top-2/3 right-1/4 w-1 h-1 bg-white/25 rounded-full animate-pulse delay-500'></div>
        <div className='absolute bottom-1/3 right-1/2 w-0.5 h-0.5 bg-white/20 rounded-full animate-pulse delay-1500'></div>
      </div>

      <div className='relative z-10 flex flex-col h-full'>
        <div className='flex flex-col gap-3'>
          {/* Header */}
          <div className='flex items-center gap-3 w-full'>
            <button
              onClick={handleBackNavigation}
              className='p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors'
              title='Go back'
            >
              <ArrowLeft className='w-5 h-5 text-white' />
            </button>
            <h1 className='flex-1 min-w-0 text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent truncate'>
              {workspace ? workspace.title : 'Workspace'}
            </h1>
            <div className='relative' ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(prev => !prev)}
                className='p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors'
                aria-haspopup='menu'
                aria-expanded={isMenuOpen}
                aria-label='Open workspace menu'
                title='More actions'
              >
                <EllipsisVertical className='w-5 h-5 text-white' />
              </button>
              {isMenuOpen && (
                <div
                  role='menu'
                  className='absolute right-0 mt-2 w-45 rounded-md border border-white/10 bg-black/90 backdrop-blur shadow-lg z-20'
                >
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
                    Workspace Settings
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Tabs */}
          {(currentView === 'chat' || currentView === 'notes') && (
            <div className='relative flex w-full justify-center -mb-4'>
              <div className='flex w-full max-w-md divide-x divide-white/15 overflow-hidden rounded-3xl border border-white/15 bg-white/10 backdrop-blur-md shadow-[0_20px_45px_rgba(15,23,42,0.45)]'>
                <button
                  onClick={() => handleViewChange('chat')}
                  className={`flex flex-1 items-center justify-center gap-2 px-6 py-2 text-sm font-medium transition-colors ${
                    currentView === 'chat'
                      ? 'text-white bg-white/10'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  aria-current={currentView === 'chat' ? 'page' : undefined}
                >
                  <MessageSquare className='w-4 h-4' />
                  Chat
                </button>
                <button
                  onClick={() => handleViewChange('notes')}
                  className={`flex flex-1 items-center justify-center gap-2 px-6 py-2 text-sm font-medium transition-colors ${
                    currentView === 'notes'
                      ? 'text-white bg-white/10'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  aria-current={currentView === 'notes' ? 'page' : undefined}
                >
                  <FileText className='w-4 h-4' />
                  Notes
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className='flex-1 overflow-y-auto pt-6'>{children}</div>
      </div>
    </div>
  );
}
