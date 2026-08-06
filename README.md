# NetMap Documentation

Source-backed documentation for [NetMap](https://github.com/xoriin/netmap), a self-hosted network inventory, topology, monitoring, IPAM, discovery, syslog, alerting, and administration platform.

This documentation was based on the production release of NetMap `v1.5.0` at the time of writing. Page frontmatter records the version used when a page was last verified.

## Start reading

- [NetMap](./orientation/netmap.md)
- [How to Use This Documentation](./orientation/how-to-use-this-documentation.md)
- [Documentation Version and Product Compatibility](./orientation/documentation-version-compatibility.md)
- [Quick Links by Goal](./orientation/quick-links.md)
- [Documentation Sitemap](./orientation/sitemap.md)

GitBook navigation is defined in [SUMMARY.md](./SUMMARY.md). The VitePress sidebar and local search are configured in `.vitepress/config.mts`.

## Repository structure

Reader content is grouped into descriptive, unnumbered folders. Folder names do not control publication order: `SUMMARY.md` controls GitBook navigation, and `.vitepress/config.mts` controls the VitePress sidebar.

```text
orientation/
product-introduction/
installation/
...
reference/
```

Internal planning prompts, authoring checklists, installed dependencies, and generated site output are kept outside this repository.

## Preview locally

From the repository root:

```bash
npm ci
npm run dev
```

Create a production build with:

```bash
npm run build
```

Generated output is written to `.vitepress/dist/` and is excluded from version control.

## Contribute a correction

Use the [documentation issue tracker](https://github.com/xoriin/netmap-docs/issues) for inaccurate, missing, unclear, or broken documentation. See [Reporting Documentation Problems](./orientation/reporting-documentation-problems.md) for the information to include and the sensitive data to remove first.

Application defects and feature requests belong in the [NetMap application tracker](https://github.com/xoriin/netmap/issues).
