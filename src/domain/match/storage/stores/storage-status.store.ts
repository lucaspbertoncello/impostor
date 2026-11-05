import { create } from 'zustand';

type StorageStatusState = {
  /** True when the browser storage cannot be used and the game runs in memory only (RF-GER-006). */
  unavailable: boolean;
  /** The warning shows once: dismissing it hides it until the page reloads. */
  warningDismissed: boolean;
  markUnavailable: () => void;
  dismissWarning: () => void;
};

/** Not persisted: it describes the storage itself. */
export const useStorageStatus = create<StorageStatusState>()((set) => ({
  unavailable: false,
  warningDismissed: false,
  markUnavailable: () => set({ unavailable: true }),
  dismissWarning: () => set({ warningDismissed: true }),
}));
