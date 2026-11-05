import type { RandomInt } from '#/domain/match/draw/types/random-int.type.ts';
import { secureRandomInt } from '#/domain/match/draw/utils/secure-random-int.util.ts';
import { shuffleItems } from '#/domain/match/draw/utils/shuffle-items.util.ts';

/**
 * BR-MAT-021: `count` impostors among the players, without repetition and independent of past rounds.
 * Returned in the order of `playerIds` so the order of the draw says nothing.
 */
export function drawImpostors(
  playerIds: readonly string[],
  count: number,
  randomInt: RandomInt = secureRandomInt,
): string[] {
  if (!Number.isInteger(count) || count < 1 || count > playerIds.length) {
    throw new RangeError('count must be an integer between 1 and the number of players');
  }

  const chosen = new Set(shuffleItems(playerIds, randomInt).slice(0, count));

  return playerIds.filter((playerId) => chosen.has(playerId));
}
