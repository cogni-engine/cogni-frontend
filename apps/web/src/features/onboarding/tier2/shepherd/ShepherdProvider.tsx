'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  ReactNode,
} from 'react';
import Shepherd from 'shepherd.js';
import type { Tour, Step } from 'shepherd.js';
import { offset } from '@floating-ui/dom';

// Step options type based on Shepherd.js API
export interface StepOptions {
  id: string;
  text: string;
  attachTo?: {
    element: string;
    on: 'top' | 'bottom' | 'left' | 'right';
  };
  buttons?: Array<{
    text: string;
    action: () => 'next' | 'back' | 'complete' | 'cancel';
  }>;
  ripplePosition?:
    | 'center'
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right';
  classes?: string;
  [key: string]: unknown;
}

interface ShepherdContextType {
  startTour: (tourId: string) => void;
  showStep: (stepOptions: StepOptions) => void;
  cancelTour: () => void;
  isActive: boolean;
  currentTour: Tour | null;
}

const ShepherdContext = createContext<ShepherdContextType | undefined>(
  undefined
);

export function useShepherd() {
  const context = useContext(ShepherdContext);
  if (context === undefined) {
    throw new Error('useShepherd must be used within a ShepherdProvider');
  }
  return context;
}

interface ShepherdProviderProps {
  children: ReactNode;
  tours: Record<string, StepOptions[]>;
}

