import { z } from 'zod';

import { getMaxImpostors } from '#/domain/match/draw/rules/get-max-impostors.rule.ts';
import {
  MAX_PLAYERS,
  MIN_PLAYERS,
} from '#/domain/players/roster/constants/roster-limits.constant.ts';
import { playerSchema } from '#/domain/players/roster/schemas/player.schema.ts';

const idsSchema = z.array(z.string().min(1));

function isPermutationOf(order: string[], ids: Set<string>): boolean {
  return (
    order.length === ids.size &&
    new Set(order).size === ids.size &&
    order.every((id) => ids.has(id))
  );
}

/** A saved round must be whole and consistent: orders are permutations of the players, impostors are players. */
export const roundSchema = z
  .object({
    stage: z.enum(['reveal', 'round', 'result']),
    players: z.array(playerSchema).min(MIN_PLAYERS).max(MAX_PLAYERS),
    secret: z.object({
      wordId: z.string().min(1),
      word: z.string().min(1),
      hint: z.string(),
      categoryId: z.string().min(1),
      categoryName: z.string(),
      categoryColor: z.string().nullable(),
    }),
    hintEnabled: z.boolean(),
    impostorIds: idsSchema,
    cardOrder: idsSchema,
    speakingOrder: idsSchema,
    currentCardIndex: z.number().int().min(0),
    currentCardSeen: z.boolean(),
  })
  .refine((round) => {
    const ids = new Set(round.players.map((player) => player.id));
    const impostors = new Set(round.impostorIds);

    return (
      ids.size === round.players.length &&
      isPermutationOf(round.cardOrder, ids) &&
      isPermutationOf(round.speakingOrder, ids) &&
      impostors.size === round.impostorIds.length &&
      round.impostorIds.length >= 1 &&
      round.impostorIds.length <= getMaxImpostors(round.players.length) &&
      round.impostorIds.every((id) => ids.has(id)) &&
      round.currentCardIndex < round.players.length
    );
  });
