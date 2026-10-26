---
title: Security And Audit
sidebar_position: 11
keywords: [admin, security, audit log, sign-in history, API keys, SSO, two-factor]
---

# Security And Audit

**Admin → Security** brings together sign-in activity, the two-factor policy, single sign-on, API key oversight and the audit log. You need `audit_view`. With `audit_view` alone you see only the audit history; a SuperAdmin also sees the sign-in summary and the SSO, API key and two-factor panels.

## Summary

For a SuperAdmin, the tab opens with **Sign-Ins, Last 14 Days**, showing successful and failed sign-ins per day, beside the **Two-factor policy**, **Single sign-on**, **API keys** and **Failed sign-ins** cards. The **Single Sign-On (OIDC)**, **API Keys** and **Two-Factor Authentication** panels and **Recent Failed Sign-Ins** follow.

## Two-Factor Policy And SSO

**Two-Factor Authentication** sets whether two-factor authentication is required for nobody, for administrators or for all local users; see [Two-Factor Authentication](./two-factor-authentication.md). **Single Sign-On (OIDC)** covers the provider connection, role mapping, user provisioning and sign-in policy; see [OIDC SSO](../configuration/oidc-sso.md).

## API Key Oversight

**API Keys** lists every active key with its owner, name, last four characters, and when it was created, expires and was last used. Revoked keys are counted but hidden. You can revoke any user's key immediately.

Keys have no scopes or IP allow lists of their own: each key has its owner's current permissions. See [API Authentication](../api/authentication.md#api-keys).

## Audit History

The audit history sits beside **Activity, Last 14 Days**, showing events by type, and **Most Active Users**. Each record shows who acted, what they did, the target, the category, the time and details. It covers sign-ins, users, devices, settings, exports, API keys, alerts and other protected actions.

You can filter the history by user, action, category and time, switch to **Login History**, and export it as CSV. Selecting **Audit** on the [Users](./users.md) tab opens one user's activity here.

Audit records can contain usernames, IP addresses and other sensitive details, so keep and share them in line with your privacy policy.

## Related Pages

- [Security Overview](../security/index.md)
- [Two-Factor Authentication](./two-factor-authentication.md)
- [Permissions](./permissions.md)
