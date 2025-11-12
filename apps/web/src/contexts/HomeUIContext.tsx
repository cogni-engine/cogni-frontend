'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface HomeUIContextType {
  isThreadSidebarOpen: boolean;
  isNotificationPanelOpen: boolean;
  toggleThreadSidebar: () => void;
  toggleNotificationPanel: () => void;
  closeThreadSidebar: () => void;
  closeNotificationPanel: () => void;
}

const HomeUIContext = createContext<HomeUIContextType | undefined>(undefined);

export function HomeUIProvider({ children }: { children: ReactNode }) {
  const [isThreadSidebarOpen, setIsThreadSidebarOpen] = useState(false);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);

  const toggleThreadSidebar = () => {
    setIsThreadSidebarOpen(prev => !prev);
    // Close notification panel if open
    if (!isThreadSidebarOpen && isNotificationPanelOpen) {
      setIsNotificationPanelOpen(false);
    }
  };

  const toggleNotificationPanel = () => {
    setIsNotificationPanelOpen(prev => !prev);
  };

  const closeThreadSidebar = () => setIsThreadSidebarOpen(false);
  const closeNotificationPanel = () => setIsNotificationPanelOpen(false);

  return (
    <HomeUIContext.Provider
      value={{
        isThreadSidebarOpen,
        isNotificationPanelOpen,
        toggleThreadSidebar,
        toggleNotificationPanel,
        closeThreadSidebar,
        closeNotificationPanel,
      }}
    >
      {children}
    </HomeUIContext.Provider>
  );
}

export function useHomeUI() {
  const context = useContext(HomeUIContext);
  if (context === undefined) {
    throw new Error('useHomeUI must be used within a HomeUIProvider');
  }
  return context;
}
