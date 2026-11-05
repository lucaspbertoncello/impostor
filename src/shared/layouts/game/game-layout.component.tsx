import { useRouterState } from '@tanstack/react-router';
import type { ReactNode } from 'react';

import '#/shared/layouts/game/styles/game-layout.css';

import { StorageWarningBanner } from '#/shared/layouts/game/components/storage-warning-banner.component.tsx';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

type GameLayoutProps = {
  theme: ThemeName;
  children: ReactNode;
};

/**
 * Root of every screen: sets `data-theme`, keeps the phone column (375 px first) centered on the
 * desktop, with a maximum width of 480 px, and shows the storage warning once (RF-GER-006).
 *
 * The Início (path `/`) belongs to no mode: the router shell passes a theme only for the tokens
 * the layout itself needs, and `data-home` swaps the themed background for the neutral one
 * (see `styles/game-layout.css`), so neither mode owns the page behind the two mode cards.
 */
export function GameLayout({ theme, children }: GameLayoutProps) {
  const isHome = useRouterState({ select: (state) => state.location.pathname === '/' });

  return (
    <div
      data-theme={theme}
      data-home={isHome ? 'true' : undefined}
      className="min-h-dvh bg-bg font-body text-text"
    >
      <div className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col">
        <StorageWarningBanner />
        {children}
      </div>
    </div>
  );
}
