import { PartyEyes } from '#/shared/components/player-avatar/party/components/party-eyes.component.tsx';
import { PARTY_COLORS } from '#/shared/components/player-avatar/party/constants/party-palette.constant.ts';
import { outline } from '#/shared/components/player-avatar/party/utils/outline.util.ts';

export function PartySeal() {
  const { white, indigo, ink, mist } = PARTY_COLORS;
  return (
    <g>
      <ellipse
        cx="15"
        cy="76"
        rx="9"
        ry="5"
        transform="rotate(-22 15 76)"
        fill={mist}
        {...outline(white.shade)}
      />
      <ellipse
        cx="81"
        cy="76"
        rx="9"
        ry="5"
        transform="rotate(22 81 76)"
        fill={mist}
        {...outline(white.shade)}
      />
      <path
        d="M18 84 C21 70 24 60 24 46 C24 26 34 13 48 13 C62 13 72 26 72 46 C72 60 75 70 78 84 Z"
        fill={white.base}
        {...outline(white.shade)}
      />
      <PartyEyes left={37} right={59} y={37} />
      <ellipse cx="48" cy="54" rx="15" ry="11" fill={mist} />
      <ellipse cx="48" cy="49" rx="7" ry="5" fill={ink} />
      <path
        d="M48 54 L48 58 M42 59 Q48 63 54 59"
        fill="none"
        stroke={ink}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M33 53 L21 50 M33 59 L21 62 M63 53 L75 50 M63 59 L75 62"
        fill="none"
        stroke={indigo.shade}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </g>
  );
}
