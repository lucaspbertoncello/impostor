import type { RandomInt } from '#/domain/match/draw/types/random-int.type.ts';
import { secureRandomInt } from '#/domain/match/draw/utils/secure-random-int.util.ts';
import { shuffleItems } from '#/domain/match/draw/utils/shuffle-items.util.ts';

/**
 * BR-MAT-029: the full speaking order; the first one starts, impostor included.
 * It is a separate draw from the card order, never derived from it.
 */
export function drawSpeakingOrder(
  playerIds: readonly string[],
  randomInt: RandomInt = secureRandomInt,
): string[] {
  return shuffleItems(playerIds, randomInt);
}
