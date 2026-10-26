---
title: Rate Limits
sidebar_position: 8
keywords: [rate limits, 429]
---

# Rate Limits

Rate limits protect expensive network tools, login, discovery, and API-key authentication. The values below are defaults from `backend/app/core/config.py`.

| Area | Default |
|---|---|
| API key calls | 120 calls per 60 seconds per key |
| Invalid API-key lookup lockout | 10 failures, then 15 minutes per client address |
| Tools | 20 calls per 60 seconds |
| Discovery | 60 seconds between scans |
| Login failures | 5 failures, then 15 minutes |
| Public status page reads | 600 requests per 60 seconds per client IP, 6000 per 60 seconds overall |
| Status integration token writes | 60 writes per 60 seconds per token |

API-key rate limits return `429`. Status page limits also return `429` with a `Retry-After` header; see [Status Pages](../using-netmap/status-pages.md) and [Status Page Integrations](../using-netmap/status-page-integrations.md).

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

Invalid API-key attempts are counted against the client address NetMap resolves for the request: the direct peer, or the rightmost `X-Forwarded-For` entry when the peer is a trusted proxy. If no client address is available, no failure is recorded. Default:

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

## Operational Guidance

- Back off on `429`; do not retry in a tight loop.
- Use one key per automation integration so usage is visible.
- Increase limits only when the host and database can support the request volume.
- Treat repeated invalid-key lockouts as a possible leaked or misconfigured secret.

## Related Pages

- [API-Key Problems](../troubleshooting/api-key-problems.md)
- [API Keys](./api-keys.md)
- [Configuration Reference](../configuration/configuration.md)
