import { SETTINGS_COPY } from '#/features/setup/match-settings/constants/settings-copy.constant.ts';
import { Switch } from '#/shared/ui/components/switch/switch.component.tsx';

type HintSectionProps = {
  isEnabled: boolean;
  onChange: (isEnabled: boolean) => void;
};

/** RF-CFG-001 item 3: the hint switch and its explanation line. */
export function HintSection({ isEnabled, onChange }: HintSectionProps) {
  return (
    <section className="flex flex-col gap-2 rounded-lg bg-surface px-4 py-3">
      <Switch label={SETTINGS_COPY.hintLabel} isSelected={isEnabled} onChange={onChange} />
      <p className="text-[16px] leading-snug text-text-muted">{SETTINGS_COPY.hintDescription}</p>
    </section>
  );
}
