---
title: Endpoint Reference
sidebar_position: 10
keywords:
  - endpoint
  - reference
  - route
  - permissions
---

# Endpoint Reference

Every NetMap REST endpoint, grouped by resource. Paths are relative to the NetMap origin, for example `https://netmap.example.com`. For request and response fields, open `/api/docs` on your instance; see [OpenAPI And Swagger](./openapi.md).

The **Access** column shows what a request needs:

| Access | Meaning |
|---|---|
| Public | No authentication. |
| Signed in | Any active user, through an API key or a session. |
| A permission, such as `topology_write` | Signed in, and the user's role has that permission. |
| SuperAdmin | Signed in as a SuperAdmin. |

SuperAdmin passes every permission check except where a row says otherwise. Role defaults are in [API Permissions](../permissions.md), and error responses are in [Errors](../errors.md).

## Health And Version

| Method | Path | Access | Purpose |
|---|---|---|---|
| GET | `/api/health` | Public | Container health |
| GET | `/api/openapi.json` | Public | OpenAPI schema |
| GET | `/api/docs` | Public | Swagger UI |
| GET | `/api/v1/health` | Public | API health |
| GET | `/api/v1/system/version` | Public | Installed version and release highlights |

## Setup

| Method | Path | Access | Purpose |
|---|---|---|---|
| GET | `/api/v1/setup/status` | Public | Whether first-run setup is needed |
| POST | `/api/v1/setup/admin` | Public | Create the first admin (only before any user exists) |

Once any user exists, `POST /api/v1/setup/admin` returns `409` (`Initial setup is complete`).

## Sign-In And Sessions

| Method | Path | Access | Purpose |
|---|---|---|---|
| POST | `/api/v1/auth/login` | Public | Sign in with username and password |
| POST | `/api/v1/auth/login/totp` | Public | Finish sign-in with a two-factor or recovery code |
| POST | `/api/v1/auth/login/totp/setup` | Public | Start required two-factor enrolment during sign-in |
| POST | `/api/v1/auth/login/totp/setup/confirm` | Public | Confirm enrolment and finish sign-in |
| POST | `/api/v1/auth/refresh` | Public | Refresh the access token |
| POST | `/api/v1/auth/logout` | Public | Sign out and revoke the refresh session |
| POST | `/api/v1/auth/forgot-password` | Public | Request a password reset email |
| POST | `/api/v1/auth/reset-password` | Public | Set a new password with a reset token |
| GET | `/api/v1/auth/oidc/status` | Public | SSO availability |
| GET | `/api/v1/auth/oidc/login` | Public | Start SSO sign-in |
| GET | `/api/v1/auth/oidc/callback` | Public | SSO callback |

## Your Account

| Method | Path | Access | Purpose |
|---|---|---|---|
| GET | `/api/v1/auth/me` | Signed in | Read the current user |
| PATCH | `/api/v1/auth/me` | Signed in | Update your profile |
| POST | `/api/v1/auth/me/acknowledge-whats-new` | Signed in | Acknowledge release notes |
| POST | `/api/v1/auth/change-password` | Signed in | Change your password |
| POST | `/api/v1/auth/me/totp/setup` | Signed in | Start two-factor enrolment |
| POST | `/api/v1/auth/me/totp/confirm` | Signed in | Confirm two-factor enrolment |
| POST | `/api/v1/auth/me/totp/recovery-codes` | Signed in | Replace recovery codes |
| DELETE | `/api/v1/auth/me/totp` | Signed in | Turn off two-factor |
| GET | `/api/v1/auth/me/chart-views` | Signed in | List your saved chart views |
| PUT | `/api/v1/auth/me/chart-views/{chart_id}` | Signed in | Save your view of one chart |
| DELETE | `/api/v1/auth/me/chart-views/{chart_id}` | Signed in | Reset one chart view |
| DELETE | `/api/v1/auth/me/chart-views` | Signed in | Reset all your chart views |

