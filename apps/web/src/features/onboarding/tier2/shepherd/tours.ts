import type { StepOptions } from './ShepherdProvider';

/**
 * Example tour configurations for testing Shepherd
 */
export const exampleTours: Record<string, StepOptions[]> = {
  headerTour: [
    {
      id: 'header-logo',
      text: 'This is the Cogno logo. Click it to navigate home.',
      attachTo: {
        element: 'header h1',
        on: 'bottom',
      },
      buttons: [
        {
          text: 'Next',
          action: () => {
            return 'next';
          },
        },
      ],
    },
    {
      id: 'header-user-menu',
      text: 'This is your user menu. Click it to access your profile and settings.',
      attachTo: {
        element: '[data-user-menu]',
        on: 'left',
      },
      buttons: [
        {
          text: 'Back',
          action: () => {
            return 'back';
          },
        },
        {
          text: 'Next',
          action: () => {
            return 'next';
          },
        },
      ],
    },
    {
      id: 'header-complete',
      text: 'You have completed the header tour!',
      buttons: [
        {
          text: 'Done',
          action: () => {
            return 'complete';
          },
        },
      ],
    },
  ],
  navigationTour: [
    {
      id: 'nav-home',
      text: 'This is the home page. Here you can see your threads and conversations.',
      attachTo: {
        element: '[data-nav-link="/cogno"]',
        on: 'top',
      },
    },
    {
      id: 'nav-notes',
      text: 'Navigate to your notes to create and organize your thoughts.',
      attachTo: {
        element: '[data-nav-link="/notes"]',
        on: 'top',
      },
      buttons: [
        {
          text: 'Back',
          action: () => {
            return 'back';
          },
        },
        {
          text: 'Next',
          action: () => {
            return 'next';
          },
        },
      ],
    },
    {
      id: 'nav-workspace',
      text: 'Access your workspace to collaborate with your team.',
      attachTo: {
        element: '[data-nav-link="/workspace"]',
        on: 'top',
      },
      buttons: [
        {
          text: 'Back',
          action: () => {
            return 'back';
          },
        },
        {
          text: 'Done',
          action: () => {
            return 'complete';
          },
        },
      ],
    },
  ],
  simpleTour: [
    {
      id: 'simple-step-1',
      text: 'This is a simple test tour step. You can use this to test basic Shepherd functionality.',
      buttons: [
        {
          text: 'Next',
          action: () => {
            return 'next';
          },
        },
      ],
    },
    {
      id: 'simple-step-2',
      text: 'This is the second step. Notice how the tour guides you through the interface.',
      buttons: [
        {
          text: 'Back',
          action: () => {
            return 'back';
          },
        },
        {
          text: 'Done',
          action: () => {
            return 'complete';
          },
        },
      ],
    },
  ],
};
