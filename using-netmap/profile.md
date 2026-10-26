---
title: Profile
sidebar_position: 13
keywords: [profile, password, API keys, preferences]
---

# Profile

Profile is personal: changes affect the signed-in account and, where noted, the current browser. Review identity, role, SSO linkage, password, appearance, icon packs, entity-colour preference, and API access here.

## Account and identity

Update display name, email, and avatar within the validation limits shown by the form. After uploading, changing, or removing a photo, select **Save photo** beside the photo controls. The saved photo also appears beside Profile in the sidebar. **Save account details** saves the display name and email separately. The page shows username, role, active state, SSO issuer/identity where linked, and last-login details. Role and security fields are read-only to the user.

## Password and appearance

Change a local password by providing the current password and a compliant replacement. A bad current password returns `401`; use reset flow if the account is locked or the password is forgotten. On first load, NetMap follows your browser/device’s light or dark preference. It keeps following system changes until you choose **Light mode** or **Dark mode** in the sidebar; that explicit choice is saved in this browser and takes precedence on later visits. **Preferences → Dark mode style** selects **Slate** (cool blue-grey, the default) or **Zinc** (neutral charcoal) for dark mode, saved in this browser. Entity colours can be disabled per account; chips keep their shape/icons and use neutral styling so table layout does not shift.

Device icon packs include built-ins and custom packs stored in browser local storage. Select a pack, import a validated JSON/SVG definition, or remove a custom pack. Custom SVG paths are sanitised before rendering/export; never import untrusted markup casually.

## Two-factor authentication

Local accounts can turn on an authenticator-app code for sign-in, save one-time recovery codes, generate a new set, or turn it off (unless an administrator requires it). SSO-only accounts do not see this row. See [Two-Factor Authentication](../security/two-factor-authentication.md).

## Personal API keys

Create a key with a name and optional expiry (never, 30, 90, or 365 days). The full `nm_<prefix>_<secret>` value is shown exactly once. Store it in a secret manager immediately. NetMap stores only the lookup prefix, the last four characters and an HMAC-SHA256 digest, so the secret cannot be displayed later.

The list shows each active key's name, a mask with its last four characters, and its created, expiry and last-used dates. Revoked keys are not listed. Revoke keys you no longer need; a lost secret cannot be recovered, so revoke it and create a replacement. Key permissions inherit the owner's current role and deactivation immediately prevents use.

## API equivalents

- `GET /api/v1/auth/me`
- `PATCH /api/v1/auth/me`
- `POST /api/v1/auth/change-password`
- `GET/POST /api/v1/api-keys`
- `DELETE /api/v1/api-keys/{key_id}`

## Related pages

- [Two-Factor Authentication](../security/two-factor-authentication.md)
- [API Keys](../api/authentication.md#api-keys)
- [API Authentication](../api/authentication.md)
- [API-Key Problems](../troubleshooting/api-key-problems.md)

## Personal chart views

Use the sliders icon beside a chart title to choose its visual and display options. **Save my view** remembers that chart for your account across browsers and devices. **Reset this chart** restores one chart; **Preferences → Reset all chart views** restores all your defaults. See [Personal chart views](./chart-views.md) for supported visuals and data-specific options.
