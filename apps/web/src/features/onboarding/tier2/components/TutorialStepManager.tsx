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
      showWhenState: 'noteTour',
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
      showWhenState: 'noteTour',
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
    noteTourRequestAI: {
      id: 'note-tour-request-ai',
      text: 'Try asking AI to improve your note! Type something like "Make this more professional" and press Enter.',
      // Target both mobile and desktop - selector will match either
      selector: '[data-shepherd-target="note-ai-input"]',
      position: 'top' as const,
      ripplePosition: 'center' as const,
      showWhenState: 'noteTour.waitingForAIRequest',
      pathnamePattern: '/notes/',
      workspaceId,
      requireTutorialWorkspace: false,
      delay: 500,
    },
    noteTourProcessingAI: {
      id: 'note-tour-processing-ai',
      text: 'AI is processing your request... Please wait while suggestions are generated.',
      selector: '[data-shepherd-target="note-ai-input"]', // Keep focus on input area
      position: 'top' as const,
      ripplePosition: 'center' as const,
      showWhenState: 'noteTour.processingAIRequest',
      pathnamePattern: '/notes/',
      workspaceId,
      requireTutorialWorkspace: false,
      delay: 300,
    },
    noteTourAcceptSuggestion: {
      id: 'note-tour-accept-suggestion',
      text: 'Great! Now accept the AI suggestion by clicking the "Accept" button above.',
      selector: '[data-shepherd-target="note-accept-button"]',
      position: 'bottom' as const,
      ripplePosition: 'center' as const,
      showWhenState: 'noteTour.waitingForAcceptance',
      pathnamePattern: '/notes/',
      workspaceId,
      requireTutorialWorkspace: false,
      delay: 500,
    },
  };

  // Get current step config based on state and pathname
  const stateValue = tutorialState.value as string;
  const currentStep =
    tutorialState.matches('idle') ||
    tutorialState.matches('initialize') ||
    tutorialState.matches('checkState')
      ? null
      : tutorialState.matches('bossGreeting')
        ? stepConfigs.bossGreeting
        : tutorialState.matches('noteTour')
          ? // Check substates first - use state value string matching
            (() => {
              const tutorialNoteId = tutorialState.context.tutorialNoteId;
              const notePath = `/notes/${tutorialNoteId}`;

              // Check if we're in a substate by checking the state value string
              if (
                typeof stateValue === 'object' &&
                stateValue !== null &&
                'noteTour' in stateValue
              ) {
                const noteTourState = (stateValue as { noteTour: string })
                  .noteTour;
                console.log('noteTourState', noteTourState);

                if (noteTourState === 'waitingForAIRequest') {
                  // User needs to request AI suggestion
                  return pathname?.includes(notePath)
                    ? stepConfigs.noteTourRequestAI
                    : pathname?.includes('/chat')
                      ? stepConfigs.redirectToNotesChat
                      : pathname?.includes('/notes')
                        ? stepConfigs.redirectToNotesNotes
                        : null;
                }

                if (noteTourState === 'processingAIRequest') {
                  // AI is processing - show loading state
                  return pathname?.includes(notePath)
                    ? stepConfigs.noteTourProcessingAI
                    : pathname?.includes('/chat')
                      ? stepConfigs.redirectToNotesChat
                      : pathname?.includes('/notes')
                        ? stepConfigs.redirectToNotesNotes
                        : null;
                }

                if (noteTourState === 'waitingForAcceptance') {
                  // User needs to accept suggestion
                  return pathname?.includes(notePath)
                    ? stepConfigs.noteTourAcceptSuggestion
                    : pathname?.includes('/chat')
                      ? stepConfigs.redirectToNotesChat
                      : pathname?.includes('/notes')
                        ? stepConfigs.redirectToNotesNotes
                        : null;
                }
              }

              // Legacy step-based tour (for backwards compatibility)
              return pathname?.includes(notePath)
                ? // User is in the note - show tour steps
                  tutorialState.context.currentStep === 0
                  ? stepConfigs.noteTourAIInput
                  : tutorialState.context.currentStep === 1
                    ? stepConfigs.noteTourToolbar
                    : tutorialState.context.currentStep === 2
                      ? stepConfigs.noteTourEditor
                      : null
                : // User is not in the note - redirect them
                  pathname?.includes('/chat')
                  ? stepConfigs.redirectToNotesChat
                  : pathname?.includes('/notes')
                    ? stepConfigs.redirectToNotesNotes
                    : null;
            })()
          : null;

  const currentStepId = currentStep?.id || 'none';

  // Debug log
  if (currentStep) {
    console.log(
      `[TutorialStepManager] Selected step: ${currentStep.id}, showWhenState: ${currentStep.showWhenState}, selector: ${currentStep.selector}`
    );
  }

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
