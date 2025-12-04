'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useOptimistic,
  startTransition,
  type ReactNode,
} from 'react';

import {
  LOCALIZED_COPY,
  type Language,
  type LocalizedCopy,
} from '../constants/copy';
import { setLanguagePreference } from '../actions/language';

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  copy: LocalizedCopy;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

type LanguageProviderProps = {
  children: ReactNode;
  initialLanguage: Language;
};

export function LanguageProvider({
  children,
  initialLanguage,
}: LanguageProviderProps) {
  // Use optimistic updates for instant UI feedback while server action completes
  const [optimisticLanguage, setOptimisticLanguage] =
    useOptimistic(initialLanguage);

  const setLanguage = useCallback(
    async (newLanguage: Language) => {
      // Optimistically update the UI
      startTransition(() => {
        setOptimisticLanguage(newLanguage);
      });

      // Update the server-side cookie
      try {
        await setLanguagePreference(newLanguage);
      } catch (error) {
        console.error('Failed to set language preference:', error);
        // On error, the page will refresh and revert to the cookie value
      }
    },
    [setOptimisticLanguage]
  );

  const toggleLanguage = useCallback(() => {
    const newLanguage = optimisticLanguage === 'en' ? 'ja' : 'en';
    setLanguage(newLanguage);
  }, [optimisticLanguage, setLanguage]);

  const value = useMemo<LanguageContextValue>(() => {
    return {
      language: optimisticLanguage,
      setLanguage,
      toggleLanguage,
      copy: LOCALIZED_COPY[optimisticLanguage],
    };
  }, [optimisticLanguage, setLanguage, toggleLanguage]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
