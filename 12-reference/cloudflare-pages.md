---
title: Cloudflare Pages Deployment
description: Build and publish the NetMap documentation site with VitePress, GitHub, and Cloudflare Pages.
sidebar_position: 98
keywords: [VitePress, Cloudflare Pages, GitHub, documentation hosting]
---

# Cloudflare Pages Deployment

This documentation directory is structured as a VitePress project. It can be hosted from GitHub through Cloudflare Pages without adding a separate documentation application to the NetMap runtime container.

## Repository Layout

```text
documentation/
├── .vitepress/config.mts
├── package.json
├── index.md
├── introduction/
├── installation/
├── configuration/
├── using-netmap/
├── guides/
├── api/
├── operations/
├── troubleshooting/
├── security/
├── development/
└── reference/
```

## Local Development

```bash
cd <repo-root>/documentation
npm install
npm run dev
```

VitePress serves the documentation locally and reloads when Markdown files change.

## Production Build

```bash
cd <repo-root>/documentation
npm install
npm run build
```

Build output:

```text
documentation/.vitepress/dist
```

Preview the static output:

```bash
npm run preview
```

## Cloudflare Pages Settings

Use these Cloudflare Pages settings when the GitHub repository is connected:

| Setting | Value |
|---|---|
| Framework preset | VitePress |
| Root directory | `documentation` |
| Build command | `npm run build` |
| Build output directory | `.vitepress/dist` |
| Node.js version | `20` or newer |

If Cloudflare asks for an install command, use:

```bash
npm install
```

## Branch Strategy

The docs can be published from whichever branch the maintainer chooses. For production docs that track released images, publish from the production release branch. For preview docs that track unreleased work, publish from a staging or documentation branch.

Keep this distinction visible in Cloudflare Pages project names or aliases, for example:

- `netmap-docs` for production.
- `netmap-docs-preview` for staged documentation.

## Base URL

The VitePress config currently uses the default base path `/`, which is correct for a custom domain such as:

```text
https://docs.example.com/
```

If the site is hosted under a subpath, set `base` in `.vitepress/config.mts`, for example:

```typescript
export default defineConfig({
  base: "/netmap/"
});
```

Do not set a subpath base for a normal Cloudflare Pages custom domain.

## Validation Before Publishing

Run:

```bash
cd <repo-root>/documentation
npm run build
```

Then inspect the output:

```bash
find .vitepress/dist -maxdepth 2 -type f | sort | head
```

Expected result: generated HTML, assets, and search index files under `.vitepress/dist`.

## Secrets

The documentation build does not need NetMap runtime secrets. Do not add `SECRET_KEY`, `MASTER_KEY`, API keys, OIDC secrets, or production `.env` values to Cloudflare Pages environment variables.

Do not add deployment-specific paths, maintainer-only branch names, local checkout folder names, or private machine paths to public documentation. Use neutral placeholders such as `<repo-root>` and `<install-dir>`.

## Search And Navigation

Local search is enabled in `.vitepress/config.mts`. Navigation is explicit rather than filesystem-generated so the docs remain stable as pages are added or renamed.
