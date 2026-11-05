import type { Round } from '#/domain/match/session/types/round.type.ts';

/** The group asked to reveal (BR-MAT-041). `null` unless the round is at the round screen. */
export function revealRound(round: Round): Round | null {
  if (round.stage !== 'round') return null;

  return { ...round, stage: 'result' };
}
