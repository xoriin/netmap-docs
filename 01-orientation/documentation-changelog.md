---
title: Documentation Changelog
description: Track material additions, corrections, navigation changes, and NetMap version coverage in the documentation set.
keywords:
  - documentation changelog
  - documentation updates
  - version coverage
verified_version: "1.5.0-dev"
---

# Documentation Changelog

This page records material changes to the NetMap documentation itself. Use it to find newly documented topics, corrected procedures, navigation changes, and changes in version coverage.

This is separate from the NetMap product [Changelog](../12-reference/changelog.md), which describes application releases and supplies the in-app **What's new** content. A documentation-only correction does not imply that application behavior changed.

## 6 August 2026

### Added

- Added **Welcome to the NetMap Documentation** with entry paths for users, administrators, operators, API consumers, and contributors.
- Added **How to Use This Documentation**, including search, permission, placeholder, safety, and documentation-gap conventions.
- Added **Quick Links by Goal** and a complete human-readable documentation sitemap.
- Added this documentation changelog, version-compatibility guidance, and a dedicated procedure for reporting documentation problems.
- Added standalone VitePress configuration, portable GitBook `SUMMARY.md` navigation, local search, and the official NetMap favicon.

### Changed

- Organized reader documentation into 12 numbered section folders. Markdown filenames remain unnumbered; GitBook order comes from `SUMMARY.md`, and VitePress order comes from `.vitepress/config.mts`.
- Moved the documentation into the separate `xoriin/netmap-docs` repository.
- Preserved former documentation URLs through build-time redirects to the numbered section paths.
- Recorded the current foundation review as `1.5.0-dev` after verifying the authoritative `VERSION` files.

### Version coverage

- The seven pages in **01 - Orientation** are reviewed against NetMap `1.5.0` development source.
- Pages in later sections remain part of the imported documentation baseline until their individual checklist entries pass a source-backed review.
- Development-only labels remain in place where the master checklist still requires release review.

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
- [Product Changelog](../12-reference/changelog.md)
- [Documentation Sitemap](./sitemap.md)

