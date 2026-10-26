---
title: API Errors
sidebar_position: 5
keywords: [API, errors, status codes, 401, 403, 429]
---

# API Errors

NetMap returns errors as JSON with a `detail` field:

```bash
curl --silent --url "https://netmap.example.com/api/v1/auth/me" \
  --header "X-API-Key: nm_wrong_key"
```

```json
{"detail":"Invalid, expired, or revoked API key"}
```

Validation errors return `422` with a list of problems:

```json
{
  "detail": [
    {
      "loc": ["body", "name"],
      "msg": "Field required",
      "type": "missing"
    }
  ]
}
```

## Status Codes

| Status | Meaning | Common causes |
|---|---|---|
| `200` | Success | Read, update or action completed. |
| `201` | Created | A resource was created. For API keys, save the `key` value now. |
| `204` | Success, no body | Delete, revoke, logout or restore completed. |
| `304` | Not modified | Public status page read with a matching `If-None-Match`. |
| `400` | Invalid request | Bad backup file, invalid tool input, or a status page integration write without an `Idempotency-Key` header. |
| `401` | Not authenticated | Missing credential, expired session, invalid or revoked API key, or an inactive owner. |
| `403` | Not permitted | The user's role lacks the permission, or the endpoint is SuperAdmin-only. |
| `404` | Not found | Wrong ID, or a resource you cannot see, such as another user's API key or layout, or a status page that is not public. |
| `409` | Conflict | Setup already complete, a discovery schedule is disabled or already running, an address is reserved, or a name is already used. |
| `413` | Too large | Backup upload exceeds the size limit. |
| `422` | Validation failed | Missing or invalid field, path or query value, including an oversized avatar. |
| `429` | Too many requests | API-key call limit, failed API-key lookup lockout, tool limit, or public status page limit. See [Rate Limits](./rate-limits.md). |
| `500` | Server error | Unexpected failure. Check the container logs. |
| `501` | Not implemented | Database backup or restore on a database other than SQLite. |
| `503` | Unavailable | A network tool is not available in the container, single sign-on is unavailable, or a status page is still being prepared. |
| `504` | Timeout | A DNS, ping, traceroute or SNMP tool timed out. |

## Authentication Errors

| Status | `detail` | Fix |
|---|---|---|
| `401` | `Authentication required` | Send the key in the `X-API-Key` header. |
| `401` | `Invalid, expired, or revoked API key` | Check the key value, or create a new key. |
| `401` | `Invalid or expired token` | Sign in again. If you sent an API key as `Authorization: Bearer`, use `X-API-Key` instead. |
| `401` | `Invalid or inactive user` | The account that owns the key is disabled or deleted. |
| `429` | `API key rate limit exceeded` | Slow down and retry after the window. |
| `429` | `Too many failed API key attempts; try again later` | Fix the key, then wait for the lockout to end. |

A `403` `detail` names the action that was refused, for example `Topology write access is not permitted for your role`. See [API Permissions](./permissions.md) for what each role can do.

## Related Pages

- [API Authentication](./authentication.md)
- [Rate Limits](./rate-limits.md)
- [API-Key Problems](../troubleshooting/api-key-problems.md)
