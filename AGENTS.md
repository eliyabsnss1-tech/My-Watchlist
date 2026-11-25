# My Apps

My Apps is a personal "home for all my apps": one React Native (Expo) app on the owner's Android phone that holds many small apps. The home page shows a tile per app, and a side menu (top-left) switches between them. Some of these apps may be released on their own later.

Current apps:

- **Watchlist**: movies and shows to watch, with swipe actions, search, stats and recently deleted.
- **ElementScope**: an existing website (https://eliyabsnss1-tech.github.io/elementscope/) shown inside the app.

The repo is a pnpm monorepo driven by Vite+ (`vp`). The phone app is `apps/mobile`. Shared, UI-free logic lives in `packages/`. A feature starts as a folder in `apps/mobile/src/features/<name>` and becomes a package only when a second app needs it.

## Reference: T3 Code

[T3 Code](https://github.com/pingdotgg/t3code) is the reference for this repo's preferences: tooling, TypeScript strictness, how Effect is written (services, layers, `Effect.fn`, tagged errors, atoms) and how the mobile app is structured. When unsure how something should be done, check how T3 Code does it. Read `.repos/effect/LLMS.md` before writing Effect code (`pnpm sync:repos` fetches it).

## A note from Theo

_Copied from T3 Code's AGENTS.md (MIT); it describes the preferences this repo follows._

I like ambitious ideas, simple systems, and software that feels obvious. Do not preserve complexity just because it already exists. Do not introduce machinery because it looks architecturally impressive. Understand the real constraint, then fight for the smallest model that makes the correct behavior unsurprising.

Channel both "measure twice, cut once" and "yagni". Fight scope creep. Try to honor the dev's intent in both a minimal and realistic fashion.

The rest of this document is meant to help you navigate the codebase and make changes effectively. Think of these instructions less as "hard rules", more as "good defaults". The developer's preferences should be able to override anything here.

## Taste

- Complexity belongs at the adapter boundary. Domain logic stays pure, UI stays dumb.
- Features are Effect services using `Effect.fn("Service.operation")`. Import Effect modules as namespaces (`import * as Effect from "effect/Effect"`). Failures are `Schema.TaggedError` classes. `runPromise` and runtimes only at the React/native boundary.
- `apps/mobile/src/components/ui` exports own their look. Pick a `variant` or `size`; do not restyle one with `className`. Layout classes go on the parent.
- Inferred types over annotations. `any` is the enemy.
- Default to no comment. Write one only for a constraint, external quirk, or invariant the code can't show (1–4 lines max).
- React effects are only for synchronizing with external systems. Derive in render and act in handlers. The React Compiler is on: no `useMemo` / `useCallback`.
- No continuously repainting animations; they peg the GPU on high-refresh displays.
- If a rule here fights the task in front of you, say so loudly and get a human sign-off before breaking it.

## Working in this repo

- `pnpm dev` starts Expo; the phone (Expo Go or the installed app) reloads on save. `pnpm web` runs the same app in a browser.
- Before you push, run `vp check` (format, lint, types) and `vp test`.
- Shipping to the installed app: `pnpm --filter mobile update` publishes an over-the-air update (EAS Update).
- User data lives on the phone in SQLite (`apps/mobile/src/persistence`). Never change a stored shape without a migration.
- Conventional commit titles, plain language: `fix(watchlist): swipe no longer opens details`.
