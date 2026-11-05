import { act, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import { useMatchSession } from '#/domain/match/session/stores/match-session.store.ts';
import { useRoster } from '#/domain/players/roster/stores/roster.store.ts';
import { resetMatchStores } from '#tests/support/match/reset-match-stores.util.ts';
import { createFakePlayers } from '#tests/support/players/create-fake-players.util.ts';
import { createSeededRandomInt } from '#tests/support/random/create-seeded-random-int.util.ts';
import { renderApp } from '#tests/support/router/render-app.util.tsx';
import { createFakeBank } from '#tests/support/words/create-fake-word-bank.util.ts';

const MODE = 'party';
const bank = createFakeBank();

function startRoundAtRound(playerCount = 5) {
  useRoster.setState({ players: createFakePlayers(playerCount) });
  const actions = useMatchSession.getState();
  actions.startRound(MODE, { categories: bank, randomInt: createSeededRandomInt(3) });
  actions.markCardSeen(MODE);
  for (let i = 1; i < playerCount; i++) {
    actions.advanceCard(MODE);
    actions.markCardSeen(MODE);
  }
  actions.goToRound(MODE);
}

function currentRound() {
  const round = useMatchSession.getState().rounds[MODE];
  if (round === null) throw new Error('no round');
  return round;
}

beforeEach(() => {
  resetMatchStores(bank);
});

describe('round screen', () => {
  it('shows who starts and the order without the word, and reveals only after the confirmation', async () => {
    startRoundAtRound();
    const user = userEvent.setup();
    const { router, container } = renderApp(`/${MODE}/round`);

    expect(await screen.findByRole('heading', { name: 'Partida' })).toBeInTheDocument();
    expect(screen.getByText('Conversem. O app volta quando decidirem.')).toBeInTheDocument();
    expect(screen.getByText(/impostor(es)? entre vocês/)).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(5);
    const { word, hint } = currentRound().secret;
    expect(container.textContent).not.toContain(word);
    expect(container.textContent).not.toContain(hint);

    await user.click(screen.getByRole('button', { name: 'Revelar' }));
    const sheet = await screen.findByRole('dialog', { name: 'Revelar agora?' });
    expect(router.state.location.pathname).toBe(`/${MODE}/round`);

    await user.click(within(sheet).getByRole('button', { name: 'Cancelar' }));
    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: 'Revelar agora?' })).not.toBeInTheDocument();
    });
    expect(router.state.location.pathname).toBe(`/${MODE}/round`);
    expect(currentRound().stage).toBe('round');

    await user.click(screen.getByRole('button', { name: 'Revelar' }));
    const again = await screen.findByRole('dialog', { name: 'Revelar agora?' });
    await user.click(within(again).getByRole('button', { name: 'Revelar' }));

    await waitFor(() => {
      expect(router.state.location.pathname).toBe(`/${MODE}/result`);
    });
    expect(currentRound().stage).toBe('result');
  });

  it('opens the exit sheet when the screen is about to be left and discards the round only on "Sair"', async () => {
    startRoundAtRound();
    const user = userEvent.setup();
    const { router } = renderApp('/');
    await act(async () => {
      await router.navigate({ to: '/$mode/round', params: { mode: MODE } });
    });
    await screen.findByRole('heading', { name: 'Partida' });

    act(() => {
      // The memory history only runs blockers on push and replace; the real back is checked in the browser.
      router.history.push('/');
    });
    const sheet = await screen.findByRole('dialog', { name: 'Sair da rodada?' });
    expect(within(sheet).getByText('A rodada atual será descartada')).toBeInTheDocument();

    await user.click(within(sheet).getByRole('button', { name: 'Continuar rodada' }));
    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: 'Sair da rodada?' })).not.toBeInTheDocument();
    });
    expect(useMatchSession.getState().rounds[MODE]).not.toBeNull();

    await user.click(screen.getByRole('button', { name: 'Sair da rodada' }));
    const second = await screen.findByRole('dialog', { name: 'Sair da rodada?' });
    await user.click(within(second).getByRole('button', { name: 'Sair' }));
    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/');
    });
    expect(useMatchSession.getState().rounds[MODE]).toBeNull();
  });

  it('stays whole with 20 players and 9 impostors', async () => {
    startRoundAtRound(20);
    useMatchSession.setState((state) => {
      const round = currentRound();
      return {
        rounds: {
          ...state.rounds,
          [MODE]: { ...round, impostorIds: round.players.slice(0, 9).map((p) => p.id) },
        },
      };
    });
    renderApp(`/${MODE}/round`);

    expect(await screen.findByText('9 impostores entre vocês')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(20);
  });
});
