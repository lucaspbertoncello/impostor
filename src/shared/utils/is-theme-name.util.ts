import { THEME_NAMES } from '#/shared/constants/theme-names.constant.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

export function isThemeName(value: unknown): value is ThemeName {
  return THEME_NAMES.some((name) => name === value);
}
