import type { FlipStyle } from '#/shared/components/flip-card/flip-style.type.ts';

type Timing = { duration: number; ease: [number, number, number, number] };

// Timings do not depend on the role or the word (RF-REV-002): the flip always looks the same.
// Going back is faster than going forward so that hiding feels immediate (research, section 6).
export const FLIP_TRANSITIONS: Record<FlipStyle, { forward: Timing; back: Timing }> = {
  arena: {
    forward: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
    back: { duration: 0.22, ease: [0.4, 0, 1, 1] },
  },
  party: {
    forward: { duration: 0.44, ease: [0.34, 1.35, 0.64, 1] },
    back: { duration: 0.26, ease: [0.4, 0, 1, 1] },
  },
};

export const MAX_TILT_DEGREES = 4;
export const HELD_SCALE = 1.02;
