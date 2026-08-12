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

- Condensed Product Introduction: moved supported and out-of-scope use cases into **What Is NetMap?**, folded single-container and two-database explanations into **How NetMap Works**, removed the redundant standalone pages from navigation, and removed the unnecessary “choose a path/topic” framing.
- Completed checklist coverage for API-key administration/audit, configuration reference, security hardening, operations/maintenance, and the core troubleshooting matrix; expanded the canonical Administration, Security Overview, Operations, and Common Issues pages.
- Expanded the Overview Dashboard and Inventory pages, covering health semantics, favourites, freshness states, filtering, sorting, grid resizing, bulk actions, imports, colours, icons, and permissions; reconciled the corresponding Sections 7 and 8 checklist entries.
- Added the canonical Device Details guide covering inline editing, identity and lifecycle fields, groups/sites, monitoring, favourites, security activity, SNMP ARP enrichment, deletion, and status troubleshooting; completed Section 9 checklist coverage.
- Expanded the Topology guide with canvas navigation, entity lists, path mode, bulk selection, relationship editing, layout persistence, sharing, exports, and troubleshooting; completed the first twelve Section 10 checklist topics.
- Reworked VLANs/Groups and Locations into source-backed workspace guides covering fields, assignments, colours, IPAM synchronisation, site scoping, map links, deletion, and troubleshooting; completed Sections 11 and 12.
- Expanded Run Discovery and linked the scheduled-observation guide for target validation, scan modes, SNMP/MAC enrichment, review/import behavior, scheduling, history, notifications, and troubleshooting; completed Section 13.
- Reworked Monitoring into a source-backed guide for device health, cache/freshness, history and analysis, service checks (including DHCP), and standalone HTTP/HTTPS monitors with assertions, authentication, TLS, proxies, encryption, limits, alerts, and troubleshooting; completed Sections 14 and 15.
- Expanded internal and external IPAM plus Network Tools with subnet/address calculations, reservations, DHCP imports, conflicts, public allocation rules, DNS/active probes, LLDP, saved results, and operational limits; completed Sections 16–18.
- Reworked Security Events and syslog guidance for UDP/TCP ingestion, allowlists, parsing, FTS5 search, live WebSocket limits, exports, retention, corruption recovery, permissions, and the explicitly unverified TLS path; completed Section 19.
- Expanded Exports and backup/restore guidance with CSV/JSON/PDF schemas, filtering and permissions, HMAC integrity validation, restore safety, scheduled retention, and disaster-recovery verification; completed Section 20.
- Expanded Profile and Administration guidance for personal preferences/API keys, system settings/diagnostics, users/roles, device types/colours/icons, SNMP/LLDP, and notification providers/security; completed Sections 21–26.
- Expanded Interface Overview with the application shell, navigation, permissions, common controls, themes, loading states, and recovery behavior.
- Added the canonical First-Run Setup and Authentication page and expanded OIDC SSO guidance with provider prerequisites, linking, role mapping, recovery, and troubleshooting.
- Added a direct Docker CLI installation page covering persistent data, secret files, bridge/host networking, capabilities, lifecycle, and updates.
- Reconciled the remaining source-backed Section 4 installation topics with their canonical storage, ports, security, reverse-proxy, health-check, and uninstall pages; provider-specific proxy examples remain intentionally open until verified.
- Expanded the Docker Compose installation guidance with bridge/host networking decisions, capabilities, syslog mappings, read-only runtime storage, lifecycle validation, and the source-build workflow.
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
## 2026-08-12

- Condensed Product Introduction and moved use-case and architecture material into canonical pages.
- Added provider-neutral integration patterns, reference appendices, and a source-verification coverage report.
- Completed the source-backed developer, troubleshooting, reference, and publication checklist items; provider-specific recipes and live validation remain explicitly marked as outstanding.
