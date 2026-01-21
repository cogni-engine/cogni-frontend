'use client';

import { getPersonalWorkspaceId } from '@/lib/cookies';
import { useIsInputActive } from '@/stores/useGlobalUIStore';
import ScrollableView from '@/components/layout/ScrollableView';
import { NotesPageHeader } from './components/NotesPageHeader';
import { NotesPageContent } from './components/NotesPageContent';
import { NotesPageFooter } from './components/NotesPageFooter';
import { NotesProvider } from './NotesProvider';
import { NoteActionsLayer } from './components/NoteActionsLayer';

function PersonalNotesContent() {
  const isInputActive = useIsInputActive();

  return (
    <div className='flex flex-col h-full text-gray-100 relative overflow-hidden'>
      <NotesPageHeader />
      <ScrollableView className='pt-20 pb-36'>
        <NotesPageContent />
      </ScrollableView>
      <NotesPageFooter isInputActive={isInputActive} />
    </div>
  );
}

export default function PersonalNotesClient() {
  const personalWorkspaceId = getPersonalWorkspaceId();

  return (
    <NotesProvider workspaceId={personalWorkspaceId || 0}>
      <NoteActionsLayer>
        <PersonalNotesContent />
      </NoteActionsLayer>
    </NotesProvider>
  );
}
