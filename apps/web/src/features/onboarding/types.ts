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
    // Core questions
    primaryRole?: string | string[];
    aiRelationship?: string | string[];
    useCase?: string | string[];
  };
  profile: {
    name: string;
    userId: string;
    userEmail: string;
  };
  // Tutorial workspace data
  tutorialWorkspaceId?: number;
  bossWorkspaceMemberId?: number;
  bossAgentProfileId?: string;
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
  | {
      type: 'STORE_WORKSPACE';
      workspaceId: number;
      bossWorkspaceMemberId?: number;
      bossAgentProfileId?: string;
    }
  | { type: 'COMPLETE' };

// State value types for type-safe state matching
export type OnboardingStateValue =
  | { appIntro: object }
  | { profile: 'name' | 'icon' }
  | { welcome: object }
  | { context: ContextStateValue }
  | { loadingReady: object }
  | { payment: object }
  | { completed: object };

export type ContextStateValue =
  | 'primaryRole'
  | 'aiRelationship'
  | 'useCase';

// Answer keys for each question
export type AnswerKey = keyof OnboardingContext['answers'];
