---
title: Permission Errors
description: Understand 403 responses.
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

## 401 Versus 403

`401` means NetMap did not accept the authentication. Check the session, bearer token, or API key.

`403` means authentication worked, but the role does not allow the action.

## API-Key Example

If this succeeds:

```bash
curl --fail-with-body \
  --url "https://netmap.example.com/api/v1/auth/me" \
  --header "X-API-Key: <api-key>"
```

but a feature endpoint returns `403`, update the owning user's role or permissions.

## SuperAdmin-Only Actions

Some actions require SuperAdmin regardless of named permissions, including user administration, many system settings, OIDC configuration, global API-key oversight, diagnostics, backup, and restore.

## Related Pages

- [Permissions](../10-security/permissions.md)
- [API-Key Permissions](../07-api/api-key-permissions.md)
- [Administration](../05-using-netmap/admin.md)
