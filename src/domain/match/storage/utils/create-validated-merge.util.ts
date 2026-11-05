import type { z } from 'zod';

/**
 * The `merge` of a persisted store: what comes back from the storage is only used when it passes the schema;
 * anything else (corrupt, old, edited by hand) leaves the initial state. Never logs the data.
 */
export function createValidatedMerge<State, Persisted extends Partial<State>>(
  schema: z.ZodType<Persisted>,
) {
  return (persisted: unknown, current: State): State => {
    const parsed = schema.safeParse(persisted);

    return parsed.success ? { ...current, ...parsed.data } : current;
  };
}
