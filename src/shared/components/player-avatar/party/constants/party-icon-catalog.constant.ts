import { PartyLion } from '#/shared/components/player-avatar/party/components/party-lion.component.tsx';
import { PartyOwl } from '#/shared/components/player-avatar/party/components/party-owl.component.tsx';
import { PartyFox } from '#/shared/components/player-avatar/party/components/party-fox.component.tsx';
import { PartyPenguin } from '#/shared/components/player-avatar/party/components/party-penguin.component.tsx';
import { PartyFish } from '#/shared/components/player-avatar/party/components/party-fish.component.tsx';
import { PartyCat } from '#/shared/components/player-avatar/party/components/party-cat.component.tsx';
import { PartyRabbit } from '#/shared/components/player-avatar/party/components/party-rabbit.component.tsx';
import { PartySheep } from '#/shared/components/player-avatar/party/components/party-sheep.component.tsx';
import { PartyBee } from '#/shared/components/player-avatar/party/components/party-bee.component.tsx';
import { PartyWolf } from '#/shared/components/player-avatar/party/components/party-wolf.component.tsx';
import { PartyDog } from '#/shared/components/player-avatar/party/components/party-dog.component.tsx';
import { PartySeal } from '#/shared/components/player-avatar/party/components/party-seal.component.tsx';
import { PartyStar } from '#/shared/components/player-avatar/party/components/party-star.component.tsx';
import { PartyOctopus } from '#/shared/components/player-avatar/party/components/party-octopus.component.tsx';
import { PartyHamster } from '#/shared/components/player-avatar/party/components/party-hamster.component.tsx';
import { PartyBear } from '#/shared/components/player-avatar/party/components/party-bear.component.tsx';
import type { PlayerIconIndex } from '#/shared/types/player-icon-index.type.ts';
import type { ComponentType } from 'react';

/** The 16 positions: character name (Portuguese, used as the accessible title) and its drawing. */
export const PARTY_ICON_CATALOG: Record<PlayerIconIndex, { name: string; Drawing: ComponentType }> =
  {
    1: { name: 'Leão', Drawing: PartyLion },
    2: { name: 'Coruja', Drawing: PartyOwl },
    3: { name: 'Raposa', Drawing: PartyFox },
    4: { name: 'Pinguim', Drawing: PartyPenguin },
    5: { name: 'Peixe', Drawing: PartyFish },
    6: { name: 'Gato', Drawing: PartyCat },
    7: { name: 'Coelho', Drawing: PartyRabbit },
    8: { name: 'Ovelha', Drawing: PartySheep },
    9: { name: 'Abelha', Drawing: PartyBee },
    10: { name: 'Lobo', Drawing: PartyWolf },
    11: { name: 'Cachorro', Drawing: PartyDog },
    12: { name: 'Foca', Drawing: PartySeal },
    13: { name: 'Estrela', Drawing: PartyStar },
    14: { name: 'Polvo', Drawing: PartyOctopus },
    15: { name: 'Hamster', Drawing: PartyHamster },
    16: { name: 'Urso', Drawing: PartyBear },
  };
