import { PartyEyes } from '#/shared/components/player-avatar/party/components/party-eyes.component.tsx';
import { PARTY_COLORS } from '#/shared/components/player-avatar/party/constants/party-palette.constant.ts';
import { outline } from '#/shared/components/player-avatar/party/utils/outline.util.ts';

export function PartyWolf() {
  const { indigo, ink, mist } = PARTY_COLORS;
  return (
    <g>
      <path
        d="M48 86 L30 70 L14 64 L22 54 L14 44 L16 12 L36 28 Q48 24 60 28 L80 12 L82 44 L74 54 L82 64 L66 70 Z"
        fill={indigo.base}
        {...outline(indigo.shade)}
      />
      <path d="M21 22 L22 36 L30 31Z" fill={indigo.shade} />
      <path d="M75 22 L74 36 L66 31Z" fill={indigo.shade} />
      <path d="M48 86 L34 72 Q48 60 62 72Z" fill={mist} />
      <PartyEyes left={37} right={59} y={46} />
      <path
        d="M30 38 L43 42 M66 38 L53 42"
        fill="none"
        stroke={ink}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <ellipse cx="48" cy="79" rx="5.5" ry="3.8" fill={ink} />
    </g>
  );
}
