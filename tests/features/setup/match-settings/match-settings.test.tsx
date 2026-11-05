import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import { useMatchSession } from '#/domain/match/session/stores/match-session.store.ts';
import { useRoster } from '#/domain/players/roster/stores/roster.store.ts';
import { useMatchSettings } from '#/domain/settings/match/stores/match-settings.store.ts';
import { getModeCategories } from '#/domain/words/word-bank/rules/get-mode-categories.rule.ts';
import { createFakePlayers } from '#tests/support/players/create-fake-players.util.ts';
import { resetMatchStores } from '#tests/support/match/reset-match-stores.util.ts';
import { renderApp } from '#tests/support/router/render-app.util.tsx';

const START = { name: 'Começar rodada' };

function seedPlayers(count: number) {
  useRoster.setState({ players: createFakePlayers(count) });
}

describe('Configuração', () => {
  beforeEach(() => {
    resetMatchStores(getModeCategories('party'));
  });

  it('changes the impostor limit with the number of players', async () => {
    seedPlayers(8);
    const user = userEvent.setup();
    const { unmount } = renderApp('/party/settings');

    expect(await screen.findByText('Máximo para 8 jogadores: 3')).toBeInTheDocument();
    const plus = screen.getByRole('button', { name: /aumentar/i });
    await user.click(plus);
    await user.click(plus);
    expect(screen.getByRole('textbox', { name: 'Impostores' })).toHaveValue('3');
    expect(plus).toBeDisabled();
    unmount();

    seedPlayers(4);
    renderApp('/party/settings');

    expect(await screen.findByText('Com 3 ou 4 jogadores, só 1 impostor')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /aumentar/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /diminuir/i })).toBeDisabled();
  });

  it('shows "Ajustado para o máximo" when the saved value is above the limit', async () => {
    seedPlayers(6);
    useMatchSettings.setState({
      settings: {
        ...useMatchSettings.getState().settings,
        party: { ...useMatchSettings.getState().settings.party, impostorCount: 5 },
      },
    });
    renderApp('/party/settings');

    expect(await screen.findByText('Ajustado para o máximo')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Impostores' })).toHaveValue('2');
  });

  it('Party with no category shows the error next to the grid and does not start', async () => {
    seedPlayers(5);
    useMatchSettings.setState({
      settings: {
        ...useMatchSettings.getState().settings,
        party: { ...useMatchSettings.getState().settings.party, categoryIds: [] },
      },
    });
    const user = userEvent.setup();
    const { router } = renderApp('/party/settings');

    await user.click(await screen.findByRole('button', START));

    expect(await screen.findByRole('alert')).toHaveTextContent('Escolha pelo menos uma categoria');
    expect(router.state.location.pathname).toBe('/party/settings');
    expect(useMatchSession.getState().rounds.party).toBeNull();

    // Marking a category clears the error.
    await user.click(screen.getByRole('button', { name: /Comidas/ }));
    await waitFor(() => expect(screen.queryByRole('alert')).toBeNull());
  });

  it('"Marcar todas" and "Limpar" only touch the normal categories', async () => {
    seedPlayers(5);
    const user = userEvent.setup();
    renderApp('/party/settings');

    await user.click(await screen.findByRole('button', { name: 'Limpar' }));
    expect(screen.getByText('2 de 19')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Marcar todas' }));
    expect(screen.getByText('19 de 19')).toBeInTheDocument();
  });

  it('"Começar rodada" saves the round and goes to the Revelação', async () => {
    seedPlayers(5);
    const user = userEvent.setup();
    const { router } = renderApp('/party/settings');

    await user.click(await screen.findByRole('button', START));

    await waitFor(() => expect(router.state.location.pathname).toBe('/party/reveal'));
    expect(useMatchSession.getState().rounds.party?.stage).toBe('reveal');
  });

  it('asks before discarding a saved round', async () => {
    seedPlayers(5);
    const user = userEvent.setup();
    const first = renderApp('/party/settings');
    await user.click(await screen.findByRole('button', START));
    await waitFor(() => expect(first.router.state.location.pathname).toBe('/party/reveal'));
    // A Revelação segura a navegação (folha "Sair da rodada?"): reabre o app na Configuração.
    first.unmount();
    const { router } = renderApp('/party/settings');

    await user.click(await screen.findByRole('button', START));
    const sheet = await screen.findByRole('dialog', { name: 'Descartar a rodada?' });
    expect(within(sheet).getByText('A rodada atual será descartada')).toBeInTheDocument();
    expect(router.state.location.pathname).toBe('/party/settings');

    await user.click(within(sheet).getByRole('button', { name: 'Descartar e começar' }));
    await waitFor(() => expect(router.state.location.pathname).toBe('/party/reveal'));
  });

  it('Arena has no categories, only the words line', async () => {
    seedPlayers(5);
    renderApp('/arena/settings');

    expect(await screen.findByText('Palavras: cartas do Clash Royale')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Categorias' })).toBeNull();
  });
});
