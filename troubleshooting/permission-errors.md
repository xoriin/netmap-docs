---
title: Permission Errors
sidebar_position: 5
keywords: [permissions, 403]
---

# Permission Errors

`403` means authentication succeeded, but the user or API-key owner lacks the required role or permission.

Check Admin role permissions for:

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
- `status_page_manage`

## 401 Versus 403

`401` means NetMap did not accept the authentication. Check the session, bearer token, or API key.

`403` means authentication worked, but the role does not allow the action. For an API key, if [Check Who You Are](../api/quick-start.md#_3-check-who-you-are) succeeds but a feature endpoint returns `403`, update the key owner's role or use a different automation user.

## SuperAdmin-Only Actions

Some actions require SuperAdmin regardless of named permissions, including role and permission changes, many system settings, OIDC configuration, global API-key oversight, resetting another user's two-factor, and database restore. User administration (`user_manage`), diagnostics (`diagnostics_view`) and backups (`backup_manage`) can be delegated.

## Related Pages

- [Permissions](../administer/permissions.md)
- [API Permissions](../api/permissions.md)
- [Administration](../administer/index.md)
