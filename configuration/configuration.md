---
title: Configuration Reference
description: Environment variables, ports, storage paths, reverse proxy settings, and runtime defaults.
sidebar_position: 4
keywords:
  - configuration
  - environment variables
  - ports
  - reverse proxy
  - storage
---

# Configuration Reference

NetMap reads environment variables through `backend/app/core/config.py`. The settings class also loads `.env` and `/etc/netmap/.env`. Docker environment variables override file values.

Most changes require a container restart because settings are loaded at process startup.

## Ports And Paths

| Item | Default | Source |
|---|---|---|
| Web application port | `8080` in all-in-one image via `APP_PORT` | `docker/aio.Dockerfile`, `docker/aio-nginx.conf.template` |
| FastAPI internal socket | `/tmp/uvicorn.sock` | `docker/aio-entrypoint.sh` |
| Health endpoint | `/api/health` and `/api/v1/health` | `backend/app/main.py`, `api/v1/router.py` |
| Swagger UI | `/api/docs` | `backend/app/main.py` |
| OpenAPI schema | `/api/openapi.json` | `backend/app/main.py` |
| ReDoc | Not configured | `backend/app/main.py` |
| Main database | `/app/data/netmap.db` | `DATABASE_URL` default |
| Syslog database | `/app/data/firewall.db` | `db/firewall_session.py` |
| Syslog UDP/TCP | `1514` | `SYSLOG_UDP_PORT`, `SYSLOG_TCP_PORT` |

## Environment Variables

