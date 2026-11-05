import type { RandomInt } from '#/domain/match/draw/types/random-int.type.ts';
import { secureRandomInt } from '#/domain/match/draw/utils/secure-random-int.util.ts';
import type { WordEntry } from '#/domain/words/word-bank/types/word-entry.type.ts';

export type PickWordResult = {
  word: WordEntry;
  /** The history after this draw, oldest first; the last item is the word just drawn. */
  usedWordIds: string[];
};

/**
 * BR-MAT-005: a word that is not in the history while there is one; when every eligible word was used,
 * the history resets and the previous word (the last one of the history) is skipped if there is another.
 * `null` when there is no eligible word.
 */
export function pickWord(
  eligibleWords: readonly WordEntry[],
  usedWordIds: readonly string[],
  randomInt: RandomInt = secureRandomInt,
): PickWordResult | null {
  if (eligibleWords.length === 0) return null;

  const used = new Set(usedWordIds);
  const fresh = eligibleWords.filter((word) => !used.has(word.id));

  if (fresh.length > 0) {
    const word = fresh[randomInt(fresh.length)] as WordEntry;
    return { word, usedWordIds: [...usedWordIds, word.id] };
  }

  const previousId = usedWordIds.at(-1);
  const others = eligibleWords.filter((word) => word.id !== previousId);
  const candidates = others.length > 0 ? others : eligibleWords;
  const word = candidates[randomInt(candidates.length)] as WordEntry;

  return { word, usedWordIds: [word.id] };
}
