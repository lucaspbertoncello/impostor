import { useId } from 'react';

import {
  ARENA_BANNER_PATH,
  ARENA_WORD_LETTERS,
} from '#/shared/components/logo/arena/arena-logo-paths.constant.ts';

type ArenaLogoProps = {
  className?: string;
  title?: string;
};

const OUTLINE = '#0A1A47';
const SHADOW = '#040C24';
const RIM = '#FFF3C4';
const FALLEN_RIM = '#FFD9E0';

// Drawing copied from design/assets/logo/arena.svg; the text is outlines, no font needed.
export function ArenaLogo({ className, title = 'Impostor' }: ArenaLogoProps) {
  const id = useId();
  const gold = `${id}-gold`;
  const pink = `${id}-pink`;
  const ribbon = `${id}-ribbon`;

  return (
    <svg
      viewBox="0 0 640 290"
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <defs>
        <linearGradient id={gold} gradientUnits="userSpaceOnUse" x1="0" y1="63.2" x2="0" y2="150">
          <stop offset="0" stopColor="#FFF4B0" />
          <stop offset=".48" stopColor="#FFD22E" />
          <stop offset=".5" stopColor="#F7A81B" />
          <stop offset="1" stopColor="#E0720C" />
        </linearGradient>
        <linearGradient id={pink} gradientUnits="userSpaceOnUse" x1="0" y1="63.2" x2="0" y2="150">
          <stop offset="0" stopColor="#FF9FB0" />
          <stop offset=".48" stopColor="#FF4469" />
          <stop offset=".5" stopColor="#E02453" />
          <stop offset="1" stopColor="#A5123F" />
        </linearGradient>
        <linearGradient id={ribbon} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4E9BFF" />
          <stop offset=".5" stopColor="#2F6FEA" />
          <stop offset=".5" stopColor="#2358CC" />
          <stop offset="1" stopColor="#173F9E" />
        </linearGradient>
      </defs>
      {ARENA_WORD_LETTERS.map(({ d, fallen }) => (
        <g key={d} transform={fallen ? 'translate(0 14) rotate(-11 369.6 106.6)' : undefined}>
          <path
            d={d}
            transform="translate(0 7)"
            fill={SHADOW}
            stroke={SHADOW}
            strokeWidth="27"
            strokeLinejoin="round"
          />
          <path d={d} fill={OUTLINE} stroke={OUTLINE} strokeWidth="27" strokeLinejoin="round" />
          <path
            d={d}
            fill={fallen ? FALLEN_RIM : RIM}
            stroke={fallen ? FALLEN_RIM : RIM}
            strokeWidth="7"
            strokeLinejoin="round"
          />
          <path d={d} fill={`url(#${fallen ? pink : gold})`} />
        </g>
      ))}
      <g strokeLinejoin="round">
        <path d="M145 202H225V264H145L168 233Z" fill="#14399A" stroke={SHADOW} strokeWidth="8" />
        <path d="M495 202H415V264H495L472 233Z" fill="#14399A" stroke={SHADOW} strokeWidth="8" />
        <rect
          x="195"
          y="190"
          width="250"
          height="60"
          rx="6"
          fill={`url(#${ribbon})`}
          stroke={SHADOW}
          strokeWidth="8"
        />
      </g>
      <path
        d={ARENA_BANNER_PATH}
        fill={SHADOW}
        stroke={SHADOW}
        strokeWidth="9"
        strokeLinejoin="round"
      />
      <path d={ARENA_BANNER_PATH} fill="#FFFFFF" />
    </svg>
  );
}
