export type PlayerSheetState =
  { kind: 'closed' } | { kind: 'add' } | { kind: 'edit'; playerId: string };
