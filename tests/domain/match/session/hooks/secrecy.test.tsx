import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useCurrentCard } from '#/domain/match/session/hooks/use-current-card.hook.ts';
import { useResumableRounds } from '#/domain/match/session/hooks/use-resumable-rounds.hook.ts';
import { useRoundOrder } from '#/domain/match/session/hooks/use-round-order.hook.ts';
import { useRoundResult } from '#/domain/match/session/hooks/use-round-result.hook.ts';
import { useRoundStage } from '#/domain/match/session/hooks/use-round-stage.hook.ts';
import { useMatchSession } from '#/domain/match/session/stores/match-session.store.ts';
import { getCurrentCardSecret } from '#/domain/match/session/utils/get-current-card-secret.util.ts';
import { useRoster } from '#/domain/players/roster/stores/roster.store.ts';
import { useMatchSettings } from '#/domain/settings/match/stores/match-settings.store.ts';
import { resetMatchStores } from '#tests/support/match/reset-match-stores.util.ts';
import { createFakePlayers } from '#tests/support/players/create-fake-players.util.ts';
import { createSeededRandomInt } from '#tests/support/random/create-seeded-random-int.util.ts';
import { createFakeBank } from '#tests/support/words/create-fake-word-bank.util.ts';

const bank = createFakeBank();
const MODE = 'party';

function startRound(playerCount: number, seed: number) {
  useRoster.setState({ players: createFakePlayers(playerCount) });
  const result = useMatchSession
    .getState()
    .startRound(MODE, { categories: bank, randomInt: createSeededRandomInt(seed) });
  expect(result).toEqual({ ok: true });
}

function currentRound() {
  const round = useMatchSession.getState().rounds[MODE];
  if (round === null) throw new Error('no round');
  return round;
}

function finishReveal() {
  const actions = useMatchSession.getState();
  const count = currentRound().cardOrder.length;
  for (let card = 0; card < count - 1; card += 1) {
    actions.markCardSeen(MODE);
    actions.advanceCard(MODE);
  }
  actions.markCardSeen(MODE);
  actions.goToRound(MODE);
}

