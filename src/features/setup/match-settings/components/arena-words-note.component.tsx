import { SETTINGS_COPY } from '#/features/setup/match-settings/constants/settings-copy.constant.ts';

/** RF-CFG-008: Arena has no categories, only this line. Text only, no Clash Royale art. */
export function ArenaWordsNote() {
  return (
    <section className="rounded-lg bg-surface px-4 py-4">
      <p className="text-[18px] leading-snug font-semibold">{SETTINGS_COPY.arenaWords}</p>
    </section>
  );
}
