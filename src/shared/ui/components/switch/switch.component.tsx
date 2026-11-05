import { motion, MotionConfig } from 'motion/react';
import { Switch as AriaSwitch } from 'react-aria-components';

import { CheckIcon } from '#/shared/ui/components/icons/check-icon.component.tsx';

type SwitchProps = {
  label: string;
  description?: string;
  isSelected: boolean;
  onChange: (isSelected: boolean) => void;
  isDisabled?: boolean;
};

const THUMB_TRAVEL = 30;

/**
 * Labelled switch. The thumb slides with a spring (instant under `prefers-reduced-motion`); the
 * on state also changes the track color and shows a check, so it never relies on color alone.
 */
export function Switch({ label, description, isSelected, onChange, isDisabled }: SwitchProps) {
  return (
    <MotionConfig reducedMotion="user">
      <AriaSwitch
        isSelected={isSelected}
        onChange={onChange}
        isDisabled={isDisabled}
        className="group flex min-h-14 cursor-pointer items-center justify-between gap-4 outline-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-60"
      >
        <span className="flex flex-col gap-0.5">
          <span className="text-[18px] font-semibold leading-snug">{label}</span>
          {description ? (
            <span className="text-[14px] leading-snug text-text-muted">{description}</span>
          ) : null}
        </span>
        <span
          aria-hidden="true"
          className="relative flex h-10 w-[72px] shrink-0 items-center rounded-lg border-solid border-border bg-surface-strong px-1 transition-colors duration-150 [border-width:var(--theme-outline-width)] group-data-[selected]:bg-primary group-data-[focus-visible]:outline-[3px] group-data-[focus-visible]:outline-offset-[3px] group-data-[focus-visible]:outline-ring arena:group-data-[selected]:shadow-[inset_0_3px_0_rgb(255_255_255/0.4),inset_0_-4px_0_rgb(0_0_0/0.2)]"
        >
          <motion.span
            initial={false}
            animate={{ x: isSelected ? THUMB_TRAVEL : 0 }}
            transition={{ type: 'spring', stiffness: 520, damping: 26, mass: 0.8 }}
            className="flex size-6 items-center justify-center rounded-md bg-text text-text-on-primary shadow-[0_2px_0_rgb(0_0_0/0.35)]"
          >
            <CheckIcon size={14} className={isSelected ? 'opacity-100' : 'opacity-0'} />
          </motion.span>
        </span>
      </AriaSwitch>
    </MotionConfig>
  );
}
