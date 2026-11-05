import {
  MAX_PLAYER_NAME_LENGTH,
  MIN_PLAYER_NAME_LENGTH,
} from '#/domain/players/roster/constants/roster-limits.constant.ts';
import { normalizePlayerName } from '#/domain/players/roster/rules/normalize-player-name.rule.ts';
import type { PlayerNameError } from '#/domain/players/roster/types/player-name-error.type.ts';
import type { Player } from '#/domain/players/roster/types/player.type.ts';

/**
 * BR-MAT-011: required, 1 to 12 characters, unique in the group.
 * `editingPlayerId` is the player being edited, who may keep their own name.
 */
export function validatePlayerName(
  name: string,
  players: readonly Player[],
  editingPlayerId?: string,
): PlayerNameError | null {
  const trimmed = name.trim();
  const length = Array.from(trimmed).length;

  if (length < MIN_PLAYER_NAME_LENGTH) return 'empty';
  if (length > MAX_PLAYER_NAME_LENGTH) return 'too-long';

  const key = normalizePlayerName(trimmed);
  const isTaken = players.some(
    (player) => player.id !== editingPlayerId && normalizePlayerName(player.name) === key,
  );

  return isTaken ? 'duplicate' : null;
}
