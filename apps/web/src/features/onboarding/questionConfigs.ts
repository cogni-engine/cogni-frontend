import { QuestionConfig } from './types';

/**
 * Question configurations for the onboarding flow
 */

export const questionConfigs: Record<string, QuestionConfig> = {
  // Q0: Life Intent (Core - most important)
  lifeIntent: {
    id: 'lifeIntent',
    title: 'How do you want Cogni to transform your life?',
    type: 'single-select',
    options: [
      'Think clearly and see the path',
      'Move faster without overthinking',
      'Make better decisions with confidence',
      'Stay consistent and keep moving forward',
    ],
    required: true,
  },

  // Q1: AI Relationship (Intervention level)
  aiRelationship: {
    id: 'aiRelationship',
    title: 'How do you want Cogni to work with you?',
    type: 'single-select',
    options: [
      'Think with me',
      'Suggest ideas when useful',
      'Guide me step by step',
      'Stay in the background',
    ],
    required: true,
  },

  // Q2: Work Timing (Constraint - notification timing)
  workTiming: {
    id: 'workTiming',
    title: 'When do you usually work on important things?',
    type: 'single-select',
    options: ['Morning', 'Afternoon', 'Night'],
    required: true,
  },

  // Q4: Usage Context (Branching point)
  usageContext: {
    id: 'usageContext',
    title: 'How will you mainly use Cogni?',
    type: 'single-select',
    options: ['For my personal work', 'With my team'],
    required: true,
  },

  // === PERSONAL FLOW ===

  // Q5-P: Bottleneck (Core issue)
  bottleneck: {
    id: 'bottleneck',
    title: 'What slows you down the most?',
    type: 'single-select',
    options: [
      'Getting started',
      'Organizing thoughts',
      'Too many options',
      'Making decisions',
      'Following through',
    ],
    required: true,
  },

  // Q6-P: Immediate Win (First experience scenario)
  immediateWin: {
    id: 'immediateWin',
    title: 'What do you want to improve first?',
    type: 'single-select',
    options: [
      'Planning',
      'Thinking',
      'Writing',
      'Decision-making',
      'Execution',
    ],
    required: true,
  },

  // === TEAM FLOW ===

  // Q5-T: Your Role (Perspective and suggestion granularity)
  role: {
    id: 'role',
    title: 'What is your role on the team?',
    type: 'single-select',
    options: [
      'Individual contributor',
      'Lead',
      'Manager',
      'Founder / Executive',
    ],
    required: true,
  },

  // Q6-T: Team Pain (Team-specific AI mode)
  teamPain: {
    id: 'teamPain',
    title: 'What is your team struggling with most?',
    type: 'single-select',
    options: [
      'Alignment',
      'Speed',
      'Decision quality',
      'Knowledge sharing',
      'Execution',
    ],
    required: true,
  },

  // === EXIT / RISK ===

  // Q7: Risk Signal (UX risk detection and churn prediction)
  riskSignal: {
    id: 'riskSignal',
    title: 'What would make you stop using Cogni?',
    subtitle: 'Be honest - this helps us improve',
    type: 'text',
    placeholder: 'Type your thoughts here...',
    required: false,
  },
};

// Helper function to get config by key
export const getQuestionConfig = (key: string): QuestionConfig | undefined => {
  return questionConfigs[key];
};

// Helper to get all question keys in order
export const getQuestionOrder = (
  usageContext?: 'personal' | 'team'
): string[] => {
  const baseQuestions = [
    'lifeIntent',
    'aiRelationship',
    'workTiming',
    'usageContext',
  ];

  if (usageContext === 'personal') {
    return [...baseQuestions, 'bottleneck', 'immediateWin', 'riskSignal'];
  } else if (usageContext === 'team') {
    return [...baseQuestions, 'role', 'teamPain', 'riskSignal'];
  }

  return baseQuestions;
};
