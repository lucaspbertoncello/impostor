import { describe, expect, it } from 'vitest';

import { mapCardSecret } from '#/features/match/reveal/utils/map-card-secret.util.ts';

describe('mapCardSecret', () => {
  it('leaves the category color out of the crew card (it would reveal the role from afar)', () => {
    expect(mapCardSecret({ role: 'crew', word: 'Pizza', accentColor: '#ff0000' })).toEqual({
      role: 'crew',
      word: 'Pizza',
    });
  });

  it('keeps the hint of the impostor only when it exists', () => {
    expect(mapCardSecret({ role: 'impostor', hint: 'Redonda' })).toEqual({
      role: 'impostor',
      hint: 'Redonda',
    });
    expect(mapCardSecret({ role: 'impostor' })).toEqual({ role: 'impostor' });
  });

  it('returns nothing when there is no secret', () => {
    expect(mapCardSecret(null)).toBeNull();
  });
});
