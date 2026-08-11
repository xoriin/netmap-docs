---
title: Documentation Changelog
description: Track material additions, corrections, navigation changes, and NetMap version coverage in the documentation set.
keywords:
  - documentation changelog
  - documentation updates
  - version coverage
verified_version: "1.5.0"
---

# Documentation Changelog

This page records material changes to the NetMap documentation itself. Use it to find newly documented topics, corrected procedures, navigation changes, and changes in version coverage.

This is separate from the NetMap product [Changelog](../reference/changelog.md), which describes application releases and supplies the in-app **What's new** content. A documentation-only correction does not imply that application behavior changed.

## 12 August 2026

### Changed

- Added the Section 4 installation foundations: a deployment-path overview and a source-verified Docker Compose quick start.
- Removed **Orientation** as a competing reader journey. The NetMap homepage is now the single goal-based entry point, followed directly by **Product Introduction**.
- Consolidated **Quick Links by Goal** into the homepage and redirected its former VitePress URL to the homepage.
- Moved documentation conventions, version compatibility, the documentation changelog, and reporting guidance to **About This Documentation** at the end of GitBook and VitePress navigation.
- Removed the unused `orientation/` source folder; these documentation-meta pages now live under `about-documentation/`.
- Consolidated Section 3 around canonical terminology and data-model pages instead of creating one repetitive article per checklist line.
- Removed the documentation sitemap from primary navigation while retaining it as a complete text index linked from the homepage and documentation guide.

## 11 August 2026

### Added

- Added focused introductions for unsupported use cases, the all-in-one process model, the two SQLite databases, network access, production image tags, browser support, capacity planning, and privacy/data collection.

### Changed

- Reworked the product introduction into a source-verified `v1.5.0` evaluation path.
- Expanded **What Is NetMap?**, the workspace feature tour, supported use cases, and application architecture with audience, permission, limitation, failure, recovery, and related-reading guidance.
- Added Mermaid diagrams for runtime flow, process supervision, database isolation, network traffic, image versioning, capacity drivers, and data destinations.
- Updated GitBook, VitePress, and the human-readable sitemap so all product-introduction pages are discoverable.

### Version coverage

- All twelve checklist topics in **Product Introduction** are reviewed against production NetMap `v1.5.0`.

## 6 August 2026

### Added

- Added the **NetMap** homepage with entry paths for users, administrators, operators, API consumers, and contributors.
- Added **How to Use This Documentation**, including search, permission, placeholder, safety, and documentation-gap conventions.
- Added **Quick Links by Goal** and a complete human-readable documentation sitemap.
- Added this documentation changelog, version-compatibility guidance, and a dedicated procedure for reporting documentation problems.
- Added standalone VitePress configuration, portable GitBook `SUMMARY.md` navigation, local search, and the official NetMap favicon.

### Changed

- Organized reader documentation into descriptive, unnumbered section folders. GitBook order comes from `SUMMARY.md`, and VitePress order comes from `.vitepress/config.mts`.
- Moved the documentation into the separate `xoriin/netmap-docs` repository.
- Preserved former documentation URLs through build-time redirects to the current section paths.
- Recorded production NetMap `v1.5.0` as the version basis at the time of writing.
- Replaced maintainer-only release material with a contributor workflow based on forks and the `test` branch.
- Removed documentation-hosting, internal inventory, and maintenance-plan pages from the published product navigation.
- Configured GitBook to use **NetMap** as the homepage instead of publishing the repository `README.md` as a separate page.

### Version coverage

- The seven pages in **Orientation** are reviewed against production NetMap `v1.5.0`.
- Pages in later sections remain part of the imported documentation baseline until their individual checklist entries pass a source-backed review.

## How this changelog is maintained

Add an entry when a documentation change materially affects what readers can find, understand, or safely do. Examples include:

- a new or substantially rewritten page;
- a corrected command, permission, default, endpoint, or destructive-action warning;
- changed support or version coverage;
- a renamed or moved page;
- changed navigation or search behavior;
- a removed obsolete procedure;
- a resolved documentation gap.

Routine spelling, punctuation, and formatting corrections do not need individual entries unless they change meaning.

Each entry should name the affected reader goal and, when relevant, the NetMap version or channel whose behavior was verified. Do not copy product release notes here; link to the product changelog instead.

## Related pages

- [Documentation Version and Product Compatibility](./documentation-version-compatibility.md)
- [Reporting Documentation Problems](./reporting-documentation-problems.md)
- [Product Changelog](../reference/changelog.md)
- [Documentation Sitemap](./sitemap.md)
