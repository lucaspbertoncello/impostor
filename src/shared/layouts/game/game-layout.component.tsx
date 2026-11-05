import type { ReactNode } from 'react';

import type { ThemeName } from '#/shared/types/theme-name.type.ts';

type GameLayoutProps = {
  theme: ThemeName;
  children: ReactNode;
};

/**
 * Root of every screen: sets `data-theme` and keeps the phone column (375 px first) centered on
 * the desktop, with a maximum width of 480 px.
 */
export function GameLayout({ theme, children }: GameLayoutProps) {
  return (
    <div data-theme={theme} className="min-h-dvh bg-bg font-body text-text">
      <div className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col">{children}</div>
    </div>
  );
}
