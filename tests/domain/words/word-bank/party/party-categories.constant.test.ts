import { describe, expect, it } from 'vitest';
import { PARTY_CATEGORIES } from '#/domain/words/word-bank/constants/party/party-categories.constant.ts';

const EXPECTED_COUNTS: Record<string, number> = {
  foods: 22,
  drinks: 22,
  places: 24,
  professions: 24,
  'household-objects': 22,
  animals: 22,
  sports: 21,
  transport: 22,
  'clothing-accessories': 21,
  movies: 22,
  'series-anime': 21,
  'cartoons-characters': 20,
  'brazilian-tv': 21,
  'brazilian-music': 21,
  brands: 20,
  games: 21,
  superheroes: 21,
};

const fold = (text: string) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

describe('PARTY_CATEGORIES', () => {
  it('has the 17 normal categories of the party mode', () => {
    expect(PARTY_CATEGORIES.map((category) => category.id)).toEqual(Object.keys(EXPECTED_COUNTS));
    for (const category of PARTY_CATEGORIES) {
      expect(category.kind).toBe('normal');
      expect(category.mode).toBe('party');
    }
  });

  it.each(Object.entries(EXPECTED_COUNTS))('%s has %i words', (id, count) => {
    expect(PARTY_CATEGORIES.find((category) => category.id === id)?.words).toHaveLength(count);
  });

  it('has a distinct color per category', () => {
    const colors = PARTY_CATEGORIES.map((category) => category.color);
    expect(colors.every((color) => /^#[0-9A-F]{6}$/i.test(color ?? ''))).toBe(true);
    expect(new Set(colors).size).toBe(colors.length);
  });

  it('has unique ids and consistent categoryId', () => {
    const entries = PARTY_CATEGORIES.flatMap((category) =>
      category.words.map((entry) => ({ entry, category })),
    );
    const ids = entries.map(({ entry }) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const { entry, category } of entries) {
      expect(entry.categoryId).toBe(category.id);
    }
  });

  it('has no empty hint', () => {
    for (const { hint, id } of PARTY_CATEGORIES.flatMap((category) => category.words)) {
      expect(hint.trim(), id).not.toBe('');
    }
  });

  it('has no hint containing its own word', () => {
    for (const { word, hint, id } of PARTY_CATEGORIES.flatMap((category) => category.words)) {
      expect(fold(hint).includes(fold(word)), id).toBe(false);
    }
  });
});
