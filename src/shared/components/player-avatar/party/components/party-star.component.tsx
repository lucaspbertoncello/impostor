import { PartyEyes } from '#/shared/components/player-avatar/party/components/party-eyes.component.tsx';
import { PARTY_COLORS } from '#/shared/components/player-avatar/party/constants/party-palette.constant.ts';
import { starPoints } from '#/shared/components/player-avatar/party/utils/star-points.util.ts';

export function PartyStar() {
  const { yellow, coral, ink } = PARTY_COLORS;
  const points = starPoints(48, 52, 38, 19);
  return (
    <g>
      <polygon
        points={points}
        fill={yellow.shade}
        stroke={yellow.shade}
        strokeWidth="13"
        strokeLinejoin="round"
      />
      <polygon
        points={points}
        fill={yellow.base}
        stroke={yellow.base}
        strokeWidth="8"
        strokeLinejoin="round"
      />
      <PartyEyes left={39} right={57} y={50} />
      <circle cx="33" cy="60" r="4.5" fill={coral.base} />
      <circle cx="63" cy="60" r="4.5" fill={coral.base} />
      <path
        d="M42 60 Q48 67 54 60"
        fill="none"
        stroke={ink}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </g>
  );
}
