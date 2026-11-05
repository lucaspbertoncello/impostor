import { useReducedMotion } from 'motion/react';

import {
  RESULT_STAGE_DELAYS,
  type ResultStage,
} from '#/features/match/result/constants/result-stage-delays.constant.ts';

/** Staged entrance of the result; with reduced motion everything is simply there from the start. */
export function useResultMotion() {
  const reduced = useReducedMotion() === true;

  return {
    reduced,
    delayOf: (stage: ResultStage) => (reduced ? 0 : RESULT_STAGE_DELAYS[stage]),
  };
}
