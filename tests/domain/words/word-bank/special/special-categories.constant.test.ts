import { describe, expect, it } from 'vitest';
import { PARTY_CATEGORIES } from '#/domain/words/word-bank/constants/party/party-categories.constant.ts';
import { SPECIAL_CATEGORIES } from '#/domain/words/word-bank/constants/special/special-categories.constant.ts';

const EXPECTED_COUNTS: Record<string, number> = { football: 42, sesh: 31 };

const fold = (text: string) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

describe('SPECIAL_CATEGORIES', () => {
  it('has football and sesh, special and in party mode', () => {
    expect(SPECIAL_CATEGORIES.map((category) => category.id)).toEqual(Object.keys(EXPECTED_COUNTS));
    for (const category of SPECIAL_CATEGORIES) {
      expect(category.kind).toBe('special');
      expect(category.mode).toBe('party');
      expect(category.description?.trim()).toBeTruthy();
    }
  });

  it.each(Object.entries(EXPECTED_COUNTS))('%s has %i words', (id, count) => {
    expect(SPECIAL_CATEGORIES.find((category) => category.id === id)?.words).toHaveLength(count);
  });

  it('has a color distinct from every party category', () => {
    const colors = [...PARTY_CATEGORIES, ...SPECIAL_CATEGORIES].map((category) => category.color);
    expect(new Set(colors).size).toBe(colors.length);
  });

  it('has ids unique across the whole party bank, no empty hint and no hint with its word', () => {
    const entries = [...PARTY_CATEGORIES, ...SPECIAL_CATEGORIES].flatMap(
      (category) => category.words,
    );
    expect(new Set(entries.map((entry) => entry.id)).size).toBe(entries.length);
    for (const { word, hint, id } of SPECIAL_CATEGORIES.flatMap((category) => category.words)) {
      expect(hint.trim(), id).not.toBe('');
      expect(fold(hint).includes(fold(word)), id).toBe(false);
    }
  });
});
