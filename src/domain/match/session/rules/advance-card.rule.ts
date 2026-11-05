import type { Round } from '#/domain/match/session/types/round.type.ts';

/**
 * Passes to the next player (BR-MAT-047): only after the card of the turn was seen, and not on the last card
 * (that one goes to the round). The next card starts not seen. `null` when it does not apply.
 */
export function advanceCard(round: Round): Round | null {
  const isLast = round.currentCardIndex >= round.cardOrder.length - 1;
  if (round.stage !== 'reveal' || !round.currentCardSeen || isLast) return null;

  return { ...round, currentCardIndex: round.currentCardIndex + 1, currentCardSeen: false };
}
