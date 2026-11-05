import type { PlayerIconIndex } from '#/shared/types/player-icon-index.type.ts';

/** What the round screen needs of a player: no role, nothing secret. */
export type RoundPlayer = {
  id: string;
  name: string;
  iconIndex: PlayerIconIndex;
};
