---
title: Changelog
description: Release notes and What's New source.
sidebar_position: 5
keywords: [changelog, release notes]
---

# Changelog

`CHANGELOG.md` is the single source of truth for release notes and the in-app What's New modal.

The installed version comes from `/app/VERSION` when baked into the image.

## How NetMap Uses The Changelog

The changelog is used for two related purposes:

1. Human release notes.
2. In-app What's New content for the installed version.

The What's New modal is based on the installed version, not merely the newest available GitHub tag.

## Installed Version

The application reads `/app/VERSION` first. `APP_VERSION` is fallback-only when the version file is unavailable.

Dev/test images can also include `/app/VERSION_CHANNEL`, allowing the UI to distinguish Dev or Test builds from production.

## Release Notes

Release automation extracts release text from `CHANGELOG.md` for version tags. Keep release notes clear, user-facing, and grouped by impact.

Good release-note sections:

- Added
- Changed
- Fixed
- Security
- Operations
- Documentation

## Documentation Expectations

Update the changelog for:

- user-visible features;
- user-visible fixes;
- security hardening;
- operational behavior changes;
- API-key or authentication changes;
- release-candidate changes.

Do not use the changelog for internal-only refactors unless they matter to users or operators.

## Related Pages

- [Upgrading](../03-installation/upgrading.md)
- [Operations](../08-operations/operations.md)
- [Developer Guide](../11-development/development.md)
