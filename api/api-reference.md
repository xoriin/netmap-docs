---
title: Endpoint Inventory
sidebar_position: 8
keywords:
  - endpoint
  - reference
  - route
  - permissions
  - capability matrix
---

# Endpoint Inventory

This inventory was generated from `backend/app/main.py` through FastAPI OpenAPI and cross-checked against router dependencies. All paths are relative to the app origin.

Authentication column:

- `Public`: no route-level auth dependency in the OpenAPI route.
- `Authenticated`: requires a valid cookie, bearer token, or API key.
- `Permission`: authenticated plus a named role permission.
- `SuperAdmin`: authenticated SuperAdmin only.

## Public And Health

| Method | Path | Purpose | Auth | Request | Response |
|---|---|---|---|---|---|
| GET | `/api/health` | Container health | Public | none | `{status:"ok"}` |
| GET | `/api/v1/health` | API health | Public | none | `{status:"ok"}` |
| GET | `/api/v1/system/version` | Installed version and changelog highlights | Public | none | object |
| GET | `/api/v1/admin/settings/public` | Public UI settings | Public | none | `SystemSettingsRead` |
| GET | `/api/v1/setup/status` | Whether initial setup is needed | Public | none | `SetupStatus` |
| POST | `/api/v1/setup/admin` | Create first admin before setup is complete | Public until first user exists | `AdminCreate` | `UserRead` |
| POST | `/api/v1/auth/login` | Local login | Public | `LoginRequest` | `TokenPair` |
| POST | `/api/v1/auth/refresh` | Refresh session token | Public cookie/body token | `RefreshRequest` | `TokenPair` |
| POST | `/api/v1/auth/logout` | Revoke refresh session | Public with refresh input | `LogoutRequest` | 204 |
| POST | `/api/v1/auth/forgot-password` | Start password reset | Public | `ForgotPasswordRequest` | 204 |
| POST | `/api/v1/auth/reset-password` | Complete password reset | Public | `ResetPasswordRequest` | 204 |
| GET | `/api/v1/auth/oidc/status` | Public SSO status | Public | none | `OidcPublicStatus` |
| GET | `/api/v1/auth/oidc/login` | Start OIDC login | Public | query | redirect |
| GET | `/api/v1/auth/oidc/callback` | OIDC callback | Public | query | redirect |

## Authenticated Self-Service

| Method | Path | Purpose | Auth | Request | Response |
|---|---|---|---|---|---|
| GET | `/api/v1/auth/me` | Read current user | Authenticated | none | `UserRead` |
| PATCH | `/api/v1/auth/me` | Update profile | Authenticated | `ProfileUpdateRequest` | `UserRead` |
| POST | `/api/v1/auth/me/acknowledge-whats-new` | Acknowledge installed version notes | Authenticated | `WhatsNewAckRequest` | `UserRead` |
| POST | `/api/v1/auth/change-password` | Change own password | Authenticated | `PasswordChangeRequest` | 204 |
| GET | `/api/v1/api-keys` | List own API keys | Authenticated | none | `list[ApiKeyRead]` |
| POST | `/api/v1/api-keys` | Create own API key | Authenticated | `ApiKeyCreateRequest` | `ApiKeyCreateResponse` |
| DELETE | `/api/v1/api-keys/{key_id}` | Revoke own API key | Authenticated, owner-only | none | 204 |

## Admin

All endpoints in this section require SuperAdmin unless noted.

