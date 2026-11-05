import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { useRoster } from '#/domain/players/roster/stores/roster.store.ts';
import { useModeSettings } from '#/domain/settings/match/hooks/use-mode-settings.hook.ts';
import { useMatchSettings } from '#/domain/settings/match/stores/match-settings.store.ts';
import { resetMatchStores } from '#tests/support/match/reset-match-stores.util.ts';
import { createFakePlayers } from '#tests/support/players/create-fake-players.util.ts';

beforeEach(() => {
  resetMatchStores();
});

describe('useModeSettings (RF-CFG-002, RF-CFG-007)', () => {
  it('limits the saved value to the maximum of the group and says it was adjusted', () => {
    useRoster.setState({ players: createFakePlayers(8) });
    useMatchSettings.getState().setImpostorCount('arena', 3);

    const { result } = renderHook(() => useModeSettings('arena'));
    expect(result.current).toMatchObject({
      impostorCount: 3,
      maxImpostors: 3,
      impostorCountWasAdjusted: false,
    });

    act(() => {
      useRoster.setState({ players: createFakePlayers(5) });
    });
    expect(result.current).toMatchObject({
      impostorCount: 2,
      maxImpostors: 2,
      impostorCountWasAdjusted: true,
    });
  });

  it('with 3 or 4 players the maximum is 1', () => {
    useRoster.setState({ players: createFakePlayers(4) });

    const { result } = renderHook(() => useModeSettings('party'));

    expect(result.current).toMatchObject({ impostorCount: 1, maxImpostors: 1, playerCount: 4 });
  });
});
