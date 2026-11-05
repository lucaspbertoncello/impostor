import { motion, MotionConfig } from 'motion/react';
import { ToggleButton } from 'react-aria-components';

import { CheckIcon } from '#/shared/ui/components/icons/check-icon.component.tsx';
import { StarIcon } from '#/shared/ui/components/icons/star-icon.component.tsx';

type CategoryChipProps = {
  label: string;
  /** How many words the category has: shown small, after the name. */
  count: number;
  isSelected: boolean;
  onChange: (isSelected: boolean) => void;
  /** The special kind is bigger, in the `special` color, with a star and a description. */
  isSpecial?: boolean;
  description?: string;
};

const BASE_CLASSES = [
  'group flex w-full cursor-pointer select-none items-start gap-2 text-left outline-none',
  'rounded-md border-solid [border-width:var(--theme-outline-width)]',
  'transition-[transform,box-shadow,background-color] duration-100 ease-out',
  'data-[focus-visible]:outline-[3px] data-[focus-visible]:outline-offset-[3px] data-[focus-visible]:outline-ring',
  'data-[pressed]:translate-y-0.5',
].join(' ');

// Normal: marked chips use the calm secondary color so the coral/gold start button stays the one highlight.
const NORMAL_CLASSES = [
  'min-h-11 items-center px-4 py-2',
  'border-border bg-transparent text-text-muted',
  'data-[selected]:border-border data-[selected]:bg-secondary data-[selected]:text-text-on-secondary',
  'data-[selected]:shadow-[0_3px_0_var(--theme-color-secondary-strong)]',
].join(' ');

const SPECIAL_CLASSES = [
  'min-h-[72px] px-4 py-3',
  'border-dashed border-special bg-transparent text-text',
  'data-[selected]:border-solid data-[selected]:border-border data-[selected]:bg-special data-[selected]:text-text-on-special',
  'data-[selected]:shadow-[0_4px_0_var(--theme-color-special-strong)]',
].join(' ');

/**
 * Category chip of the settings screen. Marked is shown by color AND by the check (or star), never
 * by color alone. The name and the discreet count sit on one line; a special one adds its description.
 */
export function CategoryChip({
  label,
  count,
  isSelected,
  onChange,
  isSpecial = false,
  description,
}: CategoryChipProps) {
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
            <span className="size-4 rounded-sm border-2 border-solid border-current opacity-70" />
          )}
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-1">
          <span
            className={`font-display leading-tight ${isSpecial ? 'text-[20px]' : 'text-[17px]'}`}
          >
            {label}
          </span>
          {isSpecial && description ? (
            <span className="text-[16px] leading-snug">{description}</span>
          ) : null}
        </span>
        <span className="shrink-0 text-[14px] font-medium opacity-80 [font-variant-numeric:tabular-nums]">
          {count}
        </span>
      </ToggleButton>
    </MotionConfig>
  );
}
