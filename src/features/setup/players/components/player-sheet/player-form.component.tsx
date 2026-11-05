import { IconPicker } from '#/features/setup/players/components/player-sheet/icon-picker.component.tsx';
import { usePlayerForm } from '#/features/setup/players/hooks/use-player-form.hook.ts';
import { useTimedConfirmation } from '#/features/setup/players/hooks/use-timed-confirmation.hook.ts';
import type { PlayerDraft } from '#/features/setup/players/types/player-draft.type.ts';
import type { SubmitPlayerResult } from '#/features/setup/players/types/submit-player-result.type.ts';
import type { PlayerIconIndex } from '#/shared/types/player-icon-index.type.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';
import { Button } from '#/shared/ui/components/button/button.component.tsx';
import { TextField } from '#/shared/ui/components/text-field/text-field.component.tsx';

type PlayerFormProps = {
  theme: ThemeName;
  /** `add` shows "Adicionar"; `edit` shows "Salvar" and "Remover jogador". */
  mode: 'add' | 'edit';
  initial: PlayerDraft;
  usedIcons: readonly PlayerIconIndex[];
  maxNameLength: number;
  onSubmit: (draft: PlayerDraft) => SubmitPlayerResult;
  onValidateName: (name: string) => string | null;
  onRemove: () => void;
};

/**
 * The name, the icon grid and the action. The action sits in the normal flow under a scrolling
 * body (never `position: fixed`), so it stays above the keyboard: the body shrinks, the button stays.
 */
export function PlayerForm({
  theme,
  mode,
  initial,
  usedIcons,
  maxNameLength,
  onSubmit,
  onValidateName,
  onRemove,
}: PlayerFormProps) {
  const form = usePlayerForm({ initial, onValidateName, onSubmit });
  const removal = useTimedConfirmation();

  return (
    <div className="flex max-h-[calc(var(--visual-viewport-height,100dvh)-168px)] flex-col gap-5 md:max-h-[calc(100dvh-200px)]">
      <div className="-mx-2 flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-2 pt-3 pb-2">
        <div onBlur={form.leaveName}>
          <TextField
            label="Nome"
            value={form.name}
            onChange={form.changeName}
            maxLength={maxNameLength}
            errorMessage={form.errorMessage ?? undefined}
            autoFocus
            onSubmit={form.submit}
          />
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-[18px] font-semibold">Ícone</span>
          <IconPicker
            theme={theme}
            value={form.iconIndex}
            onChange={form.setIconIndex}
            usedIcons={usedIcons}
          />
        </div>
        {mode === 'edit' ? (
          <Button
            variant="destructive"
            className="px-3! text-[15px]!"
            fullWidth
            onPress={() => {
              if (removal.isArmed) {
                removal.disarm();
                onRemove();
              } else {
                removal.arm();
              }
            }}
          >
            {removal.isArmed ? 'Tocar de novo para remover' : 'Remover jogador'}
          </Button>
        ) : null}
      </div>
      <Button variant="primary" size="lg" fullWidth onPress={form.submit}>
        {mode === 'add' ? 'Adicionar' : 'Salvar'}
      </Button>
    </div>
  );
}
