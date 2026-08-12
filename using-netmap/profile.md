---
title: Profile
description: Manage your identity, preferences, password, and personal API keys.
sidebar_position: 13
keywords: [profile, password, API keys, preferences]
---

# Profile

Profile is personal: changes affect the signed-in account and, where noted, the current browser. Review identity, role, SSO linkage, password, appearance, icon packs, entity-colour preference, and API access here.

## Account and identity

Update display name, email, and avatar within the validation limits shown by the form. The avatar is stored with the account; remove it explicitly when required. The page shows username, role, active state, SSO issuer/identity where linked, and last-login details. Role and security fields are read-only to the user.

## Password and appearance

Change a local password by providing the current password and a compliant replacement. A bad current password returns `401`; use reset flow if the account is locked or the password is forgotten. Theme selection (light, dark, or system where available) persists per browser. Entity colours can be disabled per account; chips keep their shape/icons and use neutral styling so table layout does not shift.

Device icon packs include built-ins and custom packs stored in browser local storage. Select a pack, import a validated JSON/SVG definition, or remove a custom pack. Custom SVG paths are sanitised before rendering/export; never import untrusted markup casually.

## Personal API keys

Create a key with a name and optional expiry (never, 30, 90, or 365 days). The full `nm_<prefix>_<secret>` value is shown exactly once. Store it in a secret manager immediately. NetMap stores only the plaintext prefix and an HMAC-SHA256 digest, so the secret cannot be displayed later.

The list shows prefix/suffix, creation, expiry, last use, and revocation state. Revoke keys you no longer need; a lost secret cannot be recovered, so revoke it and create a replacement. Key permissions inherit the owner's current role and deactivation immediately prevents use.

## API equivalents

- `GET /api/v1/auth/me`
- `PATCH /api/v1/auth/me`
- `POST /api/v1/auth/change-password`
- `GET/POST /api/v1/api-keys`
- `DELETE /api/v1/api-keys/{key_id}`

## Related pages

- [API Keys](../api/api-keys.md)
- [API Authentication](../api/authentication.md)
- [API-Key Problems](../troubleshooting/api-key-problems.md)
