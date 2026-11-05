import { motion, useReducedMotion } from 'motion/react';

import type { CardFrontProps } from '#/features/match/reveal/types/card-front-props.type.ts';
import { fitPartyCardWord } from '#/features/match/reveal/components/party-card/fit-party-card-word.util.ts';
import {
  PARTY_CARD_ASPECT,
  PARTY_CARD_COLORS,
  PARTY_CARD_EDGE_SHADOW,
} from '#/features/match/reveal/components/party-card/party-card-palette.constant.ts';
import { PartyCardShapes } from '#/features/match/reveal/components/party-card/party-card-shapes.component.tsx';

const IMPOSTOR_HEADLINE_CQW = 15;

// One look for both roles (BR-MAT-045): the same background and shapes, so someone looking from
// afar cannot tell crew from impostor. Only the text differs.
const FRONT_LOOK = { background: PARTY_CARD_COLORS.coral, text: PARTY_CARD_COLORS.ink };

// Solid ink pill with cream text: readable over any shape behind it (the yellow circle included).
const LABEL_STYLE = { backgroundColor: PARTY_CARD_COLORS.ink, color: PARTY_CARD_COLORS.cream };

// The front exists only while the card is held (FlipCard calls renderFront just then; BR-MAT-045).
// Both roles share size, shapes and layout: label on top, the big text centered on the whole card,
// and a strip at the base for the impostor's hint (empty on the crew card).
// `accentColor` is in the contract but ignored on purpose: a color per category would reveal the
// role from afar (crew colored, impostor not), so both faces use the same color.
export function PartyCardFront({ role, word, hint }: CardFrontProps) {
  const reduceMotion = useReducedMotion();
  const isImpostor = role === 'impostor';
  const label = isImpostor ? 'Seu papel' : 'Sua palavra';
  const crewWord = word ?? '';

  const pop = reduceMotion
    ? { initial: false as const }
    : {
        initial: { opacity: 0, scale: 0.88, y: 16 },
        animate: { opacity: 1, scale: 1, y: 0 },
        transition: { type: 'spring' as const, stiffness: 520, damping: 26, delay: 0.05 },
      };

  return (
    <div
      className="relative mx-auto w-full max-w-[22.5rem] overflow-hidden rounded-card font-display [container-type:inline-size]"
      style={{
        aspectRatio: PARTY_CARD_ASPECT,
        backgroundColor: FRONT_LOOK.background,
        color: FRONT_LOOK.text,
        boxShadow: PARTY_CARD_EDGE_SHADOW,
      }}
      data-card="party-front"
    >
      <PartyCardShapes
        circle={{ fill: PARTY_CARD_COLORS.sun, opacity: 1 }}
        square={{ fill: PARTY_CARD_COLORS.cream, opacity: 1 }}
        diamond={{ fill: PARTY_CARD_COLORS.sun, opacity: 1 }}
      />

      <p
        className="absolute left-6 top-6 z-10 rounded-md px-3 py-1 text-base font-semibold"
        style={LABEL_STYLE}
      >
        <span>{label}</span>
      </p>

      {/* The text block is centered on the whole card, not on the space left by label and hint. */}
      <div className="absolute inset-x-6 top-1/2 z-10 flex -translate-y-1/2 justify-center text-center">
        {isImpostor ? (
          <motion.p
            className="font-bold leading-[1.05]"
            style={{ fontSize: `${IMPOSTOR_HEADLINE_CQW}cqw` }}
            {...pop}
          >
            <span className="block">Você é</span>
            <span className="block">o impostor</span>
          </motion.p>
        ) : (
          <motion.p
            className="font-bold leading-[1.05] [overflow-wrap:anywhere]"
            style={{ fontSize: `${fitPartyCardWord(crewWord)}cqw` }}
            {...pop}
          >
            {crewWord}
          </motion.p>
        )}
      </div>

      <div className="absolute inset-x-[14cqw] bottom-6 z-10 flex flex-col items-center justify-end gap-2 text-center">
        {isImpostor && hint ? (
          <>
            <span className="rounded-md px-3 py-0.5 text-base font-semibold" style={LABEL_STYLE}>
              Dica
            </span>
            <p
              className="font-semibold leading-tight [overflow-wrap:anywhere]"
              style={{ fontSize: 'max(17px, 6cqw)' }}
            >
              {hint}
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
}
