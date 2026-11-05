import type { PlayerIconIndex } from '#/shared/types/player-icon-index.type.ts';

/** An impostor as the result screen draws it: icon and name. */
export type ResultPlayer = {
  id: string;
  name: string;
  iconIndex: PlayerIconIndex;
};
