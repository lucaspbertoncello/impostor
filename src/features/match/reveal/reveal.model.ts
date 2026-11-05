import { useMatchActions } from '#/domain/match/session/hooks/use-match-actions.hook.ts';
import { useCurrentCard } from '#/domain/match/session/hooks/use-current-card.hook.ts';
import { useRoundStage } from '#/domain/match/session/hooks/use-round-stage.hook.ts';
import { getCurrentCardSecret } from '#/domain/match/session/utils/get-current-card-secret.util.ts';
import { getCardKey } from '#/features/match/reveal/utils/get-card-key.util.ts';
import { mapCardSecret } from '#/features/match/reveal/utils/map-card-secret.util.ts';
import type { CardFrontProps } from '#/features/match/reveal/types/card-front-props.type.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

/**
 * Joins the domain (round, card of the turn, actions). `card` holds only what the player row and the
 * face-down card may show; the secret is read by `readSecret`, which the View calls
 * only inside the `renderFront` of the FlipCard (BR-MAT-045).
 */
export function useRevealModel(mode: ThemeName) {
  const card = useCurrentCard(mode);
  const stage = useRoundStage(mode);
  const actions = useMatchActions();

  const cardKey =
    card === null ? null : getCardKey(card.player.id, card.cardNumber, card.cardCount);

  function readSecret(): CardFrontProps | null {
    return mapCardSecret(getCurrentCardSecret(mode));
  }

  return {
    card,
    stage,
    cardKey,
    readSecret,
    markCardSeen: () => actions.markCardSeen(mode),
    advanceCard: () => actions.advanceCard(mode),
    goToRound: () => actions.goToRound(mode),
    discardRound: () => actions.discardRound(mode),
  };
}
