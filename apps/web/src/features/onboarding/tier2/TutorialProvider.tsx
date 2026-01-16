'use client';

import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { useMachine } from '@xstate/react';
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
