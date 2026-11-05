import { PartyEyes } from '#/shared/components/player-avatar/party/components/party-eyes.component.tsx';
import { PartyShade } from '#/shared/components/player-avatar/party/components/party-shade.component.tsx';
import { PARTY_COLORS } from '#/shared/components/player-avatar/party/constants/party-palette.constant.ts';
import { outline } from '#/shared/components/player-avatar/party/utils/outline.util.ts';

export function PartyRabbit() {
  const { coral, ink, cream } = PARTY_COLORS;
  return (
    <g>
      <ellipse
        cx="35"
        cy="28"
        rx="9"
        ry="21"
        transform="rotate(-8 35 28)"
        fill={coral.base}
        {...outline(coral.shade)}
      />
      <ellipse
        cx="61"
        cy="28"
        rx="9"
        ry="21"
        transform="rotate(8 61 28)"
        fill={coral.base}
        {...outline(coral.shade)}
      />
      <ellipse cx="35" cy="29" rx="4" ry="14" transform="rotate(-8 35 29)" fill={coral.light} />
      <ellipse cx="61" cy="29" rx="4" ry="14" transform="rotate(8 61 29)" fill={coral.light} />
      <ellipse cx="48" cy="65" rx="29" ry="22" fill={coral.base} {...outline(coral.shade)} />
      <PartyShade cx={48} cy={65} rx={29} ry={22} color={coral.shade} />
      <PartyEyes left={37} right={59} y={62} />
      <ellipse cx="48" cy="69" rx="4" ry="3" fill={coral.shade} />
      <rect
        x="44"
        y="73"
        width="8"
        height="8"
        rx="2"
        fill={cream}
        {...outline(coral.shade)}
        strokeWidth="2.5"
      />
      <circle cx="29" cy="72" r="4" fill={coral.light} />
      <circle cx="67" cy="72" r="4" fill={coral.light} />
      <path d="M48 71 L48 74" stroke={ink} strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}
