import { PlayerForm } from '#/features/setup/players/components/player-sheet/player-form.component.tsx';
import type { PlayerDraft } from '#/features/setup/players/types/player-draft.type.ts';
import type { PlayerItem } from '#/features/setup/players/types/player-item.type.ts';
import type { PlayerSheetState } from '#/features/setup/players/types/player-sheet-state.type.ts';
import type { SubmitPlayerResult } from '#/features/setup/players/types/submit-player-result.type.ts';
import type { PlayerIconIndex } from '#/shared/types/player-icon-index.type.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';
import { Sheet } from '#/shared/ui/components/sheet/sheet.component.tsx';

type PlayerSheetProps = {
  theme: ThemeName;
  sheet: PlayerSheetState;
  editingPlayer: PlayerItem | null;
  usedIcons: readonly PlayerIconIndex[];
  suggestedIcon: PlayerIconIndex;
  maxNameLength: number;
  onClose: () => void;
  onSubmit: (draft: PlayerDraft) => SubmitPlayerResult;
  onValidateName: (name: string) => string | null;
  onRemove: () => void;
};

/** RF-JOG-002 and RF-JOG-003: one sheet to add and to edit. The form mounts when it opens, so it starts clean. */
export function PlayerSheet({
  theme,
  sheet,
  editingPlayer,
  usedIcons,
  suggestedIcon,
  maxNameLength,
  onClose,
  onSubmit,
  onValidateName,
  onRemove,
}: PlayerSheetProps) {
  const isEdit = sheet.kind === 'edit';
  const isOpen = sheet.kind === 'add' || (isEdit && editingPlayer !== null);

  return (
    <Sheet
      theme={theme}
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      title={isEdit ? 'Editar jogador' : 'Adicionar jogador'}
    >
      <PlayerForm
        key={editingPlayer?.id ?? 'new'}
        theme={theme}
        mode={isEdit ? 'edit' : 'add'}
        initial={
          editingPlayer
            ? { name: editingPlayer.name, iconIndex: editingPlayer.iconIndex }
            : { name: '', iconIndex: suggestedIcon }
        }
        usedIcons={usedIcons}
        maxNameLength={maxNameLength}
        onSubmit={onSubmit}
        onValidateName={onValidateName}
        onRemove={onRemove}
      />
    </Sheet>
  );
}
