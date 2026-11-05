import type { RandomInt } from '#/domain/match/draw/types/random-int.type.ts';
import { secureRandomInt } from '#/domain/match/draw/utils/secure-random-int.util.ts';

/** Fisher-Yates: every permutation is equally likely. Returns a new array. */
export function shuffleItems<Item>(
  items: readonly Item[],
  randomInt: RandomInt = secureRandomInt,
): Item[] {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const other = randomInt(index + 1);
    const current = result[index] as Item;
    result[index] = result[other] as Item;
    result[other] = current;
  }

  return result;
}
