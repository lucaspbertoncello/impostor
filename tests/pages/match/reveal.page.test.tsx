import { createBrowserHistory, createMemoryHistory, RouterProvider } from '@tanstack/react-router';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useMatchSession } from '#/domain/match/session/stores/match-session.store.ts';
import { useRoster } from '#/domain/players/roster/stores/roster.store.ts';
import { createAppRouter } from '#/router/create-router.util.tsx';
import type { PlayerIconIndex } from '#/shared/types/player-icon-index.type.ts';
import { resetMatchStores } from '#tests/support/match/reset-match-stores.util.ts';
import { createSeededRandomInt } from '#tests/support/random/create-seeded-random-int.util.ts';
import { createFakeCategory } from '#tests/support/words/create-fake-word-bank.util.ts';

const WORD = 'ZEBRA-SECRETA';
const HINT = 'DICA-SECRETA';
const bank = [createFakeCategory('secret', [WORD], { mode: 'party' })];
bank[0]!.words[0]!.hint = HINT;
const NAMES = ['Ana', 'Bruno', 'Carla'];
const pointer = { pointerId: 1, pointerType: 'touch', button: 0 };

function startRound() {
  resetMatchStores(bank);
  useRoster.setState({
    players: NAMES.map((name, index) => ({
      id: `p${index + 1}`,
      name,
      iconIndex: (index + 1) as PlayerIconIndex,
    })),
  });
  const result = useMatchSession
    .getState()
    .startRound('party', { categories: bank, randomInt: createSeededRandomInt(7) });
  expect(result).toEqual({ ok: true });
}

function renderReveal(entries = ['/party/reveal']) {
  const router = createAppRouter(
    createMemoryHistory({ initialEntries: entries, initialIndex: entries.length - 1 }),
  );
  const view = render(<RouterProvider router={router} />);
  return { router, ...view };
}

/** The whole page, attributes included. Nothing secret may be in it unless the card is held. */
function expectNoSecretInPage() {
  const html = document.body.innerHTML;
  expect(html).not.toContain(WORD);
  expect(html).not.toContain(HINT);
  expect(document.title).not.toContain(WORD);
}

/** Browser history of jsdom: only it blocks the back button (the memory history does not block a pop). */
function renderRevealOnBrowserHistory() {
  window.history.replaceState({}, '', '/party/settings');
  window.history.pushState({}, '', '/party/reveal');
  const router = createAppRouter(createBrowserHistory());
  const view = render(<RouterProvider router={router} />);
  return { router, ...view };
}

async function pressBrowserBack() {
  act(() => window.history.back());
  await screen.findByRole('dialog', { name: 'Sair da rodada?' });
}

function getCard() {
  return screen.getByRole('button', { name: /Carta secreta/ });
}

