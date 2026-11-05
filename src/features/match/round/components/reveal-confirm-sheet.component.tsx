import type { ThemeName } from '#/shared/types/theme-name.type.ts';
import { Button } from '#/shared/ui/components/button/button.component.tsx';
import { Sheet } from '#/shared/ui/components/sheet/sheet.component.tsx';

type RevealConfirmSheetProps = {
  theme: ThemeName;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: () => void;
};

/** RF-PAR-003: "Revelar" never reveals by itself; only the "Revelar" of this sheet does. */
export function RevealConfirmSheet({
  theme,
  isOpen,
  onOpenChange,
  onConfirm,
}: RevealConfirmSheetProps) {
  return (
    <Sheet
      theme={theme}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Revelar agora?"
      hideCloseButton
    >
      <p className="text-[18px] leading-snug text-text-muted">
        Mostra a palavra e quem era o impostor.
      </p>
      <div className="flex gap-3">
        <Button
          variant="secondary"
          className="flex-1 px-3"
          onPress={() => {
            onOpenChange(false);
          }}
        >
          Cancelar
        </Button>
        <Button variant="primary" className="flex-1 px-3" onPress={onConfirm}>
          Revelar
        </Button>
      </div>
    </Sheet>
  );
}
