# NetMap documentation source

This directory contains the source-backed NetMap documentation for users, administrators, container operators, API consumers, and contributors. The current foundation pages were verified against NetMap `1.5.0-dev`.

Reader-facing source is organized into 12 numbered folders. Only folders carry numeric prefixes; page order is defined explicitly in `SUMMARY.md` for GitBook and in `.vitepress/config.mts` for VitePress. `.vitepress/legacy-routes.mts` preserves former public URLs as build-time redirects.

Start with:

- [Welcome to the NetMap Documentation](./01-orientation/welcome-to-netmap-documentation.md)
- [How to Use This Documentation](./01-orientation/how-to-use-this-documentation.md)
- [Quick Links by Goal](./01-orientation/quick-links.md)
- [NetMap Documentation Sitemap](./01-orientation/sitemap.md)

The published site uses the sidebar in `.vitepress/config.mts`. `SUMMARY.md` mirrors the same page tree in portable Markdown for repository browsing and future GitBook Git Sync use. Internal planning prompts and authoring checklists are kept outside this repository.

## Preview or build locally

Run these commands from this `documentation/` directory:

```bash
npm install
npm run dev
```

Build the production site with:

```bash
npm run build
```

The generated output belongs to `.vitepress/dist/` and must not be edited by hand.

## Authoring rules

- Treat the implementation in the documented channel as the source of truth.
- Record the checked source in each reviewed page's `verified_version` frontmatter.
- Label development-only behavior explicitly.
- Use relative Markdown links and portable GitHub-flavored Markdown.
- Update both VitePress navigation and `SUMMARY.md` when a published page is added, removed, or moved.
- Never include credentials, private network data, production logs, or database contents in examples or screenshots.

See [Documentation Maintenance Plan](./12-reference/maintenance-plan.md) for the broader maintenance workflow and [Documentation Inventory and Gaps](./12-reference/documentation-inventory.md) for known coverage gaps.
