---
title: API Keys
description: Generate, authenticate with, rotate, revoke, secure, and troubleshoot NetMap API keys.
sidebar_position: 7
keywords:
  - API key
  - X-API-Key
  - authentication
  - automation
  - rotation
---

# API Keys

API keys provide REST API access as the user who owns the key.

::: danger
API keys are secrets. Never commit them to source control, place them in client-side code, include them in screenshots, or send them through insecure channels.
:::

## Verified Behavior

| Question | Answer |
|---|---|
| Who can create keys? | Any active authenticated user. |
| Where are they created? | Profile API-key UI and `POST /api/v1/api-keys`. |
| Can users have multiple keys? | Yes; `list_keys_for_user` returns all keys for the user. |
| Are names supported? | Yes, required `name`, 1 to 100 characters. |
| Are descriptions supported? | No separate description field exists in `ApiKeyCreateRequest`. |
| Are scopes supported? | No per-key scopes are implemented. |
| Do role permissions apply? | Yes. The key resolves to its owning `User`; all existing role checks apply live. |
| Are administrator keys different? | No separate key type. A SuperAdmin-owned key has SuperAdmin access because the owner does. |
| Is the full key shown once? | Yes, only in `ApiKeyCreateResponse.key`. |
| What is visible later in the UI? | Only a password-style mask. Profile and Admin never reveal an existing key or its stored lookup prefix. |
| Storage format | Prefix stored in plaintext; full key stored as HMAC-SHA256 digest using `signing_secret()`. |
| Header name | `X-API-Key`. Header lookup is case-insensitive through FastAPI/Starlette. |
| Header format | `nm_<12-character-prefix>_<43-character-secret>`. Prefix and secret are alphanumeric. |
| Bearer format? | No. Do not send API keys as bearer tokens. |
| Query-string keys? | Not supported. |
| Expiry choices | `null`, `30`, `90`, or `365` days. |
| Revocation | Owner can revoke own keys. SuperAdmin can revoke any key. |
| Rotation | Create replacement key, update clients, verify, then revoke old key. No in-place rotation endpoint exists. |
| Last-used tracking | `last_used_at` and `last_used_ip` update after successful authentication. |
| Audit events | `apikey.created`, `apikey.revoked`, and thresholded `apikey.auth_failed`. |
| Rate limits | 120 calls per 60 seconds per key by default; invalid lookup lockout after 10 failures per IP for 15 minutes. |
| IP restrictions | No per-key allowlist. Invalid lookup lockout is per source IP. |
| Unsupported actions | Syslog live WebSocket API-key auth is not supported. |

## Generating An API Key

### Through the UI

1. Sign in.
2. Open Profile.
3. Open API keys.
4. Enter a name.
5. Choose no expiry, 30 days, 90 days, or 365 days.
6. Create the key.
7. Copy the plaintext key immediately. It will not be shown again.

### Through the API

You must already be authenticated with a browser session, bearer token, or another API key:

```bash
API_URL="https://netmap.example.com"
EXISTING_API_KEY="<existing-api-key>"

curl --fail-with-body \
  --request POST \
  --url "${API_URL}/api/v1/api-keys" \
  --header "X-API-Key: ${EXISTING_API_KEY}" \
  --header "Content-Type: application/json" \
  --data '{"name":"automation","expires_in_days":90}'
```

Successful response:

```json
{
  "id": 1,
  "name": "automation",
  "prefix": "AbCdEf123456",
  "created_at": "2026-07-24T00:00:00Z",
  "expires_at": "2026-10-22T00:00:00Z",
  "last_used_at": null,
  "last_used_ip": null,
  "revoked_at": null,
  "key": "nm_AbCdEf123456_REDACTED"
}
```

## Using An API Key

```bash
API_URL="https://netmap.example.com"
API_KEY="<api-key>"

curl --fail-with-body \
  --request GET \
  --url "${API_URL}/api/v1/topology/devices" \
  --header "X-API-Key: ${API_KEY}" \
  --header "Accept: application/json"
```

Python example:

```python
import os
import httpx

api_url = os.environ["NETMAP_API_URL"]
api_key = os.environ["NETMAP_API_KEY"]

with httpx.Client(
    base_url=api_url,
    headers={"X-API-Key": api_key, "Accept": "application/json"},
    timeout=30.0,
) as client:
    response = client.get("/api/v1/topology/devices")
    response.raise_for_status()
    print(response.json())
```

## Permissions

API keys inherit the owning user's current role. If an administrator changes the user's role, custom role permissions, or active status, existing keys immediately follow that change at the next request.

There are no per-key scopes. Use least-privilege user accounts for automation.

## Rotating A Key Without Downtime

1. Create a new key with a distinct name.
2. Deploy the new key to automation as a secret.
3. Verify the automation succeeds:

```bash
API_URL="https://netmap.example.com"
API_KEY="<new-api-key>"

curl --fail-with-body \
  --url "${API_URL}/api/v1/auth/me" \
  --header "X-API-Key: ${API_KEY}"
```

4. Revoke the old key.
5. Confirm the old key returns `401`.

## Revoking A Key

Owner revoke:

```bash
API_URL="https://netmap.example.com"
API_KEY="<current-api-key>"
KEY_ID="<key-id>"

curl --fail-with-body \
  --request DELETE \
  --url "${API_URL}/api/v1/api-keys/${KEY_ID}" \
  --header "X-API-Key: ${API_KEY}"
```

SuperAdmin revoke any key:

```bash
API_URL="https://netmap.example.com"
ADMIN_API_KEY="<superadmin-api-key>"
KEY_ID="<key-id>"

curl --fail-with-body \
  --request DELETE \
  --url "${API_URL}/api/v1/api-keys/admin/${KEY_ID}" \
  --header "X-API-Key: ${ADMIN_API_KEY}"
```

## Troubleshooting API Keys

| Symptom | Likely cause | Confirm | Fix |
|---|---|---|---|
| `401 Authentication required` | Missing auth header | Inspect request headers | Send `X-API-Key`. |
| `401 Invalid, expired, or revoked API key` | Bad format, wrong secret, expired key, revoked key | List keys in Profile or Admin | Create a replacement key. |
| `401 Invalid or inactive user` | Owner account disabled or deleted | Check Admin users | Reactivate user or move automation to another account. |
| `403` | Owner role lacks required permission | Check Admin role permissions | Grant permission or use a more appropriate service account. |
| `429 API key rate limit exceeded` | Per-key request cap exceeded | Check automation rate | Back off or raise `API_KEY_RATE_LIMIT_MAX_CALLS`. |
| `429 Too many failed API key attempts` | Source IP lockout after invalid attempts | Check key value and proxy source IP | Wait for lockout or fix secret handling. |
| Works directly but not through proxy | Proxy strips `X-API-Key` | Compare backend logs and proxy config | Preserve custom headers. |
| Browser CORS failure | Origin not in `CORS_ORIGINS` | Browser developer tools | Add exact origin and restart. |

## Incident Response For Exposed Keys

1. Revoke the exposed key.
2. Check audit logs for `apikey.auth_failed`, `apikey.created`, `apikey.revoked`, and suspicious owner activity.
3. Create a replacement key if automation still needs access.
4. Rotate any downstream secrets that may have been exposed with it.
