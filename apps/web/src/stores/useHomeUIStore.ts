/**
 * Home UI state management using Zustand
 *
 * Manages thread sidebar and notification panel state for the home page.
 * Optimized for performance with fine-grained subscriptions.
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';

interface HomeUIState {
  // State
  isThreadSidebarOpen: boolean;
  isNotificationPanelOpen: boolean;

  // Actions
  toggleThreadSidebar: () => void;
  toggleNotificationPanel: () => void;
  closeThreadSidebar: () => void;
  closeNotificationPanel: () => void;
}

export const useHomeUIStore = create<HomeUIState>()(
  devtools(
    set => ({
      // Initial state
      isThreadSidebarOpen: false,
      isNotificationPanelOpen: false,

      // Actions
      toggleThreadSidebar: () =>
        set(state => {
          const willBeOpen = !state.isThreadSidebarOpen;
          // Close notification panel if opening thread sidebar
          return {
            isThreadSidebarOpen: willBeOpen,
            isNotificationPanelOpen:
              willBeOpen && state.isNotificationPanelOpen
                ? false
                : state.isNotificationPanelOpen,
          };
        }),

      toggleNotificationPanel: () =>
        set(state => ({
          isNotificationPanelOpen: !state.isNotificationPanelOpen,
        })),

      closeThreadSidebar: () => set({ isThreadSidebarOpen: false }),

      closeNotificationPanel: () => set({ isNotificationPanelOpen: false }),
    }),
    { name: 'HomeUIStore' }
  )
);

/**
 * Convenience hooks for common use cases
 *
 * Usage:
 * ```typescript
 * // Optimal: Subscribe to specific values
 * const isThreadSidebarOpen = useIsThreadSidebarOpen();
 * const toggleNotificationPanel = useHomeUIStore(state => state.toggleNotificationPanel);
 *
 * // Or get everything (use sparingly)
 * const homeUI = useHomeUI();
 * ```
 */

export const useIsThreadSidebarOpen = () =>
  useHomeUIStore(state => state.isThreadSidebarOpen);

export const useIsNotificationPanelOpen = () =>
  useHomeUIStore(state => state.isNotificationPanelOpen);

export const useThreadSidebar = () =>
  useHomeUIStore(
    useShallow(state => ({
      isOpen: state.isThreadSidebarOpen,
      toggle: state.toggleThreadSidebar,
      close: state.closeThreadSidebar,
    }))
  );

export const useNotificationPanel = () =>
  useHomeUIStore(
    useShallow(state => ({
      isOpen: state.isNotificationPanelOpen,
      toggle: state.toggleNotificationPanel,
      close: state.closeNotificationPanel,
    }))
  );

// Full state hook (use sparingly as it subscribes to all changes)
export const useHomeUI = () =>
  useHomeUIStore(
    useShallow(state => ({
      isThreadSidebarOpen: state.isThreadSidebarOpen,
      isNotificationPanelOpen: state.isNotificationPanelOpen,
      toggleThreadSidebar: state.toggleThreadSidebar,
      toggleNotificationPanel: state.toggleNotificationPanel,
      closeThreadSidebar: state.closeThreadSidebar,
      closeNotificationPanel: state.closeNotificationPanel,
    }))
  );
