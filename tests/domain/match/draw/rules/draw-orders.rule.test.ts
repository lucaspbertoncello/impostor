import { describe, expect, it } from 'vitest';

import { drawCardOrder } from '#/domain/match/draw/rules/draw-card-order.rule.ts';
import { drawSpeakingOrder } from '#/domain/match/draw/rules/draw-speaking-order.rule.ts';
import { createFakePlayers } from '#tests/support/players/create-fake-players.util.ts';
import { createSeededRandomInt } from '#tests/support/random/create-seeded-random-int.util.ts';

const ids = createFakePlayers(12).map((player) => player.id);

function isPermutation(order: string[], original: string[]): boolean {
  return (
    order.length === original.length && [...order].sort().join() === [...original].sort().join()
  );
}

describe('drawCardOrder (BR-MAT-028)', () => {
  it('is a full permutation of the players', () => {
    for (let seed = 1; seed <= 50; seed += 1) {
      expect(isPermutation(drawCardOrder(ids, createSeededRandomInt(seed)), ids)).toBe(true);
    }
  });

  it('does not change the input', () => {
    const copy = [...ids];
    drawCardOrder(ids, createSeededRandomInt(7));

    expect(ids).toEqual(copy);
  });

  it('differs between rounds', () => {
    const orders = new Set(
      Array.from({ length: 20 }, (_, seed) =>
        drawCardOrder(ids, createSeededRandomInt(seed)).join(),
      ),
    );

    expect(orders.size).toBeGreaterThan(1);
  });
});

describe('drawSpeakingOrder (BR-MAT-029)', () => {
  it('is a full permutation of the players', () => {
    for (let seed = 1; seed <= 50; seed += 1) {
      expect(isPermutation(drawSpeakingOrder(ids, createSeededRandomInt(seed)), ids)).toBe(true);
    }
  });

  it('is independent of the card order: two separate draws are not the same sequence', () => {
    const random = createSeededRandomInt(99);
    const cards = drawCardOrder(ids, random);
    const speaking = drawSpeakingOrder(ids, random);

    expect(cards).not.toEqual(speaking);
  });

  it('can start with any player', () => {
    const starters = new Set<string>();
    for (let seed = 1; seed <= 400; seed += 1) {
      starters.add(drawSpeakingOrder(ids, createSeededRandomInt(seed))[0] as string);
    }

    expect(starters.size).toBe(ids.length);
  });
});
