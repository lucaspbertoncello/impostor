import type { WordCategory } from '#/domain/words/word-bank/types/word-category.type.ts';
import type { WordEntry } from '#/domain/words/word-bank/types/word-entry.type.ts';

/**
 * BR-MAT-005: the words that can be drawn. `selectedCategoryIds` is the choice of the group (Festa);
 * `null` means every category (Arena has no choice). Ids that match no category are ignored.
 */
export function getEligibleWords(
  categories: readonly WordCategory[],
  selectedCategoryIds: readonly string[] | null,
): WordEntry[] {
  const selected = selectedCategoryIds === null ? null : new Set(selectedCategoryIds);

  return categories
    .filter((category) => selected === null || selected.has(category.id))
    .flatMap((category) => category.words);
}
