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
      const stateValue = state.value;
      const context = state.context;

      // Type guard to check if we're in a noteTour substate
      const isNoteTourState = (
        value: typeof stateValue
      ): value is {
        noteTour:
          | 'waitingForAIRequest'
          | 'processingAIRequest'
          | 'waitingForAcceptance';
      } => {
        return (
          typeof value === 'object' &&
          value !== null &&
          'noteTour' in value &&
          ((value as { noteTour: unknown }).noteTour ===
            'waitingForAIRequest' ||
            (value as { noteTour: unknown }).noteTour ===
              'processingAIRequest' ||
            (value as { noteTour: unknown }).noteTour ===
              'waitingForAcceptance')
        );
      };

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
          // Check if we're in noteTour (any substate)
          if (
            isNoteTourState(stateValue) &&
            context.tutorialNoteId === event.noteId
          ) {
            // User opened tutorial note - tour will start automatically
            console.log('Tutorial note opened');
          }
          break;

        case 'NOTE_AI_SUGGESTION_REQUESTED':
          // Check if we're in the waitingForAIRequest substate
          // XState represents nested states as objects, not dot-notation strings
          if (
            isNoteTourState(stateValue) &&
            stateValue.noteTour === 'waitingForAIRequest' &&
            context.tutorialNoteId === event.noteId
          ) {
            console.log(
              'AI suggestion requested, transitioning to loading state'
            );
            send({ type: 'AI_SUGGESTION_LOADING' });

            // After a short delay, transition to waitingForAcceptance
            // (AI suggestions are applied immediately, so we can transition quickly)
            setTimeout(() => {
              send({ type: 'AI_SUGGESTION_RECEIVED' });
            }, 500);
          } else {
            console.log('AI suggestion requested but state mismatch:', {
              stateValue,
              stateValueType: typeof stateValue,
              tutorialNoteId: context.tutorialNoteId,
              eventNoteId: event.noteId,
            });
          }
          break;

        case 'NOTE_AI_SUGGESTION_ACCEPTED':
          // Check if we're in the waitingForAcceptance substate
          if (
            isNoteTourState(stateValue) &&
            stateValue.noteTour === 'waitingForAcceptance' &&
            context.tutorialNoteId === event.noteId
          ) {
            console.log(
              'AI suggestion accepted, transitioning to notifications'
            );
            send({ type: 'AI_SUGGESTION_ACCEPTED' });
          } else {
            console.log('AI suggestion accepted but state mismatch:', {
              stateValue,
              stateValueType: typeof stateValue,
              tutorialNoteId: context.tutorialNoteId,
              eventNoteId: event.noteId,
            });
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
