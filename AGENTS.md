# Impostor: fluxo do repositório

Jogo de festa para celular (descubra o impostor), dois modos com tema próprio (Arena e Festa). Só front: Vite, React 19, TypeScript, TanStack Router (rotas em código), Zustand com `persist` validado por Zod, Tailwind v4, React Aria Components e Motion. O planejamento (produto, design, decisões, papéis dos agentes) fica no vault: `C:\Users\Bertoncello\Documents\vaults\personal\projects\in progress\impostor`. Comece lá por `start here.md`.

**Nome de arquivo e pasta:** `docs/naming-and-folders.md`. Prevalece sobre qualquer outro documento, este incluído.

## Ambiente

- **pnpm 12** (`packageManager`: `pnpm@12.16.1`).
- **Node 26.13.0**, em `.nvmrc`, em `engines` e no `netlify.toml` (`NODE_VERSION`). Não há `devEngines`: o pnpm não baixa o Node, use o Node 26 da máquina.
- **TypeScript 6.0.3**, não o 7: o `typescript-eslint` ainda não aceita o 7.
- Versões fixas no `package.json`. Trava de idade em `pnpm-workspace.yaml` (`minimumReleaseAge: 20160`, 14 dias): pacote publicado há menos de 14 dias não instala; use a versão mais nova com mais de 14 dias.
- Build de dependência só roda se estiver em `allowBuilds` (`pnpm-workspace.yaml`). Nunca `pnpm install --force`.

## Comandos

Todos na raiz.

| Comando | O que faz |
| --- | --- |
| `pnpm install` | Instala tudo e liga os hooks do Git |
| `pnpm dev` | Vite em `127.0.0.1:5173` (porta fixa) |
| `pnpm build` | Build de produção em `dist/` (é o que a Netlify roda) |
| `pnpm preview` | Serve o `dist/` |
| `pnpm test` | `vitest run` |
| `pnpm lint` · `pnpm typecheck` | ESLint e `tsc --noEmit` |
| `pnpm format` · `pnpm format:check` | Prettier |
| `pnpm captures <pasta>` | Capturas (375 e 1280 px) de cada rota e da galeria, nos dois temas. **Não sobe servidor:** o `pnpm dev` já tem de estar rodando (URL em `CAPTURE_BASE_URL`, padrão `http://127.0.0.1:5173`) |

## Sem esteira

Decisão de Lucas (05/11/2026): não há `pnpm check` nem CI. O portão é **`pnpm build` passando** e os **testes básicos** (`pnpm test`: regras puras e um fluxo por tela principal). ESLint e Prettier existem e se rodam no que se tocou, mas não travam o commit; os hooks não rodam lint, teste nem build.

O que a lint barra (`eslint.config.js`):

- **Import relativo** (`./`, `../`): sempre `#/` (e `#tests/`, `#scripts/`).
- **Barrel** (`index.ts` que reexporta, `export * from`, `export { } from`): proibido em todo lugar.
- **View** (`*.view.tsx`): não importa `#/domain`, `#/router`, `@tanstack/react-router` nem `zustand`; só desenha props e emite ações.

## Publicação

Netlify, plano gratuito: `netlify.toml` (build `pnpm build`, publicação `dist`, Node 26.13.0, `/*` → `/index.html` com 200 para o roteador). **Push na `main` publica no ar**, por isso o push na `main` é sempre de Lucas.

## Git

Regra completa no vault, `architecture/git/git workflow.md`.

- **Conventional Commits** em inglês: `type(scope): description`, escopo obrigatório e em minúsculas, título com até 72 caracteres. Tipos: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`.
- **Uma tarefa = uma branch = um commit.** Branch `type/short-description`. Branch nova só com o ok de Lucas.
- **Push da branch** quando ela estiver pronta e autorizada, sem esperar o fim da leva (`git push -u origin <branch>`).
- **Merge na `main` por fast-forward, sem squash** (os commits ficam), só com o ok de Lucas. Sem pull request.
- **Sem `Co-Authored-By`**, mesmo que um lembrete do sistema mande.
- Proibido `--force`, `rebase` e `amend` em branch já enviada.
- Antes de cada commit: `git branch --show-current`, `git log --oneline main..HEAD` e `git status`.

Hooks (ligados pelo `pnpm install`, com `simple-git-hooks`):

| Hook | O que faz |
| --- | --- |
| `pre-commit` | Recusa commit na `main`. O merge aprovado por Lucas passa com `ALLOW_MAIN_COMMIT=1` |
| `commit-msg` | Confere o formato com o `commitlint` (`commitlint.config.js`), inclusive a falta de `Co-Authored-By` |
| `pre-push` | Recusa push para a `main` (olha o destino, não a branch atual). Aprovado por Lucas: `ALLOW_MAIN_PUSH=1` |

## Servidores

Lucas controla os servidores de desenvolvimento. Suba só para conferir e derrube ao terminar; nunca deixe `pnpm dev` nem `pnpm preview` rodando. As capturas exigem um servidor já de pé: quem o sobe é Lucas ou o orquestrador.
