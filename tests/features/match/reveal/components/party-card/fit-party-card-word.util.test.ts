import { describe, expect, it } from 'vitest';

import { fitPartyCardWord } from '#/features/match/reveal/components/party-card/fit-party-card-word.util.ts';

describe('fitPartyCardWord', () => {
  it('gives short words the biggest size', () => {
    expect(fitPartyCardWord('Pizza')).toBe(22);
  });

  it('shrinks long phrases so they fit in two lines', () => {
    expect(fitPartyCardWord('Roupas e acessórios')).toBeLessThan(fitPartyCardWord('Pizza'));
    expect(fitPartyCardWord('Pão de queijo')).toBeLessThanOrEqual(22);
  });

  it('never goes below the minimum, even for a very long single word', () => {
    expect(fitPartyCardWord('Pneumoultramicroscópico')).toBeGreaterThanOrEqual(9);
  });
});
