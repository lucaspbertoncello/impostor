import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import { useMatchSession } from '#/domain/match/session/stores/match-session.store.ts';
import { useRoster } from '#/domain/players/roster/stores/roster.store.ts';
import type { Round } from '#/domain/match/session/types/round.type.ts';
import { resetMatchStores } from '#tests/support/match/reset-match-stores.util.ts';
import { createFakePlayers } from '#tests/support/players/create-fake-players.util.ts';
import { renderApp } from '#tests/support/router/render-app.util.tsx';

async function addPlayer(user: ReturnType<typeof userEvent.setup>, name: string) {
  await user.click(screen.getByRole('button', { name: /Adicionar jogador/ }));
  const dialog = await screen.findByRole('dialog');
  await user.type(within(dialog).getByRole('textbox', { name: /Nome/ }), `${name}{Enter}`);
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
}

function createRound(): Round {
  const players = createFakePlayers(3);
  const ids = players.map((player) => player.id);

  return {
    stage: 'round',
    players,
    secret: {
      wordId: 'w1',
      word: 'pizza',
      hint: 'redonda',
      categoryId: 'foods',
      categoryName: 'Comidas',
      categoryColor: null,
    },
    hintEnabled: true,
    impostorIds: [ids[0] as string],
    cardOrder: ids,
    speakingOrder: ids,
    currentCardIndex: 0,
    currentCardSeen: true,
  };
}

describe('Jogadores', () => {
  beforeEach(() => {
    resetMatchStores();
  });

  it('starts empty with Continuar disabled', async () => {
    renderApp('/arena/players');

    expect(await screen.findByText('Adicione pelo menos 3 jogadores')).toBeInTheDocument();
    expect(screen.getByText('0 de 20 jogadores')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Continuar' })).toBeDisabled();
  });

  it('adds three players, shows what is missing on the way, and continues to the settings', async () => {
    const user = userEvent.setup();
    const { router } = renderApp('/arena/players');
    await screen.findByText('0 de 20 jogadores');

    await addPlayer(user, 'Lucas');
    expect(screen.getByText('Faltam 2 para começar')).toBeInTheDocument();
    await addPlayer(user, 'Gabriel');
    expect(screen.getByText('Faltam 1 para começar')).toBeInTheDocument();
    await addPlayer(user, 'Marina');

    expect(screen.getByText('3 de 20 jogadores')).toBeInTheDocument();
    expect(useRoster.getState().players.map((player) => player.name)).toEqual([
      'Lucas',
      'Gabriel',
      'Marina',
    ]);

    await user.click(screen.getByRole('button', { name: 'Continuar' }));

    await waitFor(() => expect(router.state.location.pathname).toBe('/arena/settings'));
  });

  it('suggests a different icon for each new player', async () => {
    const user = userEvent.setup();
    renderApp('/party/players');
    await screen.findByText('0 de 20 jogadores');

    await addPlayer(user, 'Lucas');
    await addPlayer(user, 'Gabriel');

    const [first, second] = useRoster.getState().players;
    expect(first?.iconIndex).not.toBe(second?.iconIndex);
  });

  it('refuses a repeated name even with another accent, case and spaces', async () => {
    const user = userEvent.setup();
    useRoster.setState({ players: [{ id: 'a', name: 'Álvaro', iconIndex: 1 }] });
    renderApp('/party/players');
    await screen.findByText('1 de 20 jogadores');

    await user.click(screen.getByRole('button', { name: /Adicionar jogador/ }));
    const dialog = await screen.findByRole('dialog');
    await user.type(within(dialog).getByRole('textbox', { name: /Nome/ }), ' alvaro ');
    await user.click(within(dialog).getByRole('button', { name: 'Adicionar' }));

    expect(
      await within(dialog).findByText('Já existe um jogador com esse nome.'),
    ).toBeInTheDocument();
    expect(useRoster.getState().players).toHaveLength(1);
  });

  it('asks for a name when it is empty and stops typing at 12 characters', async () => {
    const user = userEvent.setup();
    renderApp('/arena/players');
    await screen.findByText('0 de 20 jogadores');

    await user.click(screen.getByRole('button', { name: /Adicionar jogador/ }));
    const dialog = await screen.findByRole('dialog');
    await user.click(within(dialog).getByRole('button', { name: 'Adicionar' }));
    expect(await within(dialog).findByText('Digite um nome.')).toBeInTheDocument();

    await user.type(within(dialog).getByRole('textbox', { name: /Nome/ }), 'Maximilianoo123');
    expect(within(dialog).getByRole('textbox', { name: /Nome/ })).toHaveValue('Maximilianoo');
    expect(within(dialog).getByText('12/12')).toBeInTheDocument();
  });

  it('blocks the 21st player with the limit text', async () => {
    useRoster.setState({ players: createFakePlayers(20) });
    renderApp('/arena/players');

    const limit = await screen.findByRole('button', { name: 'Máximo de 20 jogadores' });
    expect(limit).toBeDisabled();
    expect(screen.getByText('20 de 20 jogadores')).toBeInTheDocument();
  });

  it('removes a player only on the second tap', async () => {
    const user = userEvent.setup();
    useRoster.setState({ players: createFakePlayers(4) });
    renderApp('/arena/players');

    await user.click(await screen.findByRole('button', { name: 'Editar Jogador 2' }));
    const dialog = await screen.findByRole('dialog');
    await user.click(within(dialog).getByRole('button', { name: 'Remover jogador' }));

    expect(useRoster.getState().players).toHaveLength(4);
    await user.click(within(dialog).getByRole('button', { name: 'Tocar de novo para remover' }));

    await waitFor(() => expect(useRoster.getState().players).toHaveLength(3));
    expect(screen.queryByText('Jogador 2')).not.toBeInTheDocument();
  });

  it('edits a player keeping the own name', async () => {
    const user = userEvent.setup();
    useRoster.setState({ players: createFakePlayers(3) });
    renderApp('/arena/players');

    await user.click(await screen.findByRole('button', { name: 'Editar Jogador 1' }));
    const dialog = await screen.findByRole('dialog');
    await user.click(within(dialog).getByRole('radio', { name: /Ícone 9/ }));
    await user.click(within(dialog).getByRole('button', { name: 'Salvar' }));

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(useRoster.getState().players[0]).toMatchObject({ name: 'Jogador 1', iconIndex: 9 });
  });

  it('warns about a round in progress and discards it only after confirming', async () => {
    const user = userEvent.setup();
    useRoster.setState({ players: createFakePlayers(3) });
    useMatchSession.setState({ rounds: { arena: createRound(), party: null } });
    renderApp('/arena/players');

    expect(
      await screen.findByText('Há uma rodada em andamento. Editar os jogadores a descarta.'),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Editar Jogador 1' }));
    const confirmation = await screen.findByRole('dialog', { name: 'Descartar a rodada?' });
    expect(useMatchSession.getState().rounds.arena).not.toBeNull();

    await user.click(within(confirmation).getByRole('button', { name: 'Descartar e continuar' }));

    expect(await screen.findByRole('dialog', { name: 'Editar jogador' })).toBeInTheDocument();
    expect(useMatchSession.getState().rounds.arena).toBeNull();
  });
});
