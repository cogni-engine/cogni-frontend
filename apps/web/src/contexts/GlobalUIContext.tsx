'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

interface GlobalUIContextType {
  isInputActive: boolean;
  isDrawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}

const GlobalUIContext = createContext<GlobalUIContextType | undefined>(
  undefined
);

export function GlobalUIProvider({ children }: { children: ReactNode }) {
  const [isInputActive, setIsInputActive] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const checkIfInputActive = () => {
      const activeElement = document.activeElement;
      const isInput =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        (activeElement?.hasAttribute('contenteditable') ?? false);

      setIsInputActive(isInput);
    };

    // Check on focus/blur events
    const handleFocusIn = () => checkIfInputActive();
    const handleFocusOut = () => checkIfInputActive();

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    // Initial check
    checkIfInputActive();

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  return (
    <GlobalUIContext.Provider
      value={{
        isInputActive,
        isDrawerOpen,
        setDrawerOpen: setIsDrawerOpen,
      }}
    >
      {children}
    </GlobalUIContext.Provider>
  );
}

export function useGlobalUI() {
  const context = useContext(GlobalUIContext);
  if (context === undefined) {
    throw new Error('useGlobalUI must be used within a GlobalUIProvider');
  }
  return context;
}
