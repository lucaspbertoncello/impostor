import { Button as AriaButton, type ButtonProps as AriaButtonProps } from 'react-aria-components';

import {
  BUTTON_BASE_CLASSES,
  BUTTON_FACE_CLASSES,
} from '#/shared/ui/constants/button-face-classes.constant.ts';
import type { ButtonVariant } from '#/shared/ui/types/button-variant.type.ts';

type ButtonProps = Omit<AriaButtonProps, 'className'> & {
  variant?: ButtonVariant;
  /** `lg` (60 px) is for the one main action of a screen; `md` (48 px) for everything else; `icon` is a 56 px square for a lone icon. */
  size?: 'md' | 'lg' | 'icon';
  fullWidth?: boolean;
  className?: string;
};

const SIZE_CLASSES = {
  md: 'min-h-12 min-w-12 gap-2 px-5 text-[18px]',
  icon: 'size-14 text-[18px]',
  lg: 'min-h-[60px] min-w-[60px] gap-3 px-7 text-[22px]',
} as const;

/**
 * Game button: solid base that sinks when pressed. Arena adds a dark outline and an inner
 * highlight; Party stays flat with a colored base. The shape is set by the theme tokens.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  const classes = [
    BUTTON_BASE_CLASSES,
    BUTTON_FACE_CLASSES[variant],
    SIZE_CLASSES[size],
    'rounded-md font-display leading-none',
    'arena:tracking-wide arena:uppercase party:font-bold',
    fullWidth ? 'w-full' : '',
    className ?? '',
  ].join(' ');

  return <AriaButton {...props} className={classes} />;
}
