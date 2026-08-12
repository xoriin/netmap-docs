---
title: Authentication Problems
sidebar_position: 3
keywords: [auth, login, SSO]
---

# Authentication Problems

## Local login rejected

Likely causes: wrong password, inactive user, lockout, Require SSO for non-SuperAdmin users.

Fix: use a SuperAdmin account to unlock/reactivate the user or review SSO settings.

## Session expires

Access tokens are short-lived. Refresh tokens are held in an HttpOnly cookie. If refresh fails, sign in again.

## Confirm Health First

```bash
curl --fail http://127.0.0.1:8080/api/health
```

If health fails, troubleshoot startup or proxy before authentication.

## Account Lockout

Local login failures are limited by:

```dotenv
AUTH_MAX_FAILED_ATTEMPTS=5
AUTH_LOCKOUT_MINUTES=15
```

SuperAdmins can unlock a user through the Admin UI or:

```text
POST /api/v1/auth/users/{user_id}/unlock-login
```

## Require SSO

When Require SSO is enabled and usable, local login is restricted for non-SuperAdmin users. SuperAdmin local login remains available as the emergency recovery path.

## Cookie And HTTPS Problems

If login works on HTTP but fails behind HTTPS, check:

- `APP_URL`;
- `CORS_ORIGINS`;
- `TRUSTED_HOSTS`;
- `AUTH_COOKIE_SECURE`;
- reverse-proxy `X-Forwarded-Proto`.

## Related Pages

- [OIDC SSO](../configuration/oidc-sso.md)
- [Reverse Proxy Problems](./reverse-proxy-problems.md)
- [Security Model](../security/security-model.md)
