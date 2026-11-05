import type { ReactNode } from 'react';

import '#/features/match/reveal/components/arena-card/styles/arena-card.css';

type ArenaCardFrameProps = {
  children: ReactNode;
  card: 'arena-back' | 'arena-front';
};

// Layered frame shared by both faces, so back and front have the same size and silhouette:
// ink slab, gold ring, thin ink line, blue field, four corner gems.
export function ArenaCardFrame({ children, card }: ArenaCardFrameProps) {
  return (
    <div className="arena-card" data-card={card}>
      <div className="arena-card__gold">
        <div className="arena-card__ink">
          <div className="arena-card__field">{children}</div>
        </div>
      </div>
      <span className="arena-card__gem" data-corner="tl" aria-hidden="true" />
      <span className="arena-card__gem" data-corner="tr" aria-hidden="true" />
      <span className="arena-card__gem" data-corner="bl" aria-hidden="true" />
      <span className="arena-card__gem" data-corner="br" aria-hidden="true" />
    </div>
  );
}
