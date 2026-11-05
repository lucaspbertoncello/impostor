import { Radio, RadioGroup } from 'react-aria-components';

import { PlayerAvatar } from '#/shared/components/player-avatar/player-avatar.component.tsx';
import { PLAYER_ICON_INDEXES } from '#/shared/constants/player-icon-indexes.constant.ts';
import type { PlayerIconIndex } from '#/shared/types/player-icon-index.type.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';
import { CheckIcon } from '#/shared/ui/components/icons/check-icon.component.tsx';

type IconPickerProps = {
  theme: ThemeName;
  value: PlayerIconIndex;
  onChange: (index: PlayerIconIndex) => void;
  /** Icons taken by other players: marked "em uso", still selectable (RF-JOG-008). */
  usedIcons: readonly PlayerIconIndex[];
};

const CELL_CLASSES = [
  'group relative flex h-[72px] cursor-pointer select-none flex-col items-center gap-0.5 pt-2',
  'rounded-md bg-surface-strong outline-none',
  'border-solid border-transparent [border-width:var(--theme-outline-width)]',
  'transition-[transform,box-shadow,border-color] duration-100 ease-out',
  'data-[selected]:border-primary data-[selected]:bg-surface',
  'data-[focus-visible]:outline-solid data-[focus-visible]:outline-[3px] data-[focus-visible]:outline-offset-2 data-[focus-visible]:outline-ring',
  'data-[pressed]:translate-y-0.5',
].join(' ');

/** The 16 icons of the theme as a radio group in 4 columns; the chosen one has a check, never color alone. */
export function IconPicker({ theme, value, onChange, usedIcons }: IconPickerProps) {
  return (
    <RadioGroup
      aria-label="Ícone do jogador"
      value={String(value)}
      onChange={(next) => {
        const index = PLAYER_ICON_INDEXES.find((candidate) => String(candidate) === next);
        if (index !== undefined) onChange(index);
      }}
      className="grid grid-cols-4 gap-2"
    >
      {PLAYER_ICON_INDEXES.map((index) => {
        const isUsed = usedIcons.includes(index);

        return (
          <Radio
            key={index}
            value={String(index)}
            aria-label={`Ícone ${index}${isUsed ? ', em uso' : ''}`}
            className={CELL_CLASSES}
          >
            <span className={isUsed ? 'opacity-55' : ''}>
              <PlayerAvatar theme={theme} index={index} size={40} />
            </span>
            {isUsed ? (
              <span aria-hidden="true" className="text-[14px] leading-tight text-text-muted">
                em uso
              </span>
            ) : null}
            <span
              aria-hidden="true"
              className="absolute -top-2 -right-2 hidden size-6 items-center justify-center rounded-full bg-primary text-text-on-primary group-data-[selected]:flex"
            >
              <CheckIcon size={14} />
            </span>
          </Radio>
        );
      })}
    </RadioGroup>
  );
}
