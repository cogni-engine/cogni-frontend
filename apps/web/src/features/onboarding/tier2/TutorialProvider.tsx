'use client';

import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useMemo,
} from 'react';
import { useMachine } from '@xstate/react';
import { usePathname } from 'next/navigation';
import { tutorialMachine } from './tutorialService';
import { createClient } from '@/lib/supabase/browserClient';
import { createNote } from '@/lib/api/notesApi';

interface TutorialContextType {
  isActive: boolean;
  isInitializing: boolean;
  // XState machine state
  state: ReturnType<typeof useMachine<typeof tutorialMachine>>[0];
  send: ReturnType<typeof useMachine<typeof tutorialMachine>>[1];
}

const TutorialContext = createContext<TutorialContextType | undefined>(
  undefined
);

export function TutorialProvider({ children }: { children: ReactNode }) {
  // Machine now self-initializes - no input needed
  const [state, send] = useMachine(tutorialMachine, { input: undefined });

  const pathname = usePathname();

  // Determine if tutorial is active based on machine state
  const isActive = useMemo(() => {
    return (
      !state.matches('idle') &&
      !state.matches('initialize') &&
      !state.matches('checkState') &&
      !!state.context.tutorialWorkspaceId
    );
  }, [state]);

  const isInitializing = useMemo(() => {
    return state.matches('initialize') || state.matches('checkState');
  }, [state]);

  // Create tutorial note when entering redirectToNotes state
  useEffect(() => {
    const createTutorialNote = async () => {
      if (
        !isActive ||
        !state.matches('redirectToNotes') ||
        !state.context.tutorialWorkspaceId ||
        state.context.tutorialNoteId // Already created
      ) {
        return;
      }

      try {
        const supabase = createClient();
        const workspaceId = state.context.tutorialWorkspaceId;

        // Create the tutorial note
        const note = await createNote(
          workspaceId,
          'My First Note',
          'This is your first note! You can write anything here - ideas, tasks, thoughts, or plans. Try editing this text.',
          null // No folder
        );

        console.log('Created tutorial note:', note.id);

        // Store note ID in tutorial context
        send({ type: 'TUTORIAL_NOTE_CREATED', noteId: note.id });

        // Update onboarding session context with note ID
        if (state.context.onboardingSessionId) {
          await supabase
            .from('onboarding_sessions')
            .update({
              context: {
                ...state.context.onboardingContext,
                tutorialNoteId: note.id,
              },
            })
            .eq('id', state.context.onboardingSessionId);
        }
      } catch (error) {
        console.error('Failed to create tutorial note:', error);
      }
    };

    createTutorialNote();
  }, [state, isActive, send]);

  // Detect when user clicks on the tutorial note
  useEffect(() => {
    if (
      !isActive ||
      !state.matches('redirectToNotes') ||
      !state.context.tutorialNoteId
    ) {
      return;
    }

    // Check if URL includes the tutorial note ID (user opened it)
    const noteIdInUrl = pathname?.includes(
      `/notes/${state.context.tutorialNoteId}`
    );

    if (noteIdInUrl) {
      console.log('User opened tutorial note, moving to noteTour state');
      send({ type: 'NEXT' });
    }
  }, [state, pathname, isActive, send]);

  return (
    <TutorialContext.Provider
      value={{
        isActive,
        isInitializing,
        state,
        send,
      }}
    >
      {children}
    </TutorialContext.Provider>
  );
}

export function useTutorial() {
  const context = useContext(TutorialContext);
  if (context === undefined) {
    throw new Error('useTutorial must be used within a TutorialProvider');
  }
  return context;
}
