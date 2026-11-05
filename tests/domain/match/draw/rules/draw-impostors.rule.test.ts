import { describe, expect, it } from 'vitest';

import { drawImpostors } from '#/domain/match/draw/rules/draw-impostors.rule.ts';
import { createFakePlayers } from '#tests/support/players/create-fake-players.util.ts';
import { createSeededRandomInt } from '#tests/support/random/create-seeded-random-int.util.ts';

const ids = createFakePlayers(10).map((player) => player.id);

describe('drawImpostors (BR-MAT-021)', () => {
  it.each([1, 2, 4, 9])('draws exactly %i distinct impostors from the players', (count) => {
    for (let seed = 1; seed <= 50; seed += 1) {
      const impostors = drawImpostors(ids, count, createSeededRandomInt(seed));

      expect(impostors).toHaveLength(count);
      expect(new Set(impostors).size).toBe(count);
      for (const impostor of impostors) expect(ids).toContain(impostor);
    }
  });

  it('lets the same player be an impostor in two draws (rounds are independent)', () => {
    const first = drawImpostors(ids, 1, createSeededRandomInt(1));
    const repeated = Array.from({ length: 200 }, (_, seed) =>
      drawImpostors(ids, 1, createSeededRandomInt(seed + 2)),
    );

    expect(repeated.some((impostors) => impostors[0] === first[0])).toBe(true);
  });

  it('reaches every player over many draws (no fixed seat)', () => {
    const seen = new Set<string>();
    for (let seed = 1; seed <= 300; seed += 1) {
      for (const impostor of drawImpostors(ids, 2, createSeededRandomInt(seed))) seen.add(impostor);
    }

    expect(seen.size).toBe(ids.length);
  });

  it('works with the default random source', () => {
    const impostors = drawImpostors(ids, 3);

    expect(new Set(impostors).size).toBe(3);
  });

  it('rejects a count outside 1..players', () => {
    expect(() => drawImpostors(ids, 0)).toThrow(RangeError);
    expect(() => drawImpostors(ids, 11)).toThrow(RangeError);
    expect(() => drawImpostors(ids, 1.5)).toThrow(RangeError);
  });
});
