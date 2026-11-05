import { CardStep } from '#/features/match/reveal/components/card-step/card-step.component.tsx';
import { ExitSheet } from '#/features/match/reveal/components/exit-sheet/exit-sheet.component.tsx';
import { PassStep } from '#/features/match/reveal/components/pass-step/pass-step.component.tsx';
import type { RevealViewProps } from '#/features/match/reveal/types/reveal-view-props.type.ts';
import { CloseIcon } from '#/shared/ui/components/icons/close-icon.component.tsx';
import { IconButton } from '#/shared/ui/components/icon-button/icon-button.component.tsx';
import { ScreenHeader } from '#/shared/ui/components/screen-header/screen-header.component.tsx';

/** The reveal screen: the pass-the-phone step or the face-down card, for the player of the turn. */
export function RevealView({
  theme,
  phase,
  cardKey,
  player,
  cardNumber,
  cardCount,
  isLast,
  seen,
  readSecret,
  isExitOpen,
  onIAm,
  onFirstReveal,
  onNext,
  onRequestExit,
  onKeepPlaying,
  onConfirmExit,
}: RevealViewProps) {
  return (
    <main className="flex flex-1 flex-col">
      <ScreenHeader
        theme={theme}
        title="Revelação"
        trailing={
          <IconButton aria-label="Sair da rodada" onPress={onRequestExit}>
            <CloseIcon size={22} />
          </IconButton>
        }
      />
      {phase === 'pass' ? (
        <PassStep
          theme={theme}
          player={player}
          cardNumber={cardNumber}
          cardCount={cardCount}
          onIAm={onIAm}
        />
      ) : (
        <CardStep
          key={cardKey}
          theme={theme}
          playerName={player.name}
          cardNumber={cardNumber}
          cardCount={cardCount}
          isLast={isLast}
          seen={seen}
          readSecret={readSecret}
          onFirstReveal={onFirstReveal}
          onNext={onNext}
        />
      )}
      <ExitSheet
        theme={theme}
        isOpen={isExitOpen}
        onKeepPlaying={onKeepPlaying}
        onConfirmExit={onConfirmExit}
      />
    </main>
  );
}
