import type { Round } from '#/domain/match/session/types/round.type.ts';

/** The card of the turn was turned at least once (BR-MAT-047). `null` when the round is not at the reveal. */
export function markCardSeen(round: Round): Round | null {
  if (round.stage !== 'reveal') return null;

  return { ...round, currentCardSeen: true };
}