| Method | Path | Purpose | Request | Response |
|---|---|---|---|---|
| GET/POST | `/api/v1/admin/device-types` | List/create device types | `DeviceTypeCreate` on POST | `DeviceTypeRead` |
| PATCH/PUT/DELETE | `/api/v1/admin/device-types/{value}` | Update/delete device type | `DeviceTypeUpdate` on update | `DeviceTypeRead` or 204 |
| GET/PUT | `/api/v1/admin/settings` | Read/update system settings | `SystemSettingsUpdate` on PUT | `SystemSettingsRead` |
| GET/PUT | `/api/v1/admin/notification-settings` | Legacy notification settings | `NotificationSettingsUpdate` on PUT | `NotificationSettings` |
| POST | `/api/v1/admin/notifications/test` | Test notification settings | `TestNotificationRequest` | object |
| GET/POST | `/api/v1/admin/notification-profiles` | List/create profiles | `NotificationProfileCreate` on POST | `NotificationProfileRead` |
| PATCH/DELETE | `/api/v1/admin/notification-profiles/{profile_id}` | Update/delete profile | `NotificationProfileUpdate` on PATCH | `NotificationProfileRead` or 204 |
| POST | `/api/v1/admin/notification-profiles/{profile_id}/test` | Test profile | none | object |
| GET/PUT | `/api/v1/admin/role-permissions` | Read/update role permissions | `RolePermissionsUpdate` on PUT | `RolePermissionsResponse` |
| POST | `/api/v1/admin/roles` | Create custom role | `RoleCreate` | `RolePermissionsResponse` |
| DELETE | `/api/v1/admin/roles/{name}` | Delete custom role | none | `RolePermissionsResponse` |
| GET/POST/PATCH | `/api/v1/auth/users` and `/api/v1/auth/users/{user_id}` | User administration | user schemas | `UserRead` |
| POST | `/api/v1/auth/users/{user_id}/unlock-login` | Clear login lockout | none | 204 |
| POST | `/api/v1/auth/users/{user_id}/reset-password` | Admin password reset | `AdminPasswordResetRequest` | 204 |
| DELETE | `/api/v1/auth/users/{user_id}/sessions` | Revoke user sessions | none | 204 |
| GET/PUT/POST | `/api/v1/admin/oidc-settings`, `/test` | Manage/test SSO | `OidcSettingsUpdate` on PUT | OIDC schemas |
| GET | `/api/v1/api-keys/admin/all` | List all API keys | none | `list[ApiKeyAdminRead]` |
| DELETE | `/api/v1/api-keys/admin/{key_id}` | Revoke any API key | none | 204 |
| GET | `/api/v1/audit/logs` | Search audit logs | query | `AuditLogList` |
| GET | `/api/v1/audit/logs/export` | Export audit logs | query | file |
| GET | `/api/v1/system/diagnostics` | Diagnostics | none | object |
| GET | `/api/v1/exports/backup` | Download DB backup | none | file |
| POST | `/api/v1/exports/restore/validate` | Validate backup upload | multipart | `RestoreValidationResult` |
| POST | `/api/v1/exports/restore` | Restore backup | multipart | 204 |
| GET/DELETE | `/api/v1/exports/scheduled-backups*` | Scheduled backup files | none | list/file/204 |

## Inventory And Topology

| Method | Path | Auth | Request | Response |
|---|---|---|---|---|
| GET | `/api/v1/topology/graph` | Authenticated | none | `TopologyGraph` |
| GET | `/api/v1/topology/devices` | Authenticated | none | `list[DeviceRead]` |
| POST | `/api/v1/topology/devices` | `topology_write` | `DeviceCreate` | `DeviceRead` |
| POST | `/api/v1/topology/devices/bulk-update` | `topology_write` | `DeviceBulkUpdateRequest` | `DeviceBulkUpdateResult` |
| GET/PATCH/DELETE | `/api/v1/topology/devices/{device_id}` | read authenticated; write `topology_write` | `DeviceUpdate` on PATCH | `DeviceRead` or 204 |
| POST | `/api/v1/topology/devices/import` | `topology_write` | `DeviceBulkImportRequest` | `DeviceBulkImportResult` |
| GET/PATCH | `/api/v1/topology/devices/{device_id}/favourite` | Authenticated | query/body none | `DeviceRead`/object |
| POST | `/api/v1/topology/devices/live-status` | Authenticated | `DeviceLiveStatusRequest` | `DeviceLiveStatusList` |
| GET | `/api/v1/topology/devices/{device_id}/security-events` | `security_view` | query | `DeviceSecurityEventSummary` |
| GET/POST/PATCH/DELETE | `/api/v1/topology/groups*` | read authenticated; write `topology_write` | group schemas | group schemas/204 |
| GET/POST/PATCH/DELETE | `/api/v1/topology/sites*` | read authenticated; write `topology_write` | site schemas | site schemas/204 |
| GET/POST/DELETE | `/api/v1/topology/layouts*` | Authenticated, owner rules in router | layout schemas | layout schemas/204 |
| POST/PATCH/DELETE | `/api/v1/topology/relationships*` | `topology_write` | relationship schemas | `RelationshipRead`/204 |

## Discovery

