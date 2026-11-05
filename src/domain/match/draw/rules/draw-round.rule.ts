import { clampImpostorCount } from '#/domain/match/draw/rules/clamp-impostor-count.rule.ts';
import { drawCardOrder } from '#/domain/match/draw/rules/draw-card-order.rule.ts';
import { drawImpostors } from '#/domain/match/draw/rules/draw-impostors.rule.ts';
import { drawSpeakingOrder } from '#/domain/match/draw/rules/draw-speaking-order.rule.ts';
import type { RandomInt } from '#/domain/match/draw/types/random-int.type.ts';
import { secureRandomInt } from '#/domain/match/draw/utils/secure-random-int.util.ts';
import type { Round } from '#/domain/match/session/types/round.type.ts';
import type { StartRoundFailure } from '#/domain/match/session/types/start-round-result.type.ts';
import {
  MAX_PLAYERS,
  MIN_PLAYERS,
} from '#/domain/players/roster/constants/roster-limits.constant.ts';
import type { Player } from '#/domain/players/roster/types/player.type.ts';
import { getEligibleWords } from '#/domain/words/word-bank/rules/get-eligible-words.rule.ts';
import { pickWord } from '#/domain/words/word-bank/rules/pick-word.rule.ts';
import type { WordCategory } from '#/domain/words/word-bank/types/word-category.type.ts';

export type DrawRoundInput = {
  players: readonly Player[];
  impostorCount: number;
  hintEnabled: boolean;
  /** Every category of the mode. */
  categories: readonly WordCategory[];
  /** The categories the group chose (Festa); `null` for Arena, where the whole bank is the draw. */
  selectedCategoryIds: readonly string[] | null;
  usedWordIds: readonly string[];
  randomInt?: RandomInt;
};

export type DrawRoundResult =
  { ok: true; round: Round; usedWordIds: string[] } | { ok: false; reason: StartRoundFailure };

/**
 * The full draw of a round (RF-CFG-006): word (BR-MAT-005), impostors (BR-MAT-021), card order (BR-MAT-028)
 * and speaking order (BR-MAT-029). The round starts at the reveal, on the first card, not yet seen.
 */
export function drawRound({
  players,
  impostorCount,
  hintEnabled,
  categories,
  selectedCategoryIds,
  usedWordIds,
  randomInt = secureRandomInt,
}: DrawRoundInput): DrawRoundResult {
  if (players.length < MIN_PLAYERS || players.length > MAX_PLAYERS) {
    return { ok: false, reason: 'invalid-player-count' };
  }
  if (selectedCategoryIds !== null && selectedCategoryIds.length === 0) {
    return { ok: false, reason: 'no-categories' };
  }

  const eligibleWords = getEligibleWords(categories, selectedCategoryIds);
  const picked = pickWord(eligibleWords, usedWordIds, randomInt);
  if (picked === null) return { ok: false, reason: 'no-words' };

  const category = categories.find((candidate) => candidate.id === picked.word.categoryId);
  const playerIds = players.map((player) => player.id);

  return {
    ok: true,
    usedWordIds: picked.usedWordIds,
    round: {
      stage: 'reveal',
      players: players.map((player) => ({ ...player })),
      secret: {
        wordId: picked.word.id,
        word: picked.word.word,
        hint: picked.word.hint,
        categoryId: picked.word.categoryId,
        categoryName: category?.name ?? '',
        categoryColor: category?.color ?? null,
      },
      hintEnabled,
      impostorIds: drawImpostors(
        playerIds,
        clampImpostorCount(impostorCount, players.length),
        randomInt,
      ),
      cardOrder: drawCardOrder(playerIds, randomInt),
      speakingOrder: drawSpeakingOrder(playerIds, randomInt),
      currentCardIndex: 0,
      currentCardSeen: false,
    },
  };
}
