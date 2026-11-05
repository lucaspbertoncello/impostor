import { useMemo } from 'react';

import { useMatchActions } from '#/domain/match/session/hooks/use-match-actions.hook.ts';
import { useRoundStage } from '#/domain/match/session/hooks/use-round-stage.hook.ts';
import { useMatchSettingsActions } from '#/domain/settings/match/hooks/use-match-settings-actions.hook.ts';
import { useModeSettings } from '#/domain/settings/match/hooks/use-mode-settings.hook.ts';
import { getCategoryOptions } from '#/domain/words/word-bank/rules/get-category-options.rule.ts';
import { getModeCategories } from '#/domain/words/word-bank/rules/get-mode-categories.rule.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

/** Joins what the screen reads and does in the domain: settings, the category chips and the round. */
export function useMatchSettingsModel(mode: ThemeName) {
  const settings = useModeSettings(mode);
  const settingsActions = useMatchSettingsActions();
  const matchActions = useMatchActions();
  const roundStage = useRoundStage(mode);
  const categoryOptions = useMemo(
    () => (mode === 'party' ? getCategoryOptions(getModeCategories(mode)) : []),
    [mode],
  );

  return {
    settings,
    settingsActions,
    startRound: matchActions.startRound,
    hasSavedRound: roundStage !== null,
    categoryOptions,
  };
}
