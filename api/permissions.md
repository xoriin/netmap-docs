---
title: API Permissions
sidebar_position: 4
keywords: [API, permissions, roles, API key, capability]
---

# API Permissions

An API key has no scopes of its own. Each request runs as the user who owns the key, with that user's role permissions at the time of the request. Changing the user's role, the role's permissions, or deactivating the user changes what the key can do on its next request.

To limit what automation can do, create a dedicated user with a role that has only the permissions it needs, then create the key as that user.

A request without the permission returns `403`. See [API Errors](./errors.md).

## Default Roles

| Role | Default permissions |
|---|---|
| SuperAdmin | Everything. Passes every permission check except where noted below. |
| NetworkAdmin | All 21 permissions. |
| SecurityAnalyst | `security_view`, `tools_passive`, `firewall_export` |
| Viewer | `tools_passive` |

A SuperAdmin can change the permissions of each role and create custom roles. See [Permissions](../security/permissions.md).

## What Each Action Needs

The **Default roles** column lists the built-in roles that have the permission by default, in addition to SuperAdmin.

| Action | Permission | Default roles |
|---|---|---|
| Read your own account, the dashboard, devices, topology, monitoring, IPAM and alert events | Signed in | All roles |
| Create, list and revoke your own API keys | Signed in | All roles |
| Save, share and delete your own topology layouts | Signed in | All roles |
| Create, edit and delete devices, VLANs, sites, groups and links | `topology_write` | NetworkAdmin |
| Import devices | `topology_write` | NetworkAdmin |
| Claim a reserved IP address as a device | `topology_write` and `ipam_reservation_claim` | NetworkAdmin |
| Search syslog and firewall events, and manage saved searches | `security_view` | NetworkAdmin, SecurityAnalyst |
| Live syslog stream | JWT-first-frame, `security_view` (no SuperAdmin bypass) | NetworkAdmin, SecurityAnalyst |
| Run DNS, reverse DNS and subnet tools, and read LLDP neighbours | `tools_passive` | NetworkAdmin, SecurityAnalyst, Viewer |
| Run ping, traceroute, port check, SNMP probe and LLDP scans | `tools_active` | NetworkAdmin |
| Export the device inventory | `inventory_export` | NetworkAdmin |
| Export firewall logs | `firewall_export` | NetworkAdmin, SecurityAnalyst |
| Generate the PDF network report | `report_export` | NetworkAdmin |
| Edit subnets, reservations, DHCP leases and external IPAM | `ipam_write` | NetworkAdmin |
| Add, edit and delete port targets, service checks and HTTP monitors, and run a device check | `monitoring_write` | NetworkAdmin |
| Create, edit and test alert rules, and read alert deliveries | `alert_write` | NetworkAdmin |
| Manage users, reset passwords, unlock sign-in and revoke sessions | `user_manage` | NetworkAdmin |
| Read role permissions | `user_manage` | NetworkAdmin |
| Manage notification profiles and delivery settings | `notification_manage` | NetworkAdmin |
| Manage device types, cloud providers and entity colours | `device_catalog_manage` | NetworkAdmin |
| Manage SNMP credential profiles | `snmp_profile_manage` | NetworkAdmin |
| Read audit logs and export sign-in history | `audit_view` | NetworkAdmin |
| Read system diagnostics | `diagnostics_view` | NetworkAdmin |
| Create, download and delete backups | `backup_manage` | NetworkAdmin |
| Manage scheduled discovery | `automation_manage` | NetworkAdmin |
| Run discovery scans and review observations | `discovery_manage` | NetworkAdmin |
| Apply observations or import discovery results | `discovery_manage` and `topology_write` | NetworkAdmin |
| Manage status pages, incidents, notices, maintenance and integration tokens | `status_page_manage` | NetworkAdmin |
| Suppress alerts during a maintenance window | `status_page_manage` and `alert_write` | NetworkAdmin |
| Change role permissions, and create or delete roles | SuperAdmin | None |
| Manage application settings, email branding and single sign-on | SuperAdmin | None |
| List and revoke every user's API keys | SuperAdmin | None |
| Reset another user's two-factor authentication | SuperAdmin | None |
| Validate and restore a backup | SuperAdmin | None |

NetworkAdmin can always add, edit and delete HTTP monitors, even if its `monitoring_write` permission is removed.

For the permission on every endpoint, see the [Endpoint Reference](./reference/endpoints.md).
