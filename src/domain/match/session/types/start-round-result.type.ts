export type StartRoundFailure =
  /** Fewer than 3 or more than 20 players. */
  | 'invalid-player-count'
  /** Festa with no category marked (RF-CFG-005: "Escolha pelo menos uma categoria"). */
  | 'no-categories'
  /** The chosen categories have no word. */
  | 'no-words';

export type StartRoundResult = { ok: true } | { ok: false; reason: StartRoundFailure };