| Variable | Required | Default | Accepted values | Secret | Restart | Description |
|---|---:|---|---|---:|---:|---|
| `APP_ENV` | No | `development` | string; `production` enables stricter startup checks | No | Yes | Runtime environment. |
| `APP_URL` | Production recommended | empty | Absolute URL | No | Yes | Public URL for password reset links and security-sensitive redirects. |
| `APP_PORT` | No | `8080` in Dockerfile | TCP port | No | Yes | nginx listen port in the all-in-one container. |
| `DATABASE_URL` | No | `sqlite:////app/data/netmap.db` | SQLAlchemy URL | No | Yes | Main database connection. Current supported deployment uses SQLite. |
| `DATA_DIR` | No | `/app/data` | writable path | No | Yes | Persistent data directory. Startup fails if not writable. |
| `SECRET_KEY` | Yes in production unless file set | `None` | random string | Yes | Yes | JWT/session signing source and API-key HMAC input via signing secret. |
| `SECRET_KEY_FILE` | Alternative | `None` | file path | Yes | Yes | Read `SECRET_KEY` from a file. |
| `MASTER_KEY` | Yes in production unless file set | `None` | Fernet key | Yes | Yes | Encrypts stored secrets such as OIDC client secret and notification/SNMP secrets. |
| `MASTER_KEY_FILE` | Alternative | `None` | file path | Yes | Yes | Read `MASTER_KEY` from a file. |
| `CORS_ORIGINS` | No | `["http://localhost:8080","http://localhost:5173"]` | JSON-style list | No | Yes | Allowed browser origins for credentialed cross-origin API calls. |
| `TRUSTED_HOSTS` | No | `[]` | JSON-style list | No | Yes | Enables Starlette TrustedHostMiddleware when non-empty. |
| `TRUSTED_PROXY_IPS` | No | `[]` | JSON-style list | No | Yes | Used by request IP helper for forwarded headers. |
| `FORWARDED_ALLOW_IPS` | No | `127.0.0.1` | uvicorn value | No | Yes | Passed to uvicorn `--forwarded-allow-ips` by entrypoint. |
| `SECURE_HEADERS_ENABLED` | No | `true` | boolean | No | Yes | Enables security headers middleware. |
| `SECURE_HSTS_ENABLED` | No | `false` | boolean | No | Yes | Adds HSTS when secure headers are enabled. |
| `SECURE_HSTS_MAX_AGE` | No | `31536000` | integer seconds | No | Yes | HSTS max-age. |
| `SECURE_CONTENT_SECURITY_POLICY` | No | strict self policy | string | No | Yes | Content Security Policy header value. |
| `SECURE_REFERRER_POLICY` | No | `strict-origin-when-cross-origin` | string | No | Yes | Referrer-Policy header. |
| `SECURE_PERMISSIONS_POLICY` | No | `camera=(), geolocation=(), microphone=()` | string | No | Yes | Permissions-Policy header. |
| `AUTH_COOKIE_SECURE` | No | `false` | boolean | No | Yes | Marks auth cookies Secure; enable behind HTTPS. |
| `ACCESS_TOKEN_MINUTES` | No | `60` | integer minutes | No | Yes | Access-token lifetime. |
| `IDLE_TIMEOUT_MINUTES` | No | `15` | integer minutes | No | Yes | Frontend idle timeout and auth behavior. |
| `REFRESH_TOKEN_DAYS` | No | `7` | integer days | No | Yes | Refresh-token lifetime. |
| `AUTH_MAX_FAILED_ATTEMPTS` | No | `5` | integer | No | Yes | Per-user login lockout threshold. |
| `AUTH_LOCKOUT_MINUTES` | No | `15` | integer minutes | No | Yes | Login lockout duration. |
| `AUTH_PROGRESSIVE_DELAY_SECONDS` | No | `0.5` | float seconds | No | Yes | Delay applied during failed login handling. |
| `AUTH_IP_LOCKOUT_ENABLED` | No | `false` | boolean | No | Yes | Enables IP-level login lockout controls. |
| `API_KEY_RATE_LIMIT_MAX_CALLS` | No | `120` | integer | No | Yes | Per-key fixed-window request limit. |
| `API_KEY_RATE_LIMIT_WINDOW_SECONDS` | No | `60` | integer seconds | No | Yes | API-key rate-limit window. |
| `API_KEY_MAX_FAILED_LOOKUPS` | No | `10` | integer | No | Yes | Invalid-key attempts before source IP lockout. |
| `API_KEY_LOOKUP_LOCKOUT_MINUTES` | No | `15` | integer minutes | No | Yes | Invalid-key source-IP lockout duration. |
| `DISCOVERY_SCAN_TIMEOUT_SECONDS` | No | `60` | integer seconds | No | Yes | nmap discovery timeout. |
| `DISCOVERY_RATE_LIMIT_SECONDS` | No | `60` | integer seconds | No | Yes | Discovery scan rate limit. |
| `DISCOVERY_MAX_HOSTS_WITHOUT_CONFIRMATION` | No | `256` | integer | No | Yes | Host-count threshold requiring confirmation. |
| `DISCOVERY_MAX_HOSTS` | No | `1024` | integer | No | Yes | Maximum discovery hosts. |
| `ACTIVE_NETWORK_PUBLIC_TARGETS_ENABLED` | No | `false` | boolean | No | Yes | Allows active tools to target public addresses when enabled. |
| `TOOL_RATE_LIMIT_MAX_CALLS` | No | `20` | integer | No | Yes | Tool endpoint rate limit. |
| `TOOL_RATE_LIMIT_WINDOW_SECONDS` | No | `60` | integer seconds | No | Yes | Tool rate-limit window. |
| `EVENT_RETENTION_DAYS` | No | `7` | integer >= 1 | No | Yes | General event retention. |
| `FIREWALL_LOG_RETENTION_DAYS` | No | `7` | integer >= 1 | No | Yes | Firewall event retention. |
| `SYSLOG_ENABLED` | No | `true` | boolean | No | Yes | Enables syslog service. |
| `SYSLOG_UDP_ENABLED` | No | `true` | boolean | No | Yes | Enables UDP listener. |
| `SYSLOG_TCP_ENABLED` | No | `true` | boolean | No | Yes | Enables TCP listener. |
| `SYSLOG_HOST` | No | `0.0.0.0` | bind address | No | Yes | Syslog bind host. |
| `SYSLOG_UDP_PORT` | No | `1514` | port | No | Yes | UDP syslog port. |
| `SYSLOG_TCP_PORT` | No | `1514` | port | No | Yes | TCP syslog port. |
| `SYSLOG_TLS_ENABLED` | No | `false` | boolean | No | Yes | TLS syslog flag. Documentation gap: listener behavior needs verification in `services/syslog/server.py`. |
| `SYSLOG_TLS_PORT` | No | `6514` | port | No | Yes | TLS syslog port setting. |
| `SYSLOG_TLS_CERTFILE` | No | `None` | path | No | Yes | TLS certificate path. |
| `SYSLOG_TLS_KEYFILE` | No | `None` | path | Yes | Yes | TLS private key path. |
| `SYSLOG_SENDER_ALLOWLIST` | No | `[]` | JSON-style list of IPs/CIDRs | No | Yes | Restricts accepted syslog senders when set. |
| `SYSLOG_MAX_LINE_BYTES` | No | `8192` | integer bytes | No | Yes | Maximum syslog message line size. |
| `SYSLOG_MAX_TCP_CONNECTIONS` | No | `50` | integer | No | Yes | TCP syslog connection cap. |
| `SYSLOG_WS_MAX_CONNECTIONS` | No | `50` | integer | No | Yes | Syslog WebSocket connection cap. |
| `NOTIFICATION_BLOCK_PRIVATE_TARGETS` | No | `false` | boolean | No | Yes | Blocks private notification targets when enabled. |
| `OIDC_ENABLED` | No | `false` | boolean | No | Yes, unless overridden in DB | Enables OIDC from environment. DB settings can override. |
| `OIDC_ISSUER` | No | empty | URL | No | Yes, unless overridden in DB | OIDC issuer. |
| `OIDC_CLIENT_ID` | No | empty | string | No | Yes, unless overridden in DB | OIDC client ID. |
| `OIDC_CLIENT_SECRET` | No | empty | string | Yes | Yes, unless overridden in DB | OIDC client secret. |
| `OIDC_CLIENT_SECRET_FILE` | No | `None` | path | Yes | Yes | File-based OIDC client secret. |
| `OIDC_REDIRECT_URL` | No | empty | URL | No | Yes, unless overridden in DB | Callback URL. |
| `OIDC_SCOPES` | No | `openid profile email` | space-separated scopes | No | Yes, unless overridden in DB | OIDC scopes. |
| `OIDC_ALLOWED_EMAIL_DOMAINS` | No | `[]` | JSON-style list | No | Yes, unless overridden in DB | Restricts email domains. |
| `OIDC_AUTO_PROVISION` | No | `false` | boolean | No | Yes, unless overridden in DB | Creates local users on first SSO login when allowed. |
| `OIDC_PROVIDER_NAME` | No | `SSO` | string | No | Yes, unless overridden in DB | UI label for the provider. |
| `OIDC_LINK_BY_EMAIL` | No | `true` | boolean | No | Yes, unless overridden in DB | Allows first-time link by verified email. |
| `OIDC_ALLOW_UNVERIFIED_EMAIL` | No | `false` | boolean | No | Yes, unless overridden in DB | Allows unverified email claims. |
| `OIDC_GROUP_CLAIM` | No | `groups` | claim name | No | Yes, unless overridden in DB | Claim used for role mapping. |
| `OIDC_ROLE_MAPPINGS` | No | empty | mapping string | No | Yes, unless overridden in DB | Group-to-role mapping input. |
| `OIDC_MANAGE_ROLES` | No | `false` | boolean | No | Yes, unless overridden in DB | Allows OIDC claims to manage roles. |
| `OIDC_DEFAULT_ROLE` | No | `Viewer` | role name | No | Yes, unless overridden in DB | Auto-provisioned default role. |
| `OIDC_ALLOW_SUPER_ADMIN` | No | `false` | boolean | No | Yes, unless overridden in DB | Allows OIDC mapping to SuperAdmin. |
| `LOG_LEVEL` | No | `info` | `debug`, `info`, `warning`, `error`, `critical` | No | Yes | uvicorn log level. |

## Reverse Proxy Requirements

NetMap’s bundled nginx proxies `/api/` to FastAPI and serves the SPA for every other path. If you put another reverse proxy in front:

- Preserve `Host`.
- Preserve `X-Forwarded-For` and `X-Forwarded-Proto`.
- Preserve WebSocket upgrade headers for API WebSocket endpoints.
- Do not strip `X-API-Key`.
- Set `APP_URL`, `CORS_ORIGINS`, `TRUSTED_HOSTS`, and `AUTH_COOKIE_SECURE` for the public URL.

Minimal nginx example:

```nginx
server {
    listen 443 ssl http2;
    server_name netmap.example.com;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_read_timeout 600s;
    }
}
```

Documentation gap: Caddy, Traefik, and Nginx Proxy Manager examples were not verified from source-specific deployment files. They should preserve the same headers and WebSocket behavior.
