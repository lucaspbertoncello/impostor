import { Button as AriaButton } from 'react-aria-components';

import { MODE_DESCRIPTIONS } from '#/features/home/mode-picker/constants/mode-copy.constant.ts';
import { PartyLogo } from '#/shared/components/logo/party-logo.component.tsx';
import { ArrowLeftIcon } from '#/shared/ui/components/icons/arrow-left-icon.component.tsx';

type PartyModeCardProps = {
  onPress: () => void;
};

/**
 * The Festa card of the Início: flat indigo with the dot pattern, solid shadow, coral button, all
 * from its own `data-theme`.
 */
export function PartyModeCard({ onPress }: PartyModeCardProps) {
  return (
    <AriaButton
      data-theme="party"
      onPress={onPress}
      aria-label={`Jogar Festa. ${MODE_DESCRIPTIONS.party}`}
      className="relative flex min-h-[216px] md:min-h-[240px] w-full flex-col items-center justify-between gap-4 rounded-card border-solid border-border bg-bg px-5 pt-5 pb-6 text-center font-body text-text shadow-card outline-none transition-[transform,box-shadow] duration-100 ease-out [border-width:var(--theme-outline-width)] data-[focus-visible]:outline-solid data-[focus-visible]:outline-[3px] data-[focus-visible]:outline-offset-4 data-[focus-visible]:outline-ring data-[pressed]:translate-y-1.5 data-[pressed]:shadow-none"
    >
      <span aria-hidden="true" className="flex h-24 items-center justify-center md:h-28">
        <PartyLogo variant="on-dark" className="h-auto w-[260px] max-w-full md:w-[300px]" />
      </span>
      <span className="flex w-full items-center justify-between gap-3 text-left">
        <span className="min-w-0 text-[17px] text-balance leading-snug font-semibold text-text-muted">
          {MODE_DESCRIPTIONS.party}
        </span>
        <span
          aria-hidden="true"
          className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-md bg-primary px-4 font-display text-[18px] leading-none font-bold text-text-on-primary shadow-[0_6px_0_var(--theme-color-primary-strong)]"
        >
          Jogar
          <ArrowLeftIcon size={20} className="rotate-180" />
        </span>
      </span>
    </AriaButton>
  );
}
