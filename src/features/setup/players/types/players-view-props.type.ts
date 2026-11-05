import type { PlayerDraft } from '#/features/setup/players/types/player-draft.type.ts';
import type { PlayerItem } from '#/features/setup/players/types/player-item.type.ts';
import type { PlayerSheetState } from '#/features/setup/players/types/player-sheet-state.type.ts';
import type { SubmitPlayerResult } from '#/features/setup/players/types/submit-player-result.type.ts';
import type { PlayerIconIndex } from '#/shared/types/player-icon-index.type.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

export type PlayersViewProps = {
  theme: ThemeName;
  players: PlayerItem[];
  minPlayers: number;
  maxPlayers: number;
  maxNameLength: number;
  /** RF-JOG-009: a saved round of the mode; editing the players discards it. */
  hasRoundInProgress: boolean;
  /** How many players are missing to reach the minimum (0 when there are enough). */
  missingPlayers: number;
  isRosterFull: boolean;
  canContinue: boolean;
  sheet: PlayerSheetState;
  /** The player of the open edit sheet. */
  editingPlayer: PlayerItem | null;
  /** Icons taken by the other players (RF-JOG-008). */
  usedIcons: PlayerIconIndex[];
  suggestedIcon: PlayerIconIndex;
  /** The player to scroll to after an add (RF-JOG-002). */
  lastAddedId: string | null;
  isDiscardSheetOpen: boolean;
  onBack: () => void;
  onContinue: () => void;
  onAddPlayer: () => void;
  onEditPlayer: (playerId: string) => void;
  onCloseSheet: () => void;
  onSubmitPlayer: (draft: PlayerDraft) => SubmitPlayerResult;
  /** The message of the name error, or null when the name is valid. */
  onValidateName: (name: string) => string | null;
  onRemovePlayer: () => void;
  onConfirmDiscard: () => void;
  onCancelDiscard: () => void;
};
