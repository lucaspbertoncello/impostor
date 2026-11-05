import { act, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import { useMatchSession } from '#/domain/match/session/stores/match-session.store.ts';
import type { RoundStage } from '#/domain/match/session/types/round.type.ts';
import { useRoster } from '#/domain/players/roster/stores/roster.store.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';
import { resetMatchStores } from '#tests/support/match/reset-match-stores.util.ts';
import { createFakePlayers } from '#tests/support/players/create-fake-players.util.ts';
import { renderApp } from '#tests/support/router/render-app.util.tsx';
import { createFakeBank } from '#tests/support/words/create-fake-word-bank.util.ts';

const bank = createFakeBank();

function saveRound(mode: ThemeName, stage: RoundStage, playerCount = 5) {
  useRoster.setState({ players: createFakePlayers(playerCount) });
  useMatchSession.getState().startRound(mode, { categories: bank });
  const round = useMatchSession.getState().rounds[mode];
  if (round === null) throw new Error('round not saved');
  useMatchSession.setState({
    rounds: { ...useMatchSession.getState().rounds, [mode]: { ...round, stage } },
  });
}

beforeEach(() => {
  resetMatchStores(bank);
});

describe('Início', () => {
  it('shows the two mode cards and no resume strip when there is no round', async () => {
    renderApp('/');

    expect(await screen.findByRole('button', { name: /Jogar Arena/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Jogar Festa/ })).toBeInTheDocument();
    expect(screen.queryByText('Rodada em andamento')).not.toBeInTheDocument();
  });

  it.each([
    ['Arena', 'arena'],
    ['Festa', 'party'],
  ])('choosing %s goes to the players of that mode', async (label, mode) => {
    const user = userEvent.setup();
    const { router } = renderApp('/');

    await user.click(await screen.findByRole('button', { name: new RegExp(`Jogar ${label}`) }));

    expect(router.state.location.pathname).toBe(`/${mode}/players`);
  });

  it('opens the intro on the first time and keeps it collapsed after a match', async () => {
    const first = renderApp('/');
    expect(await screen.findByText(/Todo mundo recebe a mesma palavra/)).toBeInTheDocument();
    first.unmount();

    saveRound('party', 'reveal');
    renderApp('/');
    await screen.findByRole('button', { name: /Jogar Arena/ });

    expect(screen.queryByText(/Todo mundo recebe a mesma palavra/)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Como funciona' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it.each([
    ['reveal', '/arena/reveal'],
    ['round', '/arena/round'],
    ['result', '/arena/result'],
  ] as const)('Continuar of a round in %s goes to %s', async (stage, path) => {
    saveRound('arena', stage);
    const user = userEvent.setup();
    const { router } = renderApp('/');

    const strip = await screen.findByRole('region', { name: 'Rodada em andamento: Arena' });
    expect(within(strip).getByText('5 jogadores')).toBeInTheDocument();
    await user.click(within(strip).getByRole('button', { name: 'Continuar' }));

    expect(router.state.location.pathname).toBe(path);
  });

  it('Descartar asks first, then wipes only the round and keeps the players', async () => {
    saveRound('party', 'round');
    const user = userEvent.setup();
    renderApp('/');

    const strip = await screen.findByRole('region', { name: 'Rodada em andamento: Festa' });
    await user.click(within(strip).getByRole('button', { name: 'Descartar' }));

    const sheet = await screen.findByRole('dialog', { name: 'Descartar rodada?' });
    expect(useMatchSession.getState().rounds.party).not.toBeNull();

    await user.click(within(sheet).getByRole('button', { name: 'Descartar rodada' }));

    expect(useMatchSession.getState().rounds.party).toBeNull();
    expect(useRoster.getState().players).toHaveLength(5);
    expect(screen.queryByRole('region', { name: /Rodada em andamento/ })).not.toBeInTheDocument();
  });

  it('keeps the round when the player gives up discarding', async () => {
    saveRound('arena', 'reveal');
    const user = userEvent.setup();
    renderApp('/');

    const strip = await screen.findByRole('region', { name: 'Rodada em andamento: Arena' });
    await user.click(within(strip).getByRole('button', { name: 'Descartar' }));
    const sheet = await screen.findByRole('dialog', { name: 'Descartar rodada?' });
    await user.click(within(sheet).getByRole('button', { name: 'Manter rodada' }));

    expect(useMatchSession.getState().rounds.arena).not.toBeNull();
    expect(screen.getByRole('region', { name: 'Rodada em andamento: Arena' })).toBeInTheDocument();
  });

  it('never prints the word, the role or the hint of a saved round', async () => {
    saveRound('arena', 'reveal');
    const secret = useMatchSession.getState().rounds.arena?.secret;
    const { container } = renderApp('/');
    await screen.findByRole('region', { name: 'Rodada em andamento: Arena' });

    expect(secret).toBeDefined();
    expect(container.innerHTML).not.toContain(secret?.word ?? '__none__');
    expect(container.innerHTML).not.toContain(secret?.hint ?? '__none__');
    expect(container.innerHTML).not.toMatch(/impostor-id|Você é o impostor/);
  });
});

describe('layout: storage warning (RF-GER-006)', () => {
  it('shows the warning once and the player can dismiss it', async () => {
    const { useStorageStatus } =
      await import('#/domain/match/storage/stores/storage-status.store.ts');
    useStorageStatus.setState({ unavailable: false, warningDismissed: false });
    const user = userEvent.setup();
    renderApp('/');
    await screen.findByRole('button', { name: /Jogar Arena/ });
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();

    act(() => useStorageStatus.getState().markUnavailable());
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Não consigo guardar a partida neste navegador. Se recarregar, perde tudo.',
    );

    await user.click(screen.getByRole('button', { name: 'Dispensar aviso' }));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
