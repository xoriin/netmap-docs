---
title: Documentation Coverage Report
description: Current coverage, verification status, and known documentation gaps.
sidebar_position: 7
keywords: [coverage, quality, documentation, verification]
---

# Documentation Coverage Report

This report records what has been reviewed against the NetMap 1.5.0 source and what remains deliberately unverified. It is updated with documentation batches rather than treated as a product release note.

## Verified in the current batch

- Product Introduction was condensed: use-case boundaries now live in **What Is NetMap?**, and container/database architecture lives in **How NetMap Works**.
- User workspaces, installation, configuration, API fundamentals, security, operations, troubleshooting, and the grouped endpoint inventory have canonical pages.
- The VitePress production build passes and local documentation links resolve through the site build.
- Provider-neutral API, IPAM, discovery, health, syslog, notification, and OIDC integration patterns are documented.
- The master checklist is complete. Provider-specific validation, screenshots, and live deployment drills are explicitly recorded as deferred rather than represented as tested facts.

## Deliberately not claimed

- Vendor-specific pfSense, OPNsense, rsyslog, syslog-ng, Entra, Authentik, Keycloak, Okta, and Google Workspace walkthroughs require provider-specific validation and are not presented as verified.
- A live clean-install walkthrough, disaster-recovery drill, and browser screenshot refresh require a running deployment and operator credentials; they are not inferred from static source inspection.
- TLS syslog setup remains a gap until the current listener implementation and deployment settings are verified together.

## Review metadata

| Field | Value |
|---|---|
| Source baseline | NetMap 1.5.0 |
| Documentation site | VitePress / GitBook-compatible Markdown |
| Last source review | 2026-08-12 |
| Next review trigger | Next version release or material API/configuration change |

Use the [documentation changelog](./documentation-changelog.md) for page-level changes and the [reporting guide](./reporting-documentation-problems.md) to submit a missing or inaccurate topic.
