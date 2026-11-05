import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { wordHistoryStateSchema } from '#/domain/match/history/schemas/word-history-state.schema.ts';
import { APP_STORAGE } from '#/domain/match/storage/constants/app-storage.constant.ts';
import { createValidatedMerge } from '#/domain/match/storage/utils/create-validated-merge.util.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

type WordHistoryState = {
  /** Words used in the session, per mode, oldest first (BR-MAT-005). Only ids, never the words. */
  usedWordIds: Record<ThemeName, string[]>;
};

type WordHistoryActions = {
  setUsedWordIds: (mode: ThemeName, usedWordIds: string[]) => void;
  clearHistory: () => void;
};

const INITIAL_STATE: WordHistoryState = { usedWordIds: { arena: [], party: [] } };

export const useWordHistory = create<WordHistoryState & WordHistoryActions>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,
      setUsedWordIds: (mode, usedWordIds) => {
        set({ usedWordIds: { ...get().usedWordIds, [mode]: usedWordIds } });
      },
      clearHistory: () => set({ usedWordIds: { arena: [], party: [] } }),
    }),
    {
      name: 'impostor-word-history',
      version: 1,
      storage: createJSONStorage(() => APP_STORAGE),
      partialize: (state) => ({ usedWordIds: state.usedWordIds }),
      merge: createValidatedMerge<WordHistoryState & WordHistoryActions, WordHistoryState>(
        wordHistoryStateSchema,
      ),
    },
  ),
);
