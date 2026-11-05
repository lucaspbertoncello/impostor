import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';
import type { PointerEvent, ReactNode } from 'react';

import {
  FLIP_TRANSITIONS,
  HELD_SCALE,
  MAX_TILT_DEGREES,
} from '#/shared/components/flip-card/flip-card-timings.constant.ts';
import type { FlipStyle } from '#/shared/components/flip-card/flip-style.type.ts';
import { useHoldCard } from '#/shared/components/flip-card/use-hold-card.hook.ts';

type FlipCardProps = {
  back: ReactNode;
  /** Called only while the card is held (BR-MAT-045/046): nothing secret exists otherwise. */
  renderFront: () => ReactNode;
  onFirstReveal?: () => void;
  /** Neutral name of the card (never the word or the role). */
  label: string;
  /** How the card turns: Arena is a firm flip, Party overshoots a little. */
  flipStyle?: FlipStyle;
  className?: string;
};

const FACE_STYLE = {
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
} as const;

const PROTECTION_STYLE = {
  touchAction: 'none',
  userSelect: 'none',
  WebkitUserSelect: 'none',
  WebkitTouchCallout: 'none',
  WebkitTapHighlightColor: 'transparent',
} as const;

function preventDefault(event: { preventDefault: () => void }) {
  event.preventDefault();
}

export function FlipCard({
  back,
  renderFront,
  onFirstReveal,
  label,
  flipStyle = 'arena',
  className,
}: FlipCardProps) {
  const { held, handlers } = useHoldCard({ onFirstReveal });
  const reducedMotion = useReducedMotion() ?? false;
  const timings = FLIP_TRANSITIONS[flipStyle];

  // Tilt and glare follow the finger through motion values: no React render per move.
  const tiltX = useSpring(0, { stiffness: 300, damping: 30 });
  const tiltY = useSpring(0, { stiffness: 300, damping: 30 });
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(30);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.28), transparent 60%)`;

  function onPointerMove(event: PointerEvent<HTMLElement>) {
    if (!held || reducedMotion) return;
    const box = event.currentTarget.getBoundingClientRect();
    if (box.width === 0 || box.height === 0) return;
    const x = (event.clientX - box.left) / box.width;
    const y = (event.clientY - box.top) / box.height;
    tiltY.set((x - 0.5) * 2 * MAX_TILT_DEGREES);
    tiltX.set((0.5 - y) * 2 * MAX_TILT_DEGREES);
    glareX.set(x * 100);
    glareY.set(y * 100);
  }

  function resetTilt() {
    tiltX.set(0);
    tiltY.set(0);
  }

  const transition = reducedMotion ? { duration: 0 } : held ? timings.forward : timings.back;

  return (
    <div
      className={`relative ${className ?? ''}`}
      style={{ perspective: 1000, ...PROTECTION_STYLE }}
      onContextMenu={preventDefault}
      onDragStart={preventDefault}
    >
      {/* Transparent control on top: it owns pointer, keyboard and focus. The faces are visual. */}
      <div
        role="button"
        tabIndex={0}
        aria-label={label}
        className="peer absolute inset-0 z-10 cursor-pointer rounded-[inherit] bg-transparent opacity-0"
        style={PROTECTION_STYLE}
        draggable={false}
        {...handlers}
        onPointerMove={onPointerMove}
        onPointerUp={(event) => {
          handlers.onPointerUp(event);
          resetTilt();
        }}
        onPointerCancel={(event) => {
          handlers.onPointerCancel(event);
          resetTilt();
        }}
        onContextMenu={preventDefault}
        onDragStart={preventDefault}
      />
      <motion.div
        className="rounded-[inherit] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-current"
        style={{
          rotateX: reducedMotion ? 0 : tiltX,
          rotateY: reducedMotion ? 0 : tiltY,
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d',
        }}
      >
        <motion.div
          className="relative"
          initial={false}
          animate={{ rotateY: held ? 180 : 0, scale: held && !reducedMotion ? HELD_SCALE : 1 }}
          transition={transition}
          style={{ transformStyle: 'preserve-3d', WebkitTransformStyle: 'preserve-3d' }}
        >
          <div aria-hidden="true" style={FACE_STYLE}>
            {back}
          </div>
          {/*
            Front face. The live region is always mounted (readers only announce changes to a
            region that already exists); its content exists only while held. On release it is
            emptied at once, so the turn back animates an empty face (BR-MAT-045).
          */}
          <div
            className="absolute inset-0"
            style={{ ...FACE_STYLE, transform: 'rotateY(180deg)' }}
            aria-live="polite"
            aria-atomic="true"
          >
            {held ? renderFront() : null}
            {held ? (
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[inherit]"
                style={{ backgroundImage: glare }}
              />
            ) : null}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
