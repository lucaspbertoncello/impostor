import type { WordCategory } from '#/domain/words/word-bank/types/word-category.type.ts';

export type CategoryOption = {
  id: string;
  name: string;
  kind: WordCategory['kind'];
  description?: string;
  color?: string;
  wordCount: number;
};

/** What the chips of the settings screen need (RF-CFG-003): no words, only the name and the count. */
export function getCategoryOptions(categories: readonly WordCategory[]): CategoryOption[] {
  return categories.map((category) => ({
    id: category.id,
    name: category.name,
    kind: category.kind,
    ...(category.description === undefined ? {} : { description: category.description }),
    ...(category.color === undefined ? {} : { color: category.color }),
    wordCount: category.words.length,
  }));
}
