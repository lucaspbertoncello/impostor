import { useMatchActions } from '#/domain/match/session/hooks/use-match-actions.hook.ts';
import { useRoundOrder } from '#/domain/match/session/hooks/use-round-order.hook.ts';
import { useRoundStage } from '#/domain/match/session/hooks/use-round-stage.hook.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

/** Joins the domain hooks the round screen uses. None of them carries the word, a role or the hint. */
export function useRoundModel(mode: ThemeName) {
  const order = useRoundOrder(mode);
  const stage = useRoundStage(mode);
  const { revealResult, discardRound } = useMatchActions();

  return { order, stage, revealResult, discardRound };
}
