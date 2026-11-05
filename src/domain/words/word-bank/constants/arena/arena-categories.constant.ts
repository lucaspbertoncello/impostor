import { ARENA_CHAMPION_CATEGORY } from '#/domain/words/word-bank/constants/arena/champion.constant.ts';
import { ARENA_COMMON_CATEGORY } from '#/domain/words/word-bank/constants/arena/common.constant.ts';
import { ARENA_EPIC_CATEGORY } from '#/domain/words/word-bank/constants/arena/epic.constant.ts';
import { ARENA_LEGENDARY_CATEGORY } from '#/domain/words/word-bank/constants/arena/legendary.constant.ts';
import { ARENA_RARE_CATEGORY } from '#/domain/words/word-bank/constants/arena/rare.constant.ts';
import type { WordCategory } from '#/domain/words/word-bank/types/word-category.type.ts';

export const ARENA_CATEGORIES: WordCategory[] = [
  ARENA_COMMON_CATEGORY,
  ARENA_RARE_CATEGORY,
  ARENA_EPIC_CATEGORY,
  ARENA_LEGENDARY_CATEGORY,
  ARENA_CHAMPION_CATEGORY,
];
