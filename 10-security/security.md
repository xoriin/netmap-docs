---
title: Security Overview
description: Authentication, sessions, API keys, roles, secrets, deployment duties, and known limitations.
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
- The OpenAPI schema includes an application-wide `ApiKeyAuth` security scheme, but many route details still rely on FastAPI defaults and dependency names rather than hand-authored descriptions.
- Documentation gap: no explicit public API stability, deprecation, or request-id policy exists in source.

## Vulnerability Reporting

Documentation gap: no source-backed security reporting address or policy file was found during this pass. Maintainers should add a `SECURITY.md` or equivalent and link it from this page.
