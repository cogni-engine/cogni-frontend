import { QuestionConfig } from '../types';

/**
 * Question configurations for the onboarding flow
 */

export const questionConfigs: Record<string, QuestionConfig> = {
  // Q0: Primary Role
  primaryRole: {
    id: 'primaryRole',
    title: "What's your primary role?",
    subtitle:
      'Used to personalize your Cogno experience. You may receive product suggestions.',
    type: 'multi-select',
    options: [
      'Team member / Individual contributor',
      'Manager',
      'Director',
      'Executive (e.g. VP or C-suite)',
      'Business owner',
      'Freelancer',
      'Teacher',
      'Student',
      'Other',
    ],
    required: true,
  },

  // Q0: Life Intent (Core - most important) - kept for backward compatibility
  lifeIntent: {
    id: 'lifeIntent',
    title: 'How do you want Cogno to transform your life?',
    type: 'single-select',
    options: [
      'Think clearly and see the path',
      'Move faster without overthinking',
      'Make better decisions with confidence',
      'Stay consistent and keep moving forward',
    ],
    required: true,
  },

  // Q1: Work Function
  aiRelationship: {
    id: 'aiRelationship',
    title: 'What function best describes your work?',
    subtitle:
      'Used to personalize your Cogno experience. You may receive product suggestions.',
    type: 'multi-select',
    options: [
      'Administrative Assistant',
      'Communications',
      'Customer Experience',
      'Data or Analytics',
      'Design',
      'Education Professional',
      'Engineering',
      'Finance or Accounting',
      'Fundraising',
      'Healthcare Professional',
      'Human Resources',
      'Information Technology (IT)',
      'Legal',
      'Marketing',
      'Operations',
      'Product Management',
      'Project or Program Management',
      'Research and Development',
      'Sales',
      'Student',
      'Other',
    ],
    required: true,
  },

  // Q2: Use Case (Dynamic based on role selection)
  useCase: {
    id: 'useCase',
    title: 'What do you want to use Cogno for?',
    subtitle:
      'Used to personalize your Cogno experience. You may receive product suggestions.',
    type: 'multi-select',
    options: [], // Will be dynamically generated based on selected roles
    required: true,
  },
};

// Helper function to get config by key
export const getQuestionConfig = (key: string): QuestionConfig | undefined => {
  return questionConfigs[key];
};

// Helper to get all question keys in order
export const getQuestionOrder = (): string[] => {
  return ['primaryRole', 'aiRelationship', 'useCase'];
};
