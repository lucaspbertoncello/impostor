import { ArenaLogo } from '#/shared/components/logo/arena-logo.component.tsx';
import { PartyLogo } from '#/shared/components/logo/party-logo.component.tsx';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

/** The small logo of the mode in the top bar. Both themes sit on a dark background, so Party uses `on-dark`. */
export function ModeLogo({ theme }: { theme: ThemeName }) {
  return theme === 'arena' ? (
    <ArenaLogo className="h-12 w-auto" title="Impostor Arena" />
  ) : (
    <PartyLogo variant="on-dark" className="h-12 w-auto" title="Impostor Festa" />
  );
}
