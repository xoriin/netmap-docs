---
title: Profile
sidebar_position: 13
keywords: [profile, password, API keys, preferences]
---

# Profile

Profile is personal: changes affect the signed-in account and, where noted, the current browser. Review identity, role, SSO linkage, password, appearance, icon packs, entity-colour preference, and API access here.

## Account And Identity

Update display name, email, and avatar within the validation limits shown by the form. After uploading, changing, or removing a photo, select **Save photo** beside the photo controls. The saved photo also appears beside Profile in the sidebar. **Save account details** saves the display name and email separately.

Changing or clearing your email asks for your current password, plus an authentication code when two-factor authentication is on. Accounts created by single sign-on that have no NetMap password confirm an email change by signing in again at the identity provider instead; this is limited to 5 requests per 15 minutes. Where the provider or an administrator manages the email, it is read-only.

The page shows username, role, active state, SSO issuer/identity where linked, and last-login details. Role and security fields are read-only to the user.

## Single Sign-On

When SSO is configured, you can link your account to the identity provider from Profile. Confirm with your password, and your authentication code if two-factor authentication is on, then complete the provider sign-in. Unlinking asks for the same details. An account without a NetMap password cannot unlink SSO, because it would have no way to sign in, and when SSO is required only an administrator can unlink it.

## Password And Appearance

Change a local password by providing the current password and a compliant replacement. A bad current password returns `401`, and repeated wrong attempts lock sign-in like failed sign-ins; use the reset flow if the account is locked or the password is forgotten. Changing your password or two-factor settings signs out your other sessions; this browser stays signed in. Pending password reset links stop working. On first load, NetMap follows your browser/device’s light or dark preference. It keeps following system changes until you choose **Light mode** or **Dark mode** in the sidebar; that explicit choice is saved in this browser and takes precedence on later visits.

**Preferences → Dark mode style** selects **Slate** (cool blue-grey, the default) or **Zinc** (neutral charcoal) for dark mode, saved in this browser. Entity colours can be disabled per account; chips keep their shape/icons and use neutral styling so table layout does not shift.

Device icon packs include built-ins and custom packs stored in browser local storage. Select a pack, import a validated JSON/SVG definition, or remove a custom pack. Custom SVG paths are sanitised before rendering/export; never import untrusted markup casually.

## Two-Factor Authentication

Local accounts can turn on an authenticator-app code for sign-in, save one-time recovery codes, generate a new set, or turn it off (unless an administrator requires it). SSO-only accounts do not see this row. See [Two-Factor Authentication](../administer/two-factor-authentication.md).

## Personal API Keys

Create a key with a name and optional expiry (never, 30, 90, or 365 days). The full `nm_<prefix>_<secret>` value is shown exactly once. Store it in a secret manager immediately. NetMap stores only the lookup prefix, the last four characters and an HMAC-SHA256 digest, so the secret cannot be displayed later.

The list shows each active key's name, a mask with its last four characters, and its created, expiry and last-used dates. Revoked keys are not listed. Revoke keys you no longer need; a lost secret cannot be recovered, so revoke it and create a replacement. Key permissions inherit the owner's current role and deactivation immediately prevents use.

## API Equivalents

- `GET /api/v1/auth/me`
- `PATCH /api/v1/auth/me`
- `POST /api/v1/auth/change-password`
- `POST /api/v1/auth/logout-all`
- `GET /api/v1/auth/me/identities`, `POST /api/v1/auth/me/identities/link`, `DELETE /api/v1/auth/me/identities/{identity_id}`
- `POST /api/v1/auth/me/email/sso`
- `GET/POST /api/v1/api-keys`
- `DELETE /api/v1/api-keys/{key_id}`

## Related Pages

- [Two-Factor Authentication](../administer/two-factor-authentication.md)
- [API Keys](../api/authentication.md#api-keys)
- [API Authentication](../api/authentication.md)
- [API-Key Problems](../troubleshooting/api-key-problems.md)

## Personal Chart Views

Use the sliders icon beside a chart title to choose its visual and display options. **Save my view** remembers that chart for your account across browsers and devices. **Reset this chart** restores one chart; **Preferences → Reset all chart views** restores all your defaults. See [Personal chart views](./chart-views.md) for supported visuals and data-specific options.
