# Nomes de arquivo e organização de pastas

Impostor: jogo de festa só de front, publicado na Netlify. Origem: `docs/naming-and-folders.md` do Fincheck 2, sem o que é de monorepo, API, TanStack Query e MSW. Todo agente lê antes de criar ou mover arquivo ou pasta. Quando outro documento disser diferente, este vale.

- **Idioma:** nomes de arquivo, pasta, componente e rota em inglês. Texto da interface em português.
- **"(exemplo)":** nome inventado para ilustrar.

## Nome de arquivo

1. **Kebab-case com o sufixo do tipo, no singular, em qualquer nível:** `player-avatar.component.tsx`. Nada de `PascalCase.tsx` nem `camelCase.ts`.
2. **`.tsx` só quando o arquivo tem JSX;** o sufixo não muda por isso (`x.viewmodel.ts` ou `x.viewmodel.tsx`).
3. **Hook começa com `use-`** e exporta `useX`: `use-hold-card.hook.ts` exporta `useHoldCard` (exemplo).
4. **O nome diz o que o arquivo faz,** não onde ele está. Função de domínio começa pelo verbo: `draw-impostors.rule.ts` (exemplo).
5. **Um assunto por arquivo,** sem hook universal por tela. **Uma função por `.util.ts`.**
6. **Nomes que a ferramenta exige ficam como ela quer:** `main.tsx`, `vite.config.ts`, `eslint.config.js`, `commitlint.config.js`, `package.json`, `tsconfig.json`, `index.html`, `netlify.toml`. CSS, imagem, fonte e manifest não levam sufixo de tipo.

### Nomes dentro do arquivo

| Arquivo (exemplo) | Exporta |
| --- | --- |
| `player-avatar.component.tsx` | `PlayerAvatar` |
| `use-hold-card.hook.ts` | `useHoldCard` |
| `draw-impostors.rule.ts` | `drawImpostors` |
| `match-session.store.ts` | `useMatchSession` |
| `player-icon-indexes.constant.ts` | `PLAYER_ICON_INDEXES` |
| `theme-name.type.ts` | `ThemeName` |
| `is-theme-name.util.ts` | `isThemeName` |

### Sufixos

Um tipo, um sufixo. Tipo que não está na tabela: escolha o nome no singular, em inglês, acrescente aqui no mesmo commit e avise Lucas.

| Sufixo | O que é |
| --- | --- |
| `.component.tsx` | Componente visual |
| `.hook.ts` | Hook do React (`use-*`) |
| `.view.tsx` | View do MVVM: desenha as props e emite ações (a lint barra `#/domain`, `#/router`, TanStack Router e Zustand) |
| `.viewmodel.ts(x)` | ViewModel: adapta estado e navegação para a View |
| `.model.ts` | Model: junta os hooks do domínio e os da tela |
| `.page.tsx` | Página consumida por uma rota |
| `.route.ts(x)` | Rota de tela (TanStack Router, em código) |
| `.guard.ts` | Guarda de rota, se houver |
| `.schema.ts` | Esquema Zod |
| `.type.ts` | Só tipos |
| `.constant.ts` | Valores fixos |
| `.util.ts` | Função auxiliar sem estado; uma função por arquivo |
| `.rule.ts` | Regra de negócio pura, sem tela (em `domain`) |
| `.context.ts` | Contexto do React |
| `.store.ts` | Estado guardado no navegador (Zustand, com `persist` validado por Zod) |
| `.script.ts` | Script que se roda à mão (`scripts/`) |
| `.error.ts` | Erro tipado |
| `.test.ts(x)` | Teste |

## Pastas

