'use client';

import React from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import {
  ArrowLeft,
  MessageSquare,
  FileText,
  EllipsisVertical,
} from 'lucide-react';
import { useWorkspaceNotes } from '@/hooks/useWorkspaceNotes';

type ViewType = 'chat' | 'notes' | 'members';

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
    if (pathname.includes('/chat')) return 'chat';
    return 'notes';
  };

  const currentView = getCurrentView();

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
        <div className='flex flex-col'>
          {/* Header */}
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center gap-3'>
              <button
                onClick={() => router.back()}
                className='p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors'
                title='Go back'
              >
                <ArrowLeft className='w-5 h-5 text-white' />
              </button>
              <h1 className='text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>
                {workspace ? workspace.title : 'Workspace'}
              </h1>
            </div>
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
                  className='absolute right-0 mt-2 w-40 rounded-md border border-white/10 bg-black/90 backdrop-blur shadow-lg z-20'
                >
                  <button
                    role='menuitem'
                    onClick={() => {
                      setIsMenuOpen(false);
                      router.push(`${basePath}/members`);
                    }}
                    className='w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-white/10 rounded-md flex items-center gap-2'
                  >
                    Members
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Tabs */}
          {currentView !== 'members' && (
            <div className='w-full flex items-center gap-1 bg-white/8 border border-white/10 rounded-lg p-1'>
              <button
                onClick={() => handleViewChange('chat')}
                className={`w-1/2 flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  currentView === 'chat'
                    ? 'bg-white/20 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <MessageSquare className='w-4 h-4' />
                Chat
              </button>
              <button
                onClick={() => handleViewChange('notes')}
                className={`w-1/2 flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  currentView === 'notes'
                    ? 'bg-white/20 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <FileText className='w-4 h-4' />
                Notes
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className='flex-1 overflow-y-auto'>{children}</div>
      </div>
    </div>
  );
}
