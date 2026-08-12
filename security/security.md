---
title: Security Overview
sidebar_position: 10
keywords:
  - security
  - authentication
  - CSRF
  - roles
  - secrets
---

# Security Overview

This page separates implemented protections from deployment responsibilities.

## Implemented Protections

| Area | Behavior |
|---|---|
| Passwords | Local passwords are hashed by backend security code. |
| Sessions | Access tokens are short-lived; refresh tokens are stored in HttpOnly cookies. |
| CSRF | Double-submit CSRF middleware protects cookie-authenticated mutating requests. `X-API-Key` and bearer requests are exempt. |
| API keys | Plaintext shown once; prefix stored; full key HMAC-SHA256 digest stored. |
| API-key auth order | `X-API-Key` is checked before bearer/cookie auth. |
| API-key rate limiting | Per-key fixed-window calls and per-source-IP invalid lookup lockout. |
| Roles | `SuperAdmin`, `NetworkAdmin`, `SecurityAnalyst`, `Viewer`, plus custom roles. SuperAdmin bypasses permission checks. |
| Permissions | Named permissions gate topology writes, security view, tools, exports, IPAM writes, monitoring writes, and alerts. |
| OIDC | Authorization Code + PKCE, state/nonce rows, JWKS validation, local SuperAdmin downgrade guard rails. |
| Secrets | `MASTER_KEY` encrypts stored integration secrets; production startup rejects missing placeholder secrets. |
| Headers | Security headers middleware is enabled by default. |
| Host validation | TrustedHostMiddleware is enabled when `TRUSTED_HOSTS` is non-empty. |
| Syslog isolation | Firewall/syslog writes use a separate SQLite database. |
| Audit | API-key lifecycle and authentication threshold events are audited. |

## Role Defaults

| Role | Default permissions |
|---|---|
| SuperAdmin | All permissions and admin-only actions. |
| NetworkAdmin | topology write, security view, passive and active tools, all export permissions, IPAM write, monitoring write, alert write. |
| SecurityAnalyst | security view, passive tools, firewall export. |
| Viewer | passive tools. |

SuperAdmins can change role permission mappings in Admin.

## Deployment Responsibilities

Administrators are responsible for:

- Running behind HTTPS before enabling `AUTH_COOKIE_SECURE=true`.
- Setting strong `SECRET_KEY` and Fernet `MASTER_KEY`.
- Backing up secrets with the database.
- Restricting `TRUSTED_HOSTS` and `CORS_ORIGINS` to exact production origins.
- Preserving `X-API-Key` and WebSocket upgrade headers through reverse proxies.
- Restricting syslog sender networks with `SYSLOG_SENDER_ALLOWLIST` where possible.
- Protecting `/app/data` file permissions.
- Keeping Docker images and host packages current.
- Reviewing audit logs and key usage.

## API-Key Security

Use API keys only in server-side automation, CI/CD secret stores, environment variables, or dedicated secret managers.

Do not:

- Put keys in frontend/browser code.
- Include keys in URLs.
- Send keys as bearer tokens.
- Store keys in git.
- Paste keys into logs, tickets, or screenshots.

For least privilege, create a dedicated user with only the permissions required for the automation. Because keys have no per-key scopes, the owning user role is the security boundary.

## Known Limitations

- API keys do not support per-key scopes.
- API keys do not support per-key IP allowlists.
- API keys do not authenticate the syslog live WebSocket.
- ReDoc is not configured.
- The OpenAPI schema applies `ApiKeyAuth` and `BearerAuth` to protected operations, but many route details still rely on FastAPI defaults and dependency names rather than hand-authored descriptions.
- Documentation gap: no explicit public API stability, deprecation, or request-id policy exists in source.

## Vulnerability Reporting

Documentation gap: no source-backed security reporting address or policy file was found during this pass. Maintainers should add a `SECURITY.md` or equivalent and link it from this page.

## Security model and hardening

NetMap assumes the operator controls the host, Docker daemon, persistent data directory, reverse proxy, and networks reachable by active probes. The trust boundary includes browser users, API clients, syslog senders, configured OIDC/notification providers, and devices being probed. Deploy behind HTTPS, restrict exposed ports and syslog senders, use exact trusted hosts/origins, and keep the image and host current.

Local passwords are Argon2-hashed. Access tokens are short-lived in React memory; refresh tokens are HttpOnly cookies. CSRF uses a double-submit cookie for cookie-authenticated mutating requests; safe methods are unaffected, while bearer/API-key requests are exempt because they carry explicit credentials. Secure cookies require HTTPS. Failed-login thresholds, progressive delay, user/IP lockouts, password-reset expiry, and session idle timeout limit credential abuse.

Authorization is evaluated at the route and ownership boundary. Hidden navigation is not a security control by itself: APIs return `403` when the live role lacks permission, and users can revoke only their own keys unless SuperAdmin. Role and key changes apply to subsequent requests immediately.

Security headers include CSP, HSTS when enabled, frame protection through CSP, content type protection, Referrer-Policy, and Permissions-Policy. Set HSTS only after HTTPS is stable; preserve forwarded host/protocol headers only from trusted proxies.

`MASTER_KEY` protects Fernet-encrypted integration values such as OIDC, notification, SNMP, and monitor secrets. The signing secret protects API-key HMAC verification and backup integrity. Backups provide integrity signatures, not confidentiality; protect backup files and keys separately. Rotating keys can invalidate sessions, API-key verification, or encrypted settings depending on the key, so plan and test it.

Active tools, discovery, nmap via sudo, notification webhooks, HTTP monitors, and OIDC all make outbound requests. Public targets are disabled by default for active tools; rate limits and SSRF/private-target controls reduce abuse but do not replace network egress policy. Host networking and `NET_RAW` increase reachability and must be granted only to the intended container.

Custom SVG/icon-pack data is sanitised with DOMPurify before rendering or export and remains browser-local. Syslog raw logs, IP addresses, audit records, usernames, and provider delivery details can contain sensitive operational data; restrict access and retention. Never paste API keys, client secrets, webhook URLs, or private keys into logs/issues.

## Incident response

For suspected compromise: revoke affected API keys and sessions, disable the user, preserve audit/syslog/container logs, inspect unusual exports and active probes, rotate exposed provider/application secrets according to the key-dependency plan, restore only from a validated trusted backup, and verify health, users, roles, integrations, and alerting. Report vulnerabilities privately to the project maintainer using the repository's current security contact; do not publish exploit details before a fix and coordinated disclosure plan exists.
