import { useMemo } from 'react';

import { useMatchSession } from '#/domain/match/session/stores/match-session.store.ts';
import type { Player } from '#/domain/players/roster/types/player.type.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

/** What the "pass the phone" screen and the reveal screen may show: nothing about the word or the roles. */
export type CurrentCard = {
  /** The player whose turn it is (BR-MAT-047: name and icon of the next one). */
  player: Player;
  /** 1-based, for "Carta N de M". */
  cardNumber: number;
  cardCount: number;
  isLast: boolean;
  /** Whether the card was already turned at least once: enables "Próximo" (RF-REV-004). */
  seen: boolean;
};

/**
 * The card of the turn, or `null` when the mode has no round at the reveal.
 * To get the secret of this card, call `getCurrentCardSecret` inside `renderFront`, never here.
 */
export function useCurrentCard(mode: ThemeName): CurrentCard | null {
  const round = useMatchSession((state) => state.rounds[mode]);

  return useMemo(() => {
    if (round === null || round.stage !== 'reveal') return null;

    const playerId = round.cardOrder[round.currentCardIndex];
    const player = round.players.find((candidate) => candidate.id === playerId);
    if (player === undefined) return null;

    return {
      player,
      cardNumber: round.currentCardIndex + 1,
      cardCount: round.cardOrder.length,
      isLast: round.currentCardIndex === round.cardOrder.length - 1,
      seen: round.currentCardSeen,
    };
  }, [round]);
}