beforeEach(() => {
  startRound();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('reveal screen', () => {
  it('goes through the 3 players on one screen each, hiding the secret outside the hold, until "Começar partida"', async () => {
    const log = vi.spyOn(console, 'log');
    const warn = vi.spyOn(console, 'warn');
    const { router } = renderReveal();
    const order = useMatchSession
      .getState()
      .rounds.party!.cardOrder.map((id) => NAMES[Number(id.slice(1)) - 1]!);
    const roles: string[] = [];

    for (const [position, name] of order.entries()) {
      // One screen per player: name, progress and the face-down card. No round data at all.
      expect(await screen.findByRole('heading', { level: 2, name })).toBeInTheDocument();
      expect(screen.getByText(`Carta ${position + 1} de 3`)).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Sou eu' })).not.toBeInTheDocument();
      expect(document.body.textContent).not.toContain('Passe o celular');
      expect(document.body.textContent?.toLowerCase()).not.toContain('impostor');
      expect(getCard()).toBeInTheDocument();
      expectNoSecretInPage();

      // Face-down card: "Próximo" waits for the first turn.
      const isLast = position === 2;
      const next = screen.getByRole('button', { name: isLast ? 'Começar partida' : 'Próximo' });
      expect(next).toBeDisabled();
      expect(screen.getByText('Vire a carta para ver')).toBeInTheDocument();

      // Held: the front is in the DOM; released: gone.
      fireEvent.pointerDown(getCard(), pointer);
      const isImpostor = document.body.textContent?.includes('Você é') ?? false;
      roles.push(isImpostor ? 'impostor' : 'crew');
      expect(document.body.innerHTML.includes(WORD)).toBe(!isImpostor);
      fireEvent.pointerUp(getCard(), pointer);
      expectNoSecretInPage();
      expect(document.body.textContent).not.toContain('Você é');

      expect(next).toBeEnabled();
      fireEvent.click(next);

      if (!isLast) {
        // The next player comes with a fresh face-down card: the previous one never shows again.
        const nextName = order[position + 1]!;
        expect(
          await screen.findByRole('heading', { level: 2, name: nextName }),
        ).toBeInTheDocument();
        expect(
          screen.getByRole('button', { name: position + 1 === 2 ? 'Começar partida' : 'Próximo' }),
        ).toBeDisabled();
        expect(screen.getByText('Vire a carta para ver')).toBeInTheDocument();
        expect(document.body.textContent).not.toContain('Você é');
        expectNoSecretInPage();
      }
    }

    expect(roles.filter((role) => role === 'impostor')).toHaveLength(1);
    await waitFor(() => expect(router.state.location.pathname).toBe('/party/round'));
    expect(useMatchSession.getState().rounds.party?.stage).toBe('round');
    for (const spy of [log, warn]) {
      expect(JSON.stringify(spy.mock.calls)).not.toContain(WORD);
      expect(JSON.stringify(spy.mock.calls)).not.toContain(HINT);
    }
  });

  it('keeps "Próximo" locked while the card was never turned', async () => {
    renderReveal();

    expect(await screen.findByRole('button', { name: 'Próximo' })).toBeDisabled();
    expect(useMatchSession.getState().advanceCard('party')).toBe(false);
  });

  it('comes back to the player of the turn with the card face down after a reload', async () => {
    const first = renderReveal();
    const name = (await screen.findByRole('heading', { level: 2 })).textContent;
    fireEvent.pointerDown(await screen.findByRole('button', { name: /Carta secreta/ }), pointer);
    fireEvent.pointerUp(getCard(), pointer);
    first.unmount();

    renderReveal();

    expect(await screen.findByRole('heading', { level: 2, name })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /Carta secreta/ })).toBeInTheDocument();
    expect(document.body.textContent).not.toContain('Você é');
    expectNoSecretInPage();
    // Already seen once: it can move on, and it can turn again.
    expect(screen.getByRole('button', { name: 'Próximo' })).toBeEnabled();
    fireEvent.pointerDown(getCard(), pointer);
    expect(
      document.body.textContent?.includes('Você é') || document.body.innerHTML.includes(WORD),
    ).toBe(true);
    fireEvent.pointerUp(getCard(), pointer);
  });

  it('asks before leaving with the "x", and "Continuar rodada" keeps the round', async () => {
    renderReveal();
    fireEvent.click(await screen.findByRole('button', { name: 'Sair da rodada' }));

    const dialog = await screen.findByRole('dialog', { name: 'Sair da rodada?' });
    expect(within(dialog).getByText('A rodada atual será descartada')).toBeInTheDocument();
    fireEvent.click(within(dialog).getByRole('button', { name: 'Continuar rodada' }));

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(useMatchSession.getState().rounds.party).not.toBeNull();
    expect(getCard()).toBeInTheDocument();
  });

  it('opens the sheet on the browser back instead of leaving, and "Sair" discards the round', async () => {
    const { router } = renderRevealOnBrowserHistory();
    await screen.findByRole('button', { name: /Carta secreta/ });

    await pressBrowserBack();
    const dialog = screen.getByRole('dialog', { name: 'Sair da rodada?' });
    expect(router.state.location.pathname).toBe('/party/reveal');
    fireEvent.click(within(dialog).getByRole('button', { name: 'Sair' }));

    await waitFor(() => expect(router.state.location.pathname).toBe('/'));
    expect(useMatchSession.getState().rounds.party).toBeNull();
  });

  it('never goes back to a card already seen: the browser back keeps the reveal', async () => {
    const { router } = renderRevealOnBrowserHistory();
    fireEvent.pointerDown(await screen.findByRole('button', { name: /Carta secreta/ }), pointer);
    fireEvent.pointerUp(getCard(), pointer);

    await pressBrowserBack();
    expect(router.state.location.pathname).toBe('/party/reveal');
  });

  it('sends the visitor to the Início when there is no round', async () => {
    useMatchSession.setState({ rounds: { arena: null, party: null } });
    const { router } = renderReveal();

    await waitFor(() => expect(router.state.location.pathname).toBe('/'));
  });

  it('sends the visitor to the round screen when the reveal is over', async () => {
    const actions = useMatchSession.getState();
    for (let card = 0; card < 2; card += 1) {
      actions.markCardSeen('party');
      actions.advanceCard('party');
    }
    actions.markCardSeen('party');
    actions.goToRound('party');
    const { router } = renderReveal();

    await waitFor(() => expect(router.state.location.pathname).toBe('/party/round'));
  });
});
