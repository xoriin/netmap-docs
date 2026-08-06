---
title: API-Key Permissions
description: Understand how API keys inherit user roles.
sidebar_position: 4
keywords: [API key, permissions, roles]
---

# API-Key Permissions

API keys have no per-key scopes. Every key resolves to its owning `User`, and route dependencies check that user's live role and permissions.

If the owner is disabled, the key returns `401`.

If the owner lacks a required permission, the key returns `403`.

## Permission Evaluation

`get_current_user` checks the `X-API-Key` header first. When the key is valid, NetMap loads the owning user from the database and returns that user to the route dependency chain.

That means existing route guards apply without special API-key code:

- `require_super_admin`
- `require_topology_write`
- `require_security_view`
- `require_tools_passive`
- `require_tools_active`
- `require_inventory_export`
- `require_firewall_export`
- `require_report_export`
- `require_alert_write`
- `require_ipam_write`

Monitoring write checks are enforced in `monitoring.py` using the role permission cache.

## Role Changes Apply Immediately

Because the key resolves the owner on every request, these changes affect existing keys immediately:

- user deactivation;
- role changes;
- custom role permission changes;
- SuperAdmin removal from the owning account.

## Practical Pattern

Create a dedicated automation user for each integration. Give that user only the needed permissions, then create an API key from that account.

Examples:

| Task | Permission |
|---|---|
| Read inventory | authenticated user |
| Edit inventory | `topology_write` |
| Export inventory | `inventory_export` |
| Search syslog | `security_view` |
| Export firewall logs | `security_view` and `firewall_export` where needed |
| Manage IPAM | `ipam_write` |
| Configure alerts | `alert_write` |
| Manage users | SuperAdmin |

## Related Pages

- [Permissions](../security/permissions.md)
- [API Keys](./api-keys.md)
- [Capability Matrix](./capability-matrix.md)
