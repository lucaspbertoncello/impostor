import type { WordEntry } from '#/domain/words/word-bank/types/word-entry.type.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

export type WordCategory = {
  id: string;
  name: string;
  kind: 'normal' | 'special';
  mode: ThemeName;
  description?: string;
  color?: string;
  words: WordEntry[];
};
