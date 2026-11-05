import { z } from 'zod';

import { roundSchema } from '#/domain/match/session/schemas/round.schema.ts';

/** What comes back from the storage: the round in progress of each mode, or none. */
export const matchSessionStateSchema = z.object({
  rounds: z.object({
    arena: roundSchema.nullable(),
    party: roundSchema.nullable(),
  }),
});
