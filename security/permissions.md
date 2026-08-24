---
title: Permissions
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
- `ipam_reservation_claim`
- `monitoring_write`
- `alert_write`
- `user_manage`
- `notification_manage`
- `device_catalog_manage`
- `snmp_profile_manage`
- `audit_view`
- `diagnostics_view`
- `backup_manage`
- `automation_manage`
- `discovery_manage`

SuperAdmin bypasses permission checks.

## Built-In Roles

| Role | Default behavior |
|---|---|
| `SuperAdmin` | all permissions and administrative access |
| `NetworkAdmin` | all named permissions by default |
| `SecurityAnalyst` | security view, passive tools, and firewall export |
| `Viewer` | passive tools by default |

SuperAdmins can define custom roles and update role permission mappings.

`ipam_reservation_claim` permits a user to confirm that a reservation should be removed when converting it into a device. The user also needs `topology_write` to create the device. With `ipam_write`, the action appears in the reservation editor; without `ipam_write`, a claim-capable role receives the conversion action directly on the reservation row. A reservation by itself never creates an inventory device.

Administrative permissions expose only their matching Admin sections. Delegated user managers cannot assign or manage SuperAdmin accounts. `backup_manage` does not permit database restore. Applying a discovery observation requires both `discovery_manage` and `topology_write` because it mutates inventory.

Role/permission administration, OIDC/SSO security configuration, global secrets/security settings, database restore, and assigning SuperAdmin remain permanently restricted to SuperAdmin.

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

- [API-Key Permissions](../api/api-key-permissions.md)
- [Permission Errors](../troubleshooting/permission-errors.md)
- [Security Model](./security-model.md)