export function ShepherdProvider({ children, tours }: ShepherdProviderProps) {
  const currentTourRef = useRef<Tour | null>(null);
  const [isActive, setIsActive] = React.useState(false);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (currentTourRef.current) {
        currentTourRef.current.cancel();
        currentTourRef.current = null;
      }
    };
  }, []);

  // Protect input focus from Shepherd's focus trap (critical for mobile)
  useEffect(() => {
    // Allow inputs to keep focus even when Shepherd is active
    const protectInputFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.matches('input, textarea') || target.isContentEditable)
      ) {
        e.stopPropagation();
      }
    };

    document.addEventListener('focusin', protectInputFocus, true);

    return () => {
      document.removeEventListener('focusin', protectInputFocus, true);
    };
  }, []);

  const startTour = (tourId: string) => {
    // Cancel any existing tour
    if (currentTourRef.current) {
      currentTourRef.current.cancel();
    }

    const tourSteps = tours[tourId];
    if (!tourSteps || tourSteps.length === 0) {
      console.warn(`Tour "${tourId}" not found or has no steps`);
      return;
    }

    const tour = new Shepherd.Tour({
      useModalOverlay: false,
      defaultStepOptions: {
        cancelIcon: {
          enabled: false,
        },
        classes: 'shepherd-theme-custom ',
        scrollTo: false,
        canClickTarget: true, // Allow clicking on the target element
        floatingUIOptions: {
          middleware: [
            offset({ mainAxis: 10, crossAxis: 0 }), // Use offset() function, not plain object
          ],
        },
        // Prevent Shepherd from managing focus automatically
        when: {
          show() {
            // Do not auto-focus on the shepherd tooltip
            // This allows the input to maintain focus
          },
        },
      },
    });

    // Add steps to tour
    tourSteps.forEach(stepOptions => {
      const step = tour.addStep(stepOptions) as Step;

      // Add ripple position data attribute to target element
      if (stepOptions.ripplePosition && stepOptions.attachTo?.element) {
        const ripplePosition = stepOptions.ripplePosition;
        const elementSelector = stepOptions.attachTo.element;

        step.on('show', () => {
          const targetElement = document.querySelector(
            elementSelector
          ) as HTMLElement;
          if (targetElement) {
            targetElement.setAttribute('data-ripple-position', ripplePosition);
          }
        });

        step.on('hide', () => {
          const targetElement = document.querySelector(
            elementSelector
          ) as HTMLElement;
          if (targetElement) {
            targetElement.removeAttribute('data-ripple-position');
          }
        });
      }
    });

    // Set up event handlers
    tour.on('complete', () => {
      setIsActive(false);
      currentTourRef.current = null;
    });

    tour.on('cancel', () => {
      setIsActive(false);
      currentTourRef.current = null;
    });

    tour.on('start', () => {
      setIsActive(true);
    });

    // 🔥 Disable Shepherd's focus trap to allow mobile keyboard input (startTour)
    tour.on('show', e => {
      const stepEl = e.step.el;

      if (stepEl) {
        // Make the dialog completely non-focusable
        stepEl.removeAttribute('tabindex');
        stepEl.setAttribute('tabindex', '-1');

        // Prevent the dialog from being focusable
        stepEl.style.outline = 'none';
        stepEl.style.pointerEvents = 'none';

        // But allow pointer events on the content inside
        const content = stepEl.querySelector('.shepherd-content');
        if (content) {
          (content as HTMLElement).style.pointerEvents = 'auto';
        }

        // Remove aria-hidden from app root if Shepherd added it
        const appRoot =
          document.querySelector('#__next') || document.querySelector('main');
        appRoot?.removeAttribute('aria-hidden');

        // Prevent any focus events on the dialog
        const preventFocus = (ev: Event) => {
          ev.preventDefault();
          ev.stopPropagation();
        };

        stepEl.addEventListener('focus', preventFocus, true);
        stepEl.addEventListener('focusin', preventFocus, true);

        // Clean up on hide
        const cleanup = () => {
          stepEl.removeEventListener('focus', preventFocus, true);
          stepEl.removeEventListener('focusin', preventFocus, true);
          e.step.off('hide', cleanup);
        };
        e.step.on('hide', cleanup);
      }
    });

    currentTourRef.current = tour;
    tour.start();
  };

  const showStep = (stepOptions: StepOptions) => {
    // Cancel any existing tour
    if (currentTourRef.current) {
      currentTourRef.current.cancel();
    }

    // Create a temporary tour with just one step
    const tour = new Shepherd.Tour({
      useModalOverlay: false,
      defaultStepOptions: {
        cancelIcon: {
          enabled: false,
        },
        classes: 'shepherd-theme-custom',
        scrollTo: false,
        canClickTarget: true, // Allow clicking on the target element
        floatingUIOptions: {
          middleware: [offset({ mainAxis: 10, crossAxis: 0 })],
        },
        buttons: [], // No buttons by default
        // Prevent Shepherd from managing focus automatically
        when: {
          show() {
            // Do not auto-focus on the shepherd tooltip
            // This allows the input to maintain focus
          },
        },
      },
    });

    const step = tour.addStep({
      ...stepOptions,
      buttons: stepOptions.buttons || [],
    }) as Step;

    // Add ripple position data attribute to target element
    if (stepOptions.ripplePosition && stepOptions.attachTo?.element) {
      const ripplePosition = stepOptions.ripplePosition;
      const elementSelector = stepOptions.attachTo.element;

      step.on('show', () => {
        const targetElement = document.querySelector(
          elementSelector
        ) as HTMLElement;
        if (targetElement) {
          targetElement.setAttribute('data-ripple-position', ripplePosition);
        }
      });

      step.on('hide', () => {
        const targetElement = document.querySelector(
          elementSelector
        ) as HTMLElement;
        if (targetElement) {
          targetElement.removeAttribute('data-ripple-position');
        }
      });
    }

    // Set up event handlers
    tour.on('complete', () => {
      setIsActive(false);
      currentTourRef.current = null;
    });

    tour.on('cancel', () => {
      setIsActive(false);
      currentTourRef.current = null;
    });

    tour.on('start', () => {
      setIsActive(true);
    });

    // 🔥 Disable Shepherd's focus trap to allow mobile keyboard input (showStep)
    tour.on('show', e => {
      const stepEl = e.step.el;

      if (stepEl) {
        // Make the dialog completely non-focusable
        stepEl.removeAttribute('tabindex');
        stepEl.setAttribute('tabindex', '-1');

        // Prevent the dialog from being focusable
        stepEl.style.outline = 'none';
        stepEl.style.pointerEvents = 'none';

        // But allow pointer events on the content inside
        const content = stepEl.querySelector('.shepherd-content');
        if (content) {
          (content as HTMLElement).style.pointerEvents = 'auto';
        }

        // Remove aria-hidden from app root if Shepherd added it
        const appRoot =
          document.querySelector('#__next') || document.querySelector('main');
        appRoot?.removeAttribute('aria-hidden');

        // Prevent any focus events on the dialog and refocus input if needed
        const preventFocus = (ev: Event) => {
          ev.preventDefault();
          ev.stopPropagation();

          // Immediately refocus the input if it exists
          if (stepOptions.attachTo?.element) {
            const targetEl = document.querySelector(
              stepOptions.attachTo.element
            );
            const input = targetEl?.querySelector('input');
            if (input) {
              setTimeout(() => input.focus(), 0);
            }
          }
        };

        stepEl.addEventListener('focus', preventFocus, true);
        stepEl.addEventListener('focusin', preventFocus, true);

        // Clean up on hide
        const cleanup = () => {
          stepEl.removeEventListener('focus', preventFocus, true);
          stepEl.removeEventListener('focusin', preventFocus, true);
          e.step.off('hide', cleanup);
        };
        e.step.on('hide', cleanup);
      }
    });

    currentTourRef.current = tour;
    tour.start();
  };

  const cancelTour = () => {
    if (currentTourRef.current) {
      currentTourRef.current.cancel();
      currentTourRef.current = null;
      setIsActive(false);
    }
  };

  return (
    <ShepherdContext.Provider
      value={{
        startTour,
        showStep,
        cancelTour,
        isActive,
        currentTour: currentTourRef.current,
      }}
    >
      {children}
    </ShepherdContext.Provider>
  );
}
