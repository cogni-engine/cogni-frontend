import { setup, assign, fromPromise } from 'xstate';
import { OnboardingContext } from '../types';
import {
  initializeTutorial,
  type TutorialInitializationData,
} from './services/tutorialInitializationService';
import { sendBossGreeting } from './services/bossGreetingService';
import { createTutorialNote } from './services/tutorialNoteService';

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
  // Tutorial notification ID (created for the user to interact with)
  tutorialNotificationId?: number;
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
  | { type: 'NEXT' }
  | { type: 'BACK' }
  | { type: 'COMPLETE' }
  | { type: 'SKIP' }
  | { type: 'AI_SUGGESTION_RECEIVED' }
  | { type: 'AI_SUGGESTION_ACCEPTED' }
  | { type: 'AI_SUGGESTION_LOADING' } // New loading state event
  | { type: 'NAVIGATE_TO_COGNO' } // User clicked button to navigate to cogno
  | { type: 'BELL_CLICKED' } // User clicked the bell icon
  | { type: 'NOTIFICATION_VIEWED' } // User viewed the notification
  | {
      type: 'xstate.done.actor.initializeTutorial';
      output: {
        onboardingSessionId?: string;
        tutorialWorkspaceId?: number;
        onboardingContext?: OnboardingContext;
        isTier2Active?: boolean;
      } | null;
    }
  | {
      type: 'xstate.done.actor.createTutorialNote';
      output: { noteId: number };
    }
  | {
      type: 'xstate.done.actor.createAINotification';
      output: { notificationId: number };
    };

/**
 * Actor to initialize tutorial by fetching onboarding session
 */
const initializeTutorialActor = fromPromise(initializeTutorial);

/**
 * Actor to send boss greeting message
 */
const sendBossGreetingActor = fromPromise(
  async ({
    input,
  }: {
    input: { workspaceId: number; bossWorkspaceMemberId: number };
  }) => {
    return sendBossGreeting(input);
  }
);

/**
 * Actor to create tutorial note
 */
const createTutorialNoteActor = fromPromise(
  async ({
    input,
  }: {
    input: {
      workspaceId: number;
      sessionId: string;
      onboardingContext: OnboardingContext;
    };
  }) => {
    return createTutorialNote({
      workspaceId: input.workspaceId,
      sessionId: input.sessionId,
      onboardingContext: input.onboardingContext,
    });
  }
);

/**
 * Actor to create AI notification
 */
const createAINotificationActor = fromPromise(
  async ({
    input,
  }: {
    input: {
      workspaceId: number;
      sessionId: string;
    };
  }) => {
    console.log('Creating AI notification:', input);
    //  this needs to be implemented
    console.log('AI notification created:');
    return { notificationId: 1 };
  }
);

/**
 * Minimal XState Machine for Tutorial Flow
 */
