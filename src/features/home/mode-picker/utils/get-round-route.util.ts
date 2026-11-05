import type { RoundStage } from '#/domain/match/session/types/round.type.ts';

export type RoundRoute = '/$mode/reveal' | '/$mode/round' | '/$mode/result';

/** The route of the saved stage of a round (RF-INI-004). It never carries a word, role or card index. */
export function getRoundRoute(stage: RoundStage): RoundRoute {
  if (stage === 'reveal') return '/$mode/reveal';
  if (stage === 'round') return '/$mode/round';
  return '/$mode/result';
}
