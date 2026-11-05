import { useBlocker, useNavigate } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';

import { useRevealModel } from '#/features/match/reveal/reveal.model.ts';
import type { RevealViewProps } from '#/features/match/reveal/types/reveal-view-props.type.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

/**
 * Adapts the model to the View: the exit sheet (the "x" and the browser back, RF-GER-004/005) and the
 * navigation. Returns `null` while there is no round at the reveal (the screen is already leaving).
 */
export function useRevealViewModel(mode: ThemeName): RevealViewProps | null {
  const model = useRevealModel(mode);
  const navigate = useNavigate();
  const [isExitRequested, setIsExitRequested] = useState(false);
  const isLeaving = useRef(false);

  // The reveal is a single route: going back would leave it. Back is blocked and asks first, so it never
  // reaches a card already seen (RF-GER-004).
  const blocker = useBlocker({
    shouldBlockFn: () => !isLeaving.current,
    enableBeforeUnload: false,
    withResolver: true,
  });

  const isExitOpen = isExitRequested || blocker.status === 'blocked';

  // Leaves as soon as the round is not at the reveal: left, discarded or started (replace: back never returns here).
  const { stage } = model;
  useEffect(() => {
    if (stage === 'reveal') return;
    isLeaving.current = true;
    if (stage === 'round') void navigate({ to: '/$mode/round', params: { mode }, replace: true });
    else if (stage === 'result') {
      void navigate({ to: '/$mode/result', params: { mode }, replace: true });
    } else void navigate({ to: '/', replace: true });
  }, [stage, mode, navigate]);

  const { card } = model;
  if (card === null || model.cardKey === null || stage !== 'reveal') return null;
  const cardKey = model.cardKey;

  function closeExit() {
    setIsExitRequested(false);
    if (blocker.status === 'blocked') blocker.reset();
  }

  return {
    theme: mode,
    phase: model.phase,
    cardKey,
    player: { name: card.player.name, iconIndex: card.player.iconIndex },
    cardNumber: card.cardNumber,
    cardCount: card.cardCount,
    isLast: card.isLast,
    seen: card.seen,
    readSecret: model.readSecret,
    isExitOpen,
    onIAm: () => model.enterCard(cardKey),
    onFirstReveal: () => {
      model.markCardSeen();
    },
    onNext: () => {
      if (card.isLast) {
        if (model.goToRound()) model.clearStep();
      } else {
        model.advanceCard();
      }
    },
    onRequestExit: () => setIsExitRequested(true),
    onKeepPlaying: closeExit,
    onConfirmExit: () => {
      setIsExitRequested(false);
      if (blocker.status === 'blocked') blocker.reset();
      isLeaving.current = true;
      model.clearStep();
      model.discardRound();
    },
  };
}
