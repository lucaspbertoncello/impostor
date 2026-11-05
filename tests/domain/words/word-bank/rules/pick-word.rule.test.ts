import { describe, expect, it } from 'vitest';

import { getCategoryOptions } from '#/domain/words/word-bank/rules/get-category-options.rule.ts';
import { getEligibleWords } from '#/domain/words/word-bank/rules/get-eligible-words.rule.ts';
import { pickWord } from '#/domain/words/word-bank/rules/pick-word.rule.ts';
import { createSeededRandomInt } from '#tests/support/random/create-seeded-random-int.util.ts';
import { createFakeBank } from '#tests/support/words/create-fake-word-bank.util.ts';

const bank = createFakeBank();

describe('getEligibleWords (BR-MAT-005)', () => {
  it('takes only the chosen categories', () => {
    const words = getEligibleWords(bank, ['animals']);

    expect(words.map((word) => word.word)).toEqual(['gato', 'cachorro']);
  });

  it('takes every category when there is no choice (Arena)', () => {
    expect(getEligibleWords(bank, null)).toHaveLength(7);
  });

  it('ignores unknown ids and gives nothing for an empty choice', () => {
    expect(getEligibleWords(bank, ['nope'])).toEqual([]);
    expect(getEligibleWords(bank, [])).toEqual([]);
  });

  it('never lets a word outside the chosen categories out, over many draws', () => {
    const eligible = getEligibleWords(bank, ['foods', 'sesh']);
    const allowed = new Set(eligible.map((word) => word.id));
    let used: string[] = [];

    for (let seed = 1; seed <= 200; seed += 1) {
      const result = pickWord(eligible, used, createSeededRandomInt(seed));
      expect(allowed.has(result?.word.id ?? '')).toBe(true);
      expect(result?.word.categoryId).not.toBe('animals');
      used = result?.usedWordIds ?? [];
    }
  });
});

describe('pickWord (BR-MAT-005)', () => {
  const eligible = getEligibleWords(bank, null);

  it('returns null when there is nothing eligible', () => {
    expect(pickWord([], [])).toBeNull();
  });

  it('does not repeat while there are unused words, and draws them all before resetting', () => {
    let used: string[] = [];
    const drawn: string[] = [];

    for (let round = 0; round < eligible.length; round += 1) {
      const result = pickWord(eligible, used, createSeededRandomInt(round + 1));
      drawn.push(result?.word.id ?? '');
      used = result?.usedWordIds ?? [];
    }

    expect(new Set(drawn).size).toBe(eligible.length);
    expect(used).toHaveLength(eligible.length);
  });

  it('resets the history when every eligible word was used, and skips the previous word', () => {
    const everyId = eligible.map((word) => word.id);
    const previous = everyId.at(-1) as string;

    for (let seed = 1; seed <= 100; seed += 1) {
      const result = pickWord(eligible, everyId, createSeededRandomInt(seed));

      expect(result?.word.id).not.toBe(previous);
      expect(result?.usedWordIds).toEqual([result?.word.id]);
    }
  });

  it('never gives the previous word in a row while there is another, even across resets', () => {
    let used: string[] = [];
    let previous = '';

    for (let round = 0; round < 60; round += 1) {
      const result = pickWord(eligible, used, createSeededRandomInt(round * 7 + 1));
      expect(result?.word.id).not.toBe(previous);
      previous = result?.word.id ?? '';
      used = result?.usedWordIds ?? [];
    }
  });

  it('repeats the only word when there is a single eligible one', () => {
    const only = getEligibleWords(bank, ['sesh']).slice(0, 1);
    const result = pickWord(only, [only[0]?.id as string]);

    expect(result?.word.id).toBe(only[0]?.id);
    expect(result?.usedWordIds).toEqual([only[0]?.id]);
  });

  it('keeps the history when the categories change (words outside just do not enter)', () => {
    const foods = getEligibleWords(bank, ['foods']);
    const animalsOnly = getEligibleWords(bank, ['animals']);
    const afterFoods = pickWord(foods, [], createSeededRandomInt(5));
    const afterAnimals = pickWord(
      animalsOnly,
      afterFoods?.usedWordIds ?? [],
      createSeededRandomInt(5),
    );

    expect(afterAnimals?.usedWordIds).toHaveLength(2);
    expect(afterAnimals?.usedWordIds[0]).toBe(afterFoods?.word.id);
  });
});

describe('getCategoryOptions', () => {
  it('gives name, kind, count and the optional fields, never the words', () => {
    const options = getCategoryOptions(bank);

    expect(options[0]).toEqual({
      id: 'foods',
      name: 'Categoria foods',
      kind: 'normal',
      wordCount: 3,
    });
    expect(options[2]).toMatchObject({
      kind: 'special',
      color: '#ff00aa',
      description: 'So adultos',
      wordCount: 2,
    });
    expect(JSON.stringify(options)).not.toContain('pizza');
  });
});
