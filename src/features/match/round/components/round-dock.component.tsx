import type { ReactNode } from 'react';

type RoundDockProps = { children: ReactNode };

/**
 * Fixed base of the screen: sticks to the bottom of the viewport, above the safe area, so the list
 * scrolls behind it and never under the button. The 16 px above the button and the safe area below
 * keep it away from the scroll edge (RF-PAR-003).
 */
export function RoundDock({ children }: RoundDockProps) {
  return (
    <div className="sticky bottom-0 z-10 mt-auto flex flex-col gap-3 rounded-t-lg border-t-[length:var(--theme-outline-width)] border-solid border-border bg-bg-elevated px-4 pt-4 pb-[calc(24px+env(safe-area-inset-bottom))]">
      {children}
    </div>
  );
}
