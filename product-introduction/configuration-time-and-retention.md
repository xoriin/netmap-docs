---
title: Configuration, Time, Retention, and Expiry
description: Understand environment settings, database settings, encrypted secrets, UTC timestamps, retention, and expiration in NetMap.
sidebar_position: 22
keywords: [configuration, environment variables, secrets, timestamps, UTC, retention, expiry]
verified_version: "1.5.0"
---

# Configuration, Time, Retention, and Expiry

This page gives administrators and operators the mental model for settings that affect the whole instance. Exact variable names and defaults belong to the [Configuration Reference](../configuration/configuration.md) and [Default Values](../reference/default-values.md).

## Configuration ownership

| Source | Examples | Ownership and timing |
|---|---|---|
| Environment / secret file | `APP_URL`, database path, retention, listener ports, `SECRET_KEY`, `MASTER_KEY` | Container/operator controlled; many changes require restart. |
| Database system setting | OIDC overrides, notification and UI settings | SuperAdmin controlled; persisted in `netmap.db` and applied by the relevant service. |
| User preference | Theme, colors, layouts, table widths, page sizes | User/browser or account scoped; not a deployment setting. |
| Calculated state | Health, utilization, conflicts, latest monitor result | Derived from records and observations; do not edit as if it were source configuration. |

Secret-bearing fields such as OIDC client secrets, notification credentials, and sensitive HTTP-monitor options are encrypted with the master key and write-only through APIs. Losing the master key can make encrypted configuration unrecoverable; changing it is not a casual rotation.

## Time semantics

Stored timestamps represent UTC instants. SQLite can return naive datetime objects, so API responses re-stamp stored values as UTC before serialization. Clients should parse the offset and display in the operator's local timezone without changing the instant.

Scheduled discovery, monitoring history, API-key expiry, certificate warnings, retention, and session lifetime all compare timestamps to the server's current UTC time. A clock-skewed host can make these features appear early or late.

## Retention versus expiry

- **Retention** removes old history or events according to a policy; it is destructive and does not archive the rows.
- **Expiry** makes a credential, reservation, session, or other time-bounded record no longer valid after its deadline.
- **Disable/pause** changes active behavior without necessarily deleting history.

Back up before changing retention or deleting expired records, and verify host time with the container logs and an external clock source when schedules behave unexpectedly.

## Related pages

- [Configuration Reference](../configuration/configuration.md)
- [Environment Variables](../configuration/environment-variables.md)
- [Secrets Management](../security/secrets-management.md)
- [The Two-Database Design](./two-database-design.md)
- [Default Values](../reference/default-values.md)
