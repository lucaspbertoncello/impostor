import { useWordHistory } from '#/domain/match/history/stores/word-history.store.ts';
import { useMatchSession } from '#/domain/match/session/stores/match-session.store.ts';
import { useRoster } from '#/domain/players/roster/stores/roster.store.ts';
import { useMatchSettings } from '#/domain/settings/match/stores/match-settings.store.ts';
import { createDefaultMatchSettings } from '#/domain/settings/match/utils/create-default-match-settings.util.ts';
import type { WordCategory } from '#/domain/words/word-bank/types/word-category.type.ts';

/** Clears the storage and puts every store of the match back to a known state, with a fake bank. */
export function resetMatchStores(bank: readonly WordCategory[] = []) {
  localStorage.clear();
  useRoster.setState({ players: [] });
  useWordHistory.setState({ usedWordIds: { arena: [], party: [] } });
  useMatchSession.setState({ rounds: { arena: null, party: null } });
  useMatchSettings.setState({
    settings: { arena: createDefaultMatchSettings(bank), party: createDefaultMatchSettings(bank) },
  });
}
