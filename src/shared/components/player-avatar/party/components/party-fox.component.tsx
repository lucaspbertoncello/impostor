import { PartyEyes } from '#/shared/components/player-avatar/party/components/party-eyes.component.tsx';
import { PARTY_COLORS } from '#/shared/components/player-avatar/party/constants/party-palette.constant.ts';
import { outline } from '#/shared/components/player-avatar/party/utils/outline.util.ts';

export function PartyFox() {
  const { coral, ink, cream } = PARTY_COLORS;
  return (
    <g>
      <path
        d="M48 82 L14 54 L16 20 L36 34 Q48 30 60 34 L80 20 L82 54 Z"
        fill={coral.base}
        {...outline(coral.shade)}
      />
      <path d="M21 27 L22 42 L32 36Z" fill={coral.shade} />
      <path d="M75 27 L74 42 L64 36Z" fill={coral.shade} />
      <path d="M48 82 L22 58 Q36 54 48 62 Q60 54 74 58 Z" fill={cream} />
      <PartyEyes left={36} right={60} y={46} />
      <ellipse cx="48" cy="77" rx="5.5" ry="4" fill={ink} />
    </g>
  );
}
