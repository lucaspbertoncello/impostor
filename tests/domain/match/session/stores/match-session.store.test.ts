import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useWordHistory } from '#/domain/match/history/stores/word-history.store.ts';
import { useMatchSession } from '#/domain/match/session/stores/match-session.store.ts';
import { useRoster } from '#/domain/players/roster/stores/roster.store.ts';
import { useMatchSettings } from '#/domain/settings/match/stores/match-settings.store.ts';
import { resetMatchStores } from '#tests/support/match/reset-match-stores.util.ts';
import { createFakePlayers } from '#tests/support/players/create-fake-players.util.ts';
import { createSeededRandomInt } from '#tests/support/random/create-seeded-random-int.util.ts';
import { createFakeBank } from '#tests/support/words/create-fake-word-bank.util.ts';

const bank = createFakeBank();

function startWith(playerCount: number, mode: 'arena' | 'party' = 'party', seed = 1) {
  useRoster.setState({ players: createFakePlayers(playerCount) });
  return useMatchSession
    .getState()
    .startRound(mode, { categories: bank, randomInt: createSeededRandomInt(seed) });
}

function round(mode: 'arena' | 'party' = 'party') {
  const current = useMatchSession.getState().rounds[mode];
  if (current === null) throw new Error('no round');
  return current;
}

beforeEach(() => {
  resetMatchStores(bank);
});

describe('startRound (RF-CFG-006)', () => {
  it('does the full draw and leaves the round at the first card, not seen', () => {
    expect(startWith(6)).toEqual({ ok: true });

    const started = round();
    expect(started.stage).toBe('reveal');
    expect(started.currentCardIndex).toBe(0);
    expect(started.currentCardSeen).toBe(false);
    expect(started.players).toHaveLength(6);
    expect(started.impostorIds).toHaveLength(1);
    expect([...started.cardOrder].sort()).toEqual(
      started.players.map((player) => player.id).sort(),
    );
    expect([...started.speakingOrder].sort()).toEqual(
      started.players.map((player) => player.id).sort(),
    );
  });

  it('uses the impostor count of the settings, limited to the maximum of the group', () => {
    useMatchSettings.setState({
      settings: {
        arena: { impostorCount: 1, hintEnabled: true, categoryIds: [] },
        party: { impostorCount: 4, hintEnabled: false, categoryIds: ['foods'] },
      },
    });

    startWith(6);

    expect(round().impostorIds).toHaveLength(2);
    expect(round().hintEnabled).toBe(false);
  });

  it('draws only from the chosen categories (Festa)', () => {
    useMatchSettings.getState().setCategories('party', ['animals']);

    for (let seed = 1; seed <= 30; seed += 1) {
      startWith(4, 'party', seed);
      expect(round().secret.categoryId).toBe('animals');
    }
  });

  it('draws from the whole bank in Arena, whatever the categories saved', () => {
    useMatchSettings.getState().setCategories('arena', []);

    expect(startWith(4, 'arena')).toEqual({ ok: true });
  });

  it('keeps the category name and color of the word for the result', () => {
    useMatchSettings.getState().setCategories('party', ['sesh']);

    startWith(4);

    expect(round().secret).toMatchObject({ categoryId: 'sesh', categoryColor: '#ff00aa' });
  });

  it('fails without touching the round when the draw cannot happen', () => {
    expect(startWith(2)).toEqual({ ok: false, reason: 'invalid-player-count' });
    expect(useMatchSession.getState().rounds.party).toBeNull();

    useMatchSettings.getState().setCategories('party', []);
    expect(startWith(4)).toEqual({ ok: false, reason: 'no-categories' });

    useMatchSettings.getState().setCategories('party', ['unknown']);
    expect(startWith(4)).toEqual({ ok: false, reason: 'no-words' });
    expect(useMatchSession.getState().rounds.party).toBeNull();
  });

  it('records the word in the history and never repeats it in a row', () => {
    const drawn: string[] = [];

    for (let index = 0; index < 30; index += 1) {
      startWith(4, 'party', index + 1);
      drawn.push(round().secret.wordId);
    }

    for (let index = 1; index < drawn.length; index += 1)
      expect(drawn[index]).not.toBe(drawn[index - 1]);
    expect(useWordHistory.getState().usedWordIds.party.length).toBeGreaterThan(0);
    expect(useWordHistory.getState().usedWordIds.arena).toEqual([]);
  });

  it('keeps the players as a snapshot: editing the roster does not change the round', () => {
    startWith(5);

    useRoster.getState().removePlayer('p1');

    expect(round().players).toHaveLength(5);
  });

  it('the second round replaces the first (new draw, same players)', () => {
    startWith(5, 'party', 1);
    const first = round();

    useMatchSession
      .getState()
      .startNewRound('party', { categories: bank, randomInt: createSeededRandomInt(2) });

    expect(round().stage).toBe('reveal');
    expect(round().players).toEqual(first.players);
  });

  it('keeps one round per mode', () => {
    startWith(5, 'party');
    startWith(5, 'arena');

    expect(useMatchSession.getState().rounds.party).not.toBeNull();
    expect(useMatchSession.getState().rounds.arena).not.toBeNull();
  });
});

