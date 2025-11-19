import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ThreadContextType {
  selectedThreadId: number | null;
  setSelectedThreadId: (id: number | null) => void;
}

const ThreadContext = createContext<ThreadContextType | undefined>(undefined);

export function ThreadProvider({ children }: { children: ReactNode }) {
  const [selectedThreadId, setSelectedThreadId] = useState<number | null>(null);

  return (
    <ThreadContext.Provider value={{ selectedThreadId, setSelectedThreadId }}>
      {children}
    </ThreadContext.Provider>
  );
}

export function useThreadContext() {
  const context = useContext(ThreadContext);
  if (context === undefined) {
    throw new Error('useThreadContext must be used within a ThreadProvider');
  }
  return context;
}

