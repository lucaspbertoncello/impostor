import { PartyEyes } from '#/shared/components/player-avatar/party/components/party-eyes.component.tsx';
import { PartyShade } from '#/shared/components/player-avatar/party/components/party-shade.component.tsx';
import { PARTY_COLORS } from '#/shared/components/player-avatar/party/constants/party-palette.constant.ts';
import { outline } from '#/shared/components/player-avatar/party/utils/outline.util.ts';

export function PartyOwl() {
  const { indigo, yellow } = PARTY_COLORS;
  return (
    <g>
      <path d="M26 36 L22 12 L42 26Z" fill={indigo.base} {...outline(indigo.shade)} />
      <path d="M70 36 L74 12 L54 26Z" fill={indigo.base} {...outline(indigo.shade)} />
      <ellipse cx="48" cy="52" rx="27" ry="32" fill={indigo.base} {...outline(indigo.shade)} />
      <PartyShade cx={48} cy={52} rx={27} ry={32} color={indigo.shade} />
      <ellipse cx="48" cy="68" rx="15" ry="14" fill={indigo.light} />
      <path
        d="M41 66 Q44 70 47 66 M49 66 Q52 70 55 66 M45 74 Q48 78 51 74"
        fill="none"
        stroke={indigo.shade}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <ellipse cx="22" cy="58" rx="6" ry="15" transform="rotate(8 22 58)" fill={indigo.shade} />
      <ellipse cx="74" cy="58" rx="6" ry="15" transform="rotate(-8 74 58)" fill={indigo.shade} />
      <circle cx="36" cy="44" r="12" fill="#F4F2FF" {...outline(indigo.shade)} />
      <circle cx="60" cy="44" r="12" fill="#F4F2FF" {...outline(indigo.shade)} />
      <PartyEyes left={36} right={60} y={44} radius={7} />
      <path d="M42 53 L54 53 L48 62Z" fill={yellow.base} {...outline(yellow.shade)} />
      <ellipse cx="38" cy="85" rx="6" ry="3.5" fill={yellow.base} />
      <ellipse cx="58" cy="85" rx="6" ry="3.5" fill={yellow.base} />
    </g>
  );
}
