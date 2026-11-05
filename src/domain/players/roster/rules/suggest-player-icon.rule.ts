import { PLAYER_ICON_INDEXES } from '#/shared/constants/player-icon-indexes.constant.ts';
import type { PlayerIconIndex } from '#/shared/types/player-icon-index.type.ts';

/**
 * BR-MAT-012: the first icon not used yet; after the 16 are used, the least used one (the first among ties).
 */
export function suggestPlayerIcon(usedIcons: readonly PlayerIconIndex[]): PlayerIconIndex {
  const usage = new Map<PlayerIconIndex, number>(PLAYER_ICON_INDEXES.map((index) => [index, 0]));
  for (const icon of usedIcons) usage.set(icon, (usage.get(icon) ?? 0) + 1);

  let suggestion = PLAYER_ICON_INDEXES[0] as PlayerIconIndex;
  for (const index of PLAYER_ICON_INDEXES) {
    if ((usage.get(index) ?? 0) < (usage.get(suggestion) ?? 0)) suggestion = index;
  }

  return suggestion;
}
