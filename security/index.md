---
title: Security Overview
sidebar_position: 1
keywords:
  - security
  - security model
  - authentication
  - CSRF
  - secrets
---

# Security Overview

This page explains how NetMap protects sign-in, sessions, and stored data, and what you are responsible for when you deploy it. Roles and permissions are covered on [Permissions](./permissions.md).

NetMap assumes you control the host, the Docker daemon, the persistent data directory, the reverse proxy, and the networks that active probes can reach. The trust boundary includes browser users, API clients, syslog senders, configured OIDC and notification providers, and the devices being probed.

## Sign-In And Sessions

| Method | Used for | How it works |
|---|---|---|
| Local username and password | Browser sign-in and administrative recovery | Passwords are stored as Argon2 hashes. |
| OIDC SSO | Browser sign-in through an identity provider | Authorization Code with PKCE, state and nonce tracking, and JWKS validation. See [OIDC SSO](../configuration/oidc-sso.md). |
| Access token | Browser and API session calls | Short-lived. The app holds it in memory and can send it as `Authorization: Bearer`; sign-in also sets it as the HttpOnly, `SameSite=Strict` `netmap_access` cookie for `/api/`. |
| Refresh cookie | Renewing a browser session | The refresh token is kept in the HttpOnly `netmap_refresh` cookie. |
| API key | REST automation | Sent only in `X-API-Key` and resolved to the user who owns it. See [API Authentication](../api/authentication.md). |

Failed-sign-in thresholds, progressive delay, lockouts, password-reset expiry, and the optional idle timeout limit credential abuse. Lockout responses include `Retry-After`; see [Sign-In Lockout](../api/rate-limits.md#sign-in-lockout). Two-factor authentication is covered on [Two-Factor Authentication](./two-factor-authentication.md).

## Authorization

Every protected request is checked against the live role of the signed-in user or key owner, and returns `403` when the role lacks the permission. Hidden navigation is not a security control on its own. Role and key changes apply to the next request.

## Built-In Protections

| Area | Behaviour |
|---|---|
| CSRF | A double-submit cookie protects cookie-authenticated requests that change data. Requests with `X-API-Key` or a bearer token are exempt, because browsers don't attach those headers automatically. |
| Security headers | On by default (`SECURE_HEADERS_ENABLED=true`): CSP, frame protection through CSP, content-type protection, Referrer-Policy, Permissions-Policy, and HSTS when enabled. An HTTPS `APP_URL` in production requires both HSTS and Secure cookies. |
| Host checking | Requests for other host names are rejected when `TRUSTED_HOSTS` is set. |
| API keys | The key is shown once. NetMap stores only its lookup prefix, its last four characters, and an HMAC-SHA256 digest. |
| Stored secrets | `MASTER_KEY` encrypts integration secrets such as OIDC, notification, SNMP, and monitor credentials. Production startup rejects missing or placeholder secrets. |
| Uploads and imports | Images are decoded and inspected on the server, active SVG content is blocked, uploads and imports have size limits, and CSV cells that look like formulas are neutralised. |
| Syslog | Firewall and syslog events are written to a separate SQLite database. |
| Audit | API-key lifecycle and authentication threshold events are recorded in the audit log. |

## Secrets And Backups

The signing secret protects API-key verification and legacy backup integrity. Manual `.nmbak` backups add passphrase-based AES-GCM encryption. Scheduled and legacy `.db` backups are signed but not encrypted, so keep them on encrypted storage. Rotating a key can invalidate sessions, API keys, or encrypted settings; see [Secrets Management](./secrets-management.md) before you rotate.

## Outbound Requests

Active tools, discovery, notification webhooks, HTTP monitors, and OIDC all make outbound requests. Public targets are off by default for active tools. Rate limits and private-target controls reduce abuse but don't replace a network egress policy. Host networking and `NET_RAW` increase what the container can reach, so grant them only to the NetMap container; see [Network Exposure](./network-exposure.md).

Syslog messages, IP addresses, audit records, usernames, and notification delivery details can contain sensitive data. Restrict who can see them and how long you keep them. Never paste API keys, client secrets, webhook URLs, or private keys into logs or issues.

## Your Responsibilities

- Serve NetMap over HTTPS with `AUTH_COOKIE_SECURE=true` and `SECURE_HSTS_ENABLED=true` for an HTTPS `APP_URL`. Production startup rejects an inconsistent combination.
- Set a strong `SECRET_KEY` and Fernet `MASTER_KEY`, and back them up with the database.
- Restrict `TRUSTED_HOSTS` and `CORS_ORIGINS` to the exact production origins.
- Preserve `X-API-Key` and WebSocket upgrade headers through your reverse proxy, and trust forwarded headers only from that proxy.
- Restrict syslog senders with `SYSLOG_SENDER_ALLOWLIST` and firewall rules where possible.
- Protect `/app/data` with restrictive permissions and encrypted host storage.
- Keep Docker images and host packages current, and review audit logs and key usage.

## Known Limitations

- API keys have no per-key scopes or IP allowlists. See [API Permissions](../api/permissions.md).
- ReDoc is not configured; use Swagger UI. See [OpenAPI And Swagger](../api/reference/openapi.md).
- NetMap does not publish an API deprecation policy. See [Versioning](../api/index.md#versioning).

## Incident Response

If you suspect a compromise:

1. Revoke the affected API keys and sessions, and disable the user.
2. Preserve the audit, syslog, and container logs.
3. Check for unusual exports and active probes.
4. Rotate exposed provider and application secrets, following [Secrets Management](./secrets-management.md).
5. Restore only from a validated, trusted backup, then check health, users, roles, integrations, and alerting.

To report a vulnerability, see [Vulnerability Reporting](./vulnerability-reporting.md).

## Related Pages

- [Permissions](./permissions.md)
- [Two-Factor Authentication](./two-factor-authentication.md)
- [Secrets Management](./secrets-management.md)
- [Network Exposure](./network-exposure.md)
- [API Authentication](../api/authentication.md)
