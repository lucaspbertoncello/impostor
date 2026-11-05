import { PartyEyes } from '#/shared/components/player-avatar/party/components/party-eyes.component.tsx';
import { PARTY_COLORS } from '#/shared/components/player-avatar/party/constants/party-palette.constant.ts';
import { outline } from '#/shared/components/player-avatar/party/utils/outline.util.ts';

export function PartyPenguin() {
  const { indigo, yellow, ink } = PARTY_COLORS;
  const body = indigo.shade;
  return (
    <g>
      <ellipse cx="38" cy="83" rx="9" ry="4.5" fill={yellow.base} {...outline(yellow.shade)} />
      <ellipse cx="58" cy="83" rx="9" ry="4.5" fill={yellow.base} {...outline(yellow.shade)} />
      <ellipse
        cx="20"
        cy="56"
        rx="6.5"
        ry="15"
        transform="rotate(14 20 56)"
        fill={body}
        {...outline(ink)}
      />
      <ellipse
        cx="76"
        cy="56"
        rx="6.5"
        ry="15"
        transform="rotate(-14 76 56)"
        fill={body}
        {...outline(ink)}
      />
      <ellipse cx="48" cy="50" rx="27" ry="33" fill={body} {...outline(ink)} />
      <ellipse cx="48" cy="60" rx="19" ry="25" fill="#F4F2FF" />
      <PartyEyes left={39} right={57} y={36} />
      <path d="M42 43 L54 43 L48 52Z" fill={yellow.base} {...outline(yellow.shade)} />
    </g>
  );
}
