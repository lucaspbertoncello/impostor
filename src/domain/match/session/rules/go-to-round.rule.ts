import type { Round } from '#/domain/match/session/types/round.type.ts';

/** The last card was seen: go to the round screen (BR-MAT-047). `null` when it does not apply. */
export function goToRound(round: Round): Round | null {
  const isLast = round.currentCardIndex >= round.cardOrder.length - 1;
  if (round.stage !== 'reveal' || !round.currentCardSeen || !isLast) return null;

  return { ...round, stage: 'round' };
}
