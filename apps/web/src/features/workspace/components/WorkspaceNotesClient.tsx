'use client';

import { useParams } from 'next/navigation';
import { useIsInputActive } from '@/stores/useGlobalUIStore';
import ScrollableView from '@/components/layout/ScrollableView';
import { NotesPageHeader } from '@/features/notes/components/NotesPageHeader';
import { NotesPageContent } from '@/features/notes/components/NotesPageContent';
import { NotesPageFooter } from '@/features/notes/components/NotesPageFooter';
import { NotesProvider } from '@/features/notes/NotesProvider';
import { NoteActionsLayer } from '@/features/notes/components/NoteActionsLayer';

function WorkspaceNotesContent() {
  const isInputActive = useIsInputActive();

  return (
    <div className='flex flex-col h-full text-gray-100 relative overflow-hidden'>
      <NotesPageHeader />
      <ScrollableView className='pt-20 pb-36 md:px-6'>
        <NotesPageContent />
      </ScrollableView>
      <NotesPageFooter isInputActive={isInputActive} />
    </div>
  );
}

export default function WorkspaceNotesClient() {
  const params = useParams();
  const workspaceId = parseInt(params.id as string);

  return (
    <NotesProvider workspaceId={workspaceId}>
      <NoteActionsLayer>
        <WorkspaceNotesContent />
      </NoteActionsLayer>
    </NotesProvider>
  );
}
