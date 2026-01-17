import { setup, assign, fromPromise } from 'xstate';
import { OnboardingContext } from '../services/onboardingService';
import { createNote } from '@/lib/api/notesApi';

/**
 * Tutorial Input - data passed when creating the machine
 */
export interface TutorialInput {
  onboardingSessionId?: string;
  tutorialWorkspaceId?: number;
  onboardingContext?: OnboardingContext;
}

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
    input: {} as TutorialInput,
  },
  actors: {
    createFirstNote: fromPromise(
      async ({
        input,
      }: {
        input: {
          workspaceId: number;
          firstNote?: { title: string; content: string };
        };
      }) => {
        const noteTitle = input.firstNote?.title || 'My First Note';
        const noteContent =
          input.firstNote?.content ||
          'This is your first note! You can write anything here - ideas, tasks, thoughts, or plans. Try editing this text.';

        const note = await createNote(
          input.workspaceId,
          noteTitle,
          noteContent,
          null
        );

        return { noteId: note.id };
      }
    ),
  },
  actions: {
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
  context: ({ input }) => ({
    onboardingSessionId: input.onboardingSessionId,
    tutorialWorkspaceId: input.tutorialWorkspaceId,
    onboardingContext: input.onboardingContext,
    tutorialNoteId: undefined,
    currentStep: 0,
    completedSteps: [],
  }),
  states: {
    bossGreeting: {
      on: {
        USER_RESPONDED: 'redirectToNotes',
        START: 'active',
      },
    },
    redirectToNotes: {
      invoke: {
        id: 'createFirstNote',
        src: 'createFirstNote',
        input: ({ context }) => ({
          workspaceId: context.tutorialWorkspaceId!,
          firstNote: (context.onboardingContext as any)?.firstNote,
        }),
        onDone: {
          actions: assign({
            tutorialNoteId: ({ event }) => event.output.noteId,
          }),
        },
        onError: {
          actions: ({ event }) => {
            console.error('Failed to create tutorial note:', event.error);
          },
        },
      },
      on: {
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
