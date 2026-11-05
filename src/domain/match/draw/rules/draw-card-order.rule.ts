import type { RandomInt } from '#/domain/match/draw/types/random-int.type.ts';
import { secureRandomInt } from '#/domain/match/draw/utils/secure-random-int.util.ts';
import { shuffleItems } from '#/domain/match/draw/utils/shuffle-items.util.ts';

/** BR-MAT-028: the order in which players receive the phone; new every round. */
export function drawCardOrder(
  playerIds: readonly string[],
  randomInt: RandomInt = secureRandomInt,
): string[] {
  return shuffleItems(playerIds, randomInt);
}
