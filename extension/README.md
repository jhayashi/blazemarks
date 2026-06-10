# BlazeMarks Browser Extension

Browser extension for [BlazeMarks](https://blazemarks.com), a local-first
bookmark manager. Built with [WXT](https://wxt.dev).

## Build instructions (for add-on reviewers)

Requirements:

- [Bun](https://bun.sh) >= 1.3 (package manager and script runner; no other
  toolchain is needed)
- Linux or macOS

Build:

```bash
bun install
bun run zip:firefox   # Firefox: .output/firefox-mv2/ and .output/*-firefox.zip
bun run zip           # Chrome:  .output/chrome-mv3/ and .output/*-chrome.zip
```

The build is driven by [WXT](https://wxt.dev) (pinned via `bun.lock`), which
bundles the TypeScript entrypoints in `entrypoints/` with Vite and generates
the manifest from `wxt.config.ts`. There is no minification-obscured or
generated third-party code beyond standard Vite bundling of this source.

## Development

```bash
bun run dev            # Chrome with hot reload
bun run dev:firefox    # Firefox
```
