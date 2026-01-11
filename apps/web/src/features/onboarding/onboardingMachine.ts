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
  /** @xstate-layout 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-AhawtplkEpDczJHGjPg-S6KEZd2mNgAExAuRsAALLkD4AwFZcLiQqJEjkPZn8eiEipRmdF28LJdxwI0iAjhmVso5fQLlQS4UxTDPaFoKoa5Y1RGYUpXwiTtBdLEnGsUpUyrlTCh57TED6w4SiR+Z4EI1I6JBDwtJUDIAgHARQXMRjEpDAAWnTLxQkPQlRhleLNCwXdAjBFCOEANPYLJ4gaMzaK5hnQ9DKF3IEIIwBJtKiiiM+hjAxnOBYfIHDuIbKVMmaw+gtGgrfHmlk8wlgFutSYzIZlCSRjLfrCt8Y5SUkNTjSO+sDjJjcX6-wrbQRsnUjTEMaitD5Paq-OKdc8QElrW0SqlJTCCKAXOPUBpkDLELU8zijxnXpi+G0Ekgr7itErs8NNnEdCdCxTIK9yI9UDhOXkUcWYGg2D4j+5cP41y-q7as+Fw5bpknatYESFlY4RVKDeWK28riJWbUTe2Tl5JuUUn+0UORdCY0fSUXlBQTbDlKFmTGVxNDtUgwdQa-q4NwpyI-JDKNrAYpKAxwZzHMYGDY+Mk9md7aqwpp+cjg5Oi6EsCqdanRaP3UxpXck3QTw4hnRnQjMkSG5yU+3IkZyJ3R3eMvU8AlTgtyMJjB6kGzMQPziPP2FnqglqjJUyqk4jAcPec3fQb9+FM3c4fCBOUoEwMIEp+CI4Oiy2qNkSpijP4cWOC3MKyZ2hdH1pB3RFnOiXgsU1BJKLt6WGfAR-e9TGl6MkZ2kC3akxoktneYwVRS2xX6fYipYYY4FdKy17xLXmlLq1vfdqutTDGEaKeSwhRSkUjyEMsMwynGQZxTcgeSnDhHBVAtNiZRw0xPeItyCWYzLr3pYy7jHX4OCA4SYYcTrTxotdexxroxpVYFlRZuqAkfthRKK8L4H8XAIRUUanoJq9LaMWOIWYNYIAWYsrkI2+kchLa6PqvtaL4L9bKIUd1bggA */
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
            NEXT: '#onboarding.loading',
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

    // Loading state (shows circular progress bar)
    loading: {
      on: {
        COMPLETE: 'ready',
      },
    },

    // Ready to complete
    ready: {
      on: {
        COMPLETE: 'completed',
        BACK: 'loading',
      },
    },

    // Completed (final state)
    completed: {
      type: 'final',
    },
  },
});
