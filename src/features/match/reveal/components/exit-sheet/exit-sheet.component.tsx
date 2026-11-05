import type { ThemeName } from '#/shared/types/theme-name.type.ts';
import { Button } from '#/shared/ui/components/button/button.component.tsx';
import { Sheet } from '#/shared/ui/components/sheet/sheet.component.tsx';

type ExitSheetProps = {
  theme: ThemeName;
  isOpen: boolean;
  onKeepPlaying: () => void;
  onConfirmExit: () => void;
};

/** "Sair da rodada?" (RF-GER-005): reached by the "x" and by the browser back (RF-GER-004). */
export function ExitSheet({ theme, isOpen, onKeepPlaying, onConfirmExit }: ExitSheetProps) {
  return (
    <Sheet
      theme={theme}
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) onKeepPlaying();
      }}
      title="Sair da rodada?"
      hideCloseButton
    >
      <p className="text-lg text-text-muted">A rodada atual será descartada</p>
      <div className="flex flex-col gap-3">
        <Button fullWidth onPress={onKeepPlaying}>
          Continuar rodada
        </Button>
        <Button variant="destructive" fullWidth onPress={onConfirmExit}>
          Sair
        </Button>
      </div>
    </Sheet>
  );
}
