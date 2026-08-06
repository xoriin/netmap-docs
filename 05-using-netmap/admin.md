---
title: Administration
description: Manage users, roles, settings, notifications, SSO, backups, diagnostics, and API-key oversight.
sidebar_position: 12
keywords: [admin, users, roles, settings]
---

# Administration

Admin is restricted to SuperAdmin users.

Administrative areas include:

- Users and sessions.
- Roles and permissions.
- Device types.
- Notification settings and profiles.
- OIDC SSO.
- API-key oversight.
- Audit logs.
- System diagnostics.
- Backup and restore.

Related API groups: `/api/v1/admin/*`, `/api/v1/auth/users*`, `/api/v1/audit/*`, `/api/v1/system/diagnostics`, `/api/v1/api-keys/admin/*`.

## What SuperAdmins Manage

Admin includes:

- user accounts, roles, active state, password resets, and session revocation;
- role permission mappings and custom roles;
- device type options;
- notification settings and notification profiles;
- alert rule administration surfaces;
- OIDC SSO settings and provider testing;
- API-key oversight for all users;
- audit logs and export;
- diagnostics and backup/restore workflows.

## Operational Caution

Changes in Admin can affect existing sessions and API keys immediately. For example, disabling a user disables their keys, and changing role permissions changes what existing keys can do.

## Related Pages

- [Security Model](../10-security/security-model.md)
- [API Keys](../07-api/api-keys.md)
- [OIDC SSO](../04-configuration/oidc-sso.md)
- [Backups](../08-operations/backups.md)
