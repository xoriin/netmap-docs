---
description: Manage users, roles, alerts, notifications, and other instance settings.
title: Admin Workspace
sidebar_position: 1
keywords: [admin, administration, users, roles, settings, notifications, SNMP]
---

# Admin Workspace

**Admin** is where you manage NetMap itself: settings, users, roles, notification methods, alert rules, scheduled scans and the audit log. It's split into tabs, and each tab opens with summary cards and a chart before its forms and tables.

This section of the documentation covers those tabs, plus configuration reference, storage, OIDC, and syslog. You need a role that grants the relevant administrative permission; a SuperAdmin sees every tab.

## Who Sees Each Tab

A SuperAdmin sees every tab. Anyone else sees only the tabs their permissions allow.

| Tab | Shown with | Page |
|---|---|---|
| **System** | `diagnostics_view` or `backup_manage` | [System](./system.md) |
| **Devices & Icons** | `device_catalog_manage` | [Devices And Icons](./devices-and-icons.md) |
| **Cloud providers** | `device_catalog_manage` | [Cloud Providers](./cloud-providers.md) |
| **Users** | `user_manage` | [Users](./users.md) |
| **Groups** | SuperAdmin only | [Groups And Roles](./groups.md) |
| **SNMP Profiles** | `snmp_profile_manage` | [SNMP Profiles](./snmp-profiles.md) |
| **Notifications** | `notification_manage` | [Notifications](./notifications.md) |
| **Alerts** | `alert_write` | [Alerts](./alerts.md) |
| **Automation** | `automation_manage` or `discovery_manage` | [Automation](./automation.md) |
| **Security** | `audit_view` | [Security And Audit](./security-and-audit.md) |

Each tab's ID appears after `#` in the address, such as `#users`, so you can bookmark or share a tab. [Permissions](./permissions.md) explains each permission key and the built-in roles.

## Use The API

Most Admin actions have API equivalents under `/api/v1/admin/`, `/api/v1/auth/users`, `/api/v1/audit/`, `/api/v1/system/diagnostics` and `/api/v1/api-keys/admin/`. See the [Endpoint Reference](../api/reference/endpoints.md).

## Related Pages

- [Permissions](./permissions.md)
- [Two-Factor Authentication](./two-factor-authentication.md)
- [OIDC SSO](../configuration/oidc-sso.md)
- [Profile](../using-netmap/profile.md)
