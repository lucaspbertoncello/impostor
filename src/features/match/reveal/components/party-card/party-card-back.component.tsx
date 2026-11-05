import { motion, useReducedMotion } from 'motion/react';

import {
  PARTY_CARD_ASPECT,
  PARTY_CARD_COLORS,
  PARTY_CARD_EDGE_SHADOW,
} from '#/features/match/reveal/components/party-card/party-card-palette.constant.ts';

const RING_DELAYS = [0, 0.7, 1.4];

// The back is the same for every player and says nothing about the role (BR-MAT-045): no word,
// no category color, no hint of who is the impostor. The pulsing rings around the hollow circle
// are the "hold here" instruction; with reduced motion they stay still.
export function PartyCardBack() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="relative mx-auto w-full max-w-[22.5rem] overflow-hidden rounded-card font-display [container-type:inline-size]"
      style={{
        aspectRatio: PARTY_CARD_ASPECT,
        backgroundColor: PARTY_CARD_COLORS.indigo,
        boxShadow: PARTY_CARD_EDGE_SHADOW,
      }}
      data-card="party-back"
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full"
        viewBox="0 0 100 140"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle cx="-4" cy="14" r="30" fill={PARTY_CARD_COLORS.indigoLight} />
        <circle cx="104" cy="112" r="34" fill={PARTY_CARD_COLORS.indigoLight} />
        <circle cx="86" cy="22" r="4.5" fill={PARTY_CARD_COLORS.sun} />
        <rect
          x="9"
          y="96"
          width="9"
          height="9"
          rx="2"
          transform="rotate(45 13.5 100.5)"
          fill={PARTY_CARD_COLORS.cream}
        />
        <g transform="rotate(-8 50 62)">
          <rect
            x="22"
            y="34"
            width="56"
            height="56"
            rx="13"
            fill={PARTY_CARD_COLORS.edge}
            transform="translate(0 3)"
          />
          <rect x="22" y="34" width="56" height="56" rx="13" fill={PARTY_CARD_COLORS.coral} />
        </g>
        <circle cx="50" cy="62" r="17" fill={PARTY_CARD_COLORS.ink} />
        <circle cx="50" cy="62" r="7" fill={PARTY_CARD_COLORS.sun} />
      </svg>

      {(reduceMotion ? RING_DELAYS.slice(0, 1) : RING_DELAYS).map((delay) => (
        <motion.span
          key={delay}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[44.3%] aspect-square w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full border-4"
          style={{ borderColor: PARTY_CARD_COLORS.sun }}
          initial={{ scale: 1, opacity: reduceMotion ? 0.35 : 0 }}
          animate={reduceMotion ? undefined : { scale: [1, 1.7], opacity: [0.8, 0] }}
          transition={{ duration: 2.1, delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}

      <div
        className="absolute inset-x-6 bottom-6 flex min-h-14 items-center justify-center rounded-md px-4 py-2 text-center font-bold leading-tight"
        style={{
          backgroundColor: PARTY_CARD_COLORS.sun,
          color: PARTY_CARD_COLORS.ink,
          fontSize: 'clamp(15px, 6.4cqw, 22px)',
        }}
      >
        Segure para virar
      </div>
    </div>
  );
}
