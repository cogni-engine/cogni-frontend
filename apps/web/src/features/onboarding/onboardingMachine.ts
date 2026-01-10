import { setup, assign } from 'xstate';
import type { OnboardingContext, OnboardingEvent } from './types';

/**
 * XState Machine for Onboarding Flow
 * Manages state transitions and data collection through the onboarding process
 */

export const onboardingMachine = setup({
  types: {
    context: {} as OnboardingContext,
    events: {} as OnboardingEvent,
  },
  actions: {
    // Action to store an answer
    storeAnswer: assign({
      answers: ({ context, event }) => {
        if (event.type !== 'ANSWER') return context.answers;
        return {
          ...context.answers,
          [event.key]: event.value,
        };
      },
    }),
    // Action to update profile data
    updateProfile: assign({
      profile: ({ context, event }) => {
        if (event.type !== 'UPDATE_PROFILE') return context.profile;
        return {
          ...context.profile,
          ...event.profile,
        };
      },
    }),
  },
  guards: {
    // Guard: check if usage context is personal
    isPersonal: ({ context }) => context.answers.usageContext === 'personal',
    // Guard: check if usage context is team
    isTeam: ({ context }) => context.answers.usageContext === 'team',
  },
}).createMachine({
  id: 'onboarding',
  initial: 'appIntro',
  context: {
    answers: {},
    profile: {
      name: '',
      userId: '',
      userEmail: '',
    },
  },
  on: {
    // Global UPDATE_PROFILE handler - can be called from any state
    UPDATE_PROFILE: {
      actions: 'updateProfile',
    },
  },
  states: {
    // App introduction with slides
    appIntro: {
      on: {
        NEXT: 'profile',
      },
    },

    // Profile setup (name and icon)
    profile: {
      initial: 'name',
      states: {
        name: {
          on: {
            NEXT: 'icon',
          },
        },
        icon: {
          on: {
            NEXT: '#onboarding.welcome',
            BACK: 'name',
          },
        },
      },
    },

    // Welcome message with user's name
    welcome: {
      on: {
        NEXT: 'context',
        BACK: 'profile.icon',
      },
    },

    // Contextual questions (main question flow)
    context: {
      initial: 'lifeIntent',
      states: {
        // Q0: Life Intent
        lifeIntent: {
          on: {
            ANSWER: {
              actions: 'storeAnswer',
            },
            NEXT: 'aiRelationship',
            BACK: '#onboarding.welcome',
          },
        },

        // Q1: AI Relationship
        aiRelationship: {
          on: {
            ANSWER: {
              actions: 'storeAnswer',
            },
            NEXT: 'workTiming',
            BACK: 'lifeIntent',
          },
        },

        // Q2: Work Timing
        workTiming: {
          on: {
            ANSWER: {
              actions: 'storeAnswer',
            },
            NEXT: 'usageContext',
            BACK: 'aiRelationship',
          },
        },

        // Q4: Usage Context (branching point)
        usageContext: {
          on: {
            ANSWER: {
              actions: 'storeAnswer',
            },
            NEXT: [
              {
                target: 'personal',
                guard: 'isPersonal',
              },
              {
                target: 'team',
                guard: 'isTeam',
              },
            ],
            BACK: 'workTiming',
          },
        },

        // Personal Flow
        personal: {
          initial: 'bottleneck',
          states: {
            // Q5-P: Bottleneck
            bottleneck: {
              on: {
                ANSWER: {
                  actions: 'storeAnswer',
                },
                NEXT: 'immediateWin',
                BACK: '#onboarding.context.usageContext',
              },
            },

            // Q6-P: Immediate Win
            immediateWin: {
              on: {
                ANSWER: {
                  actions: 'storeAnswer',
                },
                NEXT: '#onboarding.context.riskSignal',
                BACK: 'bottleneck',
              },
            },
          },
        },

        // Team Flow
        team: {
          initial: 'role',
          states: {
            // Q5-T: Role
            role: {
              on: {
                ANSWER: {
                  actions: 'storeAnswer',
                },
                NEXT: 'teamPain',
                BACK: '#onboarding.context.usageContext',
              },
            },

            // Q6-T: Team Pain
            teamPain: {
              on: {
                ANSWER: {
                  actions: 'storeAnswer',
                },
                NEXT: '#onboarding.context.riskSignal',
                BACK: 'role',
              },
            },
          },
        },

        // Q7: Risk Signal (common to both flows)
        riskSignal: {
          on: {
            ANSWER: {
              actions: 'storeAnswer',
            },
            NEXT: '#onboarding.ready',
            BACK: [
              {
                target: 'personal.immediateWin',
                guard: 'isPersonal',
              },
              {
                target: 'team.teamPain',
                guard: 'isTeam',
              },
            ],
          },
        },
      },
    },

    // Ready to complete
    ready: {
      on: {
        COMPLETE: 'completed',
        BACK: 'context.riskSignal',
      },
    },

    // Completed (final state)
    completed: {
      type: 'final',
    },
  },
});
