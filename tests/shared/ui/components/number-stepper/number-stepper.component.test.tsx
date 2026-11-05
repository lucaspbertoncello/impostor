import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';

import { NumberStepper } from '#/shared/ui/components/number-stepper/number-stepper.component.tsx';

function Harness({ initial, max = 3 }: { initial: number; max?: number }) {
  const [value, setValue] = useState(initial);
  return (
    <div data-theme="party">
      <NumberStepper
        label="Impostores"
        value={value}
        onChange={setValue}
        minValue={1}
        maxValue={max}
      />
    </div>
  );
}

describe('NumberStepper', () => {
  it('shows the value and labels the field', () => {
    render(<Harness initial={2} />);
    expect(screen.getByRole('textbox', { name: 'Impostores' })).toHaveValue('2');
  });

  it('increments and decrements with the buttons', async () => {
    const user = userEvent.setup();
    render(<Harness initial={2} />);
    await user.click(screen.getByRole('button', { name: /aumentar/i }));
    expect(screen.getByRole('textbox')).toHaveValue('3');
    await user.click(screen.getByRole('button', { name: /diminuir/i }));
    expect(screen.getByRole('textbox')).toHaveValue('2');
  });

  it('disables "+" at the maximum and "-" at the minimum', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<Harness initial={3} />);
    expect(screen.getByRole('button', { name: /aumentar/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /diminuir/i })).toBeEnabled();
    unmount();

    render(<Harness initial={1} />);
    expect(screen.getByRole('button', { name: /diminuir/i })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: /aumentar/i }));
    expect(screen.getByRole('textbox')).toHaveValue('2');
  });

  it('answers to the arrow keys and never leaves the range', async () => {
    const user = userEvent.setup();
    render(<Harness initial={2} max={3} />);
    const field = screen.getByRole('textbox');
    await user.click(field);
    await user.keyboard('{ArrowUp}{ArrowUp}{ArrowUp}');
    expect(field).toHaveValue('3');
    await user.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}');
    expect(field).toHaveValue('1');
  });

  it('jumps to the limits with End and Home', async () => {
    const user = userEvent.setup();
    render(<Harness initial={2} max={3} />);
    const field = screen.getByRole('textbox');
    await user.click(field);
    await user.keyboard('{End}');
    expect(field).toHaveValue('3');
    await user.keyboard('{Home}');
    expect(field).toHaveValue('1');
  });
});
