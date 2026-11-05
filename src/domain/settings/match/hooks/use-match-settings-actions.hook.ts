import { useShallow } from 'zustand/react/shallow';

import { useMatchSettings } from '#/domain/settings/match/stores/match-settings.store.ts';

/** Change the configuration of a mode (RF-CFG-001 to RF-CFG-003). */
export function useMatchSettingsActions() {
  return useMatchSettings(
    useShallow((state) => ({
      setImpostorCount: state.setImpostorCount,
      setHintEnabled: state.setHintEnabled,
      setCategories: state.setCategories,
      toggleCategory: state.toggleCategory,
    })),
  );
}
