'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface UIContextType {
  isThreadSidebarOpen: boolean;
  isNotificationPanelOpen: boolean;
  toggleThreadSidebar: () => void;
  toggleNotificationPanel: () => void;
  closeThreadSidebar: () => void;
  closeNotificationPanel: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
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
    <UIContext.Provider
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
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}
