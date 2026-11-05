import { useMemo } from 'react';

import { useMatchSession } from '#/domain/match/session/stores/match-session.store.ts';
import type { RoundStage } from '#/domain/match/session/types/round.type.ts';
import { THEME_NAMES } from '#/shared/constants/theme-names.constant.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

/** One line of the resume banner of the Início (RF-INI-004): "Rodada em andamento (Arena, N jogadores)". */
export type ResumableRound = {
  mode: ThemeName;
  stage: RoundStage;
  playerCount: number;
};

/** The rounds saved in any mode, with no secret. */
export function useResumableRounds(): ResumableRound[] {
  const rounds = useMatchSession((state) => state.rounds);

  return useMemo(
    () =>
      THEME_NAMES.flatMap((mode) => {
        const round = rounds[mode];
        return round === null
          ? []
          : [{ mode, stage: round.stage, playerCount: round.players.length }];
      }),
    [rounds],
  );
}
