import type { WordCategory } from '#/domain/words/word-bank/types/word-category.type.ts';
import type { WordEntry } from '#/domain/words/word-bank/types/word-entry.type.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

export function createFakeWord(
  categoryId: string,
  word: string,
  hint = `dica de ${word}`,
): WordEntry {
  return { id: `${categoryId}-${word}`, word, hint, level: 'easy', categoryId };
}

export function createFakeCategory(
  id: string,
  words: string[],
  overrides: Partial<Omit<WordCategory, 'id' | 'words'>> = {},
): WordCategory {
  const mode: ThemeName = overrides.mode ?? 'party';

  return {
    name: `Categoria ${id}`,
    kind: 'normal',
    mode,
    ...overrides,
    id,
    words: words.map((word) => createFakeWord(id, word)),
  };
}

/** Two normal categories and one special, enough to test every rule. */
export function createFakeBank(): WordCategory[] {
  return [
    createFakeCategory('foods', ['pizza', 'sushi', 'bolo']),
    createFakeCategory('animals', ['gato', 'cachorro']),
    createFakeCategory('sesh', ['segredo', 'noite'], {
      kind: 'special',
      color: '#ff00aa',
      description: 'So adultos',
    }),
  ];
}
