---
title: Administration
sidebar_position: 12
keywords: [admin, users, roles, settings, notifications, SNMP]
---

# Administration

Admin is restricted to SuperAdmins. The workspace uses URL-hash tabs for settings, users/roles, device types and colours, SNMP, notifications, alerts, SSO, API-key oversight, audit, diagnostics, and backups. Changes can affect existing sessions and API keys immediately.

## System settings and diagnostics

Application settings include app name, login message, announcement, support email/URL, global live ping enablement, monitoring interval bounds, public-target policy, reservation defaults/reminder lead time and channels, idle session timeout, backup schedule/retention, and notification defaults. Validate each change and note whether it is environment-owned (for example listener ports and secret files) or database-managed.

The version panel compares the installed `/app/VERSION` and channel with GitHub tags when online. What's New is built from the installed changelog, opens once per user/version, and can fall back to raw GitHub when the bundled data is unavailable. Offline installations show the installed version without inventing an update state.

System diagnostics reports SQLite file sizes, monitoring cache/status counters, syslog retention counters, and process PID without broad expensive scans. Use it with health and logs when investigating resource or startup issues. Backup/restore and scheduled-backup workflows are covered by [Exports](./exports.md).

## Users, sessions, and roles

SuperAdmins can create users with username, password, role, and active state; edit identity/email/avatar, role, and active state; deactivate/reactivate accounts; reset passwords; unlock login lockouts; force logout all refresh sessions; and inspect audit activity. Deactivation invalidates access and API keys; forced logout affects sessions, not API keys. SSO-linked rows show issuer/subject and last SSO login alongside local fields.

Built-in roles are intended as least-privilege starting points: **Viewer** for read-only workspaces, **SecurityAnalyst** for security search/export as assigned, **NetworkAdmin** for topology/IPAM/monitoring operations, and **SuperAdmin** for unrestricted administration and recovery. Verify the live permission matrix before assigning; custom roles can add only named permissions and cannot bypass SuperAdmin safeguards.

Permission changes apply live to sessions and API keys because keys inherit the owner's current role. Custom roles require a unique name and initial permissions, can be edited, and cannot be deleted while safeguards/assignments would leave an invalid account. Design separate read-only, help-desk, security, and network-operator roles rather than sharing SuperAdmin keys.

## Device types, icons, and colours

The 17 built-in device types are code constants, not editable database rows. Admin can create/edit/delete custom types with unique value, label, and icon. Built-ins can receive colour overrides through the `device_type_colors` system-setting map but cannot be renamed/deleted. Device-type colours, group/VLAN colours, and location colours use explicit values or a stable name-hash fallback palette. Reset removes explicit overrides and returns to automatic colours.

Custom icon packs are browser-local JSON/SVG assets. Import validates the pack, sanitises SVG paths with DOMPurify before rendering/export, and allows selection/removal without changing other users' browsers. Never treat an icon pack as a trusted HTML extension.

## SNMP profiles and LLDP

NetMap supports SNMPv2c for permitted probes. A profile stores name, encrypted community, UDP port, timeout, and retries; the community is write-only. Create/replace/delete profiles as SuperAdmin, then assign one to eligible routers/layer-3 devices or use it in Tools and Discovery. Deleting a profile removes future credential selection but does not delete devices.

LLDP scans select a source device, query neighbours, match remote identities, and offer a reviewed topology relationship. Dismissed or unmatched neighbours do not mutate topology. Troubleshoot UDP 161 reachability, community/ACL, timeout, unsupported device MIBs, and container/network boundaries.

## Notification methods and delivery

Notification methods are reusable by alert rules, reservation reminders, scheduled discovery, and other workflows. Create a named enabled method and test it before attaching rules. Supported providers include SMTP email (host, port/security, credentials, sender, recipients), Discord, Slack, Microsoft Teams, Telegram, generic webhooks, and custom Apprise URLs. Secrets are encrypted/write-only and redacted from logs.

Edit, enable, disable, or delete a method only after checking dependent rules. Provider errors, TLS/credential failures, blocked private targets, and disabled methods are recorded in delivery results. Webhook targets are subject to SSRF/private-target controls; do not use notification URLs as an arbitrary network proxy. Legacy notification labels are migrated into saved profiles where supported.

## API-key oversight and audit history

SuperAdmins can list all API keys with owner, name, prefix/suffix, creation, expiry, last use, and revocation state, and revoke another user's key immediately. Keys have no independent scopes or IP allowlists: the owner’s live role is the authorization boundary. The format is `nm_<12-character-prefix>_<43-character-secret>`; only the prefix and an HMAC-SHA256 digest are stored, and the secret is shown once. The default fixed-window limit is 120 requests per 60 seconds per key; ten invalid lookups from one source IP trigger a 15-minute lockout, with threshold events audited. Rotate by create → deploy → verify → revoke.

Audit logs record actor, action, target, category, timestamp, and detail for authentication, users, devices, settings, exports, API keys, alerts, and other protected operations. SuperAdmins can filter activity/login history by user, action, category, and time, paginate it, and export CSV. Audit records can contain usernames, IP addresses, client details, and sensitive operational context; retain and share them according to your privacy policy. No separate product-level audit-retention control should be assumed unless it is present in the installed settings.

## API equivalents

- `/api/v1/admin/*`
- `/api/v1/auth/users*`
- `/api/v1/audit/*`
- `/api/v1/system/diagnostics`
- `/api/v1/api-keys/admin/*`

## Related pages

- [OIDC SSO](../configuration/oidc-sso.md)
- [Security Model](../security/security-model.md)
- [Exports](./exports.md)
- [Profile](./profile.md)
