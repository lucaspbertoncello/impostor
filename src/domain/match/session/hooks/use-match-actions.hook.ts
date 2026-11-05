import { useShallow } from 'zustand/react/shallow';

import { useMatchSession } from '#/domain/match/session/stores/match-session.store.ts';

/**
 * The actions of the round. Each takes the mode. All but `startRound` and `startNewRound` return whether
 * they applied (an action out of its stage does nothing and returns false).
 */
export function useMatchActions() {
  return useMatchSession(
    useShallow((state) => ({
      startRound: state.startRound,
      startNewRound: state.startNewRound,
      markCardSeen: state.markCardSeen,
      advanceCard: state.advanceCard,
      goToRound: state.goToRound,
      revealResult: state.revealResult,
      changeSettings: state.changeSettings,
      switchMode: state.switchMode,
      discardRound: state.discardRound,
    })),
  );
}
