import { SETTINGS_COPY } from '#/features/setup/match-settings/constants/settings-copy.constant.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';
import { Button } from '#/shared/ui/components/button/button.component.tsx';
import { Sheet } from '#/shared/ui/components/sheet/sheet.component.tsx';

type DiscardRoundSheetProps = {
  theme: ThemeName;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: () => void;
};

/** BR-MAT-034: starting a round with another one saved asks before discarding it. */
export function DiscardRoundSheet({
  theme,
  isOpen,
  onOpenChange,
  onConfirm,
}: DiscardRoundSheetProps) {
  return (
    <Sheet
      theme={theme}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={SETTINGS_COPY.discardTitle}
      hideCloseButton
    >
      <p className="text-[18px] leading-snug">{SETTINGS_COPY.discardText}</p>
      <div className="flex flex-col gap-3">
        <Button variant="destructive" size="lg" fullWidth onPress={onConfirm}>
          {SETTINGS_COPY.discardConfirm}
        </Button>
        <Button variant="secondary" fullWidth onPress={() => onOpenChange(false)}>
          {SETTINGS_COPY.discardCancel}
        </Button>
      </div>
    </Sheet>
  );
}
