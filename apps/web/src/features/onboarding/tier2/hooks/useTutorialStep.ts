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
  const observerRef = useRef<MutationObserver | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any pending timers and observers
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Check if we should show this step
    const showWhenStates = Array.isArray(config.showWhenState)
      ? config.showWhenState
      : [config.showWhenState];

    // Helper to check if we're in a nested state
    const checkNestedState = (statePath: string): boolean => {
      // Handle dot-notation nested states (e.g., 'noteTour.waitingForAIRequest')
      if (statePath.includes('.')) {
        const [parentState, childState] = statePath.split('.');
        const stateValue = tutorialState.value;

        // Check if we're in the parent state
        if (!tutorialState.matches(parentState as never)) {
          console.log(
            `[useTutorialStep] Not in parent state ${parentState} for ${statePath}`
          );
          return false;
        }

        // Check if we're in the specific child state
        if (
          typeof stateValue === 'object' &&
          stateValue !== null &&
          parentState in stateValue
        ) {
          const nestedState = (stateValue as Record<string, string>)[
            parentState
          ];
          const matches = nestedState === childState;
          console.log(
            `[useTutorialStep] Checking nested state: ${statePath}, nestedState=${nestedState}, matches=${matches}`
          );
          return matches;
        }

        console.log(
          `[useTutorialStep] State value is not object with ${parentState} key`
        );
        return false;
      }

      // Regular state matching for non-nested states
      const matches = tutorialState.matches(statePath as never);
      console.log(
        `[useTutorialStep] Checking regular state: ${statePath}, matches=${matches}`
      );
      return matches;
    };

    const isInTargetState = showWhenStates.some(state =>
      checkNestedState(state)
    );

    console.log(
      `[useTutorialStep] Step ${config.id}: isInTargetState=${isInTargetState}, showWhenStates=${showWhenStates.join(', ')}`
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

    console.log(
      `[useTutorialStep] Step ${config.id}: shouldShow=${shouldShow}, isInTargetState=${isInTargetState}, isInTutorialWorkspace=${isInTutorialWorkspace}, matchesPathname=${matchesPathname}, shepherdIsActive=${shepherdIsActive}`
    );

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
        const maxWaitTime = 3000; // 3 seconds max wait
        const startTime = Date.now();

        const cleanup = () => {
          if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
          }
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        };

        const tryShowStep = () => {
          // Check timeout
          if (Date.now() - startTime > maxWaitTime) {
            console.warn(
              `[useTutorialStep] Element not found: ${config.selector} after ${maxWaitTime}ms`
            );
            cleanup();
            return;
          }

          const element = document.querySelector(config.selector);
          if (element) {
            console.log(`[useTutorialStep] Showing step ${config.id}`);
            showStep({
              id: config.id,
              text: config.text,
              attachTo: {
                element: config.selector,
                on: config.position ?? 'top',
              },
              ripplePosition: config.ripplePosition,
            });
            cleanup();
            return;
          }

          // Set up MutationObserver if not already set
          if (!observerRef.current) {
            observerRef.current = new MutationObserver(() => {
              tryShowStep();
            });
            observerRef.current.observe(document.body, {
              childList: true,
              subtree: true,
            });
          }
        };

        // Initial check
        tryShowStep();

        // Periodic fallback check (every 200ms)
        intervalRef.current = setInterval(tryShowStep, 200);
      }, delay);
    }

    // Cleanup on unmount or dependency change
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [tutorialState, pathname, shepherdIsActive, config, showStep, cancelTour]);
}
