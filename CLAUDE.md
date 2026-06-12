# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
git submodule update --init   # required first — elf-components is a submodule installed as file:./elf-components
bun install
bun run dev                   # Next.js dev server on port 3000
bun run build                 # static export to out/ (served by Caddy on a DigitalOcean droplet)
bun run lint                  # next lint
bunx tsc --noEmit             # type check (no package script for this)
```

There is no test suite.

Deployment: the deploy script (`deploy-blazemarks.sh`) lives in the private
`jhayashi/infra` repo, not here — it builds and rsyncs `out/` to the droplet.

Browser extension (separate WXT project with its own lockfile):

```bash
cd extension
bun install
bun run dev            # Chrome
bun run dev:firefox    # Firefox
bun run build          # or build:firefox, zip, zip:firefox
```

## Architecture

BlazeMarks is a **local-first bookmark manager**: Next.js 15 Pages Router with `output: "export"` — fully static, no server, no API routes. All data lives in the browser via [Evolu](https://evolu.dev) (SQLite over OPFS with CRDT-based encrypted sync).

### Data layer (Evolu)

- `lib/Db.ts` — schema (bookmark, tag, bookmarkTag, settings tables), branded ID types via `id()`, and a singleton: `initEvolu()` creates the instance (reading sync mode from localStorage), `getEvolu()` returns it or throws. Sync is disabled by passing `transports: []` when the user chose local-only mode.
- `lib/queries.ts` — lazily-created singleton query objects plus exported `Row` types (`BookmarkRow`, etc.). All queries filter `where("isDeleted", "is not", sqliteTrue)`.
- `lib/mutations.ts` — all writes go through these helpers. Conventions: deletes are soft (`isDeleted: sqliteTrue`); boolean toggles set the column to `null` (not 0) to turn it off; strings/numbers are cast to Evolu branded types (`as Str` / `as Num`).

Schema changes only ever add columns/tables — Evolu has no destructive migrations.

### App bootstrap (`pages/_app.tsx`)

Evolu is only initialized after the user completes the SetupWizard (from elf-components), which gates on `localStorage["blazemarks-setup"]`. The app also checks OPFS availability (`navigator.storage.getDirectory`) and shows an unsupported-browser screen if missing (e.g. Firefox private browsing). Sync choice (`blazemarks-sync-enabled`), theme (`blazemarks-theme`), and locale (`blazemarks-locale`) also live in localStorage — these are device-level preferences, distinct from the synced `settings` table in Evolu.

### elf-components submodule

Shared component library (SetupWizard, theme manager, spacing themes) consumed as a `file:` dependency and listed in `transpilePackages`. `next.config.js` aliases `react`/`react-dom` to this repo's copy to prevent a duplicate React from the symlink, and aliases `react-native` → `react-native-web`.

### Styling

StyleX compiled via the Babel plugin (`babel.config.js`) — no SWC. Design tokens in `lib/Tokens.stylex.ts` are `defineVars` that reference CSS custom properties (`var(--text)` etc.); the actual values come from theme JSON files (`lib/themes/`) applied at runtime by the elf-components theme manager. So themes switch by swapping CSS variables, not StyleX vars.

### Browser extension (`extension/`)

WXT-based, excluded from the root tsconfig. It does **not** touch the Evolu database — it saves bookmarks by opening the web app's `/add` page with query params (see `extension/utils/blazemarks.ts` `buildAddUrl` and `pages/add.tsx`). Extension locale strings live in `extension/public/_locales/`, separate from the web app's i18n.

### i18n

Custom lightweight context in `lib/i18n/` with 10 locales, lazy-loaded per-locale modules, and a `t(key, params)` function. New user-facing strings need a key in `lib/i18n/types.ts` and entries in every `lib/i18n/locales/*.ts`.

## TypeScript notes

tsconfig has `exactOptionalPropertyTypes` and `noUncheckedIndexedAccess` on. This is why optional fields are typed `string | undefined` explicitly and mutation helpers build objects with conditional spreads (`...(x !== undefined ? { x } : {})`) instead of passing `undefined`.
