import { z } from 'zod';

import {
  MAX_PLAYER_NAME_LENGTH,
  MIN_PLAYER_NAME_LENGTH,
} from '#/domain/players/roster/constants/roster-limits.constant.ts';
import { PLAYER_ICON_INDEXES } from '#/shared/constants/player-icon-indexes.constant.ts';

export const playerSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(MIN_PLAYER_NAME_LENGTH).max(MAX_PLAYER_NAME_LENGTH),
  iconIndex: z.literal(PLAYER_ICON_INDEXES),
});
