import { Button } from '#/shared/ui/components/button/button.component.tsx';

type ResultSecondaryActionsProps = {
  onChangeSettings: () => void;
  onSwitchMode: () => void;
};

/**
 * RF-RES-002, the two quieter exits. They live in the flow after the hint, not in the fixed base:
 * only "Nova rodada" stays pinned, so the word, the impostors and the hint are seen with little
 * scrolling. Ghost buttons (outline only) weigh less than the primary action. They sit side by
 * side from 320 px up; a long label breaks onto a second line inside its button.
 */
export function ResultSecondaryActions({
  onChangeSettings,
  onSwitchMode,
}: ResultSecondaryActionsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button
        variant="ghost"
        className="scroll-mb-32 min-w-0 px-3! py-2 text-center text-[16px]! leading-tight!"
        onPress={onChangeSettings}
      >
        Mudar configuração
      </Button>
      <Button
        variant="ghost"
        className="scroll-mb-32 min-w-0 px-3! py-2 text-center text-[16px]! leading-tight!"
        onPress={onSwitchMode}
      >
        Trocar modo
      </Button>
    </div>
  );
}
