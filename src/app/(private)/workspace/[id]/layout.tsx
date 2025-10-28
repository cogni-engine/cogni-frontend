'use client';

import { useParams, useRouter, usePathname } from 'next/navigation';
import { ArrowLeft, MessageSquare, FileText, Users } from 'lucide-react';
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
        {/* Header */}
        <div className='flex items-center gap-3 mb-6'>
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

        {/* Navigation Tabs */}
        <div className='flex gap-1 mb-6 bg-white/5 rounded-lg p-1'>
          <button
            onClick={() => handleViewChange('notes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              currentView === 'notes'
                ? 'bg-white/20 text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <FileText className='w-4 h-4' />
            Notes
          </button>
          <button
            onClick={() => handleViewChange('chat')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              currentView === 'chat'
                ? 'bg-white/20 text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <MessageSquare className='w-4 h-4' />
            Chat
          </button>
          <button
            onClick={() => handleViewChange('members')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              currentView === 'members'
                ? 'bg-white/20 text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Users className='w-4 h-4' />
            Members
          </button>
        </div>

        {/* Content */}
        <div className='flex-1 overflow-y-auto'>{children}</div>
      </div>
    </div>
  );
}
