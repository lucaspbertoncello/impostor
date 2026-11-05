import { Group, Input, Label, NumberField, Text } from 'react-aria-components';

import { Button } from '#/shared/ui/components/button/button.component.tsx';
import { MinusIcon } from '#/shared/ui/components/icons/minus-icon.component.tsx';
import { PlusIcon } from '#/shared/ui/components/icons/plus-icon.component.tsx';

type NumberStepperProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  minValue: number;
  maxValue: number;
  /** Line under the control, e.g. "Máximo para 8 jogadores: 3". */
  description?: string;
};

/**
 * "- value +" control. The buttons disable at the limits; the field also answers to the arrow
 * keys, Home and End (React Aria NumberField). The value is clamped, never out of range.
 */
export function NumberStepper({
  label,
  value,
  onChange,
  minValue,
  maxValue,
  description,
}: NumberStepperProps) {
  return (
    <NumberField
      value={value}
      onChange={onChange}
      minValue={minValue}
      maxValue={maxValue}
      step={1}
      isWheelDisabled
      className="flex flex-col gap-2"
    >
      <Label className="text-[18px] font-semibold">{label}</Label>
      <Group className="flex items-center gap-3 rounded-lg border-solid border-border bg-surface-strong p-2 [border-width:var(--theme-outline-width)]">
        <Button slot="decrement" variant="secondary" size="icon" aria-label="Diminuir">
          <MinusIcon size={26} />
        </Button>
        <Input
          inputMode="numeric"
          className="min-w-0 flex-1 bg-transparent text-center font-display text-[44px] leading-none text-accent outline-none [font-variant-numeric:tabular-nums] arena:text-primary"
        />
        <Button slot="increment" variant="secondary" size="icon" aria-label="Aumentar">
          <PlusIcon size={26} />
        </Button>
      </Group>
      {description ? (
        <Text slot="description" className="text-[14px] text-text-muted">
          {description}
        </Text>
      ) : null}
    </NumberField>
  );
}
