import { motion, MotionConfig } from 'motion/react';
import { ToggleButton } from 'react-aria-components';

import { CheckIcon } from '#/shared/ui/components/icons/check-icon.component.tsx';
import { StarIcon } from '#/shared/ui/components/icons/star-icon.component.tsx';

type SelectionChipProps = {
  label: string;
  isSelected: boolean;
  onChange: (isSelected: boolean) => void;
  /** `special` is the highlighted kind (bigger, own color, star, optional description). */
  variant?: 'normal' | 'special';
  /** Small count shown after the name, e.g. the number of words. */
  count?: number;
  /** One short line, only for `special`. */
  description?: string;
};

const BASE_CLASSES = [
  'group relative flex cursor-pointer select-none items-center gap-2 text-left outline-none',
  'rounded-md border-solid border-border [border-width:var(--theme-outline-width)]',
  'transition-[transform,box-shadow,background-color] duration-100 ease-out',
  'data-[focus-visible]:outline-[3px] data-[focus-visible]:outline-offset-[3px] data-[focus-visible]:outline-ring',
  'data-[pressed]:translate-y-0.5',
].join(' ');

const NORMAL_CLASSES = [
  'min-h-11 bg-surface px-4 py-2 text-text',
  'data-[selected]:bg-primary data-[selected]:text-text-on-primary',
  'data-[selected]:shadow-[0_3px_0_var(--theme-color-primary-strong)]',
  'arena:data-[selected]:shadow-[inset_0_2px_0_rgb(255_255_255/0.4),0_3px_0_var(--theme-color-border)]',
].join(' ');

const SPECIAL_CLASSES = [
  'min-h-[72px] w-full bg-surface px-4 py-3 text-text',
  'border-dashed party:border-solid',
  'data-[selected]:border-solid data-[selected]:bg-special data-[selected]:text-text-on-special',
  'data-[selected]:shadow-[0_4px_0_var(--theme-color-special-strong)]',
  'arena:data-[selected]:shadow-[inset_0_2px_0_rgb(255_255_255/0.35),0_4px_0_var(--theme-color-border)]',
].join(' ');

/**
 * Toggle chip for category selection. Selected state is shown by color AND a check mark (never
 * color alone). The 44 px minimum height is the touch target.
 */
export function SelectionChip({
  label,
  isSelected,
  onChange,
  variant = 'normal',
  count,
  description,
}: SelectionChipProps) {
  const isSpecial = variant === 'special';

  return (
    <MotionConfig reducedMotion="user">
      <ToggleButton
        isSelected={isSelected}
        onChange={onChange}
        className={`${BASE_CLASSES} ${isSpecial ? SPECIAL_CLASSES : NORMAL_CLASSES}`}
      >
        <span className="flex size-6 shrink-0 items-center justify-center">
          {isSelected ? (
            <motion.span
              initial={{ scale: 0.4, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 600, damping: 18 }}
              className="flex"
            >
              {isSpecial ? <StarIcon size={22} /> : <CheckIcon size={20} />}
            </motion.span>
          ) : (
            <span className="size-4 rounded-sm border-2 border-solid border-current opacity-60" />
          )}
        </span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="flex items-baseline gap-2">
            <span
              className={`font-display ${isSpecial ? 'text-[20px]' : 'text-[17px]'} leading-tight`}
            >
              {label}
            </span>
            {count === undefined ? null : (
              <span className="text-[14px] font-medium opacity-80">{count}</span>
            )}
          </span>
          {isSpecial && description ? (
            <span className="text-[14px] leading-snug opacity-90">{description}</span>
          ) : null}
        </span>
      </ToggleButton>
    </MotionConfig>
  );
}
