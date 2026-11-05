import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { clampImpostorCount } from '#/domain/match/draw/rules/clamp-impostor-count.rule.ts';
import { APP_STORAGE } from '#/domain/match/storage/constants/app-storage.constant.ts';
import { createValidatedMerge } from '#/domain/match/storage/utils/create-validated-merge.util.ts';
import { useRoster } from '#/domain/players/roster/stores/roster.store.ts';
import { matchSettingsStateSchema } from '#/domain/settings/match/schemas/match-settings-state.schema.ts';
import type { MatchSettings } from '#/domain/settings/match/types/match-settings.type.ts';
import { createDefaultMatchSettings } from '#/domain/settings/match/utils/create-default-match-settings.util.ts';
import { getModeCategories } from '#/domain/words/word-bank/rules/get-mode-categories.rule.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

type MatchSettingsState = {
  settings: Record<ThemeName, MatchSettings>;
};

type MatchSettingsActions = {
  setImpostorCount: (mode: ThemeName, count: number) => void;
  setHintEnabled: (mode: ThemeName, enabled: boolean) => void;
  setCategories: (mode: ThemeName, categoryIds: string[]) => void;
  toggleCategory: (mode: ThemeName, categoryId: string) => void;
};

function createInitialState(): MatchSettingsState {
  return {
    settings: {
      arena: createDefaultMatchSettings(getModeCategories('arena')),
      party: createDefaultMatchSettings(getModeCategories('party')),
    },
  };
}

/** Never read it from a screen directly: use the hooks of `settings/match/hooks/`. */
export const useMatchSettings = create<MatchSettingsState & MatchSettingsActions>()(
  persist(
    (set, get) => {
      function patch(mode: ThemeName, changes: Partial<MatchSettings>) {
        const { settings } = get();
        set({ settings: { ...settings, [mode]: { ...settings[mode], ...changes } } });
      }

      return {
        ...createInitialState(),
        setImpostorCount: (mode, count) => {
          patch(mode, {
            impostorCount: clampImpostorCount(count, useRoster.getState().players.length),
          });
        },
        setHintEnabled: (mode, enabled) => patch(mode, { hintEnabled: enabled }),
        setCategories: (mode, categoryIds) =>
          patch(mode, { categoryIds: [...new Set(categoryIds)] }),
        toggleCategory: (mode, categoryId) => {
          const current = get().settings[mode].categoryIds;
          const next = current.includes(categoryId)
            ? current.filter((id) => id !== categoryId)
            : [...current, categoryId];
          patch(mode, { categoryIds: next });
        },
      };
    },
    {
      name: 'impostor-settings',
      version: 1,
      storage: createJSONStorage(() => APP_STORAGE),
      partialize: (state) => ({ settings: state.settings }),
      merge: createValidatedMerge<MatchSettingsState & MatchSettingsActions, MatchSettingsState>(
        matchSettingsStateSchema,
      ),
    },
  ),
);
