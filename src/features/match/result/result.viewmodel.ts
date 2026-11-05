import { useNavigate } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';

import { useResultModel } from '#/features/match/result/result.model.ts';
import type { ResultViewProps } from '#/features/match/result/result.view.tsx';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

/**
 * Wires the result screen: the three exits (RF-RES-002) and the guard for a stage that is not
 * this one. `null` while the round is not at the result (the effect sends the player away).
 */
export function useResultViewModel(mode: ThemeName): ResultViewProps | null {
  const navigate = useNavigate();
  const { result, stage, startNewRound, changeSettings, switchMode } = useResultModel(mode);
  // Set right before this screen leaves on purpose, so the stage change it causes is not a redirect.
  const isLeaving = useRef(false);

  // Reload or deep link with no finished round: go to the screen the round is at.
  useEffect(() => {
    if (stage === 'result' || isLeaving.current) return;
    isLeaving.current = true;

    if (stage === 'reveal') void navigate({ to: '/$mode/reveal', params: { mode }, replace: true });
    else if (stage === 'round')
      void navigate({ to: '/$mode/round', params: { mode }, replace: true });
    else void navigate({ to: '/', replace: true });
  }, [stage, mode, navigate]);

  if (result === null) return null;

  function newRound() {
    isLeaving.current = true;
    // BR-MAT-032: a full new draw with the same players and settings, straight to the reveal.
    // It only fails if the settings no longer allow a draw: the settings screen is where to fix it.
    const draw = startNewRound(mode);
    if (draw.ok) void navigate({ to: '/$mode/reveal', params: { mode } });
    else void navigate({ to: '/$mode/settings', params: { mode } });
  }

  function changeConfiguration() {
    isLeaving.current = true;
    changeSettings(mode);
    void navigate({ to: '/$mode/settings', params: { mode } });
  }

  function switchToStart() {
    isLeaving.current = true;
    switchMode(mode);
    void navigate({ to: '/' });
  }

  return {
    theme: mode,
    word: result.word,
    categoryName: result.categoryName,
    impostors: result.impostors,
    hint: result.hint,
    onNewRound: newRound,
    onChangeSettings: changeConfiguration,
    onSwitchMode: switchToStart,
  };
}
