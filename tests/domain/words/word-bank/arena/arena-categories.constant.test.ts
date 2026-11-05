import { describe, expect, it } from 'vitest';

import { ARENA_CATEGORIES } from '#/domain/words/word-bank/constants/arena/arena-categories.constant.ts';

const EXPECTED_COUNTS: Record<string, number> = {
  'arena-common': 20,
  'arena-rare': 22,
  'arena-epic': 30,
  'arena-legendary': 20,
  'arena-champion': 5,
};

const allWords = ARENA_CATEGORIES.flatMap((category) => category.words);

const normalize = (text: string) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

describe('arena word bank', () => {
  it('has the 97 cards of the arena bank', () => {
    expect(allWords).toHaveLength(97);
  });

  it('has one normal arena category per rarity with the expected count', () => {
    expect(ARENA_CATEGORIES.map((category) => category.id)).toEqual(Object.keys(EXPECTED_COUNTS));

    for (const category of ARENA_CATEGORIES) {
      expect(category.kind).toBe('normal');
      expect(category.mode).toBe('arena');
      expect(category.words).toHaveLength(EXPECTED_COUNTS[category.id] ?? -1);
    }
  });

  it('points every word to its own category', () => {
    for (const category of ARENA_CATEGORIES) {
      for (const word of category.words) {
        expect(word.categoryId).toBe(category.id);
      }
    }
  });

  it('has unique ids in kebab-case', () => {
    const ids = allWords.map((word) => word.id);

    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) {
      expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it('has no empty hint and at most 3 words per hint', () => {
    for (const word of allWords) {
      expect(word.hint.trim(), word.word).not.toBe('');
      expect(word.hint.trim().split(/\s+/).length, word.word).toBeLessThanOrEqual(3);
    }
  });

  it('never has the card name inside its hint', () => {
    for (const word of allWords) {
      expect(normalize(word.hint), word.word).not.toContain(normalize(word.word));
    }
  });
});
