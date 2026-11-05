import { z } from 'zod';

const enteredCardSchema = z.object({ cardKey: z.string().min(1) }).nullable();

/** What comes back from the storage: for each mode, the card whose "card" step was entered, or none. */
export const revealStepStateSchema = z.object({
  steps: z.object({
    arena: enteredCardSchema,
    party: enteredCardSchema,
  }),
});
