import type { CardSecret } from '#/domain/match/session/types/card-secret.type.ts';
import type { CardFrontProps } from '#/features/match/reveal/types/card-front-props.type.ts';

/**
 * Turns the secret of the card into the props of the front face. It leaves `accentColor` out on
 * purpose: a color on the crew card only would show the role from afar (BR-MAT-045).
 */
export function mapCardSecret(secret: CardSecret | null): CardFrontProps | null {
  if (secret === null) return null;
  if (secret.role === 'crew') return { role: 'crew', word: secret.word };

  return secret.hint === undefined ? { role: 'impostor' } : { role: 'impostor', hint: secret.hint };
}
