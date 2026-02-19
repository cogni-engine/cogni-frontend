/**
 * Global UI state management using Zustand
 *
 * Manages drawer states, input focus tracking, and selected items globally.
 * Optimized for performance with fine-grained subscriptions.
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import type { FilePreviewData } from '@/components/FilePreviewDrawer';
import type { WorkspaceMessage } from '@/types/workspace';

export interface UserProfileData {
  userId: string;
  name: string;
  avatarUrl: string;
  role?: string;
}

interface GlobalUIState {
  // Input tracking
  isInputActive: boolean;

  // General drawer state
  isDrawerOpen: boolean;

  // Note drawer
  noteDrawerOpen: boolean;
  selectedNoteId: number | null;

  // File drawer
  fileDrawerOpen: boolean;
  selectedFile: FilePreviewData | null;

  // Chat message drawer
  chatMessageDrawerOpen: boolean;
  selectedChatMessage: WorkspaceMessage | null;

  // User profile drawer
  userProfileDrawerOpen: boolean;
  selectedUserProfile: UserProfileData | null;

  // Activity drawer
  activityDrawerOpen: boolean;
  activityDrawerInitialMemberIds: number[] | null;

  // Actions
  setInputActive: (active: boolean) => void;
  setDrawerOpen: (open: boolean) => void;

  openNoteDrawer: (noteId: number) => void;
  closeNoteDrawer: () => void;

  openFileDrawer: (file: FilePreviewData) => void;
  closeFileDrawer: () => void;

  openChatMessageDrawer: (message: WorkspaceMessage) => void;
  closeChatMessageDrawer: () => void;

  openUserProfileDrawer: (profile: UserProfileData) => void;
  closeUserProfileDrawer: () => void;

  openActivityDrawer: (initialMemberIds?: number[]) => void;
  closeActivityDrawer: () => void;
}

export const useGlobalUIStore = create<GlobalUIState>()(
  devtools(
    set => ({
      // Initial state
      isInputActive: false,
      isDrawerOpen: false,

      noteDrawerOpen: false,
      selectedNoteId: null,

      fileDrawerOpen: false,
      selectedFile: null,

      chatMessageDrawerOpen: false,
      selectedChatMessage: null,

      userProfileDrawerOpen: false,
      selectedUserProfile: null,

      activityDrawerOpen: false,
      activityDrawerInitialMemberIds: null,

      // Actions
      setInputActive: active => set({ isInputActive: active }),

      setDrawerOpen: open => set({ isDrawerOpen: open }),

      openNoteDrawer: noteId =>
        set({
          selectedNoteId: noteId,
          noteDrawerOpen: true,
          isDrawerOpen: true,
        }),

      closeNoteDrawer: () =>
        set({
          noteDrawerOpen: false,
          selectedNoteId: null,
          isDrawerOpen: false,
        }),

      openFileDrawer: file =>
        set({
          selectedFile: file,
          fileDrawerOpen: true,
          isDrawerOpen: true,
        }),

      closeFileDrawer: () =>
        set({
          fileDrawerOpen: false,
          selectedFile: null,
          isDrawerOpen: false,
        }),

      openChatMessageDrawer: message =>
        set({
          selectedChatMessage: message,
          chatMessageDrawerOpen: true,
          isDrawerOpen: true,
        }),

      closeChatMessageDrawer: () =>
        set({
          chatMessageDrawerOpen: false,
          selectedChatMessage: null,
          isDrawerOpen: false,
        }),

      openUserProfileDrawer: profile =>
        set({
          selectedUserProfile: profile,
          userProfileDrawerOpen: true,
          isDrawerOpen: true,
        }),

      closeUserProfileDrawer: () =>
        set({
          userProfileDrawerOpen: false,
          selectedUserProfile: null,
          isDrawerOpen: false,
        }),

      openActivityDrawer: initialMemberIds =>
        set({
          activityDrawerOpen: true,
          activityDrawerInitialMemberIds: initialMemberIds ?? null,
          isDrawerOpen: true,
        }),

      closeActivityDrawer: () =>
        set({
          activityDrawerOpen: false,
          activityDrawerInitialMemberIds: null,
          isDrawerOpen: false,
        }),
    }),
    { name: 'GlobalUIStore' }
  )
);

// Initialize input tracking on client side
if (typeof window !== 'undefined') {
  const checkIfInputActive = () => {
    const el = document.activeElement;
    const isInput =
      el instanceof HTMLInputElement ||
      el instanceof HTMLTextAreaElement ||
      (el?.hasAttribute('contenteditable') ?? false);

    useGlobalUIStore.getState().setInputActive(isInput);
  };

  const handleFocusIn = (event: Event) => {
    checkIfInputActive();
  };

  const handleFocusOut = (event: Event) => {
    checkIfInputActive();
  };

  document.addEventListener('focusin', handleFocusIn);
  document.addEventListener('focusout', handleFocusOut);

  // Initial check
  checkIfInputActive();
}

/**
 * Convenience hooks for common use cases
 *
 * Usage:
 * ```typescript
 * // Optimal: Subscribe to specific values
 * const isDrawerOpen = useIsDrawerOpen();
 * const noteId = useSelectedNoteId();
 *
 * // Or use the store directly with selectors
 * const { openNoteDrawer, closeNoteDrawer } = useGlobalUIStore(
 *   state => ({
 *     openNoteDrawer: state.openNoteDrawer,
 *     closeNoteDrawer: state.closeNoteDrawer,
 *   })
 * );
 * ```
 */

// Input tracking
export const useIsInputActive = () =>
  useGlobalUIStore(state => state.isInputActive);

// Drawer states
export const useIsDrawerOpen = () =>
  useGlobalUIStore(state => state.isDrawerOpen);

// Note drawer
export const useNoteDrawer = () =>
  useGlobalUIStore(
    useShallow(state => ({
      isOpen: state.noteDrawerOpen,
      noteId: state.selectedNoteId,
      open: state.openNoteDrawer,
      close: state.closeNoteDrawer,
    }))
  );

export const useSelectedNoteId = () =>
  useGlobalUIStore(state => state.selectedNoteId);

// File drawer
export const useFileDrawer = () =>
  useGlobalUIStore(
    useShallow(state => ({
      isOpen: state.fileDrawerOpen,
      file: state.selectedFile,
      open: state.openFileDrawer,
      close: state.closeFileDrawer,
    }))
  );

export const useSelectedFile = () =>
  useGlobalUIStore(state => state.selectedFile);

// Chat message drawer
export const useChatMessageDrawer = () =>
  useGlobalUIStore(
    useShallow(state => ({
      isOpen: state.chatMessageDrawerOpen,
      message: state.selectedChatMessage,
      open: state.openChatMessageDrawer,
      close: state.closeChatMessageDrawer,
    }))
  );

export const useSelectedChatMessage = () =>
  useGlobalUIStore(state => state.selectedChatMessage);

// User profile drawer
export const useUserProfileDrawer = () =>
  useGlobalUIStore(
    useShallow(state => ({
      isOpen: state.userProfileDrawerOpen,
      profile: state.selectedUserProfile,
      open: state.openUserProfileDrawer,
      close: state.closeUserProfileDrawer,
    }))
  );

// Activity drawer
export const useActivityDrawer = () =>
  useGlobalUIStore(
    useShallow(state => ({
      isOpen: state.activityDrawerOpen,
      initialMemberIds: state.activityDrawerInitialMemberIds,
      open: state.openActivityDrawer,
      close: state.closeActivityDrawer,
    }))
  );
