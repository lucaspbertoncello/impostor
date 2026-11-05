import type { ReactNode } from 'react';

import { ArenaCardBack } from '#/features/match/reveal/components/arena-card/arena-card-back.component.tsx';
import { ArenaCardFront } from '#/features/match/reveal/components/arena-card/arena-card-front.component.tsx';
import { PartyCardBack } from '#/features/match/reveal/components/party-card/party-card-back.component.tsx';
import { PartyCardFront } from '#/features/match/reveal/components/party-card/party-card-front.component.tsx';
import { RevealFooter } from '#/features/match/reveal/components/reveal-footer/reveal-footer.component.tsx';
import type { CardFrontProps } from '#/features/match/reveal/types/card-front-props.type.ts';
import { FlipCard } from '#/shared/components/flip-card/flip-card.component.tsx';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';
import { Button } from '#/shared/ui/components/button/button.component.tsx';

type CardStepProps = {
  theme: ThemeName;
  playerName: string;
  cardNumber: number;
  cardCount: number;
  isLast: boolean;
  seen: boolean;
  readSecret: () => CardFrontProps | null;
  onFirstReveal: () => void;
  onNext: () => void;
};

const HELPER_ID = 'reveal-next-helper';

// The card is as wide as the phone allows, but never taller than the screen leaves for it.
const CARD_WIDTH = 'min(100%, max(216px, calc((100dvh - 304px) * 5 / 7)))';

function Front({ theme, secret }: { theme: ThemeName; secret: CardFrontProps }): ReactNode {
  return theme === 'arena' ? <ArenaCardFront {...secret} /> : <PartyCardFront {...secret} />;
}

/**
 * The face-down card and the "Próximo" button (RF-REV-001/002/004). The secret is read only inside
 * `renderFront`, which the FlipCard calls only while the card is held (BR-MAT-045/046): face down, nothing
 * secret is in the DOM or in a prop.
 */
export function CardStep({
  theme,
  playerName,
  cardNumber,
  cardCount,
  isLast,
  seen,
  readSecret,
  onFirstReveal,
  onNext,
}: CardStepProps) {
  return (
    <>
      <section className="flex flex-1 flex-col items-center justify-center gap-3 px-5 py-3">
        <p className="max-w-full truncate text-center text-base font-semibold text-text-muted">
          {playerName} · Carta {cardNumber} de {cardCount}
        </p>
        <div className="mx-auto w-full" style={{ maxWidth: CARD_WIDTH }}>
          <FlipCard
            label="Carta secreta. Segure para virar"
            flipStyle={theme}
            className="rounded-card"
            onFirstReveal={onFirstReveal}
            back={theme === 'arena' ? <ArenaCardBack /> : <PartyCardBack />}
            renderFront={() => {
              const secret = readSecret();
              return secret === null ? null : <Front theme={theme} secret={secret} />;
            }}
          />
        </div>
      </section>

      <RevealFooter helperId={HELPER_ID} helper={seen ? null : 'Vire a carta para ver'}>
        <Button
          size="lg"
          fullWidth
          isDisabled={!seen}
          className="data-[disabled]:outline-solid data-[disabled]:outline-2 data-[disabled]:-outline-offset-2 data-[disabled]:outline-text-muted/50"
          aria-describedby={seen ? undefined : HELPER_ID}
          onPress={onNext}
        >
          {isLast ? 'Começar partida' : 'Próximo'}
        </Button>
      </RevealFooter>
    </>
  );
}