All discovery endpoints require `topology_write`.

| Method | Path | Request | Response |
|---|---|---|---|
| GET/POST | `/api/v1/discovery/scans` | `DiscoveryStart` on POST | `DiscoveryScanRead` |
| GET/POST/PATCH/DELETE | `/api/v1/discovery/schedules*` | schedule schemas | `DiscoveryScheduleRead`/204 |
| POST | `/api/v1/discovery/schedules/{schedule_id}/run` | none | `DiscoveryScanRead` |
| GET/PATCH | `/api/v1/discovery/observations*` | `DiscoveryObservationUpdate` on PATCH | observation schemas |
| POST | `/api/v1/discovery/observations/resolve-all` | none | count object |
| POST | `/api/v1/discovery/observations/{observation_id}/apply` | none | `DiscoveryObservationRead` |
| POST | `/api/v1/discovery/import` | `DiscoveryImportRequest` | `DiscoveryImportResult` |

## Monitoring, Alerts, IPAM, Security, Tools

| Capability | Endpoint group | Permission |
|---|---|---|
| Monitoring read | `/api/v1/monitoring/summary`, `/devices`, history, analysis, service checks list | Authenticated |
| Configure service checks | `POST/DELETE /api/v1/monitoring/service-checks*` and `/port-targets*` | `monitoring_write` |
| Alert rule CRUD/test and deliveries | `/api/v1/alerts/rules*`, `/deliveries` | `alert_write` |
| Alert event read | `/api/v1/alerts/events` | Authenticated |
| IPAM read | `/api/v1/ipam/summary`, `/subnets`, addresses, next available, conflicts, DHCP leases | Authenticated |
| IPAM write | subnet/reservation/DHCP import and delete endpoints | `ipam_write` |
| Syslog/security | `/api/v1/syslog/status`, `/events`, `/searches` | `security_view` |
| Passive tools | DNS, reverse DNS, subnet calculator, LLDP neighbours | `tools_passive` |
| Active tools | ping, traceroute, port check, SNMP probe, LLDP scan/patch | `tools_active` |
| SNMP profile management | `/api/v1/tools/snmp/profiles*` write endpoints | SuperAdmin |
| Exports | inventory/firewall/report | `inventory_export`, `firewall_export`, `report_export` |

## API-Key Capability Matrix

| Capability | UI | API key | Required permission | Endpoint |
|---|---:|---:|---|---|
| View dashboard | Yes | Yes | authenticated | `GET /api/v1/dashboard/summary` |
| Manage own profile | Yes | Yes | authenticated owner | `/api/v1/auth/me` |
| Generate own API key | Yes | Yes | authenticated | `POST /api/v1/api-keys` |
| Revoke own API key | Yes | Yes | authenticated owner | `DELETE /api/v1/api-keys/{key_id}` |
| Administer all API keys | Yes | Yes | SuperAdmin | `/api/v1/api-keys/admin/*` |
| View devices/topology | Yes | Yes | authenticated | `/api/v1/topology/graph`, `/devices` |
| Edit inventory/topology | Yes | Yes | `topology_write` | topology write endpoints |
| Run discovery | Yes | Yes | `topology_write` | `/api/v1/discovery/*` |
| View monitoring | Yes | Yes | authenticated | `/api/v1/monitoring/*` read endpoints |
| Configure service checks | Yes | Yes | `monitoring_write` | monitoring service-check write endpoints |
| Manage IPAM | Yes | Yes | `ipam_write` | IPAM write endpoints |
| Search syslog/security | Yes | Yes | `security_view` | `/api/v1/syslog/*` |
| Use passive tools | Yes | Yes | `tools_passive` | DNS, reverse DNS, subnet, LLDP neighbours |
| Use active tools | Yes | Yes | `tools_active` | ping, traceroute, port check, SNMP probe |
| Manage users/settings | Yes | Yes | SuperAdmin | `/api/v1/admin/*`, `/api/v1/auth/users*` |
| Export inventory/firewall/report | Yes | Yes | export-specific permissions | `/api/v1/exports/*` |
| Download/restore DB backups | Yes | Yes | SuperAdmin | backup/restore endpoints |
| Live syslog WebSocket | Yes | No | JWT-first-frame, `security_view` | WebSocket in `syslog.py` |

For request and response schema details, use `/api/docs` or `/api/openapi.json`.
