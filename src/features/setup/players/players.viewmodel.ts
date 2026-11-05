import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

import { PLAYER_NAME_ERROR_MESSAGES } from '#/domain/players/roster/constants/player-name-error-messages.constant.ts';
import type { PlayerActionResult } from '#/domain/players/roster/types/player-action-result.type.ts';
import { usePlayersModel } from '#/features/setup/players/players.model.ts';
import type { PendingAction } from '#/features/setup/players/types/pending-action.type.ts';
import type { PlayerDraft } from '#/features/setup/players/types/player-draft.type.ts';
import type { PlayerSheetState } from '#/features/setup/players/types/player-sheet-state.type.ts';
import type { PlayersViewProps } from '#/features/setup/players/types/players-view-props.type.ts';
import type { SubmitPlayerResult } from '#/features/setup/players/types/submit-player-result.type.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

const ROSTER_FULL_MESSAGE = 'Máximo de 20 jogadores';
const NOT_FOUND_MESSAGE = 'Esse jogador não existe mais.';

function toSubmitResult(result: PlayerActionResult): SubmitPlayerResult {
  if (result.ok) return { ok: true };
  if (result.error === 'roster-full') return { ok: false, message: ROSTER_FULL_MESSAGE };
  if (result.error === 'not-found') return { ok: false, message: NOT_FOUND_MESSAGE };
  return { ok: false, message: PLAYER_NAME_ERROR_MESSAGES[result.error] };
}

/** Wires the screen: navigation, the sheets, and the discard confirmation of BR-MAT-034. */
export function usePlayersViewmodel(mode: ThemeName): PlayersViewProps {
  const navigate = useNavigate();
  const model = usePlayersModel(mode);
  const [sheet, setSheet] = useState<PlayerSheetState>({ kind: 'closed' });
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(null);
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);

  const { players, minPlayers, maxPlayers } = model;
  const editingPlayer =
    sheet.kind === 'edit' ? (players.find((player) => player.id === sheet.playerId) ?? null) : null;
  const isRosterFull = players.length >= maxPlayers;
  const missingPlayers = Math.max(0, minPlayers - players.length);

  function run(action: PendingAction) {
    if (action.kind === 'continue') {
      void navigate({ to: '/$mode/settings', params: { mode } });
    } else if (action.kind === 'add') {
      setSheet({ kind: 'add' });
    } else {
      setSheet({ kind: 'edit', playerId: action.playerId });
    }
  }

  // BR-MAT-034: with a round saved, any change of players asks before discarding it.
  function request(action: PendingAction) {
    if (model.hasRoundInProgress) setPendingAction(action);
    else run(action);
  }

  function submitPlayer(draft: PlayerDraft): SubmitPlayerResult {
    if (sheet.kind === 'edit') {
      const result = model.updatePlayer(sheet.playerId, draft);
      if (result.ok) setSheet({ kind: 'closed' });
      return toSubmitResult(result);
    }

    const result = model.addPlayer(draft);
    if (result.ok) {
      setLastAddedId(result.player.id);
      setSheet({ kind: 'closed' });
    }
    return toSubmitResult(result);
  }

  return {
    theme: mode,
    players,
    minPlayers,
    maxPlayers,
    maxNameLength: model.maxNameLength,
    hasRoundInProgress: model.hasRoundInProgress,
    missingPlayers,
    isRosterFull,
    canContinue: missingPlayers === 0,
    sheet,
    editingPlayer,
    usedIcons: players
      .filter((player) => player.id !== editingPlayer?.id)
      .map((player) => player.iconIndex),
    suggestedIcon: model.suggestedIcon,
    lastAddedId,
    isDiscardSheetOpen: pendingAction !== null,
    onBack: () => void navigate({ to: '/' }),
    onContinue: () => request({ kind: 'continue' }),
    onAddPlayer: () => request({ kind: 'add' }),
    onEditPlayer: (playerId) => request({ kind: 'edit', playerId }),
    onCloseSheet: () => setSheet({ kind: 'closed' }),
    onSubmitPlayer: submitPlayer,
    onValidateName: (name) => {
      const error = model.validateName(name, editingPlayer?.id);
      return error === null ? null : PLAYER_NAME_ERROR_MESSAGES[error];
    },
    onRemovePlayer: () => {
      if (editingPlayer === null) return;
      model.removePlayer(editingPlayer.id);
      setSheet({ kind: 'closed' });
    },
    onConfirmDiscard: () => {
      if (pendingAction === null) return;
      model.discardRound();
      setPendingAction(null);
      run(pendingAction);
    },
    onCancelDiscard: () => setPendingAction(null),
  };
}
