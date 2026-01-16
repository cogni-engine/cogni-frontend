import { setup, assign, fromPromise } from 'xstate';
import { OnboardingContext } from '../services/onboardingService';
import {
  getWorkspaceMessages,
  sendWorkspaceMessage,
} from '@/lib/api/workspaceMessagesApi';
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
  | { type: 'SKIP' }
  | {
      type: 'xstate.done.actor.initializeTutorial';
      output: {
        onboardingSessionId?: string;
        tutorialWorkspaceId?: number;
        onboardingContext?: OnboardingContext;
        isTier2Active?: boolean;
      } | null;
    };

/**
 * Actor to initialize tutorial by fetching onboarding session
 */
const initializeTutorialActor = fromPromise(async () => {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.log('No user found, skipping tutorial initialization');
      return null;
    }

    // Fetch the active session (tier1 or tier2)
    const { data: session } = await supabase
      .from('onboarding_sessions')
      .select('id, context, state')
      .eq('user_id', user.id)
      .in('state', ['tier1', 'tier2'])
      .maybeSingle();

    if (!session) {
      console.log('No active onboarding session found');
      return null;
    }

    // Find the tutorial workspace linked to this session
    const { data: workspace } = await supabase
      .from('workspace')
      .select('id')
      .eq('onboarding_session_id', session.id)
      .maybeSingle();

    const result = {
      onboardingSessionId: session.id,
      tutorialWorkspaceId: workspace?.id,
      onboardingContext: session.context || {},
      isTier2Active: session.state === 'tier2',
    };

    console.log('Tutorial initialization result:', result);
    console.log('  Session context:', session.context);
    console.log('  Workspace ID:', workspace?.id);

    return result;
  } catch (error) {
    console.error('Failed to initialize tutorial:', error);
    return null;
  }
});

/**
 * Actor to send boss greeting message
 */
const sendBossGreetingActor = fromPromise(
  async ({
    input,
  }: {
    input: { workspaceId: number; bossWorkspaceMemberId: number };
  }) => {
    const { workspaceId, bossWorkspaceMemberId } = input;

    // Validate inputs - skip if not initialized yet
    if (!bossWorkspaceMemberId || !workspaceId) {
      console.log('Skipping boss greeting - context not initialized yet');
      return;
    }

    // Check if boss has already sent any messages
    const existingMessages = await getWorkspaceMessages(workspaceId, 50);
    const bossMessages = existingMessages.filter(
      msg => msg.workspace_member_id === bossWorkspaceMemberId
    );

    // If boss hasn't sent any messages yet, send greeting
    if (bossMessages.length === 0) {
      const greetingText = `Welcome to your tutorial workspace! 👋

I'm your AI assistant, and I'm here to help you get started with Cogno. This is a special workspace created just for you to learn the ropes.

Feel free to ask me anything or explore the features. I'll be guiding you through the basics!`;

      await sendWorkspaceMessage(
        workspaceId,
        bossWorkspaceMemberId,
        greetingText
      );

      console.log('Boss greeting sent successfully');
    } else {
      console.log('Boss greeting already sent, skipping');
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
  },
  actions: {
    loadSessionData: assign(({ event }) => {
      const output = (event as any).output;

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
  initial: 'initialize',
  context: {
    onboardingSessionId: undefined,
    tutorialWorkspaceId: undefined,
    onboardingContext: undefined,
    tutorialNoteId: undefined,
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
          guard: ({ context }) => {
            const result =
              !!context.tutorialWorkspaceId &&
              !!context.onboardingContext?.bossWorkspaceMemberId;
            return result;
          },
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
