import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useRoster } from '#/domain/players/roster/stores/roster.store.ts';
import { useMatchSettings } from '#/domain/settings/match/stores/match-settings.store.ts';
import { createDefaultMatchSettings } from '#/domain/settings/match/utils/create-default-match-settings.util.ts';
import { getModeCategories } from '#/domain/words/word-bank/rules/get-mode-categories.rule.ts';
import { resetMatchStores } from '#tests/support/match/reset-match-stores.util.ts';
import { createFakePlayers } from '#tests/support/players/create-fake-players.util.ts';
import { createFakeBank } from '#tests/support/words/create-fake-word-bank.util.ts';

const bank = createFakeBank();

beforeEach(() => {
  resetMatchStores(bank);
});

describe('createDefaultMatchSettings (BR-MAT-004, BR-MAT-020, BR-MAT-025)', () => {
  it('starts with 1 impostor, hint on and every category marked, special ones included', () => {
    expect(createDefaultMatchSettings(bank)).toEqual({
      impostorCount: 1,
      hintEnabled: true,
      categoryIds: ['foods', 'animals', 'sesh'],
    });
  });
});

describe('match settings store (BR-MAT-031)', () => {
  it('changes each mode on its own', () => {
    useRoster.setState({ players: createFakePlayers(8) });
    const actions = useMatchSettings.getState();

    actions.setImpostorCount('arena', 3);
    actions.setHintEnabled('party', false);

    expect(useMatchSettings.getState().settings.arena).toMatchObject({
      impostorCount: 3,
      hintEnabled: true,
    });
    expect(useMatchSettings.getState().settings.party).toMatchObject({
      impostorCount: 1,
      hintEnabled: false,
    });
  });

  it('limits the impostors to the maximum of the group when saving', () => {
    useRoster.setState({ players: createFakePlayers(5) });

    useMatchSettings.getState().setImpostorCount('party', 7);

    expect(useMatchSettings.getState().settings.party.impostorCount).toBe(2);
  });

  it('toggles and sets categories without repeats', () => {
    const actions = useMatchSettings.getState();

    actions.toggleCategory('party', 'foods');
    expect(useMatchSettings.getState().settings.party.categoryIds).toEqual(['animals', 'sesh']);

    actions.toggleCategory('party', 'foods');
    expect(useMatchSettings.getState().settings.party.categoryIds).toEqual([
      'animals',
      'sesh',
      'foods',
    ]);

    actions.setCategories('party', ['sesh', 'sesh']);
    expect(useMatchSettings.getState().settings.party.categoryIds).toEqual(['sesh']);

    actions.setCategories('party', []);
    expect(useMatchSettings.getState().settings.party.categoryIds).toEqual([]);
  });
});

describe('match settings persistence', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.resetModules();
  });

  async function loadFreshSettings() {
    const module = await import('#/domain/settings/match/stores/match-settings.store.ts');
    return module.useMatchSettings;
  }

  it('the first time, Festa comes with every category of the bank marked and Arena with the defaults', async () => {
    const settings = await loadFreshSettings();
    const partyIds = getModeCategories('party').map((category) => category.id);

    expect(settings.getState().settings.party).toEqual({
      impostorCount: 1,
      hintEnabled: true,
      categoryIds: partyIds,
    });
    expect(settings.getState().settings.arena.impostorCount).toBe(1);
  });

  it('brings back the saved choice, including no category marked', async () => {
    const saved = {
      arena: { impostorCount: 2, hintEnabled: false, categoryIds: [] },
      party: { impostorCount: 1, hintEnabled: true, categoryIds: [] },
    };
    localStorage.setItem(
      'impostor-settings',
      JSON.stringify({ state: { settings: saved }, version: 1 }),
    );

    const settings = await loadFreshSettings();

    expect(settings.getState().settings).toEqual(saved);
  });

  it.each([
    ['text that is not JSON', '{{{'],
    [
      'an impostor count of 0',
      JSON.stringify({
        state: {
          settings: {
            arena: { impostorCount: 0, hintEnabled: true, categoryIds: [] },
            party: { impostorCount: 1, hintEnabled: true, categoryIds: [] },
          },
        },
        version: 1,
      }),
    ],
    [
      'a missing mode',
      JSON.stringify({
        state: { settings: { arena: { impostorCount: 1, hintEnabled: true, categoryIds: [] } } },
        version: 1,
      }),
    ],
    ['a wrong type', JSON.stringify({ state: { settings: { arena: 1, party: 2 } }, version: 1 })],
  ])('goes back to the initial state with %s', async (_label, raw) => {
    localStorage.setItem('impostor-settings', raw);

    const settings = await loadFreshSettings();

    expect(settings.getState().settings.arena).toEqual({
      impostorCount: 1,
      hintEnabled: true,
      categoryIds: getModeCategories('arena').map((category) => category.id),
    });
  });
});
