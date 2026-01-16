'use client';

import React, {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useEffect,
} from 'react';
import { useMachine } from '@xstate/react';
import { tutorialMachine } from './tutorialService';
import { getAppEventBus, type AppEvent } from '@/lib/events/appEventBus';

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

  // Listen to global app events and react accordingly
  useEffect(() => {
    const bus = getAppEventBus();
    const unsubscribe = bus.subscribe((event: AppEvent) => {
      const stateValue = state.value as string;
      const context = state.context;

      switch (event.type) {
        case 'WORKSPACE_MESSAGE_SENT':
          if (
            stateValue === 'bossGreeting' &&
            context.tutorialWorkspaceId === event.workspaceId
          ) {
            send({ type: 'USER_RESPONDED' });
          }
          break;

        case 'NOTE_OPENED':
          if (
            stateValue === 'noteTour' &&
            context.tutorialNoteId === event.noteId
          ) {
            // User opened tutorial note - tour will start automatically
            console.log('Tutorial note opened');
          }
          break;

        default:
          break;
      }
    });

    return unsubscribe;
  }, [state, send]);

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
