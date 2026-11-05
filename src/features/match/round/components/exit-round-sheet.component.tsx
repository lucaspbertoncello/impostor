import '#/features/match/round/styles/sheet-backdrop.css';

import type { ThemeName } from '#/shared/types/theme-name.type.ts';
import { Button } from '#/shared/ui/components/button/button.component.tsx';
import { Sheet } from '#/shared/ui/components/sheet/sheet.component.tsx';

type ExitRoundSheetProps = {
  theme: ThemeName;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirmExit: () => void;
};

/** RF-GER-005: leaving discards the round; "Continuar rodada" is the safe, main answer. */
export function ExitRoundSheet({
  theme,
  isOpen,
  onOpenChange,
  onConfirmExit,
}: ExitRoundSheetProps) {
  return (
    <Sheet
      theme={theme}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Sair da rodada?"
      hideCloseButton
    >
      <p className="text-[18px] leading-snug text-text-muted">A rodada atual será descartada</p>
      <div className="flex flex-col gap-3">
        <Button
          variant="primary"
          fullWidth
          onPress={() => {
            onOpenChange(false);
          }}
        >
          Continuar rodada
        </Button>
        <Button variant="destructive" fullWidth onPress={onConfirmExit}>
          Sair
        </Button>
      </div>
    </Sheet>
  );
}
