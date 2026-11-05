import { getRouteApi, Link } from '@tanstack/react-router';
import type { ReactNode } from 'react';

import { ArenaCardBack } from '#/features/match/reveal/components/arena-card/arena-card-back.component.tsx';
import { ArenaCardFront } from '#/features/match/reveal/components/arena-card/arena-card-front.component.tsx';
import { PartyCardBack } from '#/features/match/reveal/components/party-card/party-card-back.component.tsx';
import { PartyCardFront } from '#/features/match/reveal/components/party-card/party-card-front.component.tsx';
import { FlipCard } from '#/shared/components/flip-card/flip-card.component.tsx';
import { ArenaLogo } from '#/shared/components/logo/arena-logo.component.tsx';
import { PartyLogo } from '#/shared/components/logo/party-logo.component.tsx';
import { PlayerAvatar } from '#/shared/components/player-avatar/player-avatar.component.tsx';
import { PLAYER_ICON_INDEXES } from '#/shared/constants/player-icon-indexes.constant.ts';
import { THEME_NAMES } from '#/shared/constants/theme-names.constant.ts';

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-display text-xl text-text-muted">{title}</h2>
      {children}
    </section>
  );
}

// Development-only page: every piece of the visual system in the current theme, for the captures.
// Switch the theme with `?theme=arena|party` (or the links on top).
export function GalleryPage() {
  const { theme } = getRouteApi('/gallery').useSearch();
  const isArena = theme === 'arena';
  const secret = { role: 'crew', word: 'Exemplo', hint: 'Dica de exemplo' } as const;

  return (
    <div data-theme={theme} className="flex flex-1 flex-col gap-8 bg-bg p-4 text-text">
      <header className="flex items-center justify-between">
        <h1 className="font-display text-3xl">Galeria</h1>
        <nav className="flex gap-2">
          {THEME_NAMES.map((name) => (
            <Link
              key={name}
              to="/gallery"
              search={{ theme: name }}
              className="rounded-md bg-surface px-3 py-1 text-sm text-text"
              aria-current={name === theme ? 'page' : undefined}
            >
              {name}
            </Link>
          ))}
        </nav>
      </header>

      <Section title="Logo">
        {isArena ? (
          <ArenaLogo className="font-display text-4xl" />
        ) : (
          <>
            <PartyLogo variant="on-dark" className="font-display text-4xl" />
            <div className="rounded-md bg-surface p-3">
              <PartyLogo variant="on-light" className="font-display text-4xl" />
            </div>
          </>
        )}
      </Section>

      <Section title="Ícones dos jogadores (1 a 16)">
        <div className="grid grid-cols-4 gap-3">
          {PLAYER_ICON_INDEXES.map((index) => (
            <PlayerAvatar key={index} theme={theme} index={index} size={64} />
          ))}
        </div>
      </Section>

      <Section title="Botões base">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-md bg-primary px-5 py-3 font-display text-text-on-primary shadow-button active:translate-y-0.5 active:shadow-button-pressed"
          >
            Primário
          </button>
          <button
            type="button"
            className="rounded-md bg-surface px-5 py-3 font-display text-text shadow-panel"
          >
            Secundário
          </button>
          <button
            type="button"
            className="rounded-md bg-danger px-5 py-3 font-display text-white shadow-button"
          >
            Perigo
          </button>
        </div>
      </Section>

      <Section title="Carta: verso (virada) e frente (segura)">
        <div className="grid grid-cols-2 gap-3">
          {isArena ? <ArenaCardBack /> : <PartyCardBack />}
          {isArena ? <ArenaCardFront {...secret} /> : <PartyCardFront {...secret} />}
          {isArena ? <ArenaCardFront role="impostor" /> : <PartyCardFront role="impostor" />}
        </div>
      </Section>

      <Section title="Carta viva (segure para ver a frente)">
        <FlipCard
          label="Carta de exemplo"
          back={isArena ? <ArenaCardBack /> : <PartyCardBack />}
          renderFront={() =>
            isArena ? <ArenaCardFront {...secret} /> : <PartyCardFront {...secret} />
          }
        />
      </Section>
    </div>
  );
}
