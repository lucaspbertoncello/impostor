import { useCallback, useState } from 'react';

import { APP_STORAGE } from '#/domain/match/storage/constants/app-storage.constant.ts';
import { revealStepStateSchema } from '#/features/match/reveal/schemas/reveal-step-state.schema.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

const STORAGE_KEY = 'impostor-reveal-step';

type RevealStepState = ReturnType<typeof revealStepStateSchema.parse>;

const EMPTY_STATE: RevealStepState = { steps: { arena: null, party: null } };

function readState(): RevealStepState {
  const raw = APP_STORAGE.getItem(STORAGE_KEY);
  if (typeof raw !== 'string') return EMPTY_STATE;

  try {
    const parsed = revealStepStateSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : EMPTY_STATE;
  } catch {
    return EMPTY_STATE;
  }
}

function writeState(state: RevealStepState) {
  void APP_STORAGE.setItem(STORAGE_KEY, JSON.stringify(state));
}

/**
 * The sub-step of the reveal (pass the phone or face-down card), kept in the component state and saved in the
 * app storage so a reload comes back to it (RF-REV-005). It is not a store: only this screen reads it, and it
 * holds only a card key (who holds the card and its position), never the word or the role.
 */
export function useRevealStep(mode: ThemeName) {
  const [state, setState] = useState<RevealStepState>(readState);

  const update = useCallback((next: RevealStepState) => {
    setState(next);
    writeState(next);
  }, []);

  const enterCard = useCallback(
    (cardKey: string) => update({ steps: { ...state.steps, [mode]: { cardKey } } }),
    [mode, state, update],
  );
  const clear = useCallback(
    () => update({ steps: { ...state.steps, [mode]: null } }),
    [mode, state, update],
  );

  return { enteredCardKey: state.steps[mode]?.cardKey ?? null, enterCard, clear };
}
