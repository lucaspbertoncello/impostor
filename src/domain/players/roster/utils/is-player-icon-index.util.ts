import { PLAYER_ICON_INDEXES } from '#/shared/constants/player-icon-indexes.constant.ts';
import type { PlayerIconIndex } from '#/shared/types/player-icon-index.type.ts';

export function isPlayerIconIndex(value: unknown): value is PlayerIconIndex {
  return PLAYER_ICON_INDEXES.some((index) => index === value);
}
