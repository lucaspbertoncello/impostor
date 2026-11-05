import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

import { useModePickerModel } from '#/features/home/mode-picker/mode-picker.model.ts';
import type {
  DiscardTarget,
  ModePickerViewProps,
} from '#/features/home/mode-picker/types/mode-picker-view-props.type.ts';
import { getRoundRoute } from '#/features/home/mode-picker/utils/get-round-route.util.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

/** Bridges the model and the router to the View of the Início (RF-INI-002, RF-INI-004). */
export function useModePickerViewModel(): ModePickerViewProps {
  const navigate = useNavigate();
  const { rounds, discardRound, hasPlayed } = useModePickerModel();
  const [discardMode, setDiscardMode] = useState<ThemeName | null>(null);

  const resumeItems = rounds.map(({ mode, playerCount }) => ({ mode, playerCount }));
  const discardTarget: DiscardTarget | null =
    resumeItems.find((item) => item.mode === discardMode) ?? null;

  return {
    hasPlayed,
    resumeItems,
    onChooseMode: (mode) => {
      void navigate({ to: '/$mode/players', params: { mode } });
    },
    onContinueRound: (mode) => {
      const stage = rounds.find((round) => round.mode === mode)?.stage;
      if (stage === undefined) return;
      void navigate({ to: getRoundRoute(stage), params: { mode } });
    },
    onAskDiscard: setDiscardMode,
    discardTarget,
    onCancelDiscard: () => setDiscardMode(null),
    onConfirmDiscard: () => {
      if (discardMode !== null) discardRound(discardMode);
      setDiscardMode(null);
    },
  };
}
