import type { CardFrontProps } from '#/features/match/reveal/types/card-front-props.type.ts';

// Stub: the front exists only while the card is held (FlipCard calls renderFront just then).
export function PartyCardFront({ role, word, hint, accentColor }: CardFrontProps) {
  return (
    <div
      className="flex aspect-[3/4] w-full flex-col items-center justify-center gap-2 rounded-card bg-surface text-text shadow-card"
      style={accentColor ? { borderColor: accentColor, borderWidth: 4 } : undefined}
      data-card="party-front"
    >
      {role === 'impostor' ? (
        <p className="font-display text-2xl">Você é o impostor</p>
      ) : (
        <>
          <p className="font-display text-2xl">{word}</p>
          {hint ? <p className="text-text-muted">{hint}</p> : null}
        </>
      )}
    </div>
  );
}
