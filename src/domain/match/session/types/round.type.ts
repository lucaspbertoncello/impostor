import type { Player } from '#/domain/players/roster/types/player.type.ts';

export type RoundStage = 'reveal' | 'round' | 'result';

/** The secret of the round. Only `getCardSecret` (one card at a time) and the result hook read it. */
export type RoundSecret = {
  wordId: string;
  word: string;
  hint: string;
  categoryId: string;
  categoryName: string;
  categoryColor: string | null;
};

/** A round in progress in one mode (BR-MAT-030). The players are a snapshot taken when it started. */
export type Round = {
  stage: RoundStage;
  players: Player[];
  secret: RoundSecret;
  hintEnabled: boolean;
  impostorIds: string[];
  /** Player ids in the order they receive the phone (BR-MAT-028). */
  cardOrder: string[];
  /** Player ids in the order they speak; the first starts (BR-MAT-029). */
  speakingOrder: string[];
  /** Position in `cardOrder` of the card of the turn. */
  currentCardIndex: number;
  /** Whether the card of the turn was already turned at least once (BR-MAT-047). */
  currentCardSeen: boolean;
};