describe('the reveal flow (BR-MAT-047)', () => {
  it('only advances after the card was seen, one player at a time, and the last goes to the round', () => {
    startWith(3);
    const actions = useMatchSession.getState();

    expect(actions.advanceCard('party')).toBe(false);
    expect(actions.goToRound('party')).toBe(false);

    expect(actions.markCardSeen('party')).toBe(true);
    expect(actions.goToRound('party')).toBe(false);
    expect(actions.advanceCard('party')).toBe(true);
    expect(round()).toMatchObject({ currentCardIndex: 1, currentCardSeen: false });

    actions.markCardSeen('party');
    actions.advanceCard('party');
    expect(round().currentCardIndex).toBe(2);

    expect(actions.advanceCard('party')).toBe(false);
    actions.markCardSeen('party');
    expect(actions.advanceCard('party')).toBe(false);
    expect(actions.goToRound('party')).toBe(true);
    expect(round().stage).toBe('round');
  });

  it('only reveals from the round screen, and the result stays until it is discarded', () => {
    startWith(3);
    const actions = useMatchSession.getState();

    expect(actions.revealResult('party')).toBe(false);

    actions.markCardSeen('party');
    actions.advanceCard('party');
    actions.markCardSeen('party');
    actions.advanceCard('party');
    actions.markCardSeen('party');
    actions.goToRound('party');

    expect(actions.markCardSeen('party')).toBe(false);
    expect(actions.revealResult('party')).toBe(true);
    expect(round().stage).toBe('result');
    expect(actions.revealResult('party')).toBe(false);
  });

  it('does nothing when the mode has no round', () => {
    const actions = useMatchSession.getState();

    expect(actions.markCardSeen('arena')).toBe(false);
    expect(actions.advanceCard('arena')).toBe(false);
    expect(actions.goToRound('arena')).toBe(false);
    expect(actions.revealResult('arena')).toBe(false);
  });
});

describe('discarding (BR-MAT-033)', () => {
  it.each(['discardRound', 'changeSettings', 'switchMode'] as const)(
    '%s drops the round of the mode and keeps players, settings and history',
    (action) => {
      startWith(5, 'party');
      startWith(5, 'arena');
      const historyBefore = useWordHistory.getState().usedWordIds.party;

      useMatchSession.getState()[action]('party');

      expect(useMatchSession.getState().rounds.party).toBeNull();
      expect(useMatchSession.getState().rounds.arena).not.toBeNull();
      expect(useRoster.getState().players).toHaveLength(5);
      expect(useWordHistory.getState().usedWordIds.party).toEqual(historyBefore);
    },
  );
});

