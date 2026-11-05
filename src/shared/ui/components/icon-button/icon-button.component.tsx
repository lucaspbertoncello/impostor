import type { ReactNode } from 'react';
import { Button as AriaButton, type ButtonProps as AriaButtonProps } from 'react-aria-components';

import {
  BUTTON_BASE_CLASSES,
  BUTTON_FACE_CLASSES,
} from '#/shared/ui/constants/button-face-classes.constant.ts';
import type { ButtonVariant } from '#/shared/ui/types/button-variant.type.ts';

type IconButtonProps = Omit<AriaButtonProps, 'className' | 'children' | 'aria-label'> & {
  /** Required: an icon alone has no name for a screen reader. */
  'aria-label': string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

/** Square (Arena) or round (Party) 48 px button that holds one icon. */
export function IconButton({
  variant = 'secondary',
  className,
  children,
  ...props
}: IconButtonProps) {
  const classes = [
    BUTTON_BASE_CLASSES,
    BUTTON_FACE_CLASSES[variant],
    'size-12 shrink-0 rounded-lg',
    className ?? '',
  ].join(' ');

  return (
    <AriaButton {...props} className={classes}>
      {children}
    </AriaButton>
  );
}
