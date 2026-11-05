import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useRoster } from '#/domain/players/roster/stores/roster.store.ts';
import { resetMatchStores } from '#tests/support/match/reset-match-stores.util.ts';

beforeEach(() => {
  resetMatchStores();
});

describe('roster store', () => {
  it('adds players in order of entry with a trimmed name', () => {
    const { addPlayer } = useRoster.getState();

    const first = addPlayer({ name: '  Lucas ', iconIndex: 1 });
    addPlayer({ name: 'Gabriel', iconIndex: 2 });

    expect(first).toMatchObject({ ok: true, player: { name: 'Lucas', iconIndex: 1 } });
    expect(useRoster.getState().players.map((player) => player.name)).toEqual(['Lucas', 'Gabriel']);
  });

  it('gives each player a different id', () => {
    const { addPlayer } = useRoster.getState();
    addPlayer({ name: 'Lucas', iconIndex: 1 });
    addPlayer({ name: 'Gabriel', iconIndex: 2 });

    const ids = useRoster.getState().players.map((player) => player.id);
    expect(new Set(ids).size).toBe(2);
  });

  it('rejects a duplicate name with accent and case differences', () => {
    const { addPlayer } = useRoster.getState();
    addPlayer({ name: 'José', iconIndex: 1 });

    expect(addPlayer({ name: ' JOSE ', iconIndex: 2 })).toEqual({ ok: false, error: 'duplicate' });
    expect(addPlayer({ name: 'jose', iconIndex: 2 })).toEqual({ ok: false, error: 'duplicate' });
    expect(useRoster.getState().players).toHaveLength(1);
  });

  it('rejects an empty name and a name over 12 characters', () => {
    const { addPlayer } = useRoster.getState();

    expect(addPlayer({ name: '  ', iconIndex: 1 })).toEqual({ ok: false, error: 'empty' });
    expect(addPlayer({ name: 'abcdefghijklm', iconIndex: 1 })).toEqual({
      ok: false,
      error: 'too-long',
    });
  });

  it('refuses the 21st player (BR-MAT-010)', () => {
    const { addPlayer } = useRoster.getState();
    for (let index = 1; index <= 20; index += 1)
      addPlayer({ name: `Jogador ${index}`, iconIndex: 1 });

    expect(addPlayer({ name: 'Extra', iconIndex: 1 })).toEqual({ ok: false, error: 'roster-full' });
    expect(useRoster.getState().players).toHaveLength(20);
  });

  it('edits a player, keeping the same id and allowing the same name', () => {
    const { addPlayer, updatePlayer } = useRoster.getState();
    const added = addPlayer({ name: 'José', iconIndex: 1 });
    addPlayer({ name: 'Ana', iconIndex: 2 });
    if (!added.ok) throw new Error('setup failed');

    expect(updatePlayer(added.player.id, { name: 'jose', iconIndex: 5 })).toMatchObject({
      ok: true,
    });
    expect(updatePlayer(added.player.id, { name: 'ana', iconIndex: 5 })).toEqual({
      ok: false,
      error: 'duplicate',
    });
    expect(updatePlayer('missing', { name: 'Zé', iconIndex: 5 })).toEqual({
      ok: false,
      error: 'not-found',
    });
    expect(useRoster.getState().players[0]).toEqual({
      id: added.player.id,
      name: 'jose',
      iconIndex: 5,
    });
  });

  it('removes a player', () => {
    const { addPlayer, removePlayer } = useRoster.getState();
    const added = addPlayer({ name: 'José', iconIndex: 1 });
    addPlayer({ name: 'Ana', iconIndex: 2 });
    if (!added.ok) throw new Error('setup failed');

    removePlayer(added.player.id);

    expect(useRoster.getState().players.map((player) => player.name)).toEqual(['Ana']);
  });
});

describe('roster persistence (BR-MAT-030)', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  async function loadFreshRoster() {
    const module = await import('#/domain/players/roster/stores/roster.store.ts');
    return module.useRoster;
  }

  it('brings back the saved players', async () => {
    const saved = { id: 'a1', name: 'Lucas', iconIndex: 3 };
    localStorage.setItem(
      'impostor-roster',
      JSON.stringify({ state: { players: [saved] }, version: 1 }),
    );

    const roster = await loadFreshRoster();

    expect(roster.getState().players).toEqual([saved]);
  });

  it('writes what changes to the storage', async () => {
    const roster = await loadFreshRoster();
    roster.getState().addPlayer({ name: 'Lucas', iconIndex: 1 });

    const stored = JSON.parse(localStorage.getItem('impostor-roster') ?? '{}') as {
      state: { players: unknown[] };
    };
    expect(stored.state.players).toHaveLength(1);
  });

  it.each([
    ['text that is not JSON', 'not json {'],
    ['an unexpected shape', JSON.stringify({ state: { players: 'x' }, version: 1 })],
    [
      'an invalid icon',
      JSON.stringify({ state: { players: [{ id: 'a', name: 'Ana', iconIndex: 99 }] }, version: 1 }),
    ],
    [
      'an empty name',
      JSON.stringify({ state: { players: [{ id: 'a', name: '', iconIndex: 1 }] }, version: 1 }),
    ],
    [
      'duplicate names',
      JSON.stringify({
        state: {
          players: [
            { id: 'a', name: 'Ana', iconIndex: 1 },
            { id: 'b', name: 'ANA', iconIndex: 2 },
          ],
        },
        version: 1,
      }),
    ],
    ['another version', JSON.stringify({ state: { players: [] }, version: 99 })],
  ])('goes back to the initial state with %s', async (_label, raw) => {
    localStorage.setItem('impostor-roster', raw);
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    const roster = await loadFreshRoster();

    expect(roster.getState().players).toEqual([]);
    consoleError.mockRestore();
  });
});
