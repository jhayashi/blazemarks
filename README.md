# BlazeMarks

A local-first bookmark manager. Your data stays on your device — no accounts, no tracking, no ads.

Encyrpted sync to all your devices is built with [Evolu](https://evolu.dev).

Try it out at [https://blazemarks.com](https://blazemarks.com).

## Features

- **Local-first** — All data stored locally via Evolu (SQLite + CRDT). Works offline, syncs across devices with end-to-end encryption.
- **Reading list** — Mark bookmarks for later reading. News domains are auto-detected.
- **Tags** — Organize bookmarks with tags. AI-powered tag suggestions via clipboard-based LLM workflow.
- **Search** — Full-text search across titles, URLs, descriptions, and tags.
- **Starred shortcuts** — Pin favorites to the home page with drag-and-drop reordering.
- **Import/Export** — Netscape bookmark format (compatible with all major browsers).
- **Themes** — Multiple color themes (Catppuccin, Flexoki, GitHub, Xcode, and more).
- **PWA** — Install as a progressive web app on any device.
- **Bookmarklet** — One-click save from any browser.
- **Browser extension** — Chrome/Firefox extension to save bookmarks.

## Getting Started

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Browser Extension

```bash
cd extension
bun install
bun run dev            # Chrome
bun run dev:firefox    # Firefox
```

## Tech Stack

- **Runtime**: [Bun](https://bun.sh)
- **Framework**: [Next.js 15](https://nextjs.org) (Pages Router)
- **Database**: [Evolu](https://evolu.dev) (local-first SQLite with CRDT sync)
- **Styling**: [StyleX](https://stylexjs.com)
- **Language**: TypeScript (strict mode)
- **Extension**: [WXT](https://wxt.dev)

## License

[MIT](LICENSE)
