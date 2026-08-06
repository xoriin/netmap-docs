---
title: How to Use This Documentation
description: Learn how NetMap documentation is organized and how to interpret search results, version labels, permissions, examples, and safety notes.
keywords:
  - documentation navigation
  - search
  - version labels
  - conventions
verified_version: "1.5.0"
---

# How to Use This Documentation

Use this page to find the right type of guidance and to interpret the conventions used across the NetMap documentation. You do not need a running NetMap instance to browse the documentation.

## Navigate and search

The site groups pages by reader goal:

- **Introduction** explains what NetMap is and the concepts behind it.
- **Installation** and **Configuration** cover deployment and instance-wide settings.
- **Using NetMap** describes each workspace.
- **Guides** provide ordered procedures for specific outcomes.
- **API** covers authentication, permissions, errors, and endpoints for integrations.
- **Operations**, **Troubleshooting**, and **Security** support administrators and container operators.
- **Development** is for contributors.
- **Reference** collects defaults, ports, paths, terminology, and release information.

Use the search field when you know a UI label, environment variable, error message, endpoint path, or concept but not its section. Search for the exact visible label first. If that does not find the page, try the underlying term—for example, search for both “Locations” and “sites.”

For a complete browsable tree, see the [Documentation Sitemap](./sitemap.md). For common outcomes, use [Quick Links by Goal](./quick-links.md).

## Read version labels

This documentation was based on the production release of NetMap `v1.5.0` at the time of writing. Reviewed pages record the production version in `verified_version` frontmatter. For example, `1.5.0` means the page was checked against that production release; it does not guarantee compatibility with an older or newer version.

The running application is authoritative for its installed version. Check the version displayed in the NetMap interface; do not use the newest GitHub tag as a substitute. See [Documentation Version and Product Compatibility](./documentation-version-compatibility.md) before using these instructions with another release.

## Recognize page types

Different pages answer different questions:

| Page type | Use it when you need |
|---|---|
| Overview or concept | A mental model, terminology, relationships, or boundaries |
| Guide | An ordered task with prerequisites and an expected result |
| Workspace page | The purpose and controls of one area of the interface |
| Reference | Exact fields, defaults, paths, ports, permissions, or endpoint behavior |
| Troubleshooting | Checks and corrective actions organized by symptom |

A workspace overview may link to several focused procedures. Follow the focused guide when you are changing data or configuration, because that page should explain validation, side effects, and recovery in more detail.

## Interpret permissions

Pages state the required built-in role or named permission near the procedure. **Authenticated** means any signed-in user can reach the read operation. Write operations may require a permission such as `topology_write`, while some system-wide operations require **SuperAdmin**.

Custom roles can combine named permissions. If a control is missing or disabled, compare your role with the page's prerequisite and see [Permissions](../security/permissions.md) and [Permission Errors](../troubleshooting/permission-errors.md). API keys inherit their owner's current role and permissions; they do not create a separate authorization scope.

## Use examples safely

Examples use values intended to be replaced:

- `https://netmap.example.com` is an example NetMap URL.
- `192.0.2.10` and `198.51.100.0/24` are documentation addresses, not targets to scan.
- `YOUR_NETMAP_API_KEY` is a placeholder, not a valid credential.
- `<install-dir>` means a path you choose on the container host.

Commands state the expected working directory when it matters. Read the text before commands that restore, overwrite, delete, rotate, or revoke data. Do not paste production secrets, database contents, private addresses, or raw syslog data into public reports.

## Understand notes and gaps

Important limitations and irreversible effects are stated next to the relevant step. If source inspection cannot establish a behavior, the documentation uses this exact callout:

> Documentation gap: this behaviour could not be verified from the current source.

The text following the callout should identify what remains uncertain and where verification was attempted. Treat the unresolved behavior as unknown rather than as a supported guarantee.

## Follow links and UI names

Interface instructions use the labels visible in the verified build, such as **Inventory**, **Add device**, or **Admin**. A bold label identifies UI text; backticks identify permission names, environment variables, paths, header names, or code values.

Relative links are used so the same Markdown works in VitePress, GitHub, and GitBook Git Sync. If you are reading the source files rather than the published site, begin at [NetMap](../NetMap.md); repository maintainers can also use the unlisted `README.md` and `SUMMARY.md` files.

## Related pages

- [NetMap](../NetMap.md)
- [Documentation Version and Product Compatibility](./documentation-version-compatibility.md)
- [Quick Links by Goal](./quick-links.md)
- [Documentation Sitemap](./sitemap.md)
- [Documentation Changelog](./documentation-changelog.md)
- [Reporting Documentation Problems](./reporting-documentation-problems.md)
- [Glossary](../reference/glossary.md)
- [Changelog](../reference/changelog.md)
