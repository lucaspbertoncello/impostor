import { Button as AriaButton } from 'react-aria-components';

import { MODE_DESCRIPTIONS } from '#/features/home/mode-picker/constants/mode-copy.constant.ts';
import { ArenaLogo } from '#/shared/components/logo/arena-logo.component.tsx';
import { ArrowLeftIcon } from '#/shared/ui/components/icons/arrow-left-icon.component.tsx';

type ArenaModeCardProps = {
  onPress: () => void;
};

/**
 * The Arena card of the Início: carries the whole Arena world (rays background, navy outline,
 * gold marquee button) through its own `data-theme`, whatever the page around it is.
 */
export function ArenaModeCard({ onPress }: ArenaModeCardProps) {
  return (
    <AriaButton
      data-theme="arena"
      onPress={onPress}
      aria-label={`Jogar Arena. ${MODE_DESCRIPTIONS.arena}`}
      className="relative flex min-h-[216px] md:min-h-[240px] w-full flex-col items-center justify-between gap-4 rounded-card bg-bg px-5 pt-5 pb-6 text-center font-body text-text shadow-card outline-none transition-[transform,box-shadow] duration-100 ease-out data-[focus-visible]:outline-solid data-[focus-visible]:outline-[3px] data-[focus-visible]:outline-offset-[6px] data-[focus-visible]:outline-ring data-[pressed]:translate-y-1"
    >
      <span aria-hidden="true" className="flex h-24 items-center justify-center md:h-28">
        <ArenaLogo className="h-full w-auto" />
      </span>
      <span className="flex w-full items-center justify-between gap-3 text-left">
        <span className="min-w-0 text-[17px] text-balance leading-snug font-bold text-text-muted">
          {MODE_DESCRIPTIONS.arena}
        </span>
        <span
          aria-hidden="true"
          className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-md border-solid border-border bg-primary px-4 font-display text-[18px] leading-none tracking-wide text-text-on-primary uppercase shadow-button [border-width:var(--theme-button-border)]"
        >
          Jogar
          <ArrowLeftIcon size={20} className="rotate-180" />
        </span>
      </span>
    </AriaButton>
  );
}
