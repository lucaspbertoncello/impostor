import type { PlayerIconIndex } from '#/shared/types/player-icon-index.type.ts';

/** A player as the screen draws it. */
export type PlayerItem = {
  id: string;
  name: string;
  iconIndex: PlayerIconIndex;
};
