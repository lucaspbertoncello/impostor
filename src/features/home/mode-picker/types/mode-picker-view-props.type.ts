import type { ThemeName } from '#/shared/types/theme-name.type.ts';

export type ResumeItem = {
  mode: ThemeName;
  playerCount: number;
};

export type DiscardTarget = ResumeItem;

export type ModePickerViewProps = {
  /** True once a match was played: the intro starts collapsed (RF-INI-003). */
  hasPlayed: boolean;
  resumeItems: ResumeItem[];
  onChooseMode: (mode: ThemeName) => void;
  onContinueRound: (mode: ThemeName) => void;
  onAskDiscard: (mode: ThemeName) => void;
  discardTarget: DiscardTarget | null;
  onCancelDiscard: () => void;
  onConfirmDiscard: () => void;
};