describe('round persistence (BR-MAT-030)', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  async function loadFreshSession() {
    const module = await import('#/domain/match/session/stores/match-session.store.ts');
    return module.useMatchSession;
  }

  it('comes back at the same stage, on the same card, and keeps that the card was seen', async () => {
    startWith(5);
    useMatchSession.getState().markCardSeen('party');
    useMatchSession.getState().advanceCard('party');
    useMatchSession.getState().markCardSeen('party');
    const before = round();

    const session = await loadFreshSession();

    expect(session.getState().rounds.party).toEqual(before);
    expect(session.getState().rounds.party).toMatchObject({
      stage: 'reveal',
      currentCardIndex: 1,
      currentCardSeen: true,
    });
    expect(session.getState().rounds.arena).toBeNull();
  });

  it('comes back at the round screen with the same speaking order (RF-PAR-004)', async () => {
    startWith(4);
    const actions = useMatchSession.getState();
    for (let card = 0; card < 3; card += 1) {
      actions.markCardSeen('party');
      actions.advanceCard('party');
    }
    actions.markCardSeen('party');
    actions.goToRound('party');
    const before = round();

    const session = await loadFreshSession();

    expect(session.getState().rounds.party?.stage).toBe('round');
    expect(session.getState().rounds.party?.speakingOrder).toEqual(before.speakingOrder);
  });

  function savedWith(change: (saved: ReturnType<typeof round>) => unknown) {
    startWith(5);
    const saved = structuredClone(round());
    return JSON.stringify({ state: { rounds: { arena: null, party: change(saved) } }, version: 1 });
  }

  it.each([
    ['text that is not JSON', () => 'nope'],
    [
      'a card order that is not a permutation',
      () =>
        savedWith((saved) => ({
          ...saved,
          cardOrder: [saved.cardOrder[0], ...saved.cardOrder.slice(0, 4)],
        })),
    ],
    [
      'an impostor that is not a player',
      () => savedWith((saved) => ({ ...saved, impostorIds: ['ghost'] })),
    ],
    ['no impostor', () => savedWith((saved) => ({ ...saved, impostorIds: [] }))],
    [
      'too many impostors',
      () => savedWith((saved) => ({ ...saved, impostorIds: saved.cardOrder.slice(0, 3) })),
    ],
    ['a card index out of range', () => savedWith((saved) => ({ ...saved, currentCardIndex: 9 }))],
    ['an unknown stage', () => savedWith((saved) => ({ ...saved, stage: 'cheating' }))],
    [
      'a missing word',
      () => savedWith((saved) => ({ ...saved, secret: { ...saved.secret, word: '' } })),
    ],
    [
      'players below the minimum',
      () => savedWith((saved) => ({ ...saved, players: saved.players.slice(0, 2) })),
    ],
  ])('goes back to the initial state with %s', async (_label, build) => {
    const raw = build();
    localStorage.setItem('impostor-rounds', raw);
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    const session = await loadFreshSession();

    expect(session.getState().rounds).toEqual({ arena: null, party: null });
    consoleError.mockRestore();
  });
});

describe('word history persistence', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('brings back the saved ids and rejects a wrong shape', async () => {
    localStorage.setItem(
      'impostor-word-history',
      JSON.stringify({ state: { usedWordIds: { arena: ['a'], party: ['b', 'c'] } }, version: 1 }),
    );
    const valid = await import('#/domain/match/history/stores/word-history.store.ts');
    expect(valid.useWordHistory.getState().usedWordIds).toEqual({
      arena: ['a'],
      party: ['b', 'c'],
    });

    vi.resetModules();
    localStorage.setItem(
      'impostor-word-history',
      JSON.stringify({ state: { usedWordIds: { arena: 5 } }, version: 1 }),
    );
    const invalid = await import('#/domain/match/history/stores/word-history.store.ts');
    expect(invalid.useWordHistory.getState().usedWordIds).toEqual({ arena: [], party: [] });
  });
});
