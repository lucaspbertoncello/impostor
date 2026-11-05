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

// The front exists only while the card is held (FlipCard calls renderFront just then; BR-MAT-045).
// Both roles share size, shapes and the vertical layout: label on top, big text in the middle,
// a reserved strip at the bottom (the impostor's hint, empty on the crew card).
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
      className="relative mx-auto flex w-full max-w-[22.5rem] flex-col overflow-hidden rounded-card p-6 font-display [container-type:inline-size]"
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

      <p className="relative z-10 w-fit rounded-md bg-current/15 px-3 py-1 text-base font-semibold">
        <span>{label}</span>
      </p>

      <div className="relative z-10 flex flex-1 items-center justify-center text-center">
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

      <div className="relative z-10 flex min-h-24 flex-col items-center justify-end gap-1 text-center">
        {isImpostor && hint ? (
          <>
            <span className="rounded-md bg-current/15 px-2 py-0.5 text-sm font-semibold">Dica</span>
            <p className="text-xl font-semibold leading-tight [overflow-wrap:anywhere]">{hint}</p>
          </>
        ) : null}
      </div>
    </div>
  );
}
