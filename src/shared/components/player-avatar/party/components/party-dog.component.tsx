import { PartyEyes } from '#/shared/components/player-avatar/party/components/party-eyes.component.tsx';
import { PartyShade } from '#/shared/components/player-avatar/party/components/party-shade.component.tsx';
import { PARTY_COLORS } from '#/shared/components/player-avatar/party/constants/party-palette.constant.ts';
import { outline } from '#/shared/components/player-avatar/party/utils/outline.util.ts';

export function PartyDog() {
  const { coral, ink, cream } = PARTY_COLORS;
  return (
    <g>
      <ellipse cx="22" cy="52" rx="10" ry="21" transform="rotate(12 22 52)" fill={coral.shade} />
      <ellipse cx="74" cy="52" rx="10" ry="21" transform="rotate(-12 74 52)" fill={coral.shade} />
      <circle cx="48" cy="50" r="27" fill={coral.base} {...outline(coral.shade)} />
      <PartyShade cx={48} cy={50} rx={27} ry={27} color={coral.shade} />
      <circle cx="59" cy="42" r="9" fill={coral.shade} />
      <ellipse cx="48" cy="61" rx="14" ry="11" fill={cream} />
      <path
        d="M43 66 Q43 77 48 77 Q53 77 53 66Z"
        fill={coral.light}
        {...outline(coral.shade)}
        strokeWidth="2.5"
      />
      <PartyEyes left={37} right={59} y={42} />
      <ellipse cx="48" cy="56" rx="6.5" ry="4.5" fill={ink} />
      <path
        d="M40 65 Q48 70 56 65"
        fill="none"
        stroke={ink}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </g>
  );
}
