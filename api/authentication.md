---
title: API Authentication
sidebar_position: 1
keywords: [API, authentication, X-API-Key]
---

# API Authentication

NetMap REST API clients should authenticate with an API key unless they are part of the browser session flow.

## Recommended Method: API Key

Send API keys in the `X-API-Key` header:

```text
X-API-Key: nm_<prefix>_<secret>
```

API keys are checked before bearer tokens or cookies. They authenticate as the owning user and inherit that user's current permissions.

Do not send API keys in query strings or as bearer tokens.

## First Test Request

```bash
API_URL="https://netmap.example.com"
API_KEY="<api-key>"

curl --fail-with-body \
  --request GET \
  --url "${API_URL}/api/v1/auth/me" \
  --header "X-API-Key: ${API_KEY}" \
  --header "Accept: application/json"
```

Expected result: JSON describing the user that owns the key.

## Other Auth Methods

The backend also supports:

- `Authorization: Bearer <access-token>`;
- `netmap_access` cookie;
- refresh-token cookie for `/api/v1/auth/refresh`;
- local login at `/api/v1/auth/login`;
- OIDC browser login endpoints under `/api/v1/auth/oidc/*`.

These are primarily used by the SPA. Automation should use API keys.

## Error Behavior

| Status | Meaning |
|---|---|
| `401` | missing, invalid, expired, revoked, or inactive-owner authentication |
| `403` | authenticated user lacks required permission |
| `429` | API-key request limit or failed-lookup lockout exceeded |

## Proxy Requirements

Reverse proxies must preserve `X-API-Key`. If direct requests work but proxied requests fail with `401`, check proxy header forwarding first.

## Related Pages

- [Generating API Keys](./generating-api-keys.md)
- [API-Key Permissions](./api-key-permissions.md)
- [API Errors](./errors.md)
