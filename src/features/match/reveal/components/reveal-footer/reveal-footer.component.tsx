import type { ReactNode } from 'react';

type RevealFooterProps = {
  /** One line above the button; the line keeps its height when empty, so the button never jumps. */
  helper?: ReactNode;
  helperId?: string;
  children: ReactNode;
};

/** Base of the reveal screens: the main action above the safe area (RF-GER-001), never over the content. */
export function RevealFooter({ helper, helperId, children }: RevealFooterProps) {
  return (
    <footer className="flex flex-col gap-3 px-4 pt-4 pb-[max(16px,env(safe-area-inset-bottom))]">
      <p id={helperId} className="min-h-6 text-center text-base leading-6 text-text-muted">
        {helper}
      </p>
      {children}
    </footer>
  );
}
