import { useMatchActions } from '#/domain/match/session/hooks/use-match-actions.hook.ts';
import { useRoundResult } from '#/domain/match/session/hooks/use-round-result.hook.ts';
import { useRoundStage } from '#/domain/match/session/hooks/use-round-stage.hook.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

/** Joins the domain hooks the result screen uses. The result only exists once the group revealed. */
export function useResultModel(mode: ThemeName) {
  const result = useRoundResult(mode);
  const stage = useRoundStage(mode);
  const { startNewRound, changeSettings, switchMode } = useMatchActions();

  return { result, stage, startNewRound, changeSettings, switchMode };
}
