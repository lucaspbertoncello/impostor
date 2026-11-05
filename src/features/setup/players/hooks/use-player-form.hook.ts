import { useState } from 'react';

import type { PlayerDraft } from '#/features/setup/players/types/player-draft.type.ts';
import type { SubmitPlayerResult } from '#/features/setup/players/types/submit-player-result.type.ts';
import type { PlayerIconIndex } from '#/shared/types/player-icon-index.type.ts';

type UsePlayerFormOptions = {
  initial: PlayerDraft;
  onValidateName: (name: string) => string | null;
  onSubmit: (draft: PlayerDraft) => SubmitPlayerResult;
};

/**
 * State of the player sheet. RF-JOG-006: the error shows only after trying to add or leaving the
 * field with something typed (an empty field that loses focus stays quiet), and then follows the text.
 */
export function usePlayerForm({ initial, onValidateName, onSubmit }: UsePlayerFormOptions) {
  const [name, setName] = useState(initial.name);
  const [iconIndex, setIconIndex] = useState<PlayerIconIndex>(initial.iconIndex);
  const [isNameChecked, setIsNameChecked] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const errorMessage = (isNameChecked ? onValidateName(name) : null) ?? submitMessage;

  function changeName(value: string) {
    setName(value);
    setSubmitMessage(null);
  }

  function leaveName() {
    if (name.trim() !== '') setIsNameChecked(true);
  }

  function submit() {
    setIsNameChecked(true);
    if (onValidateName(name) !== null) return;

    const result = onSubmit({ name, iconIndex });
    if (!result.ok) setSubmitMessage(result.message);
  }

  return { name, iconIndex, errorMessage, changeName, setIconIndex, leaveName, submit };
}
