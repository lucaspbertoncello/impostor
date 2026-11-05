import { MODE_LABELS } from '#/features/home/mode-picker/constants/mode-copy.constant.ts';
import type { ResumeItem } from '#/features/home/mode-picker/types/mode-picker-view-props.type.ts';
import { Button } from '#/shared/ui/components/button/button.component.tsx';

type ResumeStripProps = {
  item: ResumeItem;
  onContinue: () => void;
  onDiscard: () => void;
};

/**
 * "Rodada em andamento (Arena ou Festa, N jogadores)" with Continuar and Descartar (RF-INI-004).
 * A quiet neutral panel (it is not a mode): only the mode chip and the buttons wear the theme of
 * the saved round.
 */
export function ResumeStrip({ item, onContinue, onDiscard }: ResumeStripProps) {
  const label = MODE_LABELS[item.mode];
  const players = item.playerCount === 1 ? '1 jogador' : `${item.playerCount} jogadores`;

  return (
    <section
      aria-label={`Rodada em andamento: ${label}`}
      className="flex flex-col gap-4 rounded-lg border-2 border-solid border-white/15 bg-white/[0.07] p-4"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <h2 className="text-[18px] leading-tight font-bold">Rodada em andamento</h2>
        <p className="flex items-center gap-2 text-[16px] leading-tight text-text-muted">
          <span
            data-theme={item.mode}
            className="rounded-sm bg-primary bg-none! px-3 py-1.5 font-display text-[15px] leading-none font-bold tracking-wide text-text-on-primary uppercase"
          >
            {label}
          </span>
          {players}
        </p>
      </div>
      <div
        data-theme={item.mode}
        className="flex flex-col gap-4 bg-transparent! bg-none! pb-1.5 min-[360px]:flex-row min-[360px]:gap-3"
      >
        <Button onPress={onContinue} className="min-w-0 px-3 min-[360px]:flex-1">
          Continuar
        </Button>
        <Button
          variant="ghost"
          onPress={onDiscard}
          className="px-3 text-[16px]! min-[360px]:flex-none"
        >
          Descartar
        </Button>
      </div>
    </section>
  );
}
