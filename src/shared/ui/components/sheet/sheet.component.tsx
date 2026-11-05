import type { ReactNode } from 'react';
import { Dialog, Heading, Modal, ModalOverlay } from 'react-aria-components';

import type { ThemeName } from '#/shared/types/theme-name.type.ts';
import { CloseIcon } from '#/shared/ui/components/icons/close-icon.component.tsx';
import { IconButton } from '#/shared/ui/components/icon-button/icon-button.component.tsx';

type SheetProps = {
  /**
   * Optional: the sheet renders in a portal outside the layout root, so it carries its own `data-theme`; by default it copies the first `[data-theme]` in the document.
   */
  theme?: ThemeName;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
  children: ReactNode;
  /** `false` blocks closing by tapping outside and by Esc (the "Reveal now?" sheet needs it). */
  isDismissable?: boolean;
  /** Hides the "x" in the corner when the sheet has its own cancel button. */
  hideCloseButton?: boolean;
};

/**
 * Bottom sheet on phones, centered dialog from 768 px up (RF introduction of screens.md).
 * Enter and exit are CSS keyframes keyed to React Aria's `data-entering` and `data-exiting`;
 * `prefers-reduced-motion` turns them into a plain fade.
 */
export function Sheet({
  theme: themeProp,
  isOpen,
  onOpenChange,
  title,
  children,
  isDismissable = true,
  hideCloseButton = false,
}: SheetProps) {
  const theme = themeProp ?? readRootTheme();

  return (
    <ModalOverlay
      data-theme={theme}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={isDismissable}
      isKeyboardDismissDisabled={!isDismissable}
      className="sheet-overlay fixed inset-0 z-50 flex items-end justify-center font-body text-text md:items-center"
    >
      <Modal className="sheet-panel w-full max-w-[480px] md:max-w-[440px] md:px-0">
        <Dialog
          aria-label={title}
          className="relative flex flex-col gap-5 rounded-t-lg border-solid border-border bg-bg-elevated p-6 pb-8 shadow-panel outline-none [border-width:var(--theme-outline-width)] md:rounded-lg md:pb-6"
        >
          {/* Grab handle: only a hint that this is a sheet; hidden on the desktop dialog. */}
          <span
            aria-hidden="true"
            className="mx-auto -mt-2 h-1.5 w-12 rounded-sm bg-border md:hidden"
          />
          <div className="flex items-center justify-between gap-4">
            <Heading slot="title" className="display-text text-[28px] leading-tight">
              {title}
            </Heading>
            {hideCloseButton ? null : (
              <IconButton aria-label="Fechar" onPress={() => onOpenChange(false)}>
                <CloseIcon size={22} />
              </IconButton>
            )}
          </div>
          {children}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}

/** Default theme: the `data-theme` of the layout root, read when the sheet renders. */
function readRootTheme(): ThemeName | undefined {
  if (typeof document === 'undefined') return undefined;
  const value = document.querySelector('[data-theme]')?.getAttribute('data-theme');
  return value === 'arena' || value === 'party' ? value : undefined;
}
