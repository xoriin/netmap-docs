---
title: Permissions
description: Roles and permission keys.
sidebar_position: 3
keywords: [roles, permissions]
---

# Permissions

Permission keys:

- `topology_write`
- `security_view`
- `tools_passive`
- `tools_active`
- `inventory_export`
- `firewall_export`
- `report_export`
- `ipam_write`
- `monitoring_write`
- `alert_write`

SuperAdmin bypasses permission checks.

## Built-In Roles

| Role | Default behavior |
|---|---|
| `SuperAdmin` | all permissions and administrative access |
| `NetworkAdmin` | broad network operations permissions |
| `SecurityAnalyst` | security view, passive tools, firewall export |
| `Viewer` | passive tools by default |

SuperAdmins can define custom roles and update role permission mappings.

## API Keys And Permissions

API keys inherit the live permissions of the owning user. There are no per-key scopes.

This means:

- disabling a user disables that user's keys;
- demoting a user reduces existing key access;
- promoting a user expands existing key access;
- custom role changes affect existing keys.

## Permission Errors

A missing permission returns `403`. Missing or invalid authentication returns `401`.

## Related Pages

- [API-Key Permissions](../07-api/api-key-permissions.md)
- [Permission Errors](../09-troubleshooting/permission-errors.md)
- [Security Model](./security-model.md)
