---
title: OIDC SSO
sidebar_position: 4
keywords: [OIDC, SSO, authentication, PKCE]
verified_version: "1.5.0"
---

# OIDC SSO

NetMap supports generic OpenID Connect Authorization Code + PKCE login beside local authentication. OIDC is configured by a SuperAdmin and should be tested before it is required for users.

## Provider prerequisites

Create a confidential OIDC client with:

- a redirect URI exactly matching NetMap's callback URL;
- `openid` plus the profile and email scopes you need;
- a client secret stored in a secret manager or a `*_FILE` secret file; and
- a provider JWKS endpoint that NetMap can reach from the container.

Set the public callback URL in the provider and in `OIDC_REDIRECT_URL`. It must use the same scheme and host users use to open NetMap.

## Configure OIDC

Environment settings provide a baseline:

```dotenv
OIDC_ENABLED=true
OIDC_ISSUER=https://id.example.com/realms/netmap
OIDC_CLIENT_ID=netmap
OIDC_CLIENT_SECRET=<client-secret>
OIDC_REDIRECT_URL=https://netmap.example.com/api/v1/auth/oidc/callback
OIDC_SCOPES="openid profile email"
OIDC_PROVIDER_NAME=Company SSO
OIDC_AUTO_PROVISION=false
OIDC_LINK_BY_EMAIL=true
OIDC_ALLOW_UNVERIFIED_EMAIL=false
```

SuperAdmin-managed settings in Admin → Security → Single Sign-On override environment values for managed fields. The client secret is encrypted with `MASTER_KEY` and is write-only after saving. Do not expect it to be returned by the settings API.

## Test before enabling required SSO

1. Configure the issuer, client, callback, and scopes.
2. Use the provider-test action in Admin → Security → Single Sign-On.
3. Open a private browser window and complete a real sign-in.
4. Confirm the expected existing account is linked or that auto-provisioning creates the intended default role.
5. Confirm the audit log records the sign-in and account-link/provision event.
6. Keep a local SuperAdmin recovery login available.

Enable **Require SSO** only after the provider test passes and an active SuperAdmin exists. Non-SuperAdmin local login is then restricted, but SuperAdmin local login remains the emergency recovery path.

## Linking and provisioning

NetMap links an account by `(issuer, subject)` first. On a first sign-in it may link to an existing account by verified email when `OIDC_LINK_BY_EMAIL=true`; it does not use an unverified email unless explicitly allowed. With `OIDC_AUTO_PROVISION=true`, an otherwise unmatched identity can create a local account with `OIDC_DEFAULT_ROLE`.

The default role must never be SuperAdmin. Use explicit, reviewed role mappings for elevated access.

## Claims and roles

Role claim mapping is opt-in. Configure the group claim and mappings only after confirming the provider's actual token shape. Local roles win by default; enabling provider-managed roles allows claims to change non-SuperAdmin roles. Local SuperAdmins are protected from claim-based downgrade.

Relevant settings include `OIDC_GROUP_CLAIM`, `OIDC_ROLE_MAPPINGS`, `OIDC_MANAGE_ROLES`, `OIDC_DEFAULT_ROLE`, and `OIDC_ALLOW_SUPER_ADMIN`.

## Security behavior

- State, nonce, and PKCE verifier records are single-use and time-limited.
- The browser transaction is bound to a SameSite=Lax `netmap_oidc_txn` cookie so the cross-site top-level callback can complete.
- ID tokens are checked against the issuer, audience, authorized party when applicable, nonce, expiry, JWKS, and asymmetric signing algorithms.
- Provider access and refresh tokens never reach the SPA; successful login issues the normal NetMap session cookies.
- Callback failures redirect to the login page with a user-facing error code.

## Troubleshooting

- **Provider button missing:** check `OIDC_ENABLED`, managed settings, and whether the provider test passed.
- **Redirect URI error:** compare the provider URI and `OIDC_REDIRECT_URL` character for character, including scheme, host, port, and path.
- **State or nonce error:** retry in a fresh window and check that the reverse proxy preserves cookies and `X-Forwarded-Proto`.
- **Email link did not occur:** verify the email claim is verified and that the issuer/subject is not already linked to another account.
- **Unexpected role:** disable provider-managed roles, review the claim mapping, and restore the local role from Admin.
- **Provider unreachable:** test issuer discovery and JWKS reachability from inside the NetMap network namespace.

## API endpoints

- `GET /api/v1/auth/oidc/status`
- `GET /api/v1/auth/oidc/login`
- `GET /api/v1/auth/oidc/callback`
- `GET /api/v1/admin/oidc-settings`
- `PUT /api/v1/admin/oidc-settings`
- `POST /api/v1/admin/oidc-settings/test`

## Related pages

- [First-Run Setup and Authentication](../installation/first-run-and-authentication.md)
- [Authentication Problems](../troubleshooting/authentication-problems.md)
- [Security Model](../security/security-model.md)
- [Secrets Management](../security/secrets-management.md)
