# NetMap Documentation

Source-backed documentation for [NetMap](https://github.com/xoriin/netmap), a self-hosted network inventory, topology, monitoring, IPAM, discovery, syslog, alerting, and administration platform.

The documentation is being reviewed against NetMap `1.5.0`, beginning with the development channel. Page frontmatter records the version used for verification, and development-only behavior remains explicitly labelled until release review is complete.

## Start reading

- [What Is NetMap?](./01-orientation/welcome-to-netmap-documentation.md)
- [How to Use This Documentation](./01-orientation/how-to-use-this-documentation.md)
- [Documentation Version and Product Compatibility](./01-orientation/documentation-version-compatibility.md)
- [Quick Links by Goal](./01-orientation/quick-links.md)
- [Documentation Sitemap](./01-orientation/sitemap.md)

GitBook navigation is defined in [SUMMARY.md](./SUMMARY.md). The VitePress sidebar and local search are configured in `.vitepress/config.mts`.

## Repository structure

Reader content is grouped into 12 numbered folders. Markdown filenames are intentionally unnumbered: page order comes from `SUMMARY.md` in GitBook and the sidebar configuration in VitePress.

```text
01-orientation/
02-product-introduction/
03-installation/
...
12-reference/
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

Use the [documentation issue tracker](https://github.com/xoriin/netmap-docs/issues) for inaccurate, missing, unclear, or broken documentation. See [Reporting Documentation Problems](./01-orientation/reporting-documentation-problems.md) for the information to include and the sensitive data to remove first.

Application defects and feature requests belong in the [NetMap application tracker](https://github.com/xoriin/netmap/issues).
