'use client';

import { useEffect, useRef } from 'react';
import { useTutorial } from '../TutorialProvider';
import { useShepherd } from '../shepherd/ShepherdProvider';
import type { StepOptions } from '../shepherd/ShepherdProvider';
import { usePathname } from 'next/navigation';

export interface TutorialStepConfig {
  /** Unique step ID */
  id: string;
  /** Step text to display */
  text: string;
  /** CSS selector for the target element */
  selector: string;
  /** Position of the tooltip relative to target */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Position of the ripple effect */
  ripplePosition?: StepOptions['ripplePosition'];
  /** Tutorial state(s) when this step should be shown */
  showWhenState: string | string[];
  /** Optional: Only show on specific pathname patterns */
  pathnamePattern?: string | string[];
  /** Current workspace ID - used to check if we're in tutorial workspace */
  workspaceId?: number;
  /** Optional: Only show in tutorial workspace (default: true) */
  requireTutorialWorkspace?: boolean;
  /** Delay before showing step (ms) */
  delay?: number;
  /** Optional: Buttons for the step */
  buttons?: Array<{
    text: string;
    action: () => 'next' | 'back' | 'complete' | 'cancel';
  }>;
}

/**
 * Hook to manage a tutorial step that shows/hides based on tutorial state
 * and workspace context
 */
export function useTutorialStep(config: TutorialStepConfig) {
  const { state: tutorialState } = useTutorial();
  const { showStep, cancelTour, isActive: shepherdIsActive } = useShepherd();
  const pathname = usePathname();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any pending timers
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // Check if we should show this step
    const showWhenStates = Array.isArray(config.showWhenState)
      ? config.showWhenState
      : [config.showWhenState];
    const isInTargetState = showWhenStates.some(state =>
      tutorialState.matches(state as never)
    );

    // Check workspace context
    const tutorialWorkspaceId = tutorialState.context.tutorialWorkspaceId;
    const requireTutorialWorkspace = config.requireTutorialWorkspace !== false; // Default to true
    const isInTutorialWorkspace =
      !requireTutorialWorkspace ||
      (tutorialWorkspaceId !== undefined &&
        tutorialWorkspaceId !== null &&
        config.workspaceId !== undefined &&
        tutorialWorkspaceId === config.workspaceId);

    // Check pathname pattern if specified
    const pathnamePatterns = config.pathnamePattern
      ? Array.isArray(config.pathnamePattern)
        ? config.pathnamePattern
        : [config.pathnamePattern]
      : null;
    const matchesPathname =
      !pathnamePatterns ||
      pathnamePatterns.some(pattern => pathname?.includes(pattern));

    // Determine if step should be shown
    const shouldShow =
      isInTargetState &&
      isInTutorialWorkspace &&
      matchesPathname &&
      !shepherdIsActive;

    // Determine if step should be canceled
    const shouldCancel =
      shepherdIsActive &&
      (!isInTargetState || !isInTutorialWorkspace || !matchesPathname);

    if (shouldCancel) {
      cancelTour();
      return;
    }

    if (shouldShow) {
      const delay = config.delay ?? 500;
      timerRef.current = setTimeout(() => {
        // Check if element exists before showing
        const element = document.querySelector(config.selector);
        if (element) {
          showStep({
            id: config.id,
            text: config.text,
            attachTo: {
              element: config.selector,
              on: config.position ?? 'top',
            },
            ripplePosition: config.ripplePosition,
            buttons: config.buttons,
          });
        }
      }, delay);

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      };
    }
  }, [tutorialState, pathname, shepherdIsActive, config, showStep, cancelTour]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);
}
