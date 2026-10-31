---
title: New Sign-In Emails
sidebar_position: 4
keywords: [new device, sign-in alert, security email, login notification]
---

# New Sign-In Emails

NetMap can email a user when their account signs in from a browser it has not seen before. The email says when it happened, the browser and system (for example "Safari on iPhone"), the IP address and how they signed in (password, password and an authentication code, or single sign-on). If the sign-in was not theirs, they can change their password and sign out that device from their [Profile](../using-netmap/profile.md).

## How A Device Is Recognised

At each sign-in NetMap sets a long-lived `netmap_device` cookie in the browser and stores only a hash of it against the account. A later sign-in from the same browser is recognised and sends nothing.

- The first browser an account signs in from is remembered without an email, so new accounts, and every account on its first sign-in after upgrading to 1.8.0, are not emailed.
- Clearing cookies, a private window or a different browser counts as a new device.
- Several accounts can share one browser; each account remembers it separately.
- NetMap keeps the 50 most recently used browsers per account.

Emails need an email address on the account and a working account email server (the first enabled SMTP method under [Notifications](./notifications.md)). Without either, sign-in works as normal and nothing is sent. Sending happens in the background, so a slow or failing mail server never delays sign-in.

## Turn It On Or Off

- **For everyone (SuperAdmin):** **Admin → Security → Sign-In Alerts → Email users when they sign in from a new device**. On by default.
- **For yourself:** **Profile → Preferences → New sign-in emails**.

## Audit Events

| Event | Meaning |
|---|---|
| `auth.new_device_notice` | A new-device email was queued for an account; the detail lists the browser and IP address |
| `admin.new_device_alerts_changed` | A SuperAdmin turned the emails on or off for everyone |

## Use The API

- `PATCH /api/v1/auth/me` with `{"new_device_alerts": false}` turns them off for your account; `GET /api/v1/auth/me` returns the current value.
- `PUT /api/v1/admin/settings` with `{"new_device_alerts_enabled": false}` turns them off for everyone (SuperAdmin).
