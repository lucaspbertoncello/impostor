import type { ReactNode } from 'react';
import { Button } from 'react-aria-components';

type ShortcutButtonProps = {
  children: ReactNode;
  onPress: () => void;
};

/** Light text action ("Marcar todas", "Limpar"): different from the chips so it is not read as one. */
export function ShortcutButton({ children, onPress }: ShortcutButtonProps) {
  return (
    <Button
      onPress={onPress}
      className="min-h-11 cursor-pointer rounded-md px-3 text-[16px] font-bold text-accent underline decoration-2 underline-offset-4 outline-none data-[focus-visible]:outline-solid data-[focus-visible]:outline-[3px] data-[focus-visible]:outline-ring data-[pressed]:opacity-70 arena:font-display arena:tracking-wide arena:uppercase"
    >
      {children}
    </Button>
  );
}
