import { useRoundStage } from '#/domain/match/session/hooks/use-round-stage.hook.ts';
import { useMatchActions } from '#/domain/match/session/hooks/use-match-actions.hook.ts';
import {
  MAX_PLAYER_NAME_LENGTH,
  MAX_PLAYERS,
  MIN_PLAYERS,
} from '#/domain/players/roster/constants/roster-limits.constant.ts';
import { usePlayers } from '#/domain/players/roster/hooks/use-players.hook.ts';
import { useRosterActions } from '#/domain/players/roster/hooks/use-roster-actions.hook.ts';
import { suggestPlayerIcon } from '#/domain/players/roster/rules/suggest-player-icon.rule.ts';
import { validatePlayerName } from '#/domain/players/roster/rules/validate-player-name.rule.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

/** Joins the roster and the round of the mode: what the Jogadores screen reads and does. */
export function usePlayersModel(mode: ThemeName) {
  const players = usePlayers();
  const { addPlayer, updatePlayer, removePlayer } = useRosterActions();
  const { discardRound } = useMatchActions();
  const roundStage = useRoundStage(mode);

  return {
    players,
    minPlayers: MIN_PLAYERS,
    maxPlayers: MAX_PLAYERS,
    maxNameLength: MAX_PLAYER_NAME_LENGTH,
    hasRoundInProgress: roundStage !== null,
    suggestedIcon: suggestPlayerIcon(players.map((player) => player.iconIndex)),
    validateName: (name: string, editingPlayerId?: string) =>
      validatePlayerName(name, players, editingPlayerId),
    addPlayer,
    updatePlayer,
    removePlayer,
    discardRound: () => discardRound(mode),
  };
}
