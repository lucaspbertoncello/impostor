import { describe, expect, it } from 'vitest';

import { clampImpostorCount } from '#/domain/match/draw/rules/clamp-impostor-count.rule.ts';
import { getMaxImpostors } from '#/domain/match/draw/rules/get-max-impostors.rule.ts';

describe('getMaxImpostors (BR-MAT-020)', () => {
  it.each([
    [3, 1],
    [4, 1],
    [5, 2],
    [6, 2],
    [7, 3],
    [8, 3],
    [9, 4],
    [10, 4],
    [19, 9],
    [20, 9],
  ])('with %i players the maximum is %i', (players, expected) => {
    expect(getMaxImpostors(players)).toBe(expected);
  });

  it('is always below half of the group, from 3 to 20 players', () => {
    for (let players = 3; players <= 20; players += 1) {
      const max = getMaxImpostors(players);
      expect(max).toBeGreaterThanOrEqual(1);
      expect(max).toBeLessThan(players / 2);
    }
  });
});

describe('clampImpostorCount (BR-MAT-020)', () => {
  it('keeps a value inside the range', () => {
    expect(clampImpostorCount(2, 6)).toBe(2);
  });

  it('reduces a saved value above the new maximum', () => {
    expect(clampImpostorCount(4, 6)).toBe(2);
    expect(clampImpostorCount(9, 3)).toBe(1);
  });

  it('never goes below 1', () => {
    expect(clampImpostorCount(0, 10)).toBe(1);
    expect(clampImpostorCount(-3, 10)).toBe(1);
    expect(clampImpostorCount(Number.NaN, 10)).toBe(1);
  });
});
