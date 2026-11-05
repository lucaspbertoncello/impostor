import { z } from 'zod';

/** What comes back from the storage: the ids of the words already used, per mode, oldest first. */
export const wordHistoryStateSchema = z.object({
  usedWordIds: z.object({
    arena: z.array(z.string().min(1)),
    party: z.array(z.string().min(1)),
  }),
});
