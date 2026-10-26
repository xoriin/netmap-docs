---
title: Permissions
sidebar_position: 2
keywords: [roles, permissions, SuperAdmin, NetworkAdmin, SecurityAnalyst, Viewer]
---

# Permissions

NetMap controls access with roles. Each role holds a set of named permissions, and every protected request checks the live role of the signed-in user or API-key owner. This page is the reference for roles and permissions; you change role mappings on the **Groups** tab in [Admin](../using-netmap/admin.md).

## Built-In Roles

| Role | Default permissions |
|---|---|
| `SuperAdmin` | Every permission, plus the SuperAdmin-only actions below |
| `NetworkAdmin` | Every named permission |
| `SecurityAnalyst` | `security_view`, `tools_passive`, `firewall_export` |
| `Viewer` | `tools_passive` |

SuperAdmins can create custom roles and change the permissions of any role except SuperAdmin.

SuperAdmin bypasses permission checks, with one exception: the live syslog stream checks `security_view` on the role itself, so the bypass does not apply there.

HTTP monitor writes (`POST`, `PATCH` and `DELETE` on `/api/v1/monitors`) need `monitoring_write`, but NetworkAdmin is always allowed, even if `monitoring_write` is removed from that role.

## Permission Keys

The **Label** column shows the name you see in Admin.

| Key | Label | Allows |
|---|---|---|
| `topology_write` | Edit inventory & topology | Create, edit and delete devices, VLANs, sites and relationships |
| `security_view` | View security events | The syslog feed, firewall events and the security dashboard |
| `tools_passive` | Use passive network tools | DNS lookups, ping and traceroute |
| `tools_active` | Use active scanning | Nmap discovery and active port scans |
| `inventory_export` | Export device inventory | Device list downloads as CSV, JSON or PDF |
| `firewall_export` | Export firewall logs | Syslog and firewall event downloads as CSV |
| `report_export` | Generate PDF reports | Full network PDF reports |
| `ipam_write` | Edit IPAM | Creating and changing subnets, and DHCP lease imports |
| `ipam_reservation_claim` | Claim reserved IPs | Converting an IP reservation into a device |
| `monitoring_write` | Configure monitoring | Adding and removing monitoring targets |
| `alert_write` | Manage alert rules | Creating, editing and deleting alert rules |
| `user_manage` | Manage users & sessions | Creating and editing users, resetting access and revoking sessions |
| `notification_manage` | Manage notifications | Notification profiles, delivery settings and tests |
| `device_catalog_manage` | Manage device catalogue | Device types, icons, colours and cloud providers |
| `snmp_profile_manage` | Manage SNMP profiles | Stored SNMP credential profiles |
| `audit_view` | View audit logs | Reviewing and exporting audit history |
| `diagnostics_view` | View system diagnostics | Runtime, database and monitoring diagnostics |
| `backup_manage` | Manage backups | Creating, downloading and deleting backups, but not restoring |
| `automation_manage` | Manage automation | Creating, running, pausing and deleting scheduled scans |
| `discovery_manage` | Manage discovery | Running discovery, reviewing observations and importing scan results |
| `status_page_manage` | Manage status pages | Status pages, incidents, notices, maintenance and integration tokens |

## Permissions That Work Together

`ipam_reservation_claim` lets you confirm that a reservation should be removed when you convert it into a device. You also need `topology_write` to create the device. With `ipam_write`, the action appears in the reservation editor; without it, a claim-capable role gets the conversion action directly on the reservation row. A reservation by itself never creates an inventory device.

`status_page_manage` covers creating, editing and deleting status pages, groups and items, handling incidents, setting notices, scheduling page maintenance, and managing integration tokens. Turning on **Suppress monitoring alerts** for a maintenance window also needs `alert_write`, because suppression affects those items throughout NetMap. Viewing a Private status page needs only a signed-in account, and Public pages need no sign-in.

Applying a discovery observation needs both `discovery_manage` and `topology_write`, because it changes inventory.

## SuperAdmin-Only Actions

Administrative permissions open only their matching Admin tabs. These actions stay restricted to SuperAdmin whatever a role holds:

- Role and permission administration
- OIDC SSO and other global security settings
- Database restore
- Assigning the SuperAdmin role, or managing SuperAdmin accounts

## API Keys And Errors

API keys have the live permissions of the user who owns them; see [API Permissions](../api/permissions.md). A missing permission returns `403`, and missing or invalid authentication returns `401`; see [Permission Errors](../troubleshooting/permission-errors.md).

## Related Pages

- [Admin](../using-netmap/admin.md)
- [Status Pages](../using-netmap/status-pages.md)
- [API Permissions](../api/permissions.md)
- [Security Overview](../security/index.md)
