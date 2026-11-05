import type { ThemeName } from '#/shared/types/theme-name.type.ts';

/** Name of each mode as the player reads it (the code names are `arena` and `party`). */
export const MODE_LABELS: Record<ThemeName, string> = {
  arena: 'Arena',
  party: 'Festa',
};

/** The line of each mode card (RF-INI-001). */
export const MODE_DESCRIPTIONS: Record<ThemeName, string> = {
  arena: 'Palavras do Clash Royale',
  party: 'Categorias para escolher',
};

export const HOME_PRESENTATION = 'Descubra quem é o impostor.';

export const HOME_INTRO =
  'Um celular, passado de mão em mão. Todo mundo recebe a mesma palavra, menos o impostor.';
