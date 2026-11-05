import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { drawRound } from '#/domain/match/draw/rules/draw-round.rule.ts';
import type { RandomInt } from '#/domain/match/draw/types/random-int.type.ts';
import { useWordHistory } from '#/domain/match/history/stores/word-history.store.ts';
import { advanceCard as advanceCardRule } from '#/domain/match/session/rules/advance-card.rule.ts';
import { goToRound as goToRoundRule } from '#/domain/match/session/rules/go-to-round.rule.ts';
import { markCardSeen as markCardSeenRule } from '#/domain/match/session/rules/mark-card-seen.rule.ts';
import { revealRound as revealRoundRule } from '#/domain/match/session/rules/reveal-round.rule.ts';
import { matchSessionStateSchema } from '#/domain/match/session/schemas/match-session-state.schema.ts';
import type { Round } from '#/domain/match/session/types/round.type.ts';
import type { StartRoundResult } from '#/domain/match/session/types/start-round-result.type.ts';
import { APP_STORAGE } from '#/domain/match/storage/constants/app-storage.constant.ts';
import { createValidatedMerge } from '#/domain/match/storage/utils/create-validated-merge.util.ts';
import { useRoster } from '#/domain/players/roster/stores/roster.store.ts';
import { useMatchSettings } from '#/domain/settings/match/stores/match-settings.store.ts';
import { getModeCategories } from '#/domain/words/word-bank/rules/get-mode-categories.rule.ts';
import type { WordCategory } from '#/domain/words/word-bank/types/word-category.type.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

/** Only for tests: a fixed random source and a fake bank. */
export type StartRoundOptions = {
  randomInt?: RandomInt;
  categories?: readonly WordCategory[];
};

type MatchSessionState = {
  /** The round in progress of each mode (BR-MAT-030); it holds the secret of the round. */
  rounds: Record<ThemeName, Round | null>;
};

type MatchSessionActions = {
  /** RF-CFG-006: full draw, saves the round (replacing any other of the mode) and leaves it at the reveal. */
  startRound: (mode: ThemeName, options?: StartRoundOptions) => StartRoundResult;
  /** BR-MAT-032: same as `startRound`, from the result; same players and settings. */
  startNewRound: (mode: ThemeName, options?: StartRoundOptions) => StartRoundResult;
  /** The card of the turn was turned at least once. */
  markCardSeen: (mode: ThemeName) => boolean;
  /** Next player; only after the card was seen and not on the last card. */
  advanceCard: (mode: ThemeName) => boolean;
  /** From the last card to the round screen; only after the last card was seen. */
  goToRound: (mode: ThemeName) => boolean;
  /** From the round screen to the result. */
  revealResult: (mode: ThemeName) => boolean;
  /** BR-MAT-033: "Mudar configuração" discards the finished round; players and history stay. */
  changeSettings: (mode: ThemeName) => void;
  /** BR-MAT-033: "Trocar modo" discards the finished round; players and history stay. */
  switchMode: (mode: ThemeName) => void;
  /** Throws the round of a mode away (RF-GER-005, RF-INI-004); settings and players stay. */
  discardRound: (mode: ThemeName) => void;
};

const INITIAL_STATE: MatchSessionState = { rounds: { arena: null, party: null } };

/**
 * Never read it from a screen: it holds the secret. Screens use `useCurrentCard`, `getCurrentCardSecret`,
 * `useRoundOrder`, `useRoundResult`, `useRoundStage`, `useResumableRounds` and `useMatchActions`.
 */
export const useMatchSession = create<MatchSessionState & MatchSessionActions>()(
  persist(
    (set, get) => {
      function setRound(mode: ThemeName, round: Round | null) {
        set({ rounds: { ...get().rounds, [mode]: round } });
      }

      function transition(mode: ThemeName, rule: (round: Round) => Round | null): boolean {
        const round = get().rounds[mode];
        const next = round === null ? null : rule(round);
        if (next === null) return false;

        setRound(mode, next);
        return true;
      }

      function startRound(mode: ThemeName, options: StartRoundOptions = {}): StartRoundResult {
        const settings = useMatchSettings.getState().settings[mode];
        const result = drawRound({
          players: useRoster.getState().players,
          impostorCount: settings.impostorCount,
          hintEnabled: settings.hintEnabled,
          categories: options.categories ?? getModeCategories(mode),
          selectedCategoryIds: mode === 'arena' ? null : settings.categoryIds,
          usedWordIds: useWordHistory.getState().usedWordIds[mode],
          ...(options.randomInt === undefined ? {} : { randomInt: options.randomInt }),
        });
        if (!result.ok) return { ok: false, reason: result.reason };

        useWordHistory.getState().setUsedWordIds(mode, result.usedWordIds);
        setRound(mode, result.round);

        return { ok: true };
      }

      return {
        ...INITIAL_STATE,
        startRound,
        startNewRound: startRound,
        markCardSeen: (mode) => transition(mode, markCardSeenRule),
        advanceCard: (mode) => transition(mode, advanceCardRule),
        goToRound: (mode) => transition(mode, goToRoundRule),
        revealResult: (mode) => transition(mode, revealRoundRule),
        changeSettings: (mode) => setRound(mode, null),
        switchMode: (mode) => setRound(mode, null),
        discardRound: (mode) => setRound(mode, null),
      };
    },
    {
      name: 'impostor-rounds',
      version: 1,
      storage: createJSONStorage(() => APP_STORAGE),
      partialize: (state) => ({ rounds: state.rounds }),
      merge: createValidatedMerge<MatchSessionState & MatchSessionActions, MatchSessionState>(
        matchSessionStateSchema,
      ),
    },
  ),
);
