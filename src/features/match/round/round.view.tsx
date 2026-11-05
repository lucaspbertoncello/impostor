import { ExitRoundSheet } from '#/features/match/round/components/exit-round-sheet.component.tsx';
import { RevealConfirmSheet } from '#/features/match/round/components/reveal-confirm-sheet.component.tsx';
import { RoundDock } from '#/features/match/round/components/round-dock.component.tsx';
import { SpeakingOrderList } from '#/features/match/round/components/speaking-order-list.component.tsx';
import { StarterHighlight } from '#/features/match/round/components/starter-highlight.component.tsx';
import type { RoundPlayer } from '#/features/match/round/types/round-player.type.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';
import { Button } from '#/shared/ui/components/button/button.component.tsx';
import { AlertIcon } from '#/shared/ui/components/icons/alert-icon.component.tsx';
import { ScreenHeader } from '#/shared/ui/components/screen-header/screen-header.component.tsx';

export type RoundViewProps = {
  theme: ThemeName;
  impostorLabel: string;
  firstPlayer: RoundPlayer;
  speakingOrder: RoundPlayer[];
  isRevealSheetOpen: boolean;
  isExitSheetOpen: boolean;
  onRequestReveal: () => void;
  onRevealSheetOpenChange: (isOpen: boolean) => void;
  onConfirmReveal: () => void;
  onRequestExit: () => void;
  onExitSheetOpenChange: (isOpen: boolean) => void;
  onConfirmExit: () => void;
};

/** RF-PAR-001: the group plays outside the app; this screen says who starts and guards "Revelar". */
export function RoundView({
  theme,
  impostorLabel,
  firstPlayer,
  speakingOrder,
  isRevealSheetOpen,
  isExitSheetOpen,
  onRequestReveal,
  onRevealSheetOpenChange,
  onConfirmReveal,
  onRequestExit,
  onExitSheetOpenChange,
  onConfirmExit,
}: RoundViewProps) {
  return (
    <div className="flex flex-1 flex-col">
      <ScreenHeader
        theme={theme}
        title="Partida"
        onBack={onRequestExit}
        backLabel="Sair da rodada"
      />
      <main className="flex flex-col gap-6 px-4 pt-4 pb-8">
        <div className="flex flex-col items-start gap-3">
          <p className="text-[18px] leading-snug text-text-muted">
            Conversem. O app volta quando decidirem.
          </p>
          <p className="flex items-center gap-2 rounded-lg bg-surface-strong px-4 py-2 text-[18px] leading-tight font-bold">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-danger text-text-on-danger">
              <AlertIcon size={18} />
            </span>
            {impostorLabel}
          </p>
        </div>
        <StarterHighlight theme={theme} player={firstPlayer} />
        <SpeakingOrderList theme={theme} players={speakingOrder} />
      </main>
      <RoundDock>
        <Button variant="primary" size="lg" fullWidth onPress={onRequestReveal}>
          Revelar
        </Button>
      </RoundDock>
      <RevealConfirmSheet
        theme={theme}
        isOpen={isRevealSheetOpen}
        onOpenChange={onRevealSheetOpenChange}
        onConfirm={onConfirmReveal}
      />
      <ExitRoundSheet
        theme={theme}
        isOpen={isExitSheetOpen}
        onOpenChange={onExitSheetOpenChange}
        onConfirmExit={onConfirmExit}
      />
    </div>
  );
}
