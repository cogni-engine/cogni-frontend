'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import type { FilePreviewData } from '@/components/FilePreviewDrawer';
import type { WorkspaceMessage } from '@/types/workspace';

interface GlobalUIContextType {
  isInputActive: boolean;

  isDrawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;

  noteDrawerOpen: boolean;
  selectedNoteId: number | null;
  openNoteDrawer: (noteId: number) => void;
  closeNoteDrawer: () => void;

  fileDrawerOpen: boolean;
  selectedFile: FilePreviewData | null;
  openFileDrawer: (file: FilePreviewData) => void;
  closeFileDrawer: () => void;

  chatMessageDrawerOpen: boolean;
  selectedChatMessage: WorkspaceMessage | null;
  openChatMessageDrawer: (message: WorkspaceMessage) => void;
  closeChatMessageDrawer: () => void;
}

const GlobalUIContext = createContext<GlobalUIContextType | undefined>(
  undefined
);

export function GlobalUIProvider({ children }: { children: ReactNode }) {
  const [isInputActive, setIsInputActive] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [noteDrawerOpen, setNoteDrawerOpen] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);

  const [fileDrawerOpen, setFileDrawerOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FilePreviewData | null>(
    null
  );

  const [chatMessageDrawerOpen, setChatMessageDrawerOpen] = useState(false);
  const [selectedChatMessage, setSelectedChatMessage] =
    useState<WorkspaceMessage | null>(null);

  useEffect(() => {
    const checkIfInputActive = () => {
      const el = document.activeElement;
      const isInput =
        el instanceof HTMLInputElement ||
        el instanceof HTMLTextAreaElement ||
        (el?.hasAttribute('contenteditable') ?? false);

      setIsInputActive(isInput);
    };

    document.addEventListener('focusin', checkIfInputActive);
    document.addEventListener('focusout', checkIfInputActive);

    checkIfInputActive();

    return () => {
      document.removeEventListener('focusin', checkIfInputActive);
      document.removeEventListener('focusout', checkIfInputActive);
    };
  }, []);

  const openNoteDrawer = useCallback((noteId: number) => {
    setSelectedNoteId(noteId);
    setNoteDrawerOpen(true);
    setIsDrawerOpen(true);
  }, []);

  const closeNoteDrawer = useCallback(() => {
    setNoteDrawerOpen(false);
    setSelectedNoteId(null);
    setIsDrawerOpen(false);
  }, []);

  const openFileDrawer = useCallback((file: FilePreviewData) => {
    setSelectedFile(file);
    setFileDrawerOpen(true);
    setIsDrawerOpen(true);
  }, []);

  const closeFileDrawer = useCallback(() => {
    setFileDrawerOpen(false);
    setSelectedFile(null);
    setIsDrawerOpen(false);
  }, []);

  const openChatMessageDrawer = useCallback((message: WorkspaceMessage) => {
    setSelectedChatMessage(message);
    setChatMessageDrawerOpen(true);
    setIsDrawerOpen(true);
  }, []);

  const closeChatMessageDrawer = useCallback(() => {
    setChatMessageDrawerOpen(false);
    setSelectedChatMessage(null);
    setIsDrawerOpen(false);
  }, []);

  return (
    <GlobalUIContext.Provider
      value={{
        isInputActive,
        isDrawerOpen,
        setDrawerOpen: setIsDrawerOpen,

        noteDrawerOpen,
        selectedNoteId,
        openNoteDrawer,
        closeNoteDrawer,

        fileDrawerOpen,
        selectedFile,
        openFileDrawer,
        closeFileDrawer,

        chatMessageDrawerOpen,
        selectedChatMessage,
        openChatMessageDrawer,
        closeChatMessageDrawer,
      }}
    >
      {children}
    </GlobalUIContext.Provider>
  );
}

export function useGlobalUI() {
  const context = useContext(GlobalUIContext);
  if (!context) {
    throw new Error('useGlobalUI must be used within a GlobalUIProvider');
  }
  return context;
}
