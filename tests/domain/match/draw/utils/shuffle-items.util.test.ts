import { describe, expect, it } from 'vitest';

import { secureRandomInt } from '#/domain/match/draw/utils/secure-random-int.util.ts';
import { shuffleItems } from '#/domain/match/draw/utils/shuffle-items.util.ts';
import { createSeededRandomInt } from '#tests/support/random/create-seeded-random-int.util.ts';

describe('shuffleItems (Fisher-Yates)', () => {
  it('returns a permutation without touching the input', () => {
    const items = [1, 2, 3, 4, 5];
    const shuffled = shuffleItems(items, createSeededRandomInt(3));

    expect([...shuffled].sort()).toEqual(items);
    expect(items).toEqual([1, 2, 3, 4, 5]);
  });

  it('handles empty and single-item lists', () => {
    expect(shuffleItems([])).toEqual([]);
    expect(shuffleItems(['a'])).toEqual(['a']);
  });

  it('has no bias: the 6 permutations of 3 items come out about equally', () => {
    const counts = new Map<string, number>();
    const random = createSeededRandomInt(2024);
    const runs = 6000;

    for (let run = 0; run < runs; run += 1) {
      const key = shuffleItems(['a', 'b', 'c'], random).join('');
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }

    expect(counts.size).toBe(6);
    for (const count of counts.values()) {
      expect(count).toBeGreaterThan(runs / 6 - 150);
      expect(count).toBeLessThan(runs / 6 + 150);
    }
  });
});

describe('secureRandomInt', () => {
  it('stays inside 0..max-1', () => {
    for (let run = 0; run < 500; run += 1) {
      const value = secureRandomInt(7);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(7);
      expect(Number.isInteger(value)).toBe(true);
    }
  });

  it('rejects an invalid maximum', () => {
    expect(() => secureRandomInt(0)).toThrow(RangeError);
    expect(() => secureRandomInt(2.5)).toThrow(RangeError);
  });
});
