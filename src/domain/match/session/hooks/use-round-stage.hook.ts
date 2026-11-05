import { useMatchSession } from '#/domain/match/session/stores/match-session.store.ts';
import type { RoundStage } from '#/domain/match/session/types/round.type.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

/** The stage of the round of a mode, or `null` when there is none. Enough to pick the screen to resume. */
export function useRoundStage(mode: ThemeName): RoundStage | null {
  return useMatchSession((state) => state.rounds[mode]?.stage ?? null);
}
