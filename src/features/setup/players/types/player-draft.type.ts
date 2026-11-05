import type { PlayerIconIndex } from '#/shared/types/player-icon-index.type.ts';

/** What the sheet sends when the player taps "Adicionar" or "Salvar". */
export type PlayerDraft = {
  name: string;
  iconIndex: PlayerIconIndex;
};
