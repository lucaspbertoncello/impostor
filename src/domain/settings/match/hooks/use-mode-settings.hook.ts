import { clampImpostorCount } from '#/domain/match/draw/rules/clamp-impostor-count.rule.ts';
import { getMaxImpostors } from '#/domain/match/draw/rules/get-max-impostors.rule.ts';
import { useRoster } from '#/domain/players/roster/stores/roster.store.ts';
import { useMatchSettings } from '#/domain/settings/match/stores/match-settings.store.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

export type ModeSettings = {
  /** The saved value limited to the maximum of the current group (RF-CFG-002). */
  impostorCount: number;
  maxImpostors: number;
  /** True when the saved value was above the maximum and was reduced: show "Ajustado para o máximo". */
  impostorCountWasAdjusted: boolean;
  hintEnabled: boolean;
  /** The chosen categories (Festa). Arena ignores them. */
  categoryIds: string[];
  playerCount: number;
};

export function useModeSettings(mode: ThemeName): ModeSettings {
  const saved = useMatchSettings((state) => state.settings[mode]);
  const playerCount = useRoster((state) => state.players.length);
  const impostorCount = clampImpostorCount(saved.impostorCount, playerCount);

  return {
    impostorCount,
    maxImpostors: getMaxImpostors(playerCount),
    impostorCountWasAdjusted: impostorCount !== saved.impostorCount,
    hintEnabled: saved.hintEnabled,
    categoryIds: saved.categoryIds,
    playerCount,
  };
}
