import type { CardSecret } from '#/domain/match/session/types/card-secret.type.ts';
import type { Round } from '#/domain/match/session/types/round.type.ts';

/**
 * The secret of the card of the turn, and of that one only (BR-MAT-045): there is no way to ask for the role
 * of another player. `null` outside the reveal.
 */
export function getCardSecret(round: Round): CardSecret | null {
  if (round.stage !== 'reveal') return null;

  const playerId = round.cardOrder[round.currentCardIndex];
  if (playerId === undefined) return null;

  if (round.impostorIds.includes(playerId)) {
    const hint = round.hintEnabled && round.secret.hint !== '' ? round.secret.hint : undefined;
    return hint === undefined ? { role: 'impostor' } : { role: 'impostor', hint };
  }

  return round.secret.categoryColor === null
    ? { role: 'crew', word: round.secret.word }
    : { role: 'crew', word: round.secret.word, accentColor: round.secret.categoryColor };
}
