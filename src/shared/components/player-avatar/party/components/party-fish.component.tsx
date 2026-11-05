import { PartyEyes } from '#/shared/components/player-avatar/party/components/party-eyes.component.tsx';
import { PartyShade } from '#/shared/components/player-avatar/party/components/party-shade.component.tsx';
import { PARTY_COLORS } from '#/shared/components/player-avatar/party/constants/party-palette.constant.ts';
import { outline } from '#/shared/components/player-avatar/party/utils/outline.util.ts';

export function PartyFish() {
  const { yellow, coral, ink } = PARTY_COLORS;
  return (
    <g>
      <path d="M66 48 L85 30 Q80 48 85 66 Z" fill={yellow.base} {...outline(yellow.shade)} />
      <path d="M32 28 Q42 12 56 28Z" fill={coral.base} {...outline(coral.shade)} />
      <path d="M40 68 Q48 82 58 68Z" fill={coral.base} {...outline(coral.shade)} />
      <ellipse cx="42" cy="48" rx="30" ry="22" fill={yellow.base} {...outline(yellow.shade)} />
      <PartyShade cx={42} cy={48} rx={30} ry={22} color={yellow.shade} />
      <path
        d="M44 28 Q38 48 44 68"
        fill="none"
        stroke={coral.base}
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <path
        d="M58 31 Q63 48 58 65"
        fill="none"
        stroke={coral.base}
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <PartyEyes left={27} y={42} radius={6} />
      <path
        d="M15 52 Q20 57 26 53"
        fill="none"
        stroke={ink}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </g>
  );
}
