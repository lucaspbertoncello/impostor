import type { PlayerNameError } from '#/domain/players/roster/types/player-name-error.type.ts';
import type { Player } from '#/domain/players/roster/types/player.type.ts';

export type PlayerActionResult =
  | { ok: true; player: Player }
  | { ok: false; error: PlayerNameError | 'roster-full' | 'not-found' };
