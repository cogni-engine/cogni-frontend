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
  /** CSS selector for the target element (optional for center-positioned modals) */
  selector?: string;
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
  /** Optional buttons to show in the tooltip */
  buttons?: Array<{
    text: string;
    action: () => 'next' | 'back' | 'complete' | 'cancel';
  }>;
  /** Optional: Custom classes to apply to the tooltip */
  classes?: string;
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
  const hasShownRef = useRef(false); // Track if step has been shown to prevent re-showing

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

    // Reset the shown flag when dependencies change
    hasShownRef.current = false;

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
          return nestedState === childState;
        }

        return false;
      }

      // Regular state matching for non-nested states
      return tutorialState.matches(statePath as never);
    };

    const isInTargetState = showWhenStates.some(state =>
      checkNestedState(state)
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
          // Prevent showing the step multiple times (fixes focus loss in tutorial workspace)
          if (hasShownRef.current) {
            return;
          }

          // If no selector (center-positioned modal), show immediately
          if (!config.selector) {
            hasShownRef.current = true;
            showStep({
              id: config.id,
              text: config.text,
              attachTo: undefined,
              ripplePosition: config.ripplePosition,
              buttons: config.buttons,
              classes: config.classes,
            });
            cleanup();
            return;
          }

          // Check timeout
          if (Date.now() - startTime > maxWaitTime) {
            cleanup();
            return;
          }

          // Find all matching elements and select the first visible one
          const elements = document.querySelectorAll(config.selector);

          let visibleElement: Element | null = null;

          for (const el of Array.from(elements)) {
            // Check if element and all its parents are visible
            let currentEl: Element | null = el;
            let isFullyVisible = true;

            while (currentEl && currentEl !== document.body) {
              const rect = currentEl.getBoundingClientRect();
              const style = window.getComputedStyle(currentEl);

              // Check basic CSS visibility
              const notHiddenByCSS =
                style.display !== 'none' &&
                style.visibility !== 'hidden' &&
                parseFloat(style.opacity) > 0;

              if (!notHiddenByCSS) {
                isFullyVisible = false;
                break;
              }

              currentEl = currentEl.parentElement;
            }

            // Also check the target element has some size or is positioned
            const rect = el.getBoundingClientRect();
            const style = window.getComputedStyle(el);
            const hasSize = rect.width > 0 && rect.height > 0;
            const isPositioned =
              style.position === 'absolute' || style.position === 'fixed';

            if (isFullyVisible && (hasSize || isPositioned)) {
              visibleElement = el;
              break;
            }
          }

          if (visibleElement) {
            // Set flag BEFORE calling showStep to prevent race conditions
            hasShownRef.current = true;
            showStep({
              id: config.id,
              text: config.text,
              attachTo: {
                element: config.selector,
                on: config.position ?? 'top',
              },
              ripplePosition: config.ripplePosition,
              buttons: config.buttons,
              classes: config.classes,
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
      // Reset flag on cleanup
      hasShownRef.current = false;
    };
  }, [tutorialState, pathname, shepherdIsActive, config, showStep, cancelTour]);
}
