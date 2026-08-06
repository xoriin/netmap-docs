---
title: Default Values
description: Important runtime defaults.
sidebar_position: 1
keywords: [defaults]
---

# Default Values

| Setting | Default |
|---|---|
| `APP_ENV` | `development` |
| `DATABASE_URL` | `sqlite:////app/data/netmap.db` |
| `DATA_DIR` | `/app/data` |
| `ACCESS_TOKEN_MINUTES` | `60` |
| `IDLE_TIMEOUT_MINUTES` | `15` |
| `REFRESH_TOKEN_DAYS` | `7` |
| `API_KEY_RATE_LIMIT_MAX_CALLS` | `120` |
| `API_KEY_RATE_LIMIT_WINDOW_SECONDS` | `60` |
| `SYSLOG_UDP_PORT` | `1514` |
| `SYSLOG_TCP_PORT` | `1514` |
| `FIREWALL_LOG_RETENTION_DAYS` | `7` |

## How To Use This Page

Defaults are useful for understanding a fresh deployment, but production deployments should set explicit values for secrets, URLs, CORS origins, trusted hosts, logging, and retention.

## Security-Sensitive Defaults

Production startup rejects missing or placeholder `SECRET_KEY` and `MASTER_KEY` values. Set real values before exposing NetMap.

`AUTH_COOKIE_SECURE` defaults to `false` so local HTTP development works. Enable it for HTTPS deployments.

`SECURE_HSTS_ENABLED` defaults to `false`. Enable it only after HTTPS is working.

## Operational Defaults

Syslog retention defaults to 7 days. Increase it only if disk capacity and search performance are acceptable for your environment.

API-key rate limiting defaults to 120 calls per 60 seconds per key. Increase cautiously for heavy automation.

## Related Pages

- [Configuration Reference](../configuration/configuration.md)
- [Environment Variables](../configuration/environment-variables.md)
- [Ports](./ports.md)
