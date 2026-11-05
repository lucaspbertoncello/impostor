import type { ReactNode } from 'react';

type ResultDockProps = { children: ReactNode };

/** Fixed base of the screen, above the safe area: the actions of RF-RES-002. */
export function ResultDock({ children }: ResultDockProps) {
  return (
    <div className="sticky bottom-0 z-10 mt-auto flex flex-col gap-3 rounded-t-lg border-t-[length:var(--theme-outline-width)] border-solid border-border bg-bg-elevated px-4 pt-4 pb-[calc(24px+env(safe-area-inset-bottom))]">
      {children}
    </div>
  );
}