export const tutorialMachine = setup({
  types: {
    context: {} as TutorialContext,
    events: {} as TutorialEvent,
    input: {} as TutorialInput | undefined,
  },
  actors: {
    initializeTutorial: initializeTutorialActor,
    sendBossGreeting: sendBossGreetingActor,
    createTutorialNote: createTutorialNoteActor,
    createAINotification: createAINotificationActor,
  },
  actions: {
    loadSessionData: assign(({ event }) => {
      const output = (event as { output: TutorialInitializationData | null })
        .output;

      if (!output) {
        return {
          onboardingSessionId: undefined,
          tutorialWorkspaceId: undefined,
          onboardingContext: undefined,
        };
      }

      return {
        onboardingSessionId: output.onboardingSessionId,
        tutorialWorkspaceId: output.tutorialWorkspaceId,
        onboardingContext: output.onboardingContext,
      };
    }),
    storeTutorialNoteId: assign(({ event }) => {
      // Handle actor output
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const output = (event as any).output;
      if (output && 'noteId' in output) {
        return {
          tutorialNoteId: output.noteId,
        };
      }
      return {};
    }),
    storeTutorialNotificationId: assign(({ event }) => {
      // Handle actor output
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const output = (event as any).output;
      if (output && 'notificationId' in output) {
        return {
          tutorialNotificationId: output.notificationId,
        };
      }
      return {};
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
    navigateToNotifications: () => {
      // Navigation will be handled by TutorialProvider via useEffect
      // This action is a placeholder for clarity
    },
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBcCuyD2AnAlgQwBsA6HCAsAYgGUAVAQQCUaBtABgF1FQAHDWHZDgwA7LiAAeiAIwAmAKxEALAE5VygGzLFMqXIDscxQBoQAT0Qy9UournqAzK12G9rBwF93JtJlyEieADGggBulAByAKIAGiwcYrz8giJikggy9opEcvay2qxujrn2JuYIUnp6RMo5um5STjLKrPae3ujY+MRBoZQAQnQAwgDSbJxIIIkCQqITaRkyRPYyABxSUiuKKznKK+oypYhr2QWncjK2rHqabSA+nf49OGEUgwDyALIACgAykTSRMYJPjTFJzRD2DTVTb2dSKPSZWw6dSHdLbJYyJrqOGqRTqKS3e5+brBZ6UKjDACSXyBEymyVmoDSkPU0MUsPhiPOUhRZgsmSIK0xyis2LkUg0yhkni8IGEGAgcDERK6wKSM1SiAAtLyyjrCR1iSQyGA1aDGRJENpUZZFroHE45C43IoDb4ugFSWEzQzNelbNkhawMgU8c0Vja9MolIUCpp7AZWK7ZSr-IEMABbbjkZCQH0a8EIQyLByrVhO1Z6RTByOs5r7ZSyNzqSorGXuIA */
  id: 'tutorial',
  initial: 'initialize',
  context: {
    onboardingSessionId: undefined,
    tutorialWorkspaceId: undefined,
    onboardingContext: undefined,
    tutorialNoteId: undefined,
    tutorialNotificationId: undefined,
    currentStep: 0,
    completedSteps: [],
  },
  states: {
    initialize: {
      invoke: {
        src: 'initializeTutorial',
        onDone: {
          target: 'checkState',
          actions: 'loadSessionData',
        },
        onError: {
          target: 'idle',
          actions: ({ event }) => {
            console.error('Failed to initialize tutorial:', event.error);
          },
        },
      },
    },
    idle: {
      // No tutorial active - user has completed or no session
      type: 'final' as const,
    },
    checkState: {
      always: [
        {
          target: 'bossGreeting',
          guard: ({ context }) =>
            !!context.tutorialWorkspaceId &&
            !!context.onboardingContext?.bossWorkspaceMemberId,
        },
        {
          target: 'idle',
        },
      ],
    },
    bossGreeting: {
      invoke: {
        src: 'sendBossGreeting',
        input: ({ context }) => ({
          workspaceId: context.tutorialWorkspaceId ?? 0,
          bossWorkspaceMemberId:
            context.onboardingContext?.bossWorkspaceMemberId ?? 0,
        }),
        onError: {
          actions: ({ event }) => {
            console.error('Failed to send boss greeting:', event.error);
          },
        },
      },
      on: {
        USER_RESPONDED: 'noteTour',
        START: 'active',
      },
    },
    noteTour: {
      initial: 'waitingForAIRequest',
      entry: 'resetStep',
      invoke: {
        src: 'createTutorialNote',
        input: ({ context }) => ({
          workspaceId: context.tutorialWorkspaceId!,
          sessionId: context.onboardingSessionId!,
          onboardingContext: context.onboardingContext!,
        }),
        onDone: {
          actions: 'storeTutorialNoteId',
        },
        onError: {
          actions: ({ event }) => {
            console.error('Failed to create tutorial note:', event.error);
          },
        },
      },
      states: {
        waitingForAIRequest: {
          on: {
            AI_SUGGESTION_LOADING: 'processingAIRequest',
            AI_SUGGESTION_RECEIVED: 'waitingForAcceptance',
            NEXT: [
              {
                target: '#tutorial.noteTour',
                actions: 'incrementStep',
                guard: ({ context }) => context.currentStep < 2,
              },
              {
                target: '#tutorial.active',
                actions: 'resetStep',
              },
            ],
            BACK: {
              actions: 'decrementStep',
            },
            SKIP: '#tutorial.completed',
          },
        },
        processingAIRequest: {
          // Loading state while AI is processing the suggestion
          on: {
            AI_SUGGESTION_RECEIVED: 'waitingForAcceptance',
            SKIP: '#tutorial.completed',
          },
        },
        waitingForAcceptance: {
          on: {
            AI_SUGGESTION_ACCEPTED: {
              target: '#tutorial.notifications',
              actions: 'navigateToNotifications',
            },
            NEXT: [
              {
                target: '#tutorial.noteTour',
                actions: 'incrementStep',
                guard: ({ context }) => context.currentStep < 2,
              },
              {
                target: '#tutorial.active',
                actions: 'resetStep',
              },
            ],
            BACK: {
              target: '#tutorial.noteTour.waitingForAIRequest',
            },
            SKIP: '#tutorial.completed',
          },
        },
      },
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
    notifications: {
      initial: 'creatingNotification',
      states: {
        creatingNotification: {
          invoke: {
            src: 'createAINotification',
            input: ({ context }) => ({
              workspaceId: context.tutorialWorkspaceId!,
              sessionId: context.onboardingSessionId!,
            }),
            onDone: {
              target: 'redirectingToCogno',
              actions: 'storeTutorialNotificationId',
            },
            onError: {
              actions: ({ event }) => {
                console.error('Failed to create AI notification:', event.error);
              },
            },
          },
        },
        redirectingToCogno: {
          // Show modal to guide user to cogno page
          on: {
            NAVIGATE_TO_COGNO: 'waitingForBellClick',
          },
        },
        waitingForBellClick: {
          // Guide user to click bell icon
          on: {
            BELL_CLICKED: 'waitingForNotificationView',
          },
        },
        waitingForNotificationView: {
          // Wait for user to view the notification
          on: {
            NOTIFICATION_VIEWED: '#tutorial.completed',
          },
        },
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
