import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OnboardingState {
  userId: string | null;
  onboardingSessionId: string | null;
  // State machine snapshot for debugging/tracking
  machineSnapshot: any | null;
  setUserId: (userId: string | null) => void;
  setOnboardingSessionId: (sessionId: string | null) => void;
  setMachineSnapshot: (snapshot: any) => void;
  reset: () => void;
}

const initialState = {
  userId: null,
  onboardingSessionId: null,
  machineSnapshot: null,
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    set => ({
      ...initialState,
      setUserId: userId => set({ userId }),
      setOnboardingSessionId: onboardingSessionId =>
        set({ onboardingSessionId }),
      setMachineSnapshot: snapshot => set({ machineSnapshot: snapshot }),
      reset: () => set(initialState),
    }),
    {
      name: 'onboarding-storage',
    }
  )
);
