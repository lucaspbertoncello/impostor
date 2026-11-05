import { PartyEyes } from '#/shared/components/player-avatar/party/components/party-eyes.component.tsx';
import { PartyShade } from '#/shared/components/player-avatar/party/components/party-shade.component.tsx';
import { PARTY_COLORS } from '#/shared/components/player-avatar/party/constants/party-palette.constant.ts';
import { outline } from '#/shared/components/player-avatar/party/utils/outline.util.ts';

const MANE = '#E39B00';
const BUMPS = Array.from({ length: 10 }, (_, step) => {
  const angle = (step * 36 * Math.PI) / 180;
  return { x: 48 + 27 * Math.cos(angle), y: 50 + 27 * Math.sin(angle) };
});

export function PartyLion() {
  const { yellow, ink, cream } = PARTY_COLORS;
  return (
    <g>
      <g fill={MANE}>
        {BUMPS.map((bump) => (
          <circle key={`${bump.x}-${bump.y}`} cx={bump.x} cy={bump.y} r="10" />
        ))}
        <circle cx="48" cy="50" r="27" />
      </g>
      <circle cx="31" cy="31" r="6.5" fill={yellow.base} {...outline(yellow.shade)} />
      <circle cx="65" cy="31" r="6.5" fill={yellow.base} {...outline(yellow.shade)} />
      <circle cx="48" cy="52" r="23" fill={yellow.base} {...outline(yellow.shade)} />
      <PartyShade cx={48} cy={52} rx={23} ry={23} color={yellow.shade} />
      <ellipse cx="48" cy="61" rx="11" ry="8" fill={cream} />
      <PartyEyes left={39} right={57} y={46} />
      <path d="M43 55 Q48 51 53 55 Q50 60 48 60 Q46 60 43 55Z" fill={ink} />
      <path
        d="M41 64 Q48 69 55 64"
        fill="none"
        stroke={ink}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </g>
  );
}
