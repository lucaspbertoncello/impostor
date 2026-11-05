import type { CardFrontProps } from '#/features/match/reveal/types/card-front-props.type.ts';
import type { PlayerIconIndex } from '#/shared/types/player-icon-index.type.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

/** Everything the reveal View draws. Nothing here is secret: the secret is read by `readSecret`, on demand. */
export type RevealViewProps = {
  theme: ThemeName;
  phase: 'pass' | 'card';
  /** Stable per card: a new key mounts a fresh face-down card. */
  cardKey: string;
  player: { name: string; iconIndex: PlayerIconIndex };
  cardNumber: number;
  cardCount: number;
  isLast: boolean;
  /** The card was turned at least once: "Próximo" is enabled (RF-REV-004). */
  seen: boolean;
  /** Called only inside the `renderFront` of the FlipCard, so the secret exists only while the card is held. */
  readSecret: () => CardFrontProps | null;
  isExitOpen: boolean;
  onIAm: () => void;
  onFirstReveal: () => void;
  onNext: () => void;
  onRequestExit: () => void;
  onKeepPlaying: () => void;
  onConfirmExit: () => void;
};
