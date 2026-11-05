import { z } from 'zod';

const matchSettingsSchema = z.object({
  impostorCount: z.number().int().min(1).max(9),
  hintEnabled: z.boolean(),
  categoryIds: z.array(z.string().min(1)),
});

/** What comes back from the storage: the settings of each mode. */
export const matchSettingsStateSchema = z.object({
  settings: z.object({
    arena: matchSettingsSchema,
    party: matchSettingsSchema,
  }),
});
