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
    const stateValue = state.value as string;
    return (
      stateValue !== 'idle' &&
      stateValue !== 'initialize' &&
      stateValue !== 'checkState' &&
      !!state.context.tutorialWorkspaceId
    );
  }, [state]);

  const isInitializing = useMemo(() => {
    const stateValue = state.value as string;
    return stateValue === 'initialize' || stateValue === 'checkState';
  }, [state]);

  // Detect when user clicks on the tutorial note
  useEffect(() => {
    const stateValue = state.value as string;
    if (
      !isActive ||
      stateValue !== 'redirectToNotes' ||
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
