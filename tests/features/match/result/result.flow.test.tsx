import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import { useMatchSession } from '#/domain/match/session/stores/match-session.store.ts';
import { useRoster } from '#/domain/players/roster/stores/roster.store.ts';
import { getModeCategories } from '#/domain/words/word-bank/rules/get-mode-categories.rule.ts';
import { resetMatchStores } from '#tests/support/match/reset-match-stores.util.ts';
import { createFakePlayers } from '#tests/support/players/create-fake-players.util.ts';
import { createSeededRandomInt } from '#tests/support/random/create-seeded-random-int.util.ts';
import { renderApp } from '#tests/support/router/render-app.util.tsx';

const MODE = 'party';

function startResult(hintEnabled: boolean) {
  useRoster.setState({ players: createFakePlayers(5) });
  const actions = useMatchSession.getState();
  actions.startRound(MODE, {
    categories: getModeCategories(MODE),
    randomInt: createSeededRandomInt(5),
  });
  useMatchSession.setState((state) => {
    const round = state.rounds[MODE];
    if (round === null) throw new Error('no round');
    return { rounds: { ...state.rounds, [MODE]: { ...round, hintEnabled } } };
  });
  actions.markCardSeen(MODE);
  for (let i = 1; i < 5; i++) {
    actions.advanceCard(MODE);
    actions.markCardSeen(MODE);
  }
  actions.goToRound(MODE);
  actions.revealResult(MODE);
}

beforeEach(() => {
  resetMatchStores(getModeCategories(MODE));
});

describe('result screen', () => {
  it('shows the word, the impostors and the hint when it was on', async () => {
    startResult(true);
    const round = useMatchSession.getState().rounds[MODE];
    if (round === null) throw new Error('no round');
    renderApp(`/${MODE}/result`);

    expect(await screen.findByRole('heading', { name: 'Resultado' })).toBeInTheDocument();
    expect(screen.getByText(round.secret.word)).toBeInTheDocument();
    expect(screen.getByText('Dica do impostor')).toBeInTheDocument();
    for (const id of round.impostorIds) {
      const player = round.players.find((p) => p.id === id);
      expect(screen.getAllByText(player?.name ?? '').length).toBeGreaterThan(0);
    }
    expect(screen.getByRole('button', { name: 'Mudar configuração' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Trocar modo' })).toBeInTheDocument();
  });

  it('does not show the hint line when the hint was off', async () => {
    startResult(false);
    renderApp(`/${MODE}/result`);

    await screen.findByRole('heading', { name: 'Resultado' });
    expect(screen.queryByText('Dica do impostor')).not.toBeInTheDocument();
  });

  it('"Nova rodada" draws again and goes to the reveal', async () => {
    startResult(true);
    const user = userEvent.setup();
    const { router } = renderApp(`/${MODE}/result`);

    await user.click(await screen.findByRole('button', { name: 'Nova rodada' }));

    await waitFor(() => {
      expect(router.state.location.pathname).toBe(`/${MODE}/reveal`);
    });
    expect(useMatchSession.getState().rounds[MODE]?.stage).toBe('reveal');
  });

  it('"Trocar modo" discards the round and goes to the start', async () => {
    startResult(true);
    const user = userEvent.setup();
    const { router } = renderApp(`/${MODE}/result`);

    await user.click(await screen.findByRole('button', { name: 'Trocar modo' }));

    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/');
    });
    expect(useMatchSession.getState().rounds[MODE]).toBeNull();
  });
});
