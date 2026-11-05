import type { MatchSettings } from '#/domain/settings/match/types/match-settings.type.ts';
import type { WordCategory } from '#/domain/words/word-bank/types/word-category.type.ts';

/** BR-MAT-004, BR-MAT-020, BR-MAT-025: 1 impostor, hint on, every category marked (normal and special). */
export function createDefaultMatchSettings(categories: readonly WordCategory[]): MatchSettings {
  return {
    impostorCount: 1,
    hintEnabled: true,
    categoryIds: categories.map((category) => category.id),
  };
}
