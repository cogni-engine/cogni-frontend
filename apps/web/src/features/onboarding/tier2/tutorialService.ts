import { setup, assign } from 'xstate';
import { OnboardingContext } from '../services/onboardingService';

/**
 * Tutorial Context - includes onboarding session context and tutorial flow state
 */
export interface TutorialContext {
  // Onboarding session ID (loaded from database)
  onboardingSessionId?: string;
  // Tutorial workspace ID (loaded from database)
  tutorialWorkspaceId?: number;
  // Onboarding session context (loaded from database)
  onboardingContext?: OnboardingContext;
  // Tutorial note ID (created for the user to interact with)
  tutorialNoteId?: number;
  // Tutorial flow state
  currentStep: number;
  completedSteps: number[];
}

/**
 * Tutorial Events
 */
export type TutorialEvent =
  | {
      type: 'LOAD_CONTEXT';
      sessionId: string;
      workspaceId?: number;
      context: OnboardingContext;
    }
  | { type: 'START' }
  | { type: 'USER_RESPONDED' }
  | { type: 'TUTORIAL_NOTE_CREATED'; noteId: number }
  | { type: 'NEXT' }
  | { type: 'BACK' }
  | { type: 'COMPLETE' }
  | { type: 'SKIP' };

/**
 * Minimal XState Machine for Tutorial Flow
 */
export const tutorialMachine = setup({
  types: {
    context: {} as TutorialContext,
    events: {} as TutorialEvent,
  },
  actions: {
    loadOnboardingContext: assign({
      onboardingSessionId: ({ event }) => {
        if (event.type === 'LOAD_CONTEXT' && 'sessionId' in event) {
          return event.sessionId;
        }
        return undefined;
      },
      tutorialWorkspaceId: ({ event }) => {
        if (event.type === 'LOAD_CONTEXT' && 'workspaceId' in event) {
          return event.workspaceId;
        }
        return undefined;
      },
      onboardingContext: ({ event }) => {
        if (event.type === 'LOAD_CONTEXT' && 'context' in event) {
          return event.context;
        }
        return undefined;
      },
    }),
    storeTutorialNoteId: assign({
      tutorialNoteId: ({ event }) => {
        if (event.type === 'TUTORIAL_NOTE_CREATED' && 'noteId' in event) {
          return event.noteId;
        }
        return undefined;
      },
    }),
    incrementStep: assign({
      currentStep: ({ context }) => context.currentStep + 1,
      completedSteps: ({ context }) => [
        ...context.completedSteps,
        context.currentStep,
      ],
    }),
    decrementStep: assign({
      currentStep: ({ context }) => Math.max(0, context.currentStep - 1),
    }),
    resetStep: assign({
      currentStep: 0,
      completedSteps: [],
    }),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBcCuyD2AnAlgQwBsA6HCAsAYgGUAVAQQCUaBtABgF1FQAHDWHZDgwA7LiAAeiAIwAmAKxEALAE5VygGzLFMqXIDscxQBoQAT0Qy9UournqAzK12G9rBwF93JtJlyEieADGggBulAByAKIAGiwcYrz8giJikggy9opEcvay2qxujrn2JuYIUnp6RMo5um5STjLKrPae3ujY+MRBoZQAQnQAwgDSbJxIIIkCQqITaRkyRPYyABxSUiuKKznKK+oypYhr2QWncjK2rHqabSA+nf49OGEUgwDyALIACgAykTSRMYJPjTFJzRD2DTVTb2dSKPSZWw6dSHdLbJYyJrqOGqRTqKS3e5+brBZ6UKjDACSXyBEymyVmoDSkPU0MUsPhiPOUhRZgsmSIK0xyis2LkUg0yhkni8IGEGAgcDERK6wKSM1SiAAtLyyjrCR1iSQyGA1aDGRJENpUZZFroHE45C43IoDb4ugFSWEzQzNelbNkhawMgU8c0Vja9MolIUCpp7AZWK7ZSr-IEMABbbjkZCQH0a8EIQyLByrVhO1Z6RTByOs5r7ZSyNzqSorGXuIA */
  id: 'tutorial',
  initial: 'bossGreeting',
  context: {
    onboardingSessionId: undefined,
    tutorialWorkspaceId: undefined,
    onboardingContext: undefined,
    tutorialNoteId: undefined,
    currentStep: 0,
    completedSteps: [],
  },
  states: {
    bossGreeting: {
      on: {
        LOAD_CONTEXT: {
          actions: 'loadOnboardingContext',
        },
        USER_RESPONDED: 'redirectToNotes',
        START: 'active',
      },
    },
    redirectToNotes: {
      on: {
        TUTORIAL_NOTE_CREATED: {
          actions: 'storeTutorialNoteId',
        },
        NEXT: 'noteTour',
        SKIP: 'completed',
      },
    },
    noteTour: {
      entry: 'resetStep',
      on: {
        NEXT: [
          {
            target: 'noteTour',
            actions: 'incrementStep',
            guard: ({ context }) => context.currentStep < 2,
          },
          {
            target: 'active',
            actions: 'resetStep',
          },
        ],
        BACK: {
          actions: 'decrementStep',
        },
        SKIP: 'completed',
      },
    },
    active: {
      on: {
        NEXT: {
          actions: 'incrementStep',
        },
        BACK: {
          actions: 'decrementStep',
        },
        COMPLETE: 'completed',
        SKIP: 'completed',
      },
    },
    completed: {
      type: 'final',
    },
  },
});
