import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';

import { Switch } from '#/shared/ui/components/switch/switch.component.tsx';

function Harness({ initial = false }: { initial?: boolean }) {
  const [isSelected, setIsSelected] = useState(initial);
  return (
    <div data-theme="arena">
      <Switch
        label="Dica para o impostor"
        description="Só o impostor vê, na carta dele."
        isSelected={isSelected}
        onChange={setIsSelected}
      />
    </div>
  );
}

describe('Switch', () => {
  it('exposes the label and starts off', () => {
    render(<Harness />);
    expect(screen.getByRole('switch', { name: /dica para o impostor/i })).not.toBeChecked();
  });

  it('toggles with a click', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const control = screen.getByRole('switch');
    await user.click(control);
    expect(control).toBeChecked();
    await user.click(control);
    expect(control).not.toBeChecked();
  });

  it('toggles with the Space key', async () => {
    const user = userEvent.setup();
    render(<Harness initial />);
    const control = screen.getByRole('switch');
    await user.tab();
    expect(control).toHaveFocus();
    await user.keyboard(' ');
    expect(control).not.toBeChecked();
  });
});
