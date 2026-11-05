import { useMatchActions } from '#/domain/match/session/hooks/use-match-actions.hook.ts';
import { useCurrentCard } from '#/domain/match/session/hooks/use-current-card.hook.ts';
import { useRoundStage } from '#/domain/match/session/hooks/use-round-stage.hook.ts';
import { getCurrentCardSecret } from '#/domain/match/session/utils/get-current-card-secret.util.ts';
import { useRevealStep } from '#/features/match/reveal/hooks/use-reveal-step.hook.ts';
import { getCardKey } from '#/features/match/reveal/utils/get-card-key.util.ts';
import { mapCardSecret } from '#/features/match/reveal/utils/map-card-secret.util.ts';
import type { CardFrontProps } from '#/features/match/reveal/types/card-front-props.type.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

export type RevealPhase = 'pass' | 'card';

/**
 * Joins the domain (round, card of the turn, actions) with the saved sub-step. `card` holds only what the
 * pass screen and the face-down card may show; the secret is read by `readSecret`, which the View calls
 * only inside the `renderFront` of the FlipCard (BR-MAT-045).
 */
export function useRevealModel(mode: ThemeName) {
  const card = useCurrentCard(mode);
  const stage = useRoundStage(mode);
  const actions = useMatchActions();
  const { enteredCardKey, enterCard, clear: clearStep } = useRevealStep(mode);

  const cardKey =
    card === null ? null : getCardKey(card.player.id, card.cardNumber, card.cardCount);
  const phase: RevealPhase = cardKey !== null && cardKey === enteredCardKey ? 'card' : 'pass';

  function readSecret(): CardFrontProps | null {
    return mapCardSecret(getCurrentCardSecret(mode));
  }

  return {
    card,
    stage,
    phase,
    cardKey,
    readSecret,
    enterCard,
    clearStep,
    markCardSeen: () => actions.markCardSeen(mode),
    advanceCard: () => actions.advanceCard(mode),
    goToRound: () => actions.goToRound(mode),
    discardRound: () => actions.discardRound(mode),
  };
}
