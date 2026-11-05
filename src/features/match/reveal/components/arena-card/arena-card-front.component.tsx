import { ArenaCardFrame } from '#/features/match/reveal/components/arena-card/arena-card-frame.component.tsx';
import { ArenaCardRibbon } from '#/features/match/reveal/components/arena-card/arena-card-ribbon.component.tsx';
import { ArenaCardWord } from '#/features/match/reveal/components/arena-card/arena-card-word.component.tsx';
import type { CardFrontProps } from '#/features/match/reveal/types/card-front-props.type.ts';

const IMPOSTOR_TITLE = 'Você é o impostor';

// The front exists only while the card is held (FlipCard calls renderFront just then).
// Both roles share the frame, the window and the bottom plate, so the silhouette gives nothing away;
// only the text differs. The hint appears only on the impostor card, and only when it is given.
export function ArenaCardFront({ role, word, hint, accentColor }: CardFrontProps) {
  const isImpostor = role === 'impostor';
  const title = isImpostor ? IMPOSTOR_TITLE : (word ?? '');
  const footer = isImpostor ? (hint ?? 'Finja que sabe a palavra') : 'Não deixe ninguém ver';
  const showHintLabel = isImpostor && Boolean(hint);

  return (
    <ArenaCardFrame card="arena-front">
      <ArenaCardRibbon>{isImpostor ? 'Seu papel' : 'A palavra é'}</ArenaCardRibbon>
      <div className="arena-card__window">
        <ArenaCardWord text={title} />
      </div>
      <div
        className="arena-card__plate"
        style={accentColor ? { boxShadow: `inset 0 0 0 0.9cqw ${accentColor}` } : undefined}
      >
        {showHintLabel ? <span className="arena-card__plate-label">Dica</span> : null}
        <p
          className="arena-card__plate-text"
          style={{ fontSize: `${footer.length > 26 ? 4.6 : 5.4}cqw` }}
        >
          {footer}
        </p>
      </div>
    </ArenaCardFrame>
  );
}
