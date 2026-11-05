/** What the player asked for while a round was in progress; it waits for the discard confirmation (BR-MAT-034). */
export type PendingAction =
  { kind: 'continue' } | { kind: 'add' } | { kind: 'edit'; playerId: string };
