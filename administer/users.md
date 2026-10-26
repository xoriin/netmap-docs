---
title: Users
sidebar_position: 3
keywords: [admin, users, accounts, password reset, unlock, force logout, 2FA]
---

# Users

**Admin → Users** is where you create accounts, change roles, and reset or sign out users. You need `user_manage`.

## Summary

- **Sign-In Security** is a ring of users split into **Two-factor**, **SSO only** and **Password only**, with the share using two-factor authentication in the centre.
- The **Users** card shows how many accounts are active and disabled, **Two-factor** shows how many use it, **SSO accounts** counts users who signed in through OIDC, and **Password only** counts users with neither.
- **Users by Role** ranks the roles by how many users hold each one.

## Add A User

1. In **Add User**, enter a **Username** (3 to 80 characters) and a **Password** of at least 12 characters.
2. Optionally enter an **Email**, which password reset emails need.
3. Choose a **Role**, and clear **Active on create** if the account shouldn't sign in yet.
4. Select **Create user**.

## Manage Users

The **Users** table lists each **User**, **Role** and **Status**, with **Search users…** and **Refresh**. In each row you can:

- upload or remove a photo, and add or change the email address;
- change the **Role**, or switch the account between **Active** and **Disabled**;
- select **Reset PW** to set a new password of at least 12 characters;
- select **Unlock** to clear a sign-in lockout;
- select **Reset 2FA** to turn off two-factor authentication for a user who has the **2FA** pill;
- select **Logout** to end all of the user's sessions; and
- select **Audit** to open their activity in [Security And Audit](./security-and-audit.md), if you have `audit_view`.

Users who sign in with single sign-on show their provider and last SSO sign-in when you hover over the SSO marker.

## What Each Action Affects

Resetting a password or two-factor authentication signs the user out everywhere. After a password reset, a notification tells you whether NetMap emailed the user. No email is sent if the user has no address, or if `APP_URL` and an enabled email notification method aren't set up.

**Logout** ends sessions but leaves API keys working. Disabling an account stops both its sessions and its API keys, and role changes apply to both on the next request.

## Limits For Delegated User Managers

If you have `user_manage` but aren't a SuperAdmin, you can't create SuperAdmins or change, reset, disable or sign out an existing SuperAdmin. Only a SuperAdmin can reset another user's two-factor authentication. See [Permissions](./permissions.md#superadmin-only-actions).

## Related Pages

- [Groups And Roles](./groups.md)
- [Two-Factor Authentication](./two-factor-authentication.md)
- [OIDC SSO](../configuration/oidc-sso.md)
