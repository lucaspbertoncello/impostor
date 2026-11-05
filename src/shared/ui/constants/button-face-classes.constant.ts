import type { ButtonVariant } from '#/shared/ui/types/button-variant.type.ts';

/** Sets the three variables the button shapes read: face, edge (solid base tone) and label color. */
export const BUTTON_FACE_CLASSES: Record<ButtonVariant, string> = {
  primary:
    '[--btn-face:var(--theme-color-primary)] [--btn-edge:var(--theme-color-primary-strong)] [--btn-text:var(--theme-color-text-on-primary)]',
  secondary:
    '[--btn-face:var(--theme-color-secondary)] [--btn-edge:var(--theme-color-secondary-strong)] [--btn-text:var(--theme-color-text-on-secondary)]',
  destructive:
    '[--btn-face:var(--theme-color-danger)] [--btn-edge:var(--theme-color-danger-strong)] [--btn-text:var(--theme-color-text-on-danger)]',
  // Quiet action: no face and no solid base, only a thin outline. It weighs less than any other variant.
  ghost:
    '[--btn-face:transparent] [--btn-edge:transparent] [--btn-text:var(--theme-color-text)] border-white/40! [border-width:2px]! shadow-none! data-[pressed]:translate-y-0! data-[pressed]:opacity-70',
};

/** The tactile base shared by Button and IconButton: volume, press travel, focus and disabled. */
export const BUTTON_BASE_CLASSES = [
  'relative inline-flex select-none items-center justify-center',
  'bg-(--btn-face) text-(--btn-text)',
  'border-solid border-border [border-width:var(--theme-button-border)]',
  'shadow-button transition-[transform,box-shadow] duration-100 ease-out',
  'outline-none data-[focus-visible]:outline-solid data-[focus-visible]:outline-[3px] data-[focus-visible]:outline-offset-[3px] data-[focus-visible]:outline-ring',
  'data-[pressed]:translate-y-(--theme-press-travel) data-[pressed]:shadow-button-pressed',
  'data-[disabled]:translate-y-0 data-[disabled]:cursor-not-allowed data-[disabled]:shadow-none',
  'data-[disabled]:[--btn-face:var(--theme-color-surface-strong)] data-[disabled]:[--btn-text:var(--theme-color-text-muted)]',
  'data-[disabled]:[border-color:var(--theme-color-surface)]',
].join(' ');
