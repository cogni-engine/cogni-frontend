'use client';

import { usePathname, useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useTutorialStep } from '../hooks/useTutorialStep';
import { useTutorial } from '../TutorialProvider';
import { useShepherd } from '../shepherd/ShepherdProvider';

/**
 * Centralized manager for all tutorial steps
 * This component handles showing tutorial steps based on route and tutorial state
 */
export function TutorialStepManager() {
  const pathname = usePathname();
  const params = useParams();
  const { state: tutorialState, send: sendTutorialEvent } = useTutorial();
  const { cancelTour } = useShepherd();
  const previousStepIdRef = useRef<string | null>(null);

  // Extract workspace ID from route if we're in a workspace
  const workspaceId = pathname?.includes('/workspace/')
    ? parseInt(params.id as string)
    : undefined;

  // Define all steps in a map
  const stepConfigs = {
    bossGreeting: {
      id: 'boss-greeting-chat-input',
      text: 'Welcome! This is your chat input. Start a conversation with your workspace here.',
      selector: '[data-shepherd-target="chat-input"]',
      position: 'top' as const,
      ripplePosition: 'center' as const,
      showWhenState: 'bossGreeting',
      pathnamePattern: '/chat',
      workspaceId,
      requireTutorialWorkspace: true,
      delay: 500,
    },
    redirectToNotesChat: {
      id: 'redirect-to-notes',
      text: 'Great! Now let\'s check out your notes. Click the "Notes" tab to continue.',
      selector: '[data-shepherd-target="workspace-notes-button"]',
      position: 'bottom' as const,
      ripplePosition: 'center' as const,
      showWhenState: 'redirectToNotes',
      pathnamePattern: '/chat',
      workspaceId,
      requireTutorialWorkspace: true,
      delay: 300,
    },
    redirectToNotesNotes: {
      id: 'highlight-tutorial-note',
      text: "Here's your first note! Click on it to start writing.",
      selector: '[data-shepherd-target="tutorial-note"]',
      position: 'bottom' as const,
      ripplePosition: 'center' as const,
      showWhenState: 'redirectToNotes',
      pathnamePattern: '/notes',
      workspaceId,
      requireTutorialWorkspace: true,
      delay: 500,
    },
    noteTourAIInput: {
      id: 'note-tour-ai-input',
      text: 'This is the AI input! You can ask AI to edit, expand, or improve your note.',
      selector: '[data-shepherd-target="note-ai-input"]',
      position: 'top' as const,
      ripplePosition: 'center' as const,
      showWhenState: 'noteTour',
      pathnamePattern: '/notes/',
      workspaceId,
      requireTutorialWorkspace: false,
      delay: 500,
      buttons: [
        {
          text: 'Next',
          action: () => {
            sendTutorialEvent?.({ type: 'NEXT' });
            return 'cancel' as const;
          },
        },
      ],
    },
    noteTourToolbar: {
      id: 'note-tour-toolbar',
      text: 'Use this toolbar to format your text, add images, and more.',
      selector: '[data-shepherd-target="note-toolbar"]',
      position: 'bottom' as const,
      ripplePosition: 'center' as const,
      showWhenState: 'noteTour',
      pathnamePattern: '/notes/',
      workspaceId,
      requireTutorialWorkspace: false,
      delay: 500,
      buttons: [
        {
          text: 'Back',
          action: () => {
            sendTutorialEvent?.({ type: 'BACK' });
            return 'cancel' as const;
          },
        },
        {
          text: 'Next',
          action: () => {
            sendTutorialEvent?.({ type: 'NEXT' });
            return 'cancel' as const;
          },
        },
      ],
    },
    noteTourEditor: {
      id: 'note-tour-editor',
      text: 'This is your note editor! Start writing your thoughts, ideas, and plans here.',
      selector: '[data-shepherd-target="note-editor"]',
      position: 'top' as const,
      ripplePosition: 'center' as const,
      showWhenState: 'noteTour',
      pathnamePattern: '/notes/',
      workspaceId,
      requireTutorialWorkspace: false,
      delay: 500,
      buttons: [
        {
          text: 'Back',
          action: () => {
            sendTutorialEvent?.({ type: 'BACK' });
            return 'cancel' as const;
          },
        },
        {
          text: 'Finish',
          action: () => {
            sendTutorialEvent?.({ type: 'NEXT' });
            return 'cancel' as const;
          },
        },
      ],
    },
  };

  // Get current step config based on state and pathname
  const currentStep =
    tutorialState.matches('idle') ||
    tutorialState.matches('initialize') ||
    tutorialState.matches('checkState')
      ? null
      : tutorialState.matches('bossGreeting')
        ? stepConfigs.bossGreeting
        : tutorialState.matches('redirectToNotes')
          ? pathname?.includes('/chat')
            ? stepConfigs.redirectToNotesChat
            : pathname?.includes('/notes')
              ? stepConfigs.redirectToNotesNotes
              : null
          : tutorialState.matches('noteTour')
            ? tutorialState.context.currentStep === 0
              ? stepConfigs.noteTourAIInput
              : tutorialState.context.currentStep === 1
                ? stepConfigs.noteTourToolbar
                : tutorialState.context.currentStep === 2
                  ? stepConfigs.noteTourEditor
                  : null
            : null;

  console.log('currentStep', currentStep);

  const currentStepId = currentStep?.id || 'none';

  // Cancel tour when step ID changes
  useEffect(() => {
    if (
      previousStepIdRef.current !== null &&
      previousStepIdRef.current !== currentStepId
    ) {
      console.log(
        `Step changed from ${previousStepIdRef.current} to ${currentStepId}, canceling old tour`
      );
      cancelTour();
    }
    previousStepIdRef.current = currentStepId;
  }, [currentStepId, cancelTour]);

  // Single hook call - only one step is logically active at a time
  useTutorialStep(
    currentStep || {
      id: 'none',
      text: '',
      selector: '',
      showWhenState: '__none__',
    }
  );

  return null; // This component doesn't render anything
}
