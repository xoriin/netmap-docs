---
title: API Authentication
sidebar_position: 3
keywords: [API, authentication, API key, X-API-Key, session, cookie, rotation, revoke, 2FA]
---

# API Authentication

NetMap accepts three credentials on REST endpoints:

| Credential | Sent as | Use for |
|---|---|---|
| API key | `X-API-Key: nm_<prefix>_<secret>` header | Scripts, integrations and automation. |
| Session access token | `Authorization: Bearer <access-token>` header | Clients that sign in with a username and password. |
| Session cookie | `netmap_access` cookie | The NetMap web app. |

If a request sends an API key, NetMap uses it and ignores any other credential. Use API keys for automation.

## API Keys

An API key authenticates as the user who created it and has that user's current permissions. Keys work only in the `X-API-Key` header:

- A key sent as `Authorization: Bearer` returns `401` `Invalid or expired token`.
- A key in a query string is ignored.

Keys look like `nm_<12-character prefix>_<43-character secret>`. NetMap shows the full key once, when you create it.

### Create A Key In The App

1. Open **Profile** from the sidebar.
2. In **API Access**, select **Create API key**.
3. Enter a **Name**, for example `monitoring-script`.
4. Choose an **Expiration**: **Never**, **30 days**, **90 days** or **365 days**.
5. Select **Create key**.
6. Select **Copy to clipboard**, store the key in your secret store, then select **Done**.

The **API Access** table lists your keys with their name, last four characters, and when each was created, expires and was last used.

### Create A Key With The API

Any signed-in user can create keys for their own account, including with an existing key:

```bash
curl --fail-with-body \
  --request POST \
  --url "${NETMAP_URL}/api/v1/api-keys" \
  --header "X-API-Key: ${NETMAP_API_KEY}" \
  --header "Content-Type: application/json" \
  --data '{"name":"automation","expires_in_days":90}'
```

`name` is required, 1 to 100 characters. `expires_in_days` is `30`, `90`, `365` or `null` for no expiry. The response is `201`, and `key` is the only time the full key is returned:

```json
{"id":7,"name":"automation","prefix":"AbCdEf123456","suffix":"Wxyz","expires_at":"2027-01-24T10:15:14.019449","key":"nm_AbCdEf123456_<secret>"}
```

The response also includes `created_at`, `last_used_at`, `last_used_ip` and `revoked_at`. `GET /api/v1/api-keys` lists your keys without the `key` field.

### Use A Key

Keep the key in an environment variable rather than in your scripts:

```bash
curl --fail-with-body \
  --url "${NETMAP_URL}/api/v1/topology/devices" \
  --header "X-API-Key: ${NETMAP_API_KEY}" \
  --header "Accept: application/json"
```

Each successful request updates the key's last-used time and client address. Each key can make 120 requests per 60 seconds by default; see [Rate Limits](./rate-limits.md).

### What A Key Can Do

A key has no scopes: it can call every REST endpoint its owner can, and follows changes to the owner's role on the next request. API keys don't work on the live syslog stream. See [API Permissions](./permissions.md).

### Rotate A Key

NetMap has no rotate endpoint. Create a key with a new name, deploy it, confirm your automation works, then revoke the old key and check that it returns `401`.

### Revoke A Key

Revoke one of your own keys by its `id`. The response is `204`:

```bash
curl --fail-with-body \
  --request DELETE \
  --url "${NETMAP_URL}/api/v1/api-keys/7" \
  --header "X-API-Key: ${NETMAP_API_KEY}"
```

A key that is not yours returns `404` `API key not found`. A SuperAdmin can list every user's keys with `GET /api/v1/api-keys/admin/all` and revoke any key with `DELETE /api/v1/api-keys/admin/{key_id}`.

A revoked or expired key returns `401` `Invalid, expired, or revoked API key`.

## Sessions

Sign in with a username and password to get a session:

```bash
curl --fail-with-body \
  --request POST \
  --url "${NETMAP_URL}/api/v1/auth/login" \
  --header "Content-Type: application/json" \
  --data '{"username":"admin","password":"<password>"}'
```

```json
{"access_token":"<access-token>","token_type":"bearer"}
```

Send the access token as `Authorization: Bearer <access-token>`. It lasts 60 minutes. If a second factor is needed, the response is a challenge instead, valid for 5 minutes:

```json
{"mfa_required":true,"mfa_setup_required":false,"challenge":"<challenge>"}
```

| Challenge | Next step |
|---|---|
| `mfa_required` | `POST /api/v1/auth/login/totp` with `challenge` and `code` (an authenticator or recovery code). Returns the access token. |
| `mfa_setup_required` | Two-factor authentication is required but not set up. `POST /api/v1/auth/login/totp/setup` with `challenge` returns `secret` and `otpauth_uri`; `POST /api/v1/auth/login/totp/setup/confirm` with `challenge` and `code` returns `recovery_codes` and `access_token`. |

Sign-in also sets these cookies:

| Cookie | Holds | Sent to |
|---|---|---|
| `netmap_access` | The access token, for 60 minutes. HttpOnly. | `/api/` |
| `netmap_refresh` | A refresh token, for 7 days. HttpOnly. | `/api/v1/auth/` |
| `netmap_csrf` | A CSRF token, readable by the web app. | `/` |

All three are `SameSite=Strict`. A request that changes data with the session cookies must send an `X-CSRF-Token` header matching the `netmap_csrf` cookie, or it returns `403` `CSRF token required`. Requests that send an API key or a Bearer token do not need it.

`POST /api/v1/auth/refresh` exchanges the refresh token for a new access token and a new refresh token. `POST /api/v1/auth/logout` ends the session.

Repeated failed sign-ins lock the account; see [Sign-In Lockout](./rate-limits.md#sign-in-lockout).

## Two-Factor Authentication And API Keys

Two-factor authentication protects sign-in. API key requests do not ask for a second factor.

Changing or resetting a user's password, or resetting their two-factor authentication, revokes their session refresh tokens but not their API keys. If an account may be compromised, revoke its keys as well. Deactivating a user stops all their keys; they return `401` `Invalid or inactive user`.

## Keeping Keys Safe

Store keys in a secret manager, CI/CD secret variables, environment variables or files readable only by the service account. Never put them in source control, browser code, URLs, shell history, logs, screenshots or tickets.

Give each integration its own NetMap user with only the permissions it needs; [API Permissions](./permissions.md#what-each-action-needs) lists what each action requires.

Ten invalid keys from one client address lock that address out of API key sign-in for 15 minutes; see [Rate Limits](./rate-limits.md#invalid-api-key-lookup-lockout).

### If A Key Is Exposed

Revoke the key, then check the audit log for `apikey.created`, `apikey.revoked` and `apikey.auth_failed` events and the owner's recent activity. Rotate any other secrets exposed with it, and create a replacement once the cause is fixed.

## Proxies And Browsers

Reverse proxies must pass the `X-API-Key` header through, so if a key works directly but returns `401` through a proxy, check the proxy. Browser apps on another origin need that origin in `CORS_ORIGINS`.

## Related Pages

- [API Permissions](./permissions.md)
- [API Errors](./errors.md)
- [Rate Limits](./rate-limits.md)
- [API-Key Problems](../troubleshooting/api-key-problems.md)
