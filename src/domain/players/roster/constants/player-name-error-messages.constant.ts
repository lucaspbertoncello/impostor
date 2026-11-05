import type { PlayerNameError } from '#/domain/players/roster/types/player-name-error.type.ts';

/** RF-JOG-006. */
export const PLAYER_NAME_ERROR_MESSAGES: Record<PlayerNameError, string> = {
  empty: 'Digite um nome.',
  'too-long': 'Use no máximo 12 caracteres.',
  duplicate: 'Já existe um jogador com esse nome.',
};
