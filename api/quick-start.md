---
title: API Quick Start
sidebar_position: 2
keywords: [API, quick start, first request, API key, curl]
---

# API Quick Start

Make your first NetMap API call in a few minutes. You need a NetMap account and `curl`.

## 1. Create An API Key

1. Sign in to NetMap and open **Profile** from the sidebar.
2. In **API Access**, select **Create API key**.
3. Enter a **Name**, choose an **Expiration**, and select **Create key**.
4. Select **Copy to clipboard**. NetMap shows the full key only once.

The key has the same permissions as your account. For automation, create the key as a dedicated user with only the permissions it needs; see [API Permissions](./permissions.md).

## 2. Store The Key

```bash
export NETMAP_URL="https://netmap.example.com"
export NETMAP_API_KEY="<api-key>"
```

## 3. Check Who You Are

```bash
curl --fail-with-body \
  --url "${NETMAP_URL}/api/v1/auth/me" \
  --header "X-API-Key: ${NETMAP_API_KEY}"
```

```json
{
  "id": 2,
  "username": "automation",
  "role": "Viewer",
  "is_active": true,
  "display_name": null,
  "avatar_data": null,
  "email": null,
  "auth_source": "local",
  "sso_issuer": null,
  "sso_last_login_at": null,
  "whats_new_acknowledged_version": null,
  "entity_colors_enabled": true,
  "totp_enabled": false,
  "totp_required": false,
  "recovery_codes_remaining": 0,
  "permissions": [
    "tools_passive"
  ]
}
```

The response describes the user that owns the key:

- `username` and `role` show which account the key acts as.
- `permissions` lists what that role can do. A SuperAdmin can do everything.

If you get `401`, check that the key is in the `X-API-Key` header and not `Authorization: Bearer`. See [API Errors](./errors.md#authentication-errors).

## 4. List Devices

```bash
curl --fail-with-body \
  --url "${NETMAP_URL}/api/v1/topology/devices" \
  --header "X-API-Key: ${NETMAP_API_KEY}"
```

```json
[
  {
    "display_name": "core-switch-01",
    "hostname": "core-switch-01",
    "ip_address": "10.0.0.2",
    "mac_address": null,
    "vendor": null,
    "os": null,
    "device_type": "switch",
    "status": "unknown",
    "lifecycle": "active",
    "monitoring_paused": false,
    "expected_status": "online",
    "icon": "device",
    "color": null,
    "vlan_id": null,
    "subnet": null,
    "topology_group_id": null,
    "topology_group": "10.0.0.0/24",
    "site_id": null,
    "snmp_profile_id": null,
    "tags": [],
    "notes": null,
    "id": 1,
    "monitor_status": null,
    "last_monitored_at": null,
    "is_favourite": false,
    "created_at": "2026-10-26T10:15:13.988804Z",
    "updated_at": "2026-10-26T10:15:13.988805Z"
  }
]
```

Any signed-in user can list devices. Creating or changing one needs `topology_write`; without it, NetMap returns:

```json
{"detail":"Topology write access is not permitted for your role"}
```

## Next Steps

- [API Authentication](./authentication.md) for rotating and revoking keys.
- [Endpoint Reference](./reference/endpoints.md) for every endpoint and the permission it needs.
- [Automation](../guides/automation-with-api-keys.md) for scripting patterns.
