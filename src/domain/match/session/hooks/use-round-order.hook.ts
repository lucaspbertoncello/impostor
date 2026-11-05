import { useMemo } from 'react';

import { useMatchSession } from '#/domain/match/session/stores/match-session.store.ts';
import type { Player } from '#/domain/players/roster/types/player.type.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

/** What the round screen may show (RF-PAR-001, RF-PAR-002): the count and the order, no word, role or hint. */
export type RoundOrder = {
  /** "N impostor(es) entre vocês". */
  impostorCount: number;
  /** All the players in the order they speak. */
  speakingOrder: Player[];
  /** The first of the speaking order; may be an impostor. */
  firstPlayer: Player;
};

/** `null` when the mode has no round past the reveal. */
export function useRoundOrder(mode: ThemeName): RoundOrder | null {
  const round = useMatchSession((state) => state.rounds[mode]);

  return useMemo(() => {
    if (round === null || round.stage === 'reveal') return null;

    const byId = new Map(round.players.map((player) => [player.id, player]));
    const speakingOrder = round.speakingOrder.flatMap((id) => byId.get(id) ?? []);
    const [firstPlayer] = speakingOrder;
    if (firstPlayer === undefined) return null;

    return { impostorCount: round.impostorIds.length, speakingOrder, firstPlayer };
  }, [round]);
}
