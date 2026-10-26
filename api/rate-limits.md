---
title: Rate Limits
sidebar_position: 8
keywords: [rate limits, 429]
---

# Rate Limits

Rate limits protect expensive network tools, sign-in, discovery, and API-key authentication. These are the defaults. The environment variables below change them; the status page limits are fixed.

| Area | Default | `Retry-After` |
|---|---|---|
| API key calls | 120 calls per 60 seconds per key | No |
| Invalid API-key or status integration token lockout | 10 failures, then 15 minutes per client address | No |
| Tools | 20 calls per 60 seconds per user | No |
| Discovery | 60 seconds between scans per user | No |
| Login failures | 5 failures, then 15 minutes | Yes, seconds until the lockout ends |
| Public status page reads | 600 requests per 60 seconds per client IP, 6000 per 60 seconds overall | Yes, 60 seconds |
| Status integration token writes | 60 writes per 60 seconds per token | Yes, seconds until another write is allowed |

Every limit returns `429`; see [API Errors](./errors.md). Where there is no `Retry-After` header, wait for the window or lockout to end before you retry. Status page limits are covered in [Status Pages](../using-netmap/status-pages.md) and [Status Page Integrations](./guides/status-page-integrations.md).

## API-Key Call Limit

Each active API key has a fixed-window request counter. Default:

```dotenv
API_KEY_RATE_LIMIT_MAX_CALLS=120
API_KEY_RATE_LIMIT_WINDOW_SECONDS=60
```

When exceeded, NetMap returns:

```json
{"detail":"API key rate limit exceeded"}
```

## Invalid API-Key Lookup Lockout

Invalid API-key attempts are counted against the client address NetMap resolves for the request: the direct peer, or the rightmost `X-Forwarded-For` entry when the peer is a trusted proxy. If no client address is available, no failure is recorded. Invalid status integration tokens count toward the same total, and while an address is locked, both API keys and integration tokens from it are refused, even valid ones. Default:

```dotenv
API_KEY_MAX_FAILED_LOOKUPS=10
API_KEY_LOOKUP_LOCKOUT_MINUTES=15
```

When locked, NetMap returns:

```json
{"detail":"Too many failed API key attempts; try again later"}
```

## Tools And Discovery

Network tools and discovery can generate traffic from the NetMap host, so they have separate limits:

```dotenv
TOOL_RATE_LIMIT_MAX_CALLS=20
TOOL_RATE_LIMIT_WINDOW_SECONDS=60
DISCOVERY_RATE_LIMIT_SECONDS=60
```

## Sign-In Lockout

After repeated failed username and password sign-ins, NetMap locks sign-in for the account:

```dotenv
AUTH_MAX_FAILED_ATTEMPTS=5
AUTH_LOCKOUT_MINUTES=15
```

Wrong two-factor codes at sign-in count toward the same lockout, as do wrong passwords or codes when you set up two-factor authentication, replace recovery codes or turn it off. A user with `user_manage` can clear an account's lockout with `POST /api/v1/auth/users/{user_id}/unlock-login`.

## Operational Guidance

- Back off on `429`; do not retry in a tight loop.
- Use one key per automation integration so usage is visible.
- Increase limits only when the host and database can support the request volume.
- Treat repeated invalid-key lockouts as a possible leaked or misconfigured secret.

## Related Pages

- [API-Key Problems](../troubleshooting/api-key-problems.md)
- [API Authentication](./authentication.md)
- [Configuration Reference](../configuration/configuration.md)
