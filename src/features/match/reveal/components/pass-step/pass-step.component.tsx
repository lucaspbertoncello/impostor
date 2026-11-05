import { RevealFooter } from '#/features/match/reveal/components/reveal-footer/reveal-footer.component.tsx';
import { PlayerAvatar } from '#/shared/components/player-avatar/player-avatar.component.tsx';
import type { PlayerIconIndex } from '#/shared/types/player-icon-index.type.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';
import { Button } from '#/shared/ui/components/button/button.component.tsx';

type PassStepProps = {
  theme: ThemeName;
  player: { name: string; iconIndex: PlayerIconIndex };
  cardNumber: number;
  cardCount: number;
  onIAm: () => void;
};

/**
 * "Pass the phone" (BR-MAT-047, RF-REV-001): who receives the phone next, and how far along the round is.
 * It knows nothing about the round: no word, no role, no hint.
 */
export function PassStep({ theme, player, cardNumber, cardCount, onIAm }: PassStepProps) {
  const progress = Math.round((cardNumber / cardCount) * 100);
  const nameSize = player.name.length > 8 ? 'text-[32px]' : 'text-[40px]';

  return (
    <>
      <section className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-4">
        <h2 className="flex max-w-full flex-col items-center gap-4 text-center">
          <span className="text-lg font-semibold text-text-muted">Passe o celular para</span>{' '}
          <span
            aria-hidden="true"
            className="grid size-[clamp(128px,24dvh,184px)] place-items-center border-solid border-border bg-surface shadow-panel [border-width:var(--theme-outline-width)] arena:rounded-lg party:rounded-full"
          >
            <span className="size-[82%] [&>svg]:size-full">
              <PlayerAvatar theme={theme} index={player.iconIndex} />
            </span>
          </span>
          <span
            className={`display-text max-w-full leading-tight [overflow-wrap:anywhere] party:font-bold ${nameSize}`}
          >
            {player.name}
          </span>
        </h2>
      </section>

      <div className="flex flex-col gap-2 px-4">
        <p className="text-center text-base font-semibold text-text-muted">
          Carta {cardNumber} de {cardCount}
        </p>
        <div aria-hidden="true" className="h-2 overflow-hidden rounded-sm bg-surface-strong">
          <div className="h-full rounded-sm bg-accent" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <RevealFooter>
        <Button size="lg" fullWidth onPress={onIAm}>
          Sou eu
        </Button>
      </RevealFooter>
    </>
  );
}
