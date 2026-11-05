import { SETTINGS_COPY } from '#/features/setup/match-settings/constants/settings-copy.constant.ts';
import { getImpostorLimitText } from '#/features/setup/match-settings/utils/get-impostor-limit-text.util.ts';
import { NumberStepper } from '#/shared/ui/components/number-stepper/number-stepper.component.tsx';

type ImpostorSectionProps = {
  playerCount: number;
  impostorCount: number;
  maxImpostors: number;
  wasAdjusted: boolean;
  onChange: (count: number) => void;
};

/** RF-CFG-002: the stepper from 1 to the maximum, the limit line and the "adjusted" note. */
export function ImpostorSection({
  playerCount,
  impostorCount,
  maxImpostors,
  wasAdjusted,
  onChange,
}: ImpostorSectionProps) {
  return (
    <section className="flex flex-col gap-3">
      <NumberStepper
        label={SETTINGS_COPY.impostorsLabel}
        value={impostorCount}
        onChange={onChange}
        minValue={1}
        maxValue={maxImpostors}
      />
      <p className="text-[16px] leading-snug text-text-muted">
        {getImpostorLimitText(playerCount, maxImpostors)}
      </p>
      {wasAdjusted ? (
        <p role="status" className="text-[16px] leading-snug font-semibold text-accent">
          {SETTINGS_COPY.adjustedNote}
        </p>
      ) : null}
    </section>
  );
}
