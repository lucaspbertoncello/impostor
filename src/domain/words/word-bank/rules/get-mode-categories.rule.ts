import { ARENA_CATEGORIES } from '#/domain/words/word-bank/constants/arena/arena-categories.constant.ts';
import { PARTY_CATEGORIES } from '#/domain/words/word-bank/constants/party/party-categories.constant.ts';
import { SPECIAL_CATEGORIES } from '#/domain/words/word-bank/constants/special/special-categories.constant.ts';
import type { WordCategory } from '#/domain/words/word-bank/types/word-category.type.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

/** BR-MAT-002: Arena has the cards of the arena bank; Festa has the normal and the special categories. */
export function getModeCategories(mode: ThemeName): WordCategory[] {
  return mode === 'arena' ? ARENA_CATEGORIES : [...PARTY_CATEGORIES, ...SPECIAL_CATEGORIES];
}
