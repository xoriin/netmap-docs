---
title: API-Key Problems
sidebar_position: 4
keywords: [API key, 401, 403, 429]
---

# API-Key Problems

API-key failures usually separate into authentication failures (`401`), authorization failures (`403`), rate limits (`429`), or reverse-proxy header problems.

| Symptom | Cause | Fix |
|---|---|---|
| `401 Authentication required` | Missing `X-API-Key` | Add the header. |
| `401 Invalid, expired, or revoked API key` | Bad, expired, or revoked key | Generate a replacement. |
| `401 Invalid or expired token` | Key sent as `Authorization: Bearer` | Send it in `X-API-Key`; see [Use A Key](../api/authentication.md#use-a-key). |
| `401 Invalid or inactive user` | Owner disabled/deleted | Reactivate owner or create another automation user. |
| `403` | Role lacks permission | Grant permission or use a different owner. |
| `429 API key rate limit exceeded` | Per-key rate limit | Back off or tune limits. |
| `429 Too many failed API key attempts` | Invalid-key lockout | Stop bad requests and wait. |
| Header works direct but not through proxy | Proxy strips header | Preserve `X-API-Key`. |

## Verify The Key

Run the request in [Check Who You Are](../api/quick-start.md#_3-check-who-you-are). If it returns your account, the key and header are correct.

## Check Key State

In the UI:

1. Sign in as the key owner.
2. Open Profile.
3. Review the key name, its last four characters, created and expiry dates, and last-used time. Revoked keys are not listed.

SuperAdmins can review all keys from Admin.

## Check Permissions

If the key works but a feature endpoint returns `403`, see [Permission Errors](./permission-errors.md#_401-versus-403).

## Related Pages

- [API Keys](../api/authentication.md#api-keys)
- [API Authentication](../api/authentication.md)
- [API Permissions](../api/permissions.md)
- [Reverse Proxy Problems](./reverse-proxy-problems.md)
