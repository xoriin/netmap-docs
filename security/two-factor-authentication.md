---
title: Two-Factor Authentication
sidebar_position: 7
keywords: [two-factor, 2FA, TOTP, authenticator, recovery codes, netmap-admin]
---

# Two-Factor Authentication

NetMap can ask for a 6-digit code from an authenticator app after the password at local sign-in. Any app that supports time-based one-time passwords (TOTP) works — for example Google Authenticator, Microsoft Authenticator, 1Password, Bitwarden, or Aegis. Codes use the standard settings (SHA-1, 6 digits, 30-second period).

Two-factor authentication applies to **local password sign-in only**:

- single sign-on (OIDC) sign-ins are not affected — use your identity provider's MFA;
- API keys keep working unchanged and are not asked for a code;
- an existing browser session that refreshes in the background is not asked again;
- a password reset (self-service or by an administrator) does **not** turn two-factor authentication off.

## Turn it on

1. Open **Profile**. In the **Two-factor authentication** row, select **Set up**.
2. Scan the QR code with your authenticator app. If you cannot scan it, select **Copy** and enter the key into the app manually.
3. Enter the 6-digit code the app shows and select **Verify**.
4. NetMap shows ten **recovery codes** in the form `XXXXX-XXXXX`. Copy them or select **Download .txt**, store them somewhere safe (a password manager, not the same phone), tick **I've saved these recovery codes**, and select **Done**.

The recovery codes are shown only once. NetMap stores only a one-way hash of each code and cannot display them again. If you close the dialog (including with Escape) before saving them, generate a new set as described below.

The Profile row then shows **On** and how many recovery codes are left.

## Sign in with a code

After you enter your username and password, NetMap asks for the code from your authenticator app. Enter the current 6-digit code (spaces are ignored) and select **Verify**.

- Each code can be used only once, even within its 30-second window. If a code is rejected right after a successful sign-in, wait for the next one.
- The code step expires after 5 minutes. If you see **Sign-in expired. Enter your password again.**, select **Back to sign in** and start over.
- Wrong codes count toward the same login lockout as wrong passwords. Administrators see them in **Admin → Security → Login history** as **Failed (2FA code)**.

## Sign in with a recovery code

If you do not have your authenticator, select **Use a recovery code** on the code step and enter one of your saved codes. Case and the hyphen do not matter. Each recovery code works once; Profile shows how many remain.

When you are running low, or you think your codes have been seen by someone else, generate a new set.

## Generate new recovery codes or turn it off

In **Profile**, the **Two-factor authentication** row offers:

- **New recovery codes** — enter your password and a current code (or a recovery code). The old set stops working immediately and a new set of ten is shown once.
- **Turn off** — enter your password and a current code (or a recovery code). Turn off is not offered when an administrator requires two-factor authentication for your role.

Both actions are rate-limited like sign-in, and failed attempts are recorded in the audit log.

## Require it for users (SuperAdmin)

In **Admin → Security → Two-factor authentication**, choose **Require two-factor authentication**:

| Setting | Effect |
|---|---|
| **Off** (default) | Users may turn it on for themselves. |
| **Administrators** | Required for SuperAdmin and NetworkAdmin accounts. |
| **All local users** | Required for every local account. |

Users covered by the setting who have not set it up are asked to enrol on the sign-in screen at their next local sign-in, before they reach NetMap — the same QR, verify, and recovery-code steps as above. Single sign-on users are never asked. Changing the setting is recorded in the audit log.

Before choosing **Administrators** or **All local users**, make sure at least one SuperAdmin has set it up and saved their recovery codes, and that you can reach the container console (see below).

## Reset a user's two-factor authentication (SuperAdmin)

If a user loses both their authenticator and their recovery codes, a SuperAdmin can open **Admin → Users** and select **Reset 2FA** on that user's row (shown only for users who have it on). This turns two-factor authentication off for the user and signs them out of every session. At their next sign-in they use only their password — or, if the requirement covers them, they are asked to set it up again.

## Reset from the container console

If the person locked out is the only SuperAdmin, reset it from the host that runs NetMap:

```bash
docker exec <container> netmap-admin reset-2fa <username>
```

For example, with the container name used by the standard Compose file:

```bash
docker exec netmap netmap-admin reset-2fa admin
```

The command must run as root inside the container, which is the `docker exec` default — so it is available only to someone who can already control the container. It switches to the `netmap` user before touching the database, turns two-factor authentication off for the user, signs them out everywhere, and records an audit entry with `source=console`.

| Exit code | Meaning |
|---|---|
| `0` | Reset done. |
| `1` | No user with that username. |
| `2` | Not run as root (for example `docker exec -u netmap ...`). |
| `3` | The `netmap` user does not exist — the command was not run inside the NetMap container. |

## Audit events

| Event | When |
|---|---|
| `auth.mfa_challenge_issued` | Password accepted; code requested. |
| `auth.mfa_failed` | Wrong code at sign-in or during required setup. |
| `auth.login_blocked` (`stage=totp`) | Code entered while the account or source IP is locked out. |
| `auth.mfa_recovery_used` | Signed in with a recovery code. |
| `auth.mfa_enabled` | Turned on, from Profile or during required setup. |
| `auth.mfa_recovery_regenerated` | New recovery codes generated. |
| `auth.mfa_verify_failed` | Wrong password or code when generating codes or turning it off in Profile. |
| `auth.mfa_disabled` | Turned off by the user. |
| `auth.mfa_reset` | Reset by a SuperAdmin (`source=admin`) or the console command (`source=console`). |
| `admin.totp_required_changed` | The requirement setting changed. |

## API equivalents

- `POST /api/v1/auth/login` returns `{"mfa_required": true, "challenge": "..."}` (or `mfa_setup_required`) instead of tokens when a code is needed.
- `POST /api/v1/auth/login/totp` with `challenge` and `code` completes sign-in.
- `POST /api/v1/auth/login/totp/setup` and `/setup/confirm` handle required enrolment during sign-in.
- `POST /api/v1/auth/me/totp/setup`, `POST /api/v1/auth/me/totp/confirm`, `POST /api/v1/auth/me/totp/recovery-codes`, `DELETE /api/v1/auth/me/totp` manage your own setting.
- `DELETE /api/v1/auth/users/{user_id}/totp` resets a user (SuperAdmin).

## Related Pages

- [Profile](../using-netmap/profile.md)
- [Administration](../using-netmap/admin.md)
- [Authentication Problems](../troubleshooting/authentication-problems.md)
- [OIDC SSO](../configuration/oidc-sso.md)
- [Security Model](./security-model.md)
