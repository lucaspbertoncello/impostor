import type { ThemeName } from '#/shared/types/theme-name.type.ts';
import { Button } from '#/shared/ui/components/button/button.component.tsx';
import { Sheet } from '#/shared/ui/components/sheet/sheet.component.tsx';

type DiscardRoundSheetProps = {
  theme: ThemeName;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

/** BR-MAT-034: with a round in progress, changing the players asks before throwing the round away. */
export function DiscardRoundSheet({ theme, isOpen, onConfirm, onCancel }: DiscardRoundSheetProps) {
  return (
    <Sheet
      theme={theme}
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) onCancel();
      }}
      title="Descartar a rodada?"
      hideCloseButton
    >
      <p className="text-[18px] leading-snug">
        Há uma rodada em andamento. Editar os jogadores a descarta.
      </p>
      <div className="flex flex-col gap-3">
        <Button variant="primary" size="lg" fullWidth onPress={onCancel}>
          Manter a rodada
        </Button>
        <Button variant="destructive" fullWidth onPress={onConfirm}>
          Descartar e continuar
        </Button>
      </div>
    </Sheet>
  );
}
