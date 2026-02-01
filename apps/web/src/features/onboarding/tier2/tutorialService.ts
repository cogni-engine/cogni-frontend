import { setup, assign, fromPromise } from 'xstate';
import { OnboardingContext } from '../types';
import {
  initializeTutorial,
  type TutorialInitializationData,
} from './services/tutorialInitializationService';
import { sendBossGreeting } from './services/bossGreetingService';
import { createTutorialNote } from './services/tutorialNoteService';
import { createTutorialNotification } from '@/lib/api/notificationsApi';
import { createClient } from '@/lib/supabase/browserClient';

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
  // Notification reaction (stored when user completes/postpones)
  notificationReaction?: {
    type: 'completed' | 'postponed';
    text?: string;
  };
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
  // Tier2 extension events
  | {
      type: 'REACTION_SELECTED';
      reaction: 'completed' | 'postponed';
      reactionText?: string;
    } // User selected complete or postpone on notification
  | { type: 'OPEN_ACTIVITY_DRAWER' } // User clicked to open activity drawer
  | { type: 'ACTIVITY_VIEWED' } // User viewed the activity drawer
  | { type: 'NAVIGATE_TO_MEMBERS' } // User clicked to navigate to members page
  | { type: 'INVITE_CLICKED' } // User clicked the invite button
  | { type: 'SHARE_COMPLETED' } // User completed sharing or skipped
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
    }
  | {
      type: 'xstate.done.actor.completeTier2Onboarding';
      output: { success: boolean };
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
    // Get user ID
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('User not found');
    }

    // Get locale
    const locale = typeof navigator !== 'undefined' ? navigator.language : 'en';

    // Call backend API to generate task and notification
    const result = await createTutorialNotification(
      input.sessionId,
      user.id,
      locale
    );

    return { notificationId: result.notificationId };
  }
);

/**
 * Actor to complete tier2 onboarding by updating database
 */
const completeTier2OnboardingActor = fromPromise(
  async ({ input }: { input: { sessionId: string } }) => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false };
    }

    try {
      // Update onboarding_sessions.state to 'completed'
      const { error: sessionError } = await supabase
        .from('onboarding_sessions')
        .update({
          state: 'completed',
          completed_at: new Date().toISOString(),
        })
        .eq('id', input.sessionId);

      if (sessionError) {
        console.error('Failed to update onboarding session:', sessionError);
        return { success: false };
      }

      // Update user_profiles.onboarding_status to 'completed'
      const { error: profileError } = await supabase
        .from('user_profiles')
        .update({ onboarding_status: 'completed' })
        .eq('user_id', user.id);

      if (profileError) {
        console.error('Failed to update user profile:', profileError);
        return { success: false };
      }

      return { success: true };
    } catch (error) {
      console.error('Error completing tier2 onboarding:', error);
      return { success: false };
    }
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
    completeTier2Onboarding: completeTier2OnboardingActor,
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
        // If tutorialNotificationId was created in Tier1, use it
        tutorialNotificationId:
          output.onboardingContext?.tutorialNotificationId,
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
    storeReaction: assign(({ event }) => {
      if (event.type === 'REACTION_SELECTED') {
        return {
          notificationReaction: {
            type: event.reaction,
            text: event.reactionText,
          },
        };
      }
      return {};
    }),
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
          // Skip greeting - messages are already created in tier1 (Mike and Lisa)
          // Go directly to noteTour
          target: 'noteTour',
          guard: ({ context }) =>
            !!context.tutorialWorkspaceId &&
            !!context.onboardingContext?.mikeWorkspaceMemberId &&
            !!context.onboardingContext?.lisaWorkspaceMemberId &&
            !!context.onboardingContext?.firstNote?.noteId,
        },
        {
          target: 'idle',
        },
      ],
    },
    // bossGreeting state is now deprecated - kept for backwards compatibility
    bossGreeting: {
      always: {
        target: 'noteTour',
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
        onError: {},
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
          // Skip notification creation if already created in Tier1
          always: {
            target: 'redirectingToCogno',
            guard: ({ context }) => !!context.tutorialNotificationId,
          },
          // Wait for notification creation to complete before proceeding
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
              // Proceed anyway even if notification creation fails
              target: 'redirectingToCogno',
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
          // Guide user to click bell icon - goes directly to waitingForReaction
          on: {
            BELL_CLICKED: 'waitingForReaction',
          },
        },
        waitingForReaction: {
          // Show modal explaining what to do, then wait for complete/postpone
          on: {
            REACTION_SELECTED: {
              target: '#tutorial.activity',
              actions: 'storeReaction',
            },
          },
        },
      },
    },
    // Activity confirmation step
    activity: {
      initial: 'showingActivityIntro',
      states: {
        showingActivityIntro: {
          // Show modal, then navigate to workspace and open Activity drawer
          on: {
            OPEN_ACTIVITY_DRAWER: 'waitingForActivityView',
          },
        },
        waitingForActivityView: {
          // No UI - wait for user to interact with existing Activity drawer
          on: {
            ACTIVITY_VIEWED: '#tutorial.invite',
          },
        },
      },
    },
    // Member invitation step
    invite: {
      initial: 'showingInviteIntro',
      states: {
        showingInviteIntro: {
          // Show modal, then navigate to members page
          on: {
            NAVIGATE_TO_MEMBERS: 'waitingForInviteAction',
          },
        },
        waitingForInviteAction: {
          // No UI - wait for user to interact with existing Invite drawer
          on: {
            INVITE_CLICKED: '#tutorial.completing',
            SHARE_COMPLETED: '#tutorial.completing',
          },
        },
      },
    },
    // Completion step - update database
    completing: {
      invoke: {
        src: 'completeTier2Onboarding',
        input: ({ context }) => ({
          sessionId: context.onboardingSessionId || '',
        }),
        onDone: {
          target: 'completed',
        },
        onError: {
          target: 'completed', // Complete anyway even if DB update fails
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
