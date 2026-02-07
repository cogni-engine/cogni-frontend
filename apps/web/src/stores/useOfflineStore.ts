/**
 * Global Offline state management using Zustand
 *
 * Manages online/offline status globally across the app.
 * Internally distinguishes between different offline scenarios:
 * - offline-on-mount: App started offline
 * - offline-during-use: Went offline during app usage
 * - online-restored: Connection restored
 *
 * Follows the same pattern as useGlobalUIStore for consistency.
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type OfflineScenario =
  | 'online' // Online
  | 'offline-on-mount' // Started offline
  | 'offline-during-use' // Went offline during use
  | 'online-restored'; // Connection restored

interface OfflineState {
  /** Current online/offline status */
  isOnline: boolean;

  /** Whether the app started offline (detected on mount) */
  wasOfflineOnMount: boolean;

  /** Previous online state (to detect transitions) */
  previousIsOnline: boolean | null;

  /** Whether the app has mounted (to distinguish mount-time vs during-use) */
  hasMounted: boolean;

  /** Last state change timestamp */
  lastStateChangeTime: number;

  /** Calculated scenario based on current state */
  scenario: OfflineScenario;

  // Actions
  setIsOnline: (isOnline: boolean) => void;
  setWasOfflineOnMount: (wasOfflineOnMount: boolean) => void;
  setPreviousIsOnline: (previousIsOnline: boolean | null) => void;
  setHasMounted: (hasMounted: boolean) => void;
}

/**
 * Determines the offline scenario based on current state
 */
function determineScenario(
  state: Omit<
    OfflineState,
    | 'scenario'
    | 'setIsOnline'
    | 'setWasOfflineOnMount'
    | 'setPreviousIsOnline'
    | 'setHasMounted'
  >
): OfflineScenario {
  const { isOnline, wasOfflineOnMount, previousIsOnline, hasMounted } = state;

  // Online
  if (isOnline) {
    // Was offline before → online restored
    if (previousIsOnline === false) {
      return 'online-restored';
    }
    return 'online';
  }

  // Offline
  // Started offline: mount-time and was offline on mount
  if (wasOfflineOnMount && !hasMounted) {
    return 'offline-on-mount';
  }

  // Went offline during use: mounted and was online before
  if (hasMounted && previousIsOnline === true) {
    return 'offline-during-use';
  }

  // Still offline (started offline and still offline)
  if (wasOfflineOnMount) {
    return 'offline-on-mount';
  }

  // Default
  return 'offline-during-use';
}

export const useOfflineStore = create<OfflineState>()(
  devtools(
    (set, get) => {
      // SSRとクライアントで同じ初期状態にする（Hydrationエラーを防ぐ）
      // 実際の状態はクライアント側でuseEffectで設定される
      return {
        // Initial state (SSR-safe: always same values)
        isOnline: true, // Default to online for SSR
        wasOfflineOnMount: false,
        previousIsOnline: null,
        hasMounted: false,
        lastStateChangeTime: 0, // Fixed value for SSR
        scenario: 'online' as OfflineScenario,

        // Actions
        setIsOnline: isOnline => {
          set(state => {
            const newState = {
              ...state,
              isOnline,
              previousIsOnline: state.isOnline,
              lastStateChangeTime: Date.now(),
            };

            return {
              ...newState,
              scenario: determineScenario(newState),
            };
          });
        },

        setWasOfflineOnMount: wasOfflineOnMount =>
          set(state => {
            const newState = { ...state, wasOfflineOnMount };
            return {
              ...newState,
              scenario: determineScenario(newState),
            };
          }),

        setPreviousIsOnline: previousIsOnline =>
          set(state => {
            const newState = { ...state, previousIsOnline };
            return {
              ...newState,
              scenario: determineScenario(newState),
            };
          }),

        setHasMounted: hasMounted =>
          set(state => {
            const newState = { ...state, hasMounted };
            return {
              ...newState,
              scenario: determineScenario(newState),
            };
          }),
      };
    },
    { name: 'OfflineStore' }
  )
);

// Initialize offline detection on client side
// This runs only on the client, after hydration
if (typeof window !== 'undefined') {
  let hasInitialized = false;

  // Initialize on mount (after a small delay to ensure hydration is complete)
  const initializeOfflineDetection = () => {
    if (hasInitialized) return;
    hasInitialized = true;

    const store = useOfflineStore.getState();
    const initialOnline = navigator.onLine;

    // Set initial state (only on client side, after SSR hydration)
    store.setWasOfflineOnMount(!initialOnline);
    store.setPreviousIsOnline(initialOnline);
    store.setIsOnline(initialOnline);
    store.lastStateChangeTime = Date.now();

    // Set mounted flag after a short delay to distinguish mount-time vs during-use
    setTimeout(() => {
      store.setHasMounted(true);
    }, 100);
  };

  // Online event handler
  const handleOnline = () => {
    const store = useOfflineStore.getState();
    store.setIsOnline(true);
  };

  // Offline event handler
  const handleOffline = () => {
    const store = useOfflineStore.getState();
    store.setIsOnline(false);
  };

  // Set up event listeners
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  // Initialize after a small delay to ensure hydration is complete
  // This prevents hydration mismatches
  if (document.readyState === 'complete') {
    // Already loaded, initialize immediately
    setTimeout(initializeOfflineDetection, 0);
  } else {
    // Wait for load
    window.addEventListener('load', () => {
      setTimeout(initializeOfflineDetection, 0);
    });
  }
}

/**
 * Convenience hooks for common use cases
 *
 * Usage:
 * ```typescript
 * // Get online status
 * const isOnline = useIsOnline();
 *
 * // Get scenario
 * const scenario = useOfflineScenario();
 *
 * // Get all state
 * const { isOnline, scenario } = useOfflineStore();
 * ```
 */

// Online status
export const useIsOnline = () => useOfflineStore(state => state.isOnline);

// Scenario
export const useOfflineScenario = () =>
  useOfflineStore(state => state.scenario);

// Check if went offline during use
export const useWentOfflineDuringUse = () =>
  useOfflineStore(state => state.scenario === 'offline-during-use');

// Check if online was restored
export const useOnlineRestored = () =>
  useOfflineStore(state => state.scenario === 'online-restored');
