import { getCardSecret } from '#/domain/match/session/rules/get-card-secret.rule.ts';
import { useMatchSession } from '#/domain/match/session/stores/match-session.store.ts';
import type { CardSecret } from '#/domain/match/session/types/card-secret.type.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

/**
 * The secret of the card of the turn: the word, or the impostor role and the hint (BR-MAT-045).
 * Call it only inside `renderFront` of the `FlipCard`, which runs only while the card is held.
 * It is a plain function, not a hook: nothing subscribes to the secret, so no component keeps it while
 * the card is face down. It reads and returns the value, and logs nothing.
 */
export function getCurrentCardSecret(mode: ThemeName): CardSecret | null {
  const round = useMatchSession.getState().rounds[mode];

  return round === null ? null : getCardSecret(round);
}
