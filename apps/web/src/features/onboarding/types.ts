/**
 * XState Onboarding Type Definitions
 */

// Question types
export type QuestionType = 'single-select' | 'multi-select' | 'text';

// Question configuration
export interface QuestionConfig {
  id: string;
  title: string;
  subtitle?: string;
  type: QuestionType;
  options?: string[];
  placeholder?: string;
  required?: boolean;
}

// Onboarding context (state machine context)
export interface OnboardingContext {
  answers: {
    // Core questions (Q0-Q4)
    lifeIntent?: string;
    aiRelationship?: string;
    workTiming?: string;
    usageContext?: 'personal' | 'team';

    // Personal flow (Q5-P, Q6-P)
    bottleneck?: string;
    immediateWin?: string;

    // Team flow (Q5-T, Q6-T)
    role?: string;
    teamPain?: string;

    // Exit question (Q7)
    riskSignal?: string;
  };
  profile: {
    name: string;
    userId: string;
    userEmail: string;
  };
}

// Onboarding events
export type OnboardingEvent =
  | { type: 'NEXT' }
  | { type: 'BACK' }
  | {
      type: 'ANSWER';
      key: keyof OnboardingContext['answers'];
      value: string | string[];
    }
  | { type: 'UPDATE_PROFILE'; profile: Partial<OnboardingContext['profile']> }
  | { type: 'COMPLETE' };

// State value types for type-safe state matching
export type OnboardingStateValue =
  | { appIntro: {} }
  | { profile: 'name' | 'icon' }
  | { welcome: {} }
  | { context: ContextStateValue }
  | { ready: {} }
  | { completed: {} };

export type ContextStateValue =
  | 'lifeIntent'
  | 'aiRelationship'
  | 'workTiming'
  | 'usageContext'
  | { personal: PersonalStateValue }
  | { team: TeamStateValue }
  | 'riskSignal';

export type PersonalStateValue = 'bottleneck' | 'immediateWin';
export type TeamStateValue = 'role' | 'teamPain';

// Answer keys for each question
export type AnswerKey = keyof OnboardingContext['answers'];

// Helper type for state machine
export interface OnboardingMachineContext extends OnboardingContext {}
