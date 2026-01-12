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
          enabled: true,
        },
        classes: 'shepherd-theme-custom ',
        scrollTo: { behavior: 'smooth', block: 'center' },
        floatingUIOptions: {
          middleware: [
            offset({ mainAxis: 10, crossAxis: 0 }), // Use offset() function, not plain object
          ],
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
          enabled: true,
        },
        classes: 'shepherd-theme-custom',
        scrollTo: { behavior: 'smooth', block: 'center' },
        floatingUIOptions: {
          middleware: [offset({ mainAxis: 10, crossAxis: 0 })],
        },
        buttons: [], // No buttons by default
      },
    });

    const step = tour.addStep({
      ...stepOptions,
      buttons: stepOptions.buttons || [
        {
          text: 'Close',
          action: () => {
            return 'cancel';
          },
        },
      ],
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
