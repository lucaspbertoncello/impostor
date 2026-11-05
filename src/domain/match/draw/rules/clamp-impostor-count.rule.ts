import { getMaxImpostors } from '#/domain/match/draw/rules/get-max-impostors.rule.ts';

/** BR-MAT-020: a saved value above the new maximum is reduced to it; never below 1. */
export function clampImpostorCount(savedCount: number, playerCount: number): number {
  const wanted = Number.isInteger(savedCount) ? savedCount : 1;

  return Math.min(Math.max(1, wanted), getMaxImpostors(playerCount));
}