1. **Minúsculas com hífen, sem sufixo:** `player-avatar/`, `flip-card/`.
2. **Pasta principal é a pasta de um tipo, no plural:** `components/`, `hooks/`, `rules/`, `stores/`, `constants/`, `schemas/`, `types/`, `utils/`. Dentro dela, todo arquivo tem o sufixo desse tipo.
3. **Subpasta é por assunto,** nomeada pelo que a pessoa procura, não pela técnica: `components/player-avatar/`.
4. **Quando criar subpasta:** a pasta passou de uns 8 arquivos e há separação clara por assunto, ou um grupo de arquivos só faz sentido junto. Na dúvida, menos pastas; pasta para um arquivo só, não.
5. **O que só um assunto usa mora na pasta dele.** Só sobe para a pasta comum (`shared/utils/`, `shared/hooks/`) o que mais de um assunto usa. Auxiliar fica em `utils/`, nunca em `lib/` ou `helpers/`.
6. **Feature:** na raiz só `model`, `viewmodel` e `view`; o resto em pasta de tipo, só se houver arquivo; estados (carregando, vazio, erro) em `components/states/`.
7. **Sem barrel.** Nenhum `index.ts` que reexporta, em nenhuma pasta, inclusive `shared/ui/`. O import aponta para o arquivo de verdade. A lint barra.
8. **Temas:** os tokens de cada tema ficam em `shared/ui/styles/themes/`; a peça que muda de forma ganha um componente por tema na pasta do assunto (`player-avatar/arena/`, `player-avatar/party/`).

## Imports

- **Atalho `#/`** aponta para `src/` (campo `imports` do `package.json`); `#tests/` para `tests/`; `#scripts/` para `scripts/`. Sem `@/` nem `paths` no tsconfig.
- **O import nomeia o arquivo com a extensão:** `#/pages/home/home.page.tsx`.
- **Nada de caminho relativo** (`./`, `../`), nem nos testes. A lint barra.
- **CSS:** `import '#/shared/ui/styles/global.css'`.

## Testes

- **Pasta `tests/` na raiz, espelhando o `src/`:** o teste de `src/router/create-router.util.tsx` é `tests/router/create-router.util.test.tsx`. Nunca ao lado do código.
- **Sufixo `.test.ts(x)`;** importa por `#/` e `#tests/`.
- **Apoio de teste** (fábricas, renderizadores) em `tests/support/<assunto>/`; configuração inicial em `tests/setup.ts`.
- **Escopo (sem esteira):** testes básicos de funcionalidade: regras puras e um fluxo por tela principal.

## Árvore

```text
impostor/
├─ index.html · package.json · pnpm-workspace.yaml · vite.config.ts · tsconfig.json
├─ eslint.config.js · commitlint.config.js · netlify.toml · .nvmrc
├─ AGENTS.md · CLAUDE.md
├─ docs/                        naming-and-folders.md · screens/
├─ public/                      manifest.webmanifest · icons/ (PWA)
├─ scripts/captures/            take-captures.script.ts · capture-targets.constant.ts · launch-browser.util.ts
├─ src/
│  ├─ main.tsx
│  ├─ router/                   routes/*.route.tsx · guards/ · components/ · create-router.util.tsx
│  ├─ pages/                    home/ · setup/ · match/ · gallery/ (só em desenvolvimento)
│  ├─ features/
│  │  ├─ home/mode-picker/
│  │  ├─ setup/                 players/ · match-settings/
│  │  └─ match/                 reveal/ · round/ · result/
│  ├─ domain/
│  │  ├─ match/draw/            rules/
│  │  ├─ match/session/         stores/ · hooks/
│  │  ├─ players/roster/        stores/ · constants/
│  │  ├─ words/word-bank/       constants/{party,special,arena}/ · types/ · rules/
│  │  └─ settings/match/        stores/ · schemas/
│  └─ shared/
│     ├─ ui/                    styles/ (global.css · tokens.css · themes/) · components/<assunto>/
│     ├─ components/<assunto>/  player-avatar/ · flip-card/ · logo/
│     ├─ layouts/game/
│     └─ hooks/ · constants/ · types/ · utils/ · providers/
└─ tests/                       o mesmo desenho do src/ · support/ · setup.ts
```
