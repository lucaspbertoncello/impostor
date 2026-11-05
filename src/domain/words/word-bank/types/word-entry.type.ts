import type { WordLevel } from '#/domain/words/word-bank/types/word-level.type.ts';

export type WordEntry = {
  id: string;
  word: string;
  hint: string;
  level: WordLevel;
  categoryId: string;
};
