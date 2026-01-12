'use client';

import { usePathname, useParams } from 'next/navigation';
import { useTutorialStep } from '../hooks/useTutorialStep';

/**
 * Centralized manager for all tutorial steps
 * This component handles showing tutorial steps based on route and tutorial state
 */
export function TutorialStepManager() {
  const pathname = usePathname();
  const params = useParams();

  // Extract workspace ID from route if we're in a workspace
  const workspaceId = pathname?.includes('/workspace/')
    ? parseInt(params.id as string)
    : undefined;

  // Boss Greeting - Chat Input Step
  useTutorialStep({
    id: 'boss-greeting-chat-input',
    text: 'Welcome! This is your chat input. Start a conversation with your workspace here.',
    selector: '[data-shepherd-target="chat-input"]',
    position: 'top',
    ripplePosition: 'center',
    showWhenState: 'bossGreeting',
    pathnamePattern: '/chat',
    workspaceId,
    requireTutorialWorkspace: true,
    delay: 500,
  });

  // Add more tutorial steps here as needed
  // Example:
  // useTutorialStep({
  //   id: 'next-step',
  //   text: 'This is the next step...',
  //   selector: '[data-shepherd-target="next-element"]',
  //   showWhenState: 'nextState',
  //   pathnamePattern: '/notes',
  //   workspaceId,
  // });

  return null; // This component doesn't render anything
}
