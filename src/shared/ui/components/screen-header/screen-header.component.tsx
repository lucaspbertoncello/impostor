import type { ThemeName } from '#/shared/types/theme-name.type.ts';
import { ArenaScreenHeader } from '#/shared/ui/components/screen-header/arena-screen-header.component.tsx';
import { PartyScreenHeader } from '#/shared/ui/components/screen-header/party-screen-header.component.tsx';
import type { ScreenHeaderProps } from '#/shared/ui/types/screen-header-props.type.ts';

/** Picks the header drawn for the theme (the shape changes between themes). */
export function ScreenHeader({ theme, ...props }: ScreenHeaderProps & { theme: ThemeName }) {
  return theme === 'arena' ? <ArenaScreenHeader {...props} /> : <PartyScreenHeader {...props} />;
}
