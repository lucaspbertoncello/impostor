import { useState } from 'react';

import { MODE_LABELS } from '#/features/home/mode-picker/constants/mode-copy.constant.ts';
import type { DiscardTarget } from '#/features/home/mode-picker/types/mode-picker-view-props.type.ts';
import { Button } from '#/shared/ui/components/button/button.component.tsx';
import { Sheet } from '#/shared/ui/components/sheet/sheet.component.tsx';

type DiscardRoundSheetProps = {
  target: DiscardTarget | null;
  onCancel: () => void;
  onConfirm: () => void;
};

/** Confirmation of RF-INI-004: discarding wipes only the round; players and settings stay. */
export function DiscardRoundSheet({ target, onCancel, onConfirm }: DiscardRoundSheetProps) {
  // Keeps the last target so the text does not empty while the sheet slides out.
  const [shown, setShown] = useState(target);
  if (target !== null && target.mode !== shown?.mode) setShown(target);

  return (
    <Sheet
      {...(target === null ? {} : { theme: target.mode })}
      isOpen={target !== null}
      onOpenChange={(isOpen) => {
        if (!isOpen) onCancel();
      }}
      title="Descartar rodada?"
      hideCloseButton
    >
      <p className="text-[17px] leading-relaxed">
        A rodada de {shown === null ? '' : MODE_LABELS[shown.mode]} será apagada. Os jogadores e a
        configuração continuam salvos.
      </p>
      <div className="flex flex-col gap-3">
        <Button variant="destructive" size="lg" fullWidth onPress={onConfirm}>
          Descartar rodada
        </Button>
        <Button variant="secondary" fullWidth onPress={onCancel}>
          Manter rodada
        </Button>
      </div>
    </Sheet>
  );
}
