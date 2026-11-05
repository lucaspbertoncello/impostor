import { PartyEyes } from '#/shared/components/player-avatar/party/components/party-eyes.component.tsx';
import { PartyShade } from '#/shared/components/player-avatar/party/components/party-shade.component.tsx';
import { PARTY_COLORS } from '#/shared/components/player-avatar/party/constants/party-palette.constant.ts';
import { outline } from '#/shared/components/player-avatar/party/utils/outline.util.ts';

export function PartyCat() {
  const { indigo, coral } = PARTY_COLORS;
  const whisker = { stroke: indigo.light, strokeWidth: 3, strokeLinecap: 'round' as const };
  return (
    <g>
      <path d="M20 46 L22 16 L44 32Z" fill={indigo.base} {...outline(indigo.shade)} />
      <path d="M76 46 L74 16 L52 32Z" fill={indigo.base} {...outline(indigo.shade)} />
      <path d="M26 38 L26 25 L37 32Z" fill={coral.base} />
      <path d="M70 38 L70 25 L59 32Z" fill={coral.base} />
      <ellipse cx="48" cy="55" rx="31" ry="27" fill={indigo.base} {...outline(indigo.shade)} />
      <PartyShade cx={48} cy={55} rx={31} ry={27} color={indigo.shade} />
      <PartyEyes left={36} right={60} y={52} />
      <path
        d="M44 60 L52 60 L48 65Z"
        fill={coral.base}
        stroke={coral.base}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M48 65 Q44 70 40 67 M48 65 Q52 70 56 67"
        fill="none"
        stroke={indigo.shade}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path d="M12 60 L27 62 M12 70 L27 67" fill="none" {...whisker} />
      <path d="M84 60 L69 62 M84 70 L69 67" fill="none" {...whisker} />
    </g>
  );
}
