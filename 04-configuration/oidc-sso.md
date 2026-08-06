---
title: OIDC SSO
description: Configure OpenID Connect single sign-on.
sidebar_position: 4
keywords: [OIDC, SSO, authentication]
---

# OIDC SSO

NetMap supports generic OpenID Connect Authorization Code + PKCE login beside local authentication.

Configuration can come from `OIDC_*` environment variables or SuperAdmin-managed system settings. Database settings override environment settings for managed SSO values.

Important behavior:

- Provider tokens are not exposed to the SPA.
- State, nonce, and PKCE verifier rows are single-use and time-limited.
- `Require SSO` keeps SuperAdmin local login as an emergency recovery path.
- Role claim mapping is opt-in.
- Local SuperAdmins are protected from claim-based downgrade.

Relevant API:

- `GET /api/v1/auth/oidc/status`
- `GET /api/v1/auth/oidc/login`
- `GET /api/v1/auth/oidc/callback`
- `GET /api/v1/admin/oidc-settings`
- `PUT /api/v1/admin/oidc-settings`
- `POST /api/v1/admin/oidc-settings/test`
