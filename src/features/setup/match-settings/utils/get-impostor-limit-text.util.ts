import { SETTINGS_COPY } from '#/features/setup/match-settings/constants/settings-copy.constant.ts';

/** The line under the stepper: the locked text for 3 or 4 players, else "Máximo para N jogadores: M". */
export function getImpostorLimitText(playerCount: number, maxImpostors: number): string {
  if (maxImpostors <= 1 && (playerCount === 3 || playerCount === 4)) {
    return SETTINGS_COPY.lockedLimit;
  }
  return `Máximo para ${playerCount} jogadores: ${maxImpostors}`;
}
