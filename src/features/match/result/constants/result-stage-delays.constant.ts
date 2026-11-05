/** Seconds each part of the result waits before it enters: first the word, then the impostors, then the hint (RF-RES-001). */
export const RESULT_STAGE_DELAYS = {
  word: 0.1,
  impostors: 0.9,
  hint: 1.5,
} as const;

export type ResultStage = keyof typeof RESULT_STAGE_DELAYS;
