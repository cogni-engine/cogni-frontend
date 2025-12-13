'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ThreadId = number | 'new' | null;

interface ThreadContextType {
  selectedThreadId: ThreadId;
  setSelectedThreadId: (id: ThreadId) => void;
}

const ThreadContext = createContext<ThreadContextType | undefined>(undefined);

export function ThreadProvider({ children }: { children: ReactNode }) {
  const [selectedThreadId, setSelectedThreadId] = useState<ThreadId>(null);

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
