import type { ComponentType } from 'react';

import { ArcherIcon } from '#/shared/components/player-avatar/arena/icons/archer-icon.component.tsx';
import { DragonIcon } from '#/shared/components/player-avatar/arena/icons/dragon-icon.component.tsx';
import { DwarfIcon } from '#/shared/components/player-avatar/arena/icons/dwarf-icon.component.tsx';
import { FairyIcon } from '#/shared/components/player-avatar/arena/icons/fairy-icon.component.tsx';
import { GnomeIcon } from '#/shared/components/player-avatar/arena/icons/gnome-icon.component.tsx';
import { GoblinIcon } from '#/shared/components/player-avatar/arena/icons/goblin-icon.component.tsx';
import { GolemIcon } from '#/shared/components/player-avatar/arena/icons/golem-icon.component.tsx';
import { KnightIcon } from '#/shared/components/player-avatar/arena/icons/knight-icon.component.tsx';
import { MonkIcon } from '#/shared/components/player-avatar/arena/icons/monk-icon.component.tsx';
import { OgreIcon } from '#/shared/components/player-avatar/arena/icons/ogre-icon.component.tsx';
import { RogueIcon } from '#/shared/components/player-avatar/arena/icons/rogue-icon.component.tsx';
import { SkeletonIcon } from '#/shared/components/player-avatar/arena/icons/skeleton-icon.component.tsx';
import { SlimeIcon } from '#/shared/components/player-avatar/arena/icons/slime-icon.component.tsx';
import { SpiritIcon } from '#/shared/components/player-avatar/arena/icons/spirit-icon.component.tsx';
import { WitchIcon } from '#/shared/components/player-avatar/arena/icons/witch-icon.component.tsx';
import { WizardIcon } from '#/shared/components/player-avatar/arena/icons/wizard-icon.component.tsx';
import type { PlayerIconIndex } from '#/shared/types/player-icon-index.type.ts';

type ArenaCharacter = {
  /** Character name in Portuguese: the accessible title of the icon. */
  name: string;
  Drawing: ComponentType;
};

/** The 16 characters, by player position (BR-MAT-013); the same position is a different drawing in the party theme. */
export const ARENA_ICON_CHARACTERS: Record<PlayerIconIndex, ArenaCharacter> = {
  1: { name: 'Cavaleiro', Drawing: KnightIcon },
  2: { name: 'Mago', Drawing: WizardIcon },
  3: { name: 'Arqueira', Drawing: ArcherIcon },
  4: { name: 'Goblin', Drawing: GoblinIcon },
  5: { name: 'Esqueleto', Drawing: SkeletonIcon },
  6: { name: 'Dragãozinho', Drawing: DragonIcon },
  7: { name: 'Ladino', Drawing: RogueIcon },
  8: { name: 'Anão ferreiro', Drawing: DwarfIcon },
  9: { name: 'Fada', Drawing: FairyIcon },
  10: { name: 'Ogro', Drawing: OgreIcon },
  11: { name: 'Bruxa', Drawing: WitchIcon },
  12: { name: 'Golem', Drawing: GolemIcon },
  13: { name: 'Gnomo', Drawing: GnomeIcon },
  14: { name: 'Slime', Drawing: SlimeIcon },
  15: { name: 'Monge', Drawing: MonkIcon },
  16: { name: 'Espírito', Drawing: SpiritIcon },
};
