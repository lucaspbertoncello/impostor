import { ArenaCardFrame } from '#/features/match/reveal/components/arena-card/arena-card-frame.component.tsx';
import { ArenaCardRibbon } from '#/features/match/reveal/components/arena-card/arena-card-ribbon.component.tsx';

// The back is the same for every player and says nothing about the role (BR-MAT-045).
export function ArenaCardBack() {
  return (
    <ArenaCardFrame card="arena-back">
      <ArenaCardRibbon>Carta secreta</ArenaCardRibbon>
      <div className="arena-card__window">
        <div className="arena-card__rays" aria-hidden="true" />
        <div className="arena-card__medallion" aria-hidden="true">
          <div className="arena-card__medallion-inner">
            <span className="arena-card__mark">?</span>
          </div>
        </div>
      </div>
      <div className="arena-card__plate" data-back-visual>
        <div className="arena-card__press">
          <svg className="arena-card__press-icon" viewBox="0 0 48 48" aria-hidden="true">
            <circle
              className="arena-card__ripple"
              cx="24"
              cy="24"
              r="21"
              fill="none"
              stroke="#ffd22e"
              strokeWidth="3"
            />
            <circle cx="24" cy="24" r="12" fill="#ffd22e" stroke="#0a1a47" strokeWidth="3" />
            <circle cx="21" cy="20.5" r="3.4" fill="#fff4b0" />
          </svg>
          <span>Segure para virar</span>
        </div>
      </div>
    </ArenaCardFrame>
  );
}
