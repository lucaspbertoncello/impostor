import { useResumableRounds } from '#/domain/match/session/hooks/use-resumable-rounds.hook.ts';
import { useMatchActions } from '#/domain/match/session/hooks/use-match-actions.hook.ts';
import { useWordHistory } from '#/domain/match/history/stores/word-history.store.ts';

/** Joins the domain hooks the Início needs. Only ids and counts leave here: no secret of a round. */
export function useModePickerModel() {
  const rounds = useResumableRounds();
  const { discardRound } = useMatchActions();
  const hasHistory = useWordHistory(
    (state) => state.usedWordIds.arena.length + state.usedWordIds.party.length > 0,
  );

  return { rounds, discardRound, hasPlayed: hasHistory || rounds.length > 0 };
}
