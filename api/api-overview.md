---
title: API Overview
sidebar_position: 6
keywords:
  - API
  - OpenAPI
  - Swagger
  - errors
  - rate limits
---

# API Overview

NetMap exposes a FastAPI REST API under `/api/v1`. The all-in-one container serves the SPA and proxies `/api/` to FastAPI through nginx.

## Base URL

Use the same origin as the web UI:

```text
https://netmap.example.com/api/v1
```

Local default for the all-in-one image:

```text
http://127.0.0.1:8080/api/v1
```

## OpenAPI

| Resource | Path |
|---|---|
| OpenAPI JSON | `/api/openapi.json` |
| Swagger UI | `/api/docs` |
| ReDoc | Not configured |

The schema title is `NetMap API`, and its version is read from the same installed `VERSION` file used by the application. Swagger groups operations by NetMap capability and marks protected routes with API-key and bearer authentication options.

## Authentication Methods

REST endpoints accept:

- `X-API-Key: nm_<prefix>_<secret>` for API-key clients.
- `Authorization: Bearer <access-token>` for browser/session clients and tooling that has a token.
- `netmap_access` cookie where present.

`get_current_user` checks the `X-API-Key` header first. API-key requests are exempt from CSRF middleware.

Public endpoints include health, setup status, initial admin setup while no user exists, login, refresh, logout, forgot/reset password, public settings, OIDC status/login/callback, and system version.

## Request And Response Format

JSON request bodies use `application/json`. File/backup endpoints use upload or binary response handling as implemented in `exports.py`.

Date and time fields are serialized as JSON strings with Pydantic/FastAPI date-time formatting.

Most application errors use FastAPI's default envelope:

```json
{
  "detail": "Authentication required"
}
```

Validation errors use FastAPI/Pydantic's validation envelope:

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

## Rate Limits

Implemented rate limits:

| Area | Default | Source |
|---|---|---|
| API-key calls | 120 calls per 60 seconds per key | `API_KEY_RATE_LIMIT_MAX_CALLS`, `API_KEY_RATE_LIMIT_WINDOW_SECONDS` |
| Invalid API-key lookups | 10 failures then 15 minute source-IP lockout | `API_KEY_MAX_FAILED_LOOKUPS`, `API_KEY_LOOKUP_LOCKOUT_MINUTES` |
| Tools | 20 calls per 60 seconds | `TOOL_RATE_LIMIT_MAX_CALLS`, `TOOL_RATE_LIMIT_WINDOW_SECONDS` |
| Discovery | 60 second scan rate limit | `DISCOVERY_RATE_LIMIT_SECONDS` |
| Login failures | 5 attempts then 15 minute lockout | `AUTH_MAX_FAILED_ATTEMPTS`, `AUTH_LOCKOUT_MINUTES` |

## Pagination, Filtering, Sorting, Search

Filtering and pagination are endpoint-specific. Examples:

- `GET /api/v1/syslog/events` supports search and filters implemented in `syslog.py`.
- `GET /api/v1/audit/logs` supports audit log filters implemented in `audit.py`.
- Many list endpoints return complete arrays without a general pagination contract.

Documentation gap: there is no global pagination, sorting, idempotency, stability, or deprecation policy in source.

## Common Status Codes

| Status | Meaning in NetMap | Common cause | Resolution |
|---|---|---|---|
| `200` | Successful read/update/action | Request accepted | Use response body. |
| `201` | Resource created | Create endpoint succeeded | Store returned ID; for API keys, store the plaintext key immediately. |
| `204` | Successful action with no body | Delete, revoke, logout, restore | Treat as success. |
| `400` | Invalid operation | Bad backup, invalid observation action, invalid tool input | Read `detail` and correct request. |
| `401` | Authentication failed | Missing token, invalid JWT, invalid/expired/revoked API key | Reauthenticate or replace key. |
| `403` | Permission denied | Role lacks permission or SuperAdmin required | Use an account/key with the required role or update permissions. |
| `404` | Resource not found | Wrong ID or ownership-hidden key | Verify ID and ownership. |
| `409` | Conflict | Setup already complete, discovery schedule already running | Retry after resolving conflict. |
| `413` | Payload too large | Avatar or backup upload exceeds limit | Reduce file size. |
| `422` | Schema validation failed | Missing/invalid field or path/query value | Match the Pydantic schema. |
| `429` | Rate limit/lockout | API-key calls or failed lookups exceeded limit | Wait for the window/lockout to expire. |
| `500` | Internal server error | Unexpected server failure | Check container logs and diagnostics. |
| `501` | Not implemented | Backup/restore unsupported for DB type | Use supported SQLite deployment or filesystem backup. |
| `503` | Tool unavailable | Missing raw network capability or command unavailable | Check container capabilities and packages. |
| `504` | Tool timeout | DNS, ping, traceroute, SNMP timeout | Increase timeout where supported or check network reachability. |

## First API Request

```bash
API_URL="https://netmap.example.com"
API_KEY="<api-key>"

curl --fail-with-body \
  --request GET \
  --url "${API_URL}/api/v1/auth/me" \
  --header "X-API-Key: ${API_KEY}" \
  --header "Accept: application/json"
```

## Client quick starts

Python clients should keep the API key in an environment variable, use a bounded timeout, call `raise_for_status()`, and treat `401/403/429` according to the error table. For downloads, write the response bytes and preserve the server filename/content type rather than decoding as JSON. PowerShell uses the same header and JSON contracts:

```powershell
$headers = @{ "X-API-Key" = $env:NETMAP_API_KEY; Accept = "application/json" }
$device = Invoke-RestMethod -Uri "$env:NETMAP_URL/api/v1/auth/me" -Headers $headers
$device | ConvertTo-Json -Depth 8
```

For automation, create a dedicated least-privilege user/key, list and match records by stable IDs or normalised IP/MAC, use explicit fields in `PATCH` requests, back off on `429`, and verify a create/update with a follow-up `GET`. Inventory export, IP reservation, discovery polling/import, and monitoring summary are the preferred recipes; do not retry destructive deletes blindly because the API has no universal idempotency key.

## Compatibility and security boundaries

The stable base path is `/api/v1`; compatibility aliases are called out in the endpoint inventory. There is no source-backed global deprecation or backward-compatibility SLA, so pin the product image/version and review release notes before upgrading. API keys are REST-only; the live syslog WebSocket requires browser/session authentication. Use HTTPS, preserve `X-API-Key` through proxies, validate inputs server-side, and keep request/response logs free of secrets.