beforeEach(() => {
  resetMatchStores(bank);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('secrecy of the card (BR-MAT-045)', () => {
  it('gives each card its own role: the word to the crew, the hint to the impostor', () => {
    startRound(6, 11);
    const round = currentRound();
    const actions = useMatchSession.getState();
    const roles: string[] = [];

    for (const playerId of round.cardOrder) {
      const { result } = renderHook(() => useCurrentCard(MODE));
      expect(result.current?.player.id).toBe(playerId);

      const secret = getCurrentCardSecret(MODE);
      const isImpostor = round.impostorIds.includes(playerId);
      roles.push(secret?.role ?? 'none');

      if (isImpostor) {
        expect(secret).toEqual({ role: 'impostor', hint: round.secret.hint });
        expect(secret).not.toHaveProperty('word');
        expect(secret).not.toHaveProperty('accentColor');
      } else {
        expect(secret).toMatchObject({ role: 'crew', word: round.secret.word });
        expect(secret).not.toHaveProperty('hint');
      }

      actions.markCardSeen(MODE);
      actions.advanceCard(MODE);
    }

    expect(roles.filter((role) => role === 'impostor')).toHaveLength(round.impostorIds.length);
  });

  it('the impostor gets no hint when it is off, and never the category color', () => {
    useMatchSettings.getState().setHintEnabled(MODE, false);
    useMatchSettings.getState().setCategories(MODE, ['sesh']);
    startRound(4, 5);
    const round = currentRound();

    for (const playerId of round.cardOrder) {
      const secret = getCurrentCardSecret(MODE);
      if (round.impostorIds.includes(playerId)) expect(secret).toEqual({ role: 'impostor' });
      else
        expect(secret).toEqual({ role: 'crew', word: round.secret.word, accentColor: '#ff00aa' });

      useMatchSession.getState().markCardSeen(MODE);
      useMatchSession.getState().advanceCard(MODE);
    }
  });

  it('the pass-the-phone hook has no secret: only the player and the progress', () => {
    startRound(5, 3);
    const round = currentRound();

    const { result } = renderHook(() => useCurrentCard(MODE));

    expect(Object.keys(result.current ?? {}).sort()).toEqual([
      'cardCount',
      'cardNumber',
      'isLast',
      'player',
      'seen',
    ]);
    expect(Object.keys(result.current?.player ?? {}).sort()).toEqual(['iconIndex', 'id', 'name']);
    const text = JSON.stringify(result.current);
    expect(text).not.toContain(round.secret.word);
    expect(text).not.toContain(round.secret.hint);
    expect(text.toLowerCase()).not.toContain('impostor');
  });

  it('gives no secret outside the reveal, or without a round', () => {
    expect(getCurrentCardSecret(MODE)).toBeNull();

    startRound(4, 2);
    finishReveal();
    expect(currentRound().stage).toBe('round');
    expect(getCurrentCardSecret(MODE)).toBeNull();

    useMatchSession.getState().revealResult(MODE);
    expect(getCurrentCardSecret(MODE)).toBeNull();
  });

  it('keeps seen across a reload and the card is the same one (RF-REV-005)', () => {
    startRound(4, 8);
    useMatchSession.getState().markCardSeen(MODE);

    const { result } = renderHook(() => useCurrentCard(MODE));

    expect(result.current).toMatchObject({ cardNumber: 1, seen: true });
  });
});

describe('secrecy of the round screen (BR-MAT-045, RF-PAR-002)', () => {
  it('is empty during the reveal', () => {
    startRound(5, 4);

    expect(renderHook(() => useRoundOrder(MODE)).result.current).toBeNull();
    expect(renderHook(() => useRoundResult(MODE)).result.current).toBeNull();
  });

  it('gives only the count of impostors and the speaking order, with no word, hint or role', () => {
    startRound(7, 21);
    finishReveal();
    const round = currentRound();

    const { result } = renderHook(() => useRoundOrder(MODE));

    expect(Object.keys(result.current ?? {}).sort()).toEqual([
      'firstPlayer',
      'impostorCount',
      'speakingOrder',
    ]);
    expect(result.current?.impostorCount).toBe(round.impostorIds.length);
    expect(result.current?.speakingOrder.map((player) => player.id)).toEqual(round.speakingOrder);
    expect(result.current?.firstPlayer.id).toBe(round.speakingOrder[0]);
    const text = JSON.stringify(result.current);
    expect(text).not.toContain(round.secret.word);
    expect(text).not.toContain(round.secret.hint);
    expect(renderHook(() => useRoundResult(MODE)).result.current).toBeNull();
    expect(renderHook(() => useCurrentCard(MODE)).result.current).toBeNull();
  });

  it('the first to speak can be an impostor (BR-MAT-029)', () => {
    let impostorFirst = false;
    for (let seed = 1; seed <= 200 && !impostorFirst; seed += 1) {
      startRound(4, seed);
      const round = currentRound();
      impostorFirst = round.impostorIds.includes(round.speakingOrder[0] ?? '');
    }

    expect(impostorFirst).toBe(true);
  });
});

describe('the result (RF-RES-001)', () => {
  it('shows the word, the hint of the impostor and who the impostors were, only after revealing', () => {
    startRound(6, 14);
    finishReveal();
    const round = currentRound();
    expect(renderHook(() => useRoundResult(MODE)).result.current).toBeNull();

    useMatchSession.getState().revealResult(MODE);
    const { result } = renderHook(() => useRoundResult(MODE));

    expect(result.current).toMatchObject({
      word: round.secret.word,
      hint: round.secret.hint,
      categoryName: round.secret.categoryName,
    });
    expect(result.current?.impostors.map((player) => player.id).sort()).toEqual(
      [...round.impostorIds].sort(),
    );
  });

  it('has no hint when it was off', () => {
    useMatchSettings.getState().setHintEnabled(MODE, false);
    startRound(4, 6);
    finishReveal();
    useMatchSession.getState().revealResult(MODE);

    expect(renderHook(() => useRoundResult(MODE)).result.current?.hint).toBeNull();
  });
});

describe('the resume banner (RF-INI-004)', () => {
  it('lists the rounds of both modes with the stage and the number of players, and nothing else', () => {
    startRound(5, 1);
    useRoster.setState({ players: createFakePlayers(7) });
    useMatchSession
      .getState()
      .startRound('arena', { categories: bank, randomInt: createSeededRandomInt(2) });

    const { result } = renderHook(() => useResumableRounds());

    expect(result.current).toEqual([
      { mode: 'arena', stage: 'reveal', playerCount: 7 },
      { mode: 'party', stage: 'reveal', playerCount: 5 },
    ]);
    expect(renderHook(() => useRoundStage('party')).result.current).toBe('reveal');
    expect(renderHook(() => useRoundStage('arena')).result.current).toBe('reveal');
  });

  it('is empty with no round, and the stage is null', () => {
    expect(renderHook(() => useResumableRounds()).result.current).toEqual([]);
    expect(renderHook(() => useRoundStage('arena')).result.current).toBeNull();
  });
});

describe('no leak through logs or storage keys (BR-MAT-046)', () => {
  it('never writes the word, the hint or the role to the console during a whole round', () => {
    const spies = (['log', 'info', 'warn', 'error', 'debug'] as const).map((method) =>
      vi.spyOn(console, method).mockImplementation(() => {}),
    );

    startRound(5, 33);
    const { word, hint } = currentRound().secret;
    for (let card = 0; card < 5; card += 1) {
      getCurrentCardSecret(MODE);
      useMatchSession.getState().markCardSeen(MODE);
      useMatchSession.getState().advanceCard(MODE);
    }
    finishReveal();
    useMatchSession.getState().revealResult(MODE);
    useMatchSession.getState().discardRound(MODE);

    const printed = spies.flatMap((spy) => spy.mock.calls).map((args) => JSON.stringify(args));
    expect(printed.join('')).not.toContain(word);
    expect(printed.join('')).not.toContain(hint);
  });

  it('keeps the word out of the names of the storage keys', () => {
    startRound(5, 33);
    const { word } = currentRound().secret;

    const keys = Object.keys(localStorage);

    expect(keys.length).toBeGreaterThan(0);
    for (const key of keys) expect(key.toLowerCase()).not.toContain(word.toLowerCase());
  });
});
