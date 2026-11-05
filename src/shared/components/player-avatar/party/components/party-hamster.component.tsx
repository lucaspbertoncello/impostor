import { PartyEyes } from '#/shared/components/player-avatar/party/components/party-eyes.component.tsx';
import { PartyShade } from '#/shared/components/player-avatar/party/components/party-shade.component.tsx';
import { PARTY_COLORS } from '#/shared/components/player-avatar/party/constants/party-palette.constant.ts';
import { outline } from '#/shared/components/player-avatar/party/utils/outline.util.ts';

export function PartyHamster() {
  const { coral, ink, cream } = PARTY_COLORS;
  return (
    <g>
      <circle cx="27" cy="29" r="10" fill={coral.base} {...outline(coral.shade)} />
      <circle cx="69" cy="29" r="10" fill={coral.base} {...outline(coral.shade)} />
      <circle cx="27" cy="30" r="5" fill={coral.light} />
      <circle cx="69" cy="30" r="5" fill={coral.light} />
      <ellipse cx="48" cy="55" rx="33" ry="28" fill={coral.base} {...outline(coral.shade)} />
      <PartyShade cx={48} cy={55} rx={33} ry={28} color={coral.shade} />
      <ellipse cx="48" cy="66" rx="19" ry="14" fill={cream} />
      <circle cx="24" cy="61" r="8" fill={coral.light} />
      <circle cx="72" cy="61" r="8" fill={coral.light} />
      <PartyEyes left={37} right={59} y={46} />
      <ellipse cx="48" cy="57" rx="4" ry="3" fill={ink} />
      <rect
        x="44.5"
        y="60"
        width="7"
        height="7"
        rx="2"
        fill="#FFFFFF"
        {...outline(coral.shade)}
        strokeWidth="2"
      />
    </g>
  );
}