`DELETE /api/v1/auth/me/totp` needs your `password` and a current `code`. It returns `403` `Two-factor authentication is required for your role` when an administrator requires two-factor authentication for your role; see [Two-Factor Authentication](../../administer/two-factor-authentication.md#require-it-for-users-superadmin).

`chart_id` must match `[a-z][a-z0-9._-]{0,119}`; anything else returns `422`.

## API Keys

| Method | Path | Access | Purpose |
|---|---|---|---|
| POST | `/api/v1/api-keys` | Signed in | Create an API key for yourself |
| GET | `/api/v1/api-keys` | Signed in | List your API keys |
| DELETE | `/api/v1/api-keys/admin/{key_id}` | SuperAdmin | Revoke any API key |
| GET | `/api/v1/api-keys/admin/all` | SuperAdmin | List every user's API keys |
| DELETE | `/api/v1/api-keys/{key_id}` | Signed in | Revoke one of your API keys |

See [API Authentication](../authentication.md#api-keys) for creating, rotating and revoking keys.

## Users

| Method | Path | Access | Purpose |
|---|---|---|---|
| GET | `/api/v1/auth/users` | `user_manage` | List users |
| POST | `/api/v1/auth/users` | `user_manage` | Create a user |
| PATCH | `/api/v1/auth/users/{user_id}` | `user_manage` | Update a user |
| POST | `/api/v1/auth/users/{user_id}/unlock-login` | `user_manage` | Clear a sign-in lockout |
| POST | `/api/v1/auth/users/{user_id}/reset-password` | `user_manage` | Reset a user's password and sign them out |
| DELETE | `/api/v1/auth/users/{user_id}/sessions` | `user_manage` | Revoke a user's sessions |
| DELETE | `/api/v1/auth/users/{user_id}/totp` | SuperAdmin | Reset a user's two-factor and sign them out |

`POST /api/v1/auth/users/{user_id}/reset-password` takes `{"new_password": "..."}` (12 to 256 characters), sets it, and emails the user a reset link. The response reports the email, for example `{"email_status":"no_email"}`:

| `email_status` | Meaning |
|---|---|
| `sent` | The reset email was sent. |
| `no_email` | The user has no email address. |
| `not_configured` | No email was sent: `APP_URL` or an enabled email notification profile is missing. |
| `failed` | Sending the email failed. |

## Roles And Permissions

| Method | Path | Access | Purpose |
|---|---|---|---|
| GET | `/api/v1/admin/role-permissions` | `user_manage` | Read role permissions |
| PUT | `/api/v1/admin/role-permissions` | SuperAdmin | Update role permissions |
| POST | `/api/v1/admin/roles` | SuperAdmin | Create a custom role |
| DELETE | `/api/v1/admin/roles/{name}` | SuperAdmin | Delete a custom role |

## SSO Settings

| Method | Path | Access | Purpose |
|---|---|---|---|
| GET | `/api/v1/admin/oidc-settings` | SuperAdmin | Read SSO settings |
| POST | `/api/v1/admin/oidc-settings/test` | SuperAdmin | Test the SSO provider |
| PUT | `/api/v1/admin/oidc-settings` | SuperAdmin | Update SSO settings |

## System Settings And Diagnostics

| Method | Path | Access | Purpose |
|---|---|---|---|
| GET | `/api/v1/system/diagnostics` | `diagnostics_view` | System diagnostics |
| GET | `/api/v1/admin/runtime-security` | SuperAdmin | HTTPS and runtime security warnings |
| GET | `/api/v1/admin/settings/public` | Public | Sign-in page settings |
| GET | `/api/v1/admin/settings/app` | Signed in | Settings the signed-in app needs |
| GET | `/api/v1/admin/settings` | SuperAdmin | Read system settings |
| PUT | `/api/v1/admin/settings` | SuperAdmin | Update system settings |
| GET | `/api/v1/admin/status-page-default-css` | SuperAdmin | Read default status page CSS |
| PUT | `/api/v1/admin/status-page-default-css` | SuperAdmin | Set default status page CSS |
| GET | `/api/v1/admin/email-branding` | SuperAdmin | Read email branding |
| PUT | `/api/v1/admin/email-branding` | SuperAdmin | Update email branding |
| POST | `/api/v1/admin/email-branding/preview` | SuperAdmin | Preview email branding |

## Notifications

| Method | Path | Access | Purpose |
|---|---|---|---|
| GET | `/api/v1/admin/notification-settings` | `notification_manage` | Read legacy notification settings |
| PUT | `/api/v1/admin/notification-settings` | `notification_manage` | Update legacy notification settings |
| POST | `/api/v1/admin/notifications/test` | `notification_manage` | Send a test notification |
| GET | `/api/v1/admin/notification-profiles` | `notification_manage` | List notification profiles |
| POST | `/api/v1/admin/notification-profiles` | `notification_manage` | Create a notification profile |
| PATCH | `/api/v1/admin/notification-profiles/{profile_id}` | `notification_manage` | Update a notification profile |
| DELETE | `/api/v1/admin/notification-profiles/{profile_id}` | `notification_manage` | Delete a notification profile |
| POST | `/api/v1/admin/notification-profiles/{profile_id}/test` | `notification_manage` | Test a notification profile |

## Device Catalogue

| Method | Path | Access | Purpose |
|---|---|---|---|
| GET | `/api/v1/admin/device-types` | Signed in | List device types |
| GET | `/api/v1/admin/cloud-providers` | Signed in | List cloud providers |
| POST | `/api/v1/admin/cloud-providers` | `device_catalog_manage` | Add a cloud provider |
| PUT | `/api/v1/admin/cloud-providers/{key}` | `device_catalog_manage` | Update a cloud provider |
| DELETE | `/api/v1/admin/cloud-providers/{key}` | `device_catalog_manage` | Delete a cloud provider |
| PUT | `/api/v1/admin/device-type-colors` | `device_catalog_manage` | Set device type colours |
| POST | `/api/v1/admin/device-types` | `device_catalog_manage` | Add a device type |
| PATCH | `/api/v1/admin/device-types/{value}` | `device_catalog_manage` | Update a device type |
| PUT | `/api/v1/admin/device-types/{value}` | `device_catalog_manage` | Update a device type |
| DELETE | `/api/v1/admin/device-types/{value}` | `device_catalog_manage` | Delete a device type |

## Audit

| Method | Path | Access | Purpose |
|---|---|---|---|
| GET | `/api/v1/audit/summary` | `audit_view` | Audit activity summary |
| GET | `/api/v1/audit/logs` | `audit_view` | Search audit logs |
| GET | `/api/v1/audit/logs/export` | `audit_view` | Download sign-in history as CSV |

`GET /api/v1/audit/summary` accepts `days` from 1 to 90 (default 14; anything else returns `422`) and returns:

| Field | Holds |
|---|---|
| `days` | One entry per day, oldest first: `date`, `signed_in` and `failed` sign-in counts |
| `by_action` | The 8 most frequent actions: `action`, `count` |
| `by_actor` | The 5 most active users: `actor_user_id`, `username`, `count` |
| `total` | Audit events in the period |
| `failed_total` | Failed or blocked sign-ins in the period |

## Dashboard

| Method | Path | Access | Purpose |
|---|---|---|---|
| GET | `/api/v1/dashboard/summary` | Signed in | Dashboard summary |

## Devices

| Method | Path | Access | Purpose |
|---|---|---|---|
| GET | `/api/v1/topology/devices` | Signed in | List devices |
| POST | `/api/v1/topology/devices/bulk-update` | `topology_write` | Update many devices |
| POST | `/api/v1/topology/devices/live-status` | Signed in | Live status for listed devices |
| GET | `/api/v1/topology/devices/{device_id}/security-events` | `security_view` | Security events for a device |
| POST | `/api/v1/topology/devices` | `topology_write` | Create a device |
| POST | `/api/v1/topology/devices/import` | `topology_write` | Import devices |
| GET | `/api/v1/topology/devices/favourites` | Signed in | List your favourite devices |
| GET | `/api/v1/topology/devices/{device_id}` | Signed in | Read a device |
| PATCH | `/api/v1/topology/devices/{device_id}` | `topology_write` | Update a device |
| GET | `/api/v1/topology/devices/{device_id}/snmp/arp-enrichment` | `topology_write` | Preview SNMP ARP enrichment |
| POST | `/api/v1/topology/devices/{device_id}/snmp/arp-enrichment/apply` | `topology_write` | Apply SNMP ARP enrichment |
| PATCH | `/api/v1/topology/devices/{device_id}/favourite` | Signed in | Favourite or unfavourite a device |
| DELETE | `/api/v1/topology/devices/{device_id}` | `topology_write` | Delete a device |

Creating a device on a reserved address returns `409` unless the request claims the reservation. Claiming it also needs `ipam_reservation_claim`.

## Topology, Groups And Sites

| Method | Path | Access | Purpose |
|---|---|---|---|
| GET | `/api/v1/topology/graph` | Signed in | Topology graph |
| POST | `/api/v1/topology/groups/reset-device-assignments` | `topology_write` | Clear device group assignments |
| GET | `/api/v1/topology/groups` | Signed in | List groups |
| POST | `/api/v1/topology/groups` | `topology_write` | Create a group |
| PATCH | `/api/v1/topology/groups/{group_id}` | `topology_write` | Update a group |
| DELETE | `/api/v1/topology/groups/{group_id}` | `topology_write` | Delete a group |
| GET | `/api/v1/topology/sites` | Signed in | List sites |
| POST | `/api/v1/topology/sites` | `topology_write` | Create a site |
| PATCH | `/api/v1/topology/sites/{site_id}` | `topology_write` | Update a site |
| DELETE | `/api/v1/topology/sites/{site_id}` | `topology_write` | Delete a site |

## Links

| Method | Path | Access | Purpose |
|---|---|---|---|
| POST | `/api/v1/topology/relationships` | `topology_write` | Create a link |
| PATCH | `/api/v1/topology/relationships/{relationship_id}` | `topology_write` | Update a link |
| DELETE | `/api/v1/topology/relationships/{relationship_id}` | `topology_write` | Delete a link |

## Layouts

| Method | Path | Access | Purpose |
|---|---|---|---|
| GET | `/api/v1/topology/layouts` | Signed in | List your layouts |
| POST | `/api/v1/topology/layouts` | Signed in | Save a layout |
| POST | `/api/v1/topology/layouts/{layout_id}/share` | Signed in | Share one of your layouts |
| DELETE | `/api/v1/topology/layouts/{layout_id}/share` | Signed in | Stop sharing a layout |
| GET | `/api/v1/topology/layouts/shared/{code}` | Signed in | Preview a shared layout by code |
| POST | `/api/v1/topology/layouts/import` | Signed in | Import a shared layout |
| DELETE | `/api/v1/topology/layouts/{layout_id}` | Signed in | Delete one of your layouts |

Layouts belong to the user who saved them. Another user's layout ID returns `404` (`Layout not found`).

## Discovery

| Method | Path | Access | Purpose |
|---|---|---|---|
| POST | `/api/v1/discovery/scans` | `discovery_manage` | Start a discovery scan |
| GET | `/api/v1/discovery/scans` | `discovery_manage` | List discovery scans |
| GET | `/api/v1/discovery/schedules` | `automation_manage` | List discovery schedules |
| POST | `/api/v1/discovery/schedules` | `automation_manage` | Create a discovery schedule |
| PATCH | `/api/v1/discovery/schedules/{schedule_id}` | `automation_manage` | Update a discovery schedule |
| DELETE | `/api/v1/discovery/schedules/{schedule_id}` | `automation_manage` | Delete a discovery schedule |
| POST | `/api/v1/discovery/schedules/{schedule_id}/run` | `automation_manage` | Run a schedule now |
| GET | `/api/v1/discovery/observations/summary` | `discovery_manage` | Observation summary |
| GET | `/api/v1/discovery/observations` | `discovery_manage` | List observations |
| PATCH | `/api/v1/discovery/observations/{observation_id}` | `discovery_manage` | Update an observation |
| POST | `/api/v1/discovery/observations/resolve-all` | `discovery_manage` | Resolve all open observations |
| POST | `/api/v1/discovery/observations/{observation_id}/apply` | `discovery_manage` and `topology_write` | Apply an observation to inventory |
| POST | `/api/v1/discovery/import` | `discovery_manage` and `topology_write` | Import scan results into inventory |

`GET /api/v1/discovery/observations/summary` accepts `days` (default 14; values outside 1 to 90 are clamped) and returns `days`, one entry per day with `date`, `new_device`, `ip_change`, `disappeared` and `other` counts, plus `open` (open and acknowledged) and `resolved` counts across all observations, not only the period.

`POST /api/v1/discovery/schedules/{schedule_id}/run` returns `409` when the schedule is disabled or a scan for it is already running.

## LLDP

| Method | Path | Access | Purpose |
|---|---|---|---|
| POST | `/api/v1/lldp/scan/{device_id}` | `tools_active` | Scan a device for LLDP neighbours |
| GET | `/api/v1/lldp/neighbours` | `tools_passive` | List LLDP neighbours |
| PATCH | `/api/v1/lldp/neighbours/{neighbour_id}` | `tools_active` | Update an LLDP neighbour |
| POST | `/api/v1/lldp/neighbours/{neighbour_id}/create-link` | `topology_write` | Create a link from an LLDP neighbour |

## Service Checks And Device Monitoring

| Method | Path | Access | Purpose |
|---|---|---|---|
| GET | `/api/v1/monitoring/summary` | Signed in | Monitoring summary |
| GET | `/api/v1/monitoring/devices` | Signed in | Per-device monitoring |
| GET | `/api/v1/monitoring/devices/{device_id}` | Signed in | Monitoring for one device |
| GET | `/api/v1/monitoring/devices/{device_id}/history` | Signed in | Device check history |
| GET | `/api/v1/monitoring/devices/{device_id}/analysis` | Signed in | Device availability analysis |
| GET | `/api/v1/monitoring/port-targets` | Signed in | List service checks (older path) |
| GET | `/api/v1/monitoring/service-checks` | Signed in | List service checks |
| POST | `/api/v1/monitoring/port-targets` | `monitoring_write` | Create a service check (older path) |
| POST | `/api/v1/monitoring/service-checks` | `monitoring_write` | Create a service check |
| GET | `/api/v1/monitoring/service-checks/order-config` | Signed in | Read service check ordering |
| PUT | `/api/v1/monitoring/service-checks/order-config` | `monitoring_write` | Set service check ordering |
| PUT | `/api/v1/monitoring/port-targets/order` | `monitoring_write` | Reorder service checks (older path) |
| PUT | `/api/v1/monitoring/service-checks/order` | `monitoring_write` | Reorder service checks |
| PUT | `/api/v1/monitoring/port-targets/{target_id}` | `monitoring_write` | Update a service check (older path) |
| PUT | `/api/v1/monitoring/service-checks/{target_id}` | `monitoring_write` | Update a service check |
| DELETE | `/api/v1/monitoring/port-targets/{target_id}` | `monitoring_write` | Delete a service check (older path) |
| DELETE | `/api/v1/monitoring/service-checks/{target_id}` | `monitoring_write` | Delete a service check |
| POST | `/api/v1/monitoring/devices/{device_id}/check` | `monitoring_write` | Check a device now |

Each `/monitoring/port-targets` path is an older alias of the matching `/monitoring/service-checks` path.

## HTTP Monitors

| Method | Path | Access | Purpose |
|---|---|---|---|
| GET | `/api/v1/monitors` | Signed in | List HTTP monitors |
| GET | `/api/v1/monitors/favourites` | Signed in | List your favourite monitors |
| PATCH | `/api/v1/monitors/{monitor_id}/favourite` | Signed in | Favourite or unfavourite a monitor |
| POST | `/api/v1/monitors` | `monitoring_write` | Create an HTTP monitor |
| PATCH | `/api/v1/monitors/{monitor_id}` | `monitoring_write` | Update an HTTP monitor |
| DELETE | `/api/v1/monitors/{monitor_id}` | `monitoring_write` | Delete an HTTP monitor |
| GET | `/api/v1/monitors/{monitor_id}/history` | Signed in | HTTP monitor history |

NetworkAdmin can always change monitors. Other roles need `monitoring_write`, otherwise the request returns `403` (`Insufficient permissions`).

## Alerts

| Method | Path | Access | Purpose |
|---|---|---|---|
| GET | `/api/v1/alerts/rules` | `alert_write` | List alert rules |
| POST | `/api/v1/alerts/rules` | `alert_write` | Create an alert rule |
| PATCH | `/api/v1/alerts/rules/{rule_id}` | `alert_write` | Update an alert rule |
| DELETE | `/api/v1/alerts/rules/{rule_id}` | `alert_write` | Delete an alert rule |
| POST | `/api/v1/alerts/rules/{rule_id}/test` | `alert_write` | Test an alert rule |
| GET | `/api/v1/alerts/deliveries` | `alert_write` | Recent notification deliveries |
| GET | `/api/v1/alerts/events` | Signed in | Alert events |

Alert rules carry two status page fields: `open_incident` and `incident_min_failures` (1 to 20, default 3). If you omit `open_incident` when you create a rule, it takes the default for the event type. It is always stored as `false` for `device_online`, `any_status_change` and `device_expected_state_restored`, even if you send `true`. See [Create An Alert Rule](../../guides/create-alert-rule.md).

## IPAM

| Method | Path | Access | Purpose |
|---|---|---|---|
| GET | `/api/v1/ipam/summary` | Signed in | IPAM summary |
| GET | `/api/v1/ipam/subnets` | Signed in | List subnets |
| POST | `/api/v1/ipam/subnets` | `ipam_write` | Create a subnet |
| PATCH | `/api/v1/ipam/subnets/{subnet_id}` | `ipam_write` | Update a subnet |
| DELETE | `/api/v1/ipam/subnets/{subnet_id}` | `ipam_write` | Delete a subnet |
| GET | `/api/v1/ipam/subnets/{subnet_id}/addresses` | Signed in | Addresses in a subnet |
| GET | `/api/v1/ipam/subnets/{subnet_id}/next-available` | Signed in | Next free address in a subnet |
| GET | `/api/v1/ipam/vlan-suggestions` | Signed in | Subnet suggestions from VLANs |
| POST | `/api/v1/ipam/subnets/import-from-vlans` | `ipam_write` | Create subnets from VLANs |
| GET | `/api/v1/ipam/reservations` | Signed in | List reservations |
| DELETE | `/api/v1/ipam/reservations/expired` | `ipam_write` | Delete expired reservations |
| POST | `/api/v1/ipam/reservations` | `ipam_write` | Create a reservation |
| PATCH | `/api/v1/ipam/reservations/{reservation_id}` | `ipam_write` | Update a reservation |
| DELETE | `/api/v1/ipam/reservations/{reservation_id}` | `ipam_write` | Delete a reservation |
| GET | `/api/v1/ipam/conflicts` | Signed in | Address conflicts |
| GET | `/api/v1/ipam/dhcp-leases` | Signed in | List DHCP leases |
| POST | `/api/v1/ipam/dhcp-leases/import` | `ipam_write` | Import a DHCP lease file |
| DELETE | `/api/v1/ipam/dhcp-leases` | `ipam_write` | Clear imported DHCP leases |

## External IPAM And Cloud Assets

| Method | Path | Access | Purpose |
|---|---|---|---|
| GET | `/api/v1/ipam/external/providers` | Signed in | Cloud providers |
| GET | `/api/v1/ipam/external/summary` | Signed in | External IP summary |
| GET | `/api/v1/ipam/external/addresses` | Signed in | List external addresses |
| POST | `/api/v1/ipam/external/addresses` | `ipam_write` | Add external addresses (one, a CIDR, or a range) |
| PATCH | `/api/v1/ipam/external/addresses/{address_id}` | `ipam_write` | Update an external address |
| DELETE | `/api/v1/ipam/external/addresses/{address_id}` | `ipam_write` | Delete an external address |
| GET | `/api/v1/ipam/external/migration-report` | Signed in | Migration report |
| DELETE | `/api/v1/ipam/external/migration-report` | `ipam_write` | Dismiss the migration report |
| GET | `/api/v1/ipam/external/accounts` | Signed in | List accounts |
| POST | `/api/v1/ipam/external/accounts` | `ipam_write` | Create an account |
| PUT | `/api/v1/ipam/external/accounts/{account_id}` | `ipam_write` | Update an account |
| GET | `/api/v1/ipam/external/locations` | Signed in | List locations |
| POST | `/api/v1/ipam/external/locations` | `ipam_write` | Create a location |
| PUT | `/api/v1/ipam/external/locations/{location_id}` | `ipam_write` | Update a location |
| DELETE | `/api/v1/ipam/external/locations/{location_id}` | `ipam_write` | Delete a location |
| DELETE | `/api/v1/ipam/external/accounts/{account_id}` | `ipam_write` | Delete an account |
| GET | `/api/v1/ipam/external/assets` | Signed in | List cloud assets |
| GET | `/api/v1/ipam/external/asset-types` | Signed in | List cloud asset types |
| POST | `/api/v1/ipam/external/asset-types` | `ipam_write` | Add a cloud asset type |
| POST | `/api/v1/ipam/external/assets` | `ipam_write` | Create a cloud asset |
| PATCH | `/api/v1/ipam/external/assets/{asset_id}` | `ipam_write` | Update a cloud asset |

One `POST /api/v1/ipam/external/addresses` call adds at most 256 addresses. A cloud asset name must be unique within its provider account (`409`).

## Syslog And Security Events

| Method | Path | Access | Purpose |
|---|---|---|---|
| GET | `/api/v1/syslog/status` | `security_view` | Syslog listener status |
| GET | `/api/v1/syslog/events` | `security_view` | Search syslog and firewall events |
| GET | `/api/v1/syslog/searches` | `security_view` | List saved searches |
| POST | `/api/v1/syslog/searches` | `security_view` | Save a search |
| DELETE | `/api/v1/syslog/searches/{search_id}` | `security_view` | Delete a saved search |
| WS | `/api/v1/syslog/events/live` | JWT-first-frame, `security_view` (no SuperAdmin bypass) | Live event stream (WebSocket) |

API keys cannot open the live event stream. It takes a session access token in its first WebSocket message.

## Network Tools

| Method | Path | Access | Purpose |
|---|---|---|---|
| POST | `/api/v1/tools/dns` | `tools_passive` | DNS lookup |
| POST | `/api/v1/tools/reverse-dns` | `tools_passive` | Reverse DNS lookup |
| POST | `/api/v1/tools/ping` | `tools_active` | Ping |
| POST | `/api/v1/tools/traceroute` | `tools_active` | Traceroute |
| POST | `/api/v1/tools/port-check` | `tools_active` | TCP port check |
| POST | `/api/v1/tools/subnet` | `tools_passive` | Subnet calculator |
| POST | `/api/v1/tools/snmp/probe` | `tools_active` | SNMP probe |
| GET | `/api/v1/tools/snmp/profiles` | `snmp_profile_manage` | List SNMP profiles |
| POST | `/api/v1/tools/snmp/profiles` | `snmp_profile_manage` | Create an SNMP profile |
| PATCH | `/api/v1/tools/snmp/profiles/{profile_id}` | `snmp_profile_manage` | Update an SNMP profile |
| DELETE | `/api/v1/tools/snmp/profiles/{profile_id}` | `snmp_profile_manage` | Delete an SNMP profile |

## Exports And Backups

| Method | Path | Access | Purpose |
|---|---|---|---|
| GET | `/api/v1/exports/summary` | Signed in | Export counts you are allowed to see |
| GET | `/api/v1/exports/inventory` | `inventory_export` | Export device inventory |
| GET | `/api/v1/exports/firewall` | `firewall_export` | Export firewall events |
| GET | `/api/v1/exports/report.pdf` | `report_export` | Generate the PDF network report |
| GET | `/api/v1/exports/backup` | `backup_manage` | Download a database backup |
| POST | `/api/v1/exports/backup/encrypted` | `backup_manage` | Download an encrypted database backup |
| POST | `/api/v1/exports/restore/validate` | SuperAdmin | Validate a backup before restore |
| POST | `/api/v1/exports/restore` | SuperAdmin | Restore a backup |
| GET | `/api/v1/exports/backup-location` | `backup_manage` | Scheduled backup directory |
| GET | `/api/v1/exports/scheduled-backups` | `backup_manage` | List scheduled backup files |
| GET | `/api/v1/exports/scheduled-backups/{filename}` | `backup_manage` | Download a scheduled backup |
| DELETE | `/api/v1/exports/scheduled-backups/{filename}` | `backup_manage` | Delete a scheduled backup |

Database backups are implemented for SQLite only; other databases return `501`. A restore upload over the size limit returns `413`.

## Status Pages

| Method | Path | Access | Purpose |
|---|---|---|---|
| GET | `/api/v1/status-pages` | `status_page_manage` | List status pages |
| POST | `/api/v1/status-pages` | `status_page_manage` | Create a status page |
| GET | `/api/v1/status-pages/sources` | `status_page_manage` | Devices, monitors and checks you can add |
| GET | `/api/v1/status-pages/incidents` | `status_page_manage` | List incidents |
| POST | `/api/v1/status-pages/incidents` | `status_page_manage` | Open an incident |
| POST | `/api/v1/status-pages/incidents/{incident_id}/updates` | `status_page_manage` | Add an incident update |
| POST | `/api/v1/status-pages/incidents/{incident_id}/resolve` | `status_page_manage` | Resolve an incident |
| POST | `/api/v1/status-pages/incidents/{incident_id}/publish` | `status_page_manage` | Publish an incident to more pages |
| PUT | `/api/v1/status-pages/incidents/{incident_id}/pages/{page_id}/visibility` | `status_page_manage` | Hide or show a resolved incident on one page |
| DELETE | `/api/v1/status-pages/notices/{notice_id}` | `status_page_manage` | Clear any notice |
| GET | `/api/v1/status-pages/tokens` | `status_page_manage` | List integration tokens |
| POST | `/api/v1/status-pages/tokens` | `status_page_manage` | Create an integration token (secret shown once) |
| DELETE | `/api/v1/status-pages/tokens/{token_id}` | `status_page_manage` | Revoke an integration token |
| GET | `/api/v1/status-pages/maintenance` | `status_page_manage` | List maintenance windows |
| POST | `/api/v1/status-pages/maintenance` | `status_page_manage` | Create a maintenance window |
| PATCH | `/api/v1/status-pages/maintenance/{window_id}` | `status_page_manage` | Update a maintenance window |
| DELETE | `/api/v1/status-pages/maintenance/{window_id}` | `status_page_manage` | Delete a maintenance window |
| GET | `/api/v1/status-pages/{page_id}/notices` | `status_page_manage` | List notices on a page |
| PUT | `/api/v1/status-pages/{page_id}/notice` | `status_page_manage` | Set your notice on a page |
| DELETE | `/api/v1/status-pages/{page_id}/notice` | `status_page_manage` | Clear your notice on a page |
| GET | `/api/v1/status-pages/{slug}/view` | Signed in | View a page as a signed-in user |
| GET | `/api/v1/status-pages/{page_id}/preview` | `status_page_manage` | Preview a page |
| POST | `/api/v1/status-pages/{page_id}/preview` | `status_page_manage` | Preview an unsaved draft |
| GET | `/api/v1/status-pages/{page_id}` | `status_page_manage` | Read a page |
| PATCH | `/api/v1/status-pages/{page_id}` | `status_page_manage` | Update a page |
| DELETE | `/api/v1/status-pages/{page_id}` | `status_page_manage` | Delete a page |
| PUT | `/api/v1/status-pages/{page_id}/layout` | `status_page_manage` | Replace a page's layout |

- Saving `custom_css` that fails validation returns `422` with `css_errors` listing each problem.
- Maintenance windows with `suppress_alerts` also need `alert_write`.
- Hiding an incident on one page works only after it is resolved; otherwise the request returns `409`.

## Public Status Pages

| Method | Path | Access | Purpose |
|---|---|---|---|
| GET | `/api/v1/public/status-pages/{slug}` | Public | Read a Public page |

Unknown slugs and pages that are not public both return `404`. While a page is being built the response is `503` with `Retry-After`. A matching `If-None-Match` returns `304`. Over the per-IP limit the response is `429`; see [Rate Limits](../rate-limits.md).

## Status Page Integrations

| Method | Path | Access | Purpose |
|---|---|---|---|
| PUT | `/api/v1/status-integrations/pages/{slug}/notice` | `nmsp_` token | Set the page notice |
| DELETE | `/api/v1/status-integrations/pages/{slug}/notice` | `nmsp_` token | Clear the page notice |
| POST | `/api/v1/status-integrations/incidents` | `nmsp_` token | Open an incident |
| POST | `/api/v1/status-integrations/incidents/{incident_id}/updates` | `nmsp_` token | Add an incident update |
| POST | `/api/v1/status-integrations/incidents/{incident_id}/resolve` | `nmsp_` token | Resolve an incident |
| POST | `/api/v1/status-integrations/maintenance` | `nmsp_` token | Create a maintenance window |
| PATCH | `/api/v1/status-integrations/maintenance/{window_id}` | `nmsp_` token | Update a maintenance window |
| DELETE | `/api/v1/status-integrations/maintenance/{window_id}` | `nmsp_` token | Delete a maintenance window |

These endpoints take a page-scoped `nmsp_` token in `Authorization: Bearer`, not an API key. Writes need an `Idempotency-Key` header (`400` without one). See [Status Page Integrations](../guides/status-page-integrations.md).
