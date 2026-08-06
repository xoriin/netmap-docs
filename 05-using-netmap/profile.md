---
title: Profile
description: Manage your own profile, password, and API keys.
sidebar_position: 13
keywords: [profile, password, API keys]
---

# Profile

Profile lets an authenticated user update profile details, change password, and manage their own API keys.

API equivalents:

- `GET /api/v1/auth/me`
- `PATCH /api/v1/auth/me`
- `POST /api/v1/auth/change-password`
- `GET /api/v1/api-keys`
- `POST /api/v1/api-keys`
- `DELETE /api/v1/api-keys/{key_id}`

## Common Tasks

Use Profile to:

- review your current username, display name, role, and account details;
- update profile fields exposed by the UI;
- change a local password;
- create API keys for automation;
- review existing API key prefixes, expiry, revocation state, and last-used details;
- revoke keys you no longer need.

## API-Key Warning

The plaintext API key is shown once at creation. Store it immediately in a safe secret store. NetMap stores only the prefix and an HMAC digest, so the full key cannot be recovered later.

## Change Password

Password changes require the current password. If the current password is invalid, the API returns `401`.

## Related Pages

- [API Keys](../07-api/api-keys.md)
- [API Authentication](../07-api/authentication.md)
- [API-Key Problems](../09-troubleshooting/api-key-problems.md)
