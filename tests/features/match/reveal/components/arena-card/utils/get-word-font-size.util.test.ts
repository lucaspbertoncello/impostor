import { describe, expect, it } from 'vitest';

import { getWordFontSize } from '#/features/match/reveal/components/arena-card/utils/get-word-font-size.util.ts';

describe('getWordFontSize', () => {
  it('gives short words the biggest size', () => {
    expect(getWordFontSize('Gigante')).toBeGreaterThan(getWordFontSize('Cavaleiro Dourado'));
  });

  it('shrinks long words and never goes below the minimum', () => {
    expect(getWordFontSize('Exército de Esqueletos')).toBeLessThan(getWordFontSize('Arqueiras'));
    expect(getWordFontSize('Paralelepipedodiabolicamente grande')).toBeGreaterThanOrEqual(8.5);
  });
});
