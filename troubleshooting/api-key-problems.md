---
title: API-Key Problems
description: Troubleshoot API-key authentication and authorization.
sidebar_position: 4
keywords: [API key, 401, 403, 429]
---

# API-Key Problems

API-key failures usually separate into authentication failures (`401`), authorization failures (`403`), rate limits (`429`), or reverse-proxy header problems.

| Symptom | Cause | Fix |
|---|---|---|
| `401 Authentication required` | Missing `X-API-Key` | Add the header. |
| `401 Invalid, expired, or revoked API key` | Bad, expired, or revoked key | Generate a replacement. |
| `401 Invalid or inactive user` | Owner disabled/deleted | Reactivate owner or create another automation user. |
| `403` | Role lacks permission | Grant permission or use a different owner. |
| `429 API key rate limit exceeded` | Per-key rate limit | Back off or tune limits. |
| `429 Too many failed API key attempts` | Invalid-key lockout | Stop bad requests and wait. |
| Header works direct but not through proxy | Proxy strips header | Preserve `X-API-Key`. |

## Verify The Header

```bash
API_URL="https://netmap.example.com"
API_KEY="<api-key>"

curl --fail-with-body \
  --url "${API_URL}/api/v1/auth/me" \
  --header "X-API-Key: ${API_KEY}" \
  --header "Accept: application/json"
```

Do not use:

```text
Authorization: Bearer <api-key>
```

API keys are not bearer tokens.

## Check Key State

In the UI:

1. Sign in as the key owner.
2. Open Profile.
3. Review API key name, prefix, expiry, revoked state, last-used time, and last-used IP.

SuperAdmins can review all keys from Admin.

## Check Permissions

If `/api/v1/auth/me` works but a feature endpoint returns `403`, the key is valid and the owner lacks permission. Update the owner role or use a different automation user.

## Related Pages

- [API Keys](../api/api-keys.md)
- [API Authentication](../api/authentication.md)
- [API-Key Permissions](../api/api-key-permissions.md)
- [Reverse Proxy Problems](./reverse-proxy-problems.md)
