import { useMemo } from 'react';

import { useMatchSession } from '#/domain/match/session/stores/match-session.store.ts';
import type { Player } from '#/domain/players/roster/types/player.type.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

/** What the result screen shows (RF-RES-001). Only exists once the group revealed. */
export type RoundResult = {
  word: string;
  /** The hint the impostor received; `null` when the hint was off (the line does not appear). */
  hint: string | null;
  /** Festa shows the category under the word; Arena ignores it. */
  categoryName: string;
  categoryColor: string | null;
  impostors: Player[];
};

/** `null` until the round is at the result: before that, no hook delivers the word or the impostors. */
export function useRoundResult(mode: ThemeName): RoundResult | null {
  const round = useMatchSession((state) => state.rounds[mode]);

  return useMemo(() => {
    if (round === null || round.stage !== 'result') return null;

    return {
      word: round.secret.word,
      hint: round.hintEnabled && round.secret.hint !== '' ? round.secret.hint : null,
      categoryName: round.secret.categoryName,
      categoryColor: round.secret.categoryColor,
      impostors: round.players.filter((player) => round.impostorIds.includes(player.id)),
    };
  }, [round]);
}
