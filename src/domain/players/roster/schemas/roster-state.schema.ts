import { z } from 'zod';

import { MAX_PLAYERS } from '#/domain/players/roster/constants/roster-limits.constant.ts';
import { normalizePlayerName } from '#/domain/players/roster/rules/normalize-player-name.rule.ts';
import { playerSchema } from '#/domain/players/roster/schemas/player.schema.ts';

/** What comes back from the storage: up to 20 players with unique ids and unique names (BR-MAT-010, BR-MAT-011). */
export const rosterStateSchema = z.object({
  players: z
    .array(playerSchema)
    .max(MAX_PLAYERS)
    .refine((players) => new Set(players.map((player) => player.id)).size === players.length)
    .refine(
      (players) =>
        new Set(players.map((player) => normalizePlayerName(player.name))).size === players.length,
    ),
});
