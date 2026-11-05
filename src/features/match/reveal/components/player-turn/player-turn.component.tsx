import { PlayerAvatar } from '#/shared/components/player-avatar/player-avatar.component.tsx';
import type { PlayerIconIndex } from '#/shared/types/player-icon-index.type.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

type PlayerTurnProps = {
  theme: ThemeName;
  player: { name: string; iconIndex: PlayerIconIndex };
  cardNumber: number;
  cardCount: number;
};

/**
 * Who holds the phone now and how far along the round is (BR-MAT-047, RF-REV-001). It knows nothing about
 * the round: no word, no role, no hint.
 */
export function PlayerTurn({ theme, player, cardNumber, cardCount }: PlayerTurnProps) {
  const progress = Math.round((cardNumber / cardCount) * 100);

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex min-w-0 items-center justify-center gap-4">
        <span
          aria-hidden="true"
          className="grid size-[clamp(40px,8dvh,72px)] shrink-0 place-items-center border-solid border-border bg-surface shadow-panel [border-width:var(--theme-outline-width)] arena:rounded-lg party:rounded-full"
        >
          <span className="size-[80%] [&>svg]:size-full">
            <PlayerAvatar theme={theme} index={player.iconIndex} />
          </span>
        </span>
        <div className="flex min-w-0 flex-col">
          <h2 className="display-text text-2xl leading-tight [@media(max-height:640px)]:text-xl [overflow-wrap:anywhere] party:font-bold">
            {player.name}
          </h2>
          <p className="text-base leading-6 font-semibold text-text-muted">
            Carta {cardNumber} de {cardCount}
          </p>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="h-2 overflow-hidden rounded-sm bg-surface-strong [@media(max-height:640px)]:hidden"
      >
        <div className="h-full rounded-sm bg-accent" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
