import { describe, expect, it } from 'vitest';

import { normalizePlayerName } from '#/domain/players/roster/rules/normalize-player-name.rule.ts';
import { suggestPlayerIcon } from '#/domain/players/roster/rules/suggest-player-icon.rule.ts';
import { validatePlayerName } from '#/domain/players/roster/rules/validate-player-name.rule.ts';
import type { Player } from '#/domain/players/roster/types/player.type.ts';
import type { PlayerIconIndex } from '#/shared/types/player-icon-index.type.ts';

const players: Player[] = [
  { id: 'a', name: 'José', iconIndex: 1 },
  { id: 'b', name: 'Ana', iconIndex: 2 },
];

describe('normalizePlayerName (BR-MAT-011)', () => {
  it('ignores case, accents and spaces at the ends', () => {
    expect(normalizePlayerName('  JOSÉ ')).toBe('jose');
    expect(normalizePlayerName('Ação')).toBe('acao');
  });
});

describe('validatePlayerName (BR-MAT-011)', () => {
  it('accepts a new name', () => {
    expect(validatePlayerName('Carla', players)).toBeNull();
  });

  it('rejects an empty name or only spaces', () => {
    expect(validatePlayerName('', players)).toBe('empty');
    expect(validatePlayerName('   ', players)).toBe('empty');
  });

  it('accepts 12 characters and rejects 13', () => {
    expect(validatePlayerName('a'.repeat(12), players)).toBeNull();
    expect(validatePlayerName('a'.repeat(13), players)).toBe('too-long');
  });

  it.each(['jose', 'JOSÉ', ' Jose ', 'jOsÉ'])(
    'rejects the duplicate "%s" of José (accents, case, spaces)',
    (name) => {
      expect(validatePlayerName(name, players)).toBe('duplicate');
    },
  );

  it('lets a player keep their own name when editing', () => {
    expect(validatePlayerName('jose', players, 'a')).toBeNull();
    expect(validatePlayerName('ana', players, 'a')).toBe('duplicate');
  });
});

describe('suggestPlayerIcon (BR-MAT-012)', () => {
  it('suggests the first icon not used yet', () => {
    expect(suggestPlayerIcon([])).toBe(1);
    expect(suggestPlayerIcon([1, 2, 4])).toBe(3);
  });

  it('only repeats after the 16 are used, taking the least used', () => {
    const all: PlayerIconIndex[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    expect(suggestPlayerIcon(all)).toBe(1);
    expect(suggestPlayerIcon([...all, 1, 2])).toBe(3);
  });
});
