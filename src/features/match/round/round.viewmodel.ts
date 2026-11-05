import { useBlocker, useNavigate } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';

import { useRoundModel } from '#/features/match/round/round.model.ts';
import type { RoundViewProps } from '#/features/match/round/round.view.tsx';
import { getImpostorLabel } from '#/features/match/round/utils/get-impostor-label.util.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

/**
 * Wires the round screen: the two sheets, the browser back button (RF-GER-004) and the way out.
 * `null` while the round is not at this stage (the effect below already sends the player away).
 */
export function useRoundViewModel(mode: ThemeName): RoundViewProps | null {
  const navigate = useNavigate();
  const { order, stage, revealResult, discardRound } = useRoundModel(mode);
  const [isRevealSheetOpen, setRevealSheetOpen] = useState(false);
  const [isExitRequested, setExitRequested] = useState(false);
  // Set right before this screen leaves on purpose, so the back blocker lets it through.
  const isLeaving = useRef(false);

  // RF-GER-004: back never navigates here; it opens "Sair da rodada?".
  const blocker = useBlocker({
    shouldBlockFn: () => !isLeaving.current,
    withResolver: true,
    enableBeforeUnload: false,
  });

  // Reload or deep link into a stage this screen does not own: go to the right screen.
  useEffect(() => {
    if (stage === 'round' || isLeaving.current) return;
    isLeaving.current = true;

    if (stage === 'reveal') void navigate({ to: '/$mode/reveal', params: { mode }, replace: true });
    else if (stage === 'result')
      void navigate({ to: '/$mode/result', params: { mode }, replace: true });
    else void navigate({ to: '/', replace: true });
  }, [stage, mode, navigate]);

  if (order === null || stage !== 'round') return null;

  const isExitSheetOpen = isExitRequested || blocker.status === 'blocked';

  function closeExitSheet() {
    setExitRequested(false);
    if (blocker.status === 'blocked') blocker.reset();
  }

  function confirmReveal() {
    isLeaving.current = true;
    if (!revealResult(mode)) {
      isLeaving.current = false;
      return;
    }
    setRevealSheetOpen(false);
    void navigate({ to: '/$mode/result', params: { mode } });
  }

  function confirmExit() {
    isLeaving.current = true;
    closeExitSheet();
    discardRound(mode);
    void navigate({ to: '/' });
  }

  return {
    theme: mode,
    impostorLabel: getImpostorLabel(order.impostorCount),
    firstPlayer: order.firstPlayer,
    speakingOrder: order.speakingOrder,
    isRevealSheetOpen,
    isExitSheetOpen,
    onRequestReveal: () => {
      setRevealSheetOpen(true);
    },
    onRevealSheetOpenChange: setRevealSheetOpen,
    onConfirmReveal: confirmReveal,
    onRequestExit: () => {
      setExitRequested(true);
    },
    onExitSheetOpenChange: (isOpen) => {
      if (isOpen) setExitRequested(true);
      else closeExitSheet();
    },
    onConfirmExit: confirmExit,
  };
}
