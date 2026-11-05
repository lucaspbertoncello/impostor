import type { PlayerIconIndex } from '#/shared/types/player-icon-index.type.ts';

/** One list of players for both modes; the icon is the position 1 to 16 and each theme draws its own (BR-MAT-013). */
export type Player = {
  id: string;
  name: string;
  iconIndex: PlayerIconIndex;
};
