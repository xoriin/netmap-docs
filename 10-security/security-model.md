---
title: Security Model
description: Implemented security controls.
sidebar_position: 1
keywords: [security model]
---

# Security Model

NetMap's security model combines local users, optional OIDC SSO, role-based permissions, short-lived access tokens, HttpOnly refresh cookies, CSRF protection for browser sessions, and API keys for automation.

This page focuses on how those controls fit together. The broader overview is also available at [Security](./security.md).

## Authentication Methods

| Method | Primary use | Source-backed behavior |
|---|---|---|
| Local username/password | Browser login and administrative recovery | Passwords are validated through the auth service and local users table. |
| OIDC SSO | Browser login through an external identity provider | Authorization Code + PKCE, state/nonce tracking, JWKS validation. |
| Refresh cookie | Browser session renewal | Refresh token is stored in an HttpOnly cookie. |
| Bearer access token | Browser/API session calls | Access token is short-lived and can be sent in `Authorization: Bearer`. |
| API key | External REST automation | Sent in `X-API-Key`, resolved to an owning user. |

## Authorization

Routes use dependencies in `backend/app/api/deps.py`. SuperAdmin bypasses named permission checks. Other roles are evaluated against the permission cache in `backend/app/services/rbac/permissions.py`.

Named permissions include:

- `topology_write`
- `security_view`
- `tools_passive`
- `tools_active`
- `inventory_export`
- `firewall_export`
- `report_export`
- `ipam_write`
- `monitoring_write`
- `alert_write`

## API-Key Security Boundary

API keys do not have scopes. A key has the live permissions of the user that owns it. Disabling the user disables the key. Changing the user's role changes what the key can do.

Use separate automation users for separate integrations.

## Browser Protections

Cookie-authenticated mutating requests are protected by CSRF middleware. API-key and bearer-token requests are exempt because browsers do not automatically attach those headers.

Security headers are enabled by default through middleware when `SECURE_HEADERS_ENABLED=true`.

## Deployment Responsibilities

Operators must still provide:

- HTTPS;
- strong `SECRET_KEY` and `MASTER_KEY`;
- restricted `TRUSTED_HOSTS` and `CORS_ORIGINS`;
- safe reverse-proxy header forwarding;
- host firewall rules around syslog and web/API ports;
- backups of secrets and databases.

## Related Pages

- [Permissions](./permissions.md)
- [API-Key Security](./api-key-security.md)
- [Secrets Management](./secrets-management.md)
- [Network Exposure](./network-exposure.md)
