---
title: Using The Application
sidebar_position: 5
keywords:
  - user guide
  - interface
  - dashboard
  - topology
  - monitoring
---

# Using The Application

The React SPA defines these routes in `frontend/src/routes/index.ts`: Overview, Topology, Inventory, VLANs, Locations, Monitoring, IPAM, Tools, Security, Exports, Admin, and Profile.

Authentication is required after setup. Security requires `security_view`. Admin requires `SuperAdmin`.

## Overview

Purpose: show live network health, inventory changes, and device activity.

Related API: `GET /api/v1/dashboard/summary`, `GET /api/v1/monitoring/summary`.

Expected users: any authenticated user.

## Topology

Purpose: map devices, groups, sites, relationships, and saved layouts.

Available workflows:

1. View the graph: `GET /api/v1/topology/graph`.
2. Create, update, delete devices: `POST/PATCH/DELETE /api/v1/topology/devices`.
3. Bulk update selected devices: `POST /api/v1/topology/devices/bulk-update`.
4. Manage groups/VLANs: `/api/v1/topology/groups`.
5. Manage sites: `/api/v1/topology/sites`.
6. Save, share, revoke, preview, and import layouts: `/api/v1/topology/layouts`.
7. Create and edit relationships: `/api/v1/topology/relationships`.
8. View selected-device security events: `GET /api/v1/topology/devices/{device_id}/security-events`.

Required permissions: read access requires authentication. Write actions require `topology_write`. Device security summaries require `security_view`.

## Inventory

Purpose: search, filter, import, and update device records.

Related API:

- `GET /api/v1/topology/devices`
- `POST /api/v1/topology/devices/import`
- `PATCH /api/v1/topology/devices/{device_id}`
- `DELETE /api/v1/topology/devices/{device_id}`

Write actions require `topology_write`.

## VLANs And Groups

Purpose: manage logical groups and VLAN metadata shown in topology and used by IPAM import.

Related API:

- `GET /api/v1/topology/groups`
- `POST /api/v1/topology/groups`
- `PATCH /api/v1/topology/groups/{group_id}`
- `DELETE /api/v1/topology/groups/{group_id}`
- `POST /api/v1/topology/groups/reset-device-assignments`

Write actions require `topology_write`.

## Locations

Purpose: manage physical or logical sites.

Related API: `/api/v1/topology/sites`.

Write actions require `topology_write`.

## Monitoring

Purpose: inspect fleet health, device history, analysis, and service checks.

Related API:

- `GET /api/v1/monitoring/summary`
- `GET /api/v1/monitoring/devices`
- `GET /api/v1/monitoring/devices/{device_id}/history`
- `GET /api/v1/monitoring/devices/{device_id}/analysis`
- `GET /api/v1/monitoring/service-checks`
- `POST /api/v1/monitoring/service-checks`
- `DELETE /api/v1/monitoring/service-checks/{target_id}`

Read actions require authentication. Service-check create/delete checks `monitoring_write` in `monitoring.py`.

## IPAM

Purpose: manage subnets, reservations, DHCP leases, available addresses, and conflicts.

Related API:

- `GET /api/v1/ipam/summary`
- `GET/POST /api/v1/ipam/subnets`
- `PATCH/DELETE /api/v1/ipam/subnets/{subnet_id}`
- `GET /api/v1/ipam/subnets/{subnet_id}/addresses`
- `GET /api/v1/ipam/subnets/{subnet_id}/next-available`
- `GET/POST/PATCH/DELETE /api/v1/ipam/reservations`
- `GET /api/v1/ipam/conflicts`
- `GET/POST/DELETE /api/v1/ipam/dhcp-leases`
- `GET /api/v1/ipam/vlan-suggestions`
- `POST /api/v1/ipam/subnets/import-from-vlans`

Write actions require `ipam_write`.

## Tools

Purpose: run network diagnostics from NetMap.

Related API:

- Passive tools: `POST /api/v1/tools/dns`, `POST /api/v1/tools/reverse-dns`, `POST /api/v1/tools/subnet`
- Active tools: `POST /api/v1/tools/ping`, `POST /api/v1/tools/traceroute`, `POST /api/v1/tools/port-check`, `POST /api/v1/tools/snmp/probe`
- SNMP profiles: `GET /api/v1/tools/snmp/profiles`, SuperAdmin create/update/delete profile endpoints

Permissions: `tools_passive`, `tools_active`, and SuperAdmin for SNMP profile management.

## Security

Purpose: search syslog/firewall events, use saved searches, and inspect syslog status.

Related API:

- `GET /api/v1/syslog/status`
- `GET /api/v1/syslog/events`
- `GET/POST/DELETE /api/v1/syslog/searches`

Required permission: `security_view`.

## Exports

Purpose: download inventory, firewall logs, reports, database backups, and scheduled backup files.

Related API:

- `GET /api/v1/exports/inventory`
- `GET /api/v1/exports/firewall`
- `GET /api/v1/exports/report.pdf`
- `GET /api/v1/exports/backup`
- `POST /api/v1/exports/restore/validate`
- `POST /api/v1/exports/restore`
- `GET/DELETE /api/v1/exports/scheduled-backups`

Permissions: inventory, firewall, and report exports have separate permissions. Backup and restore actions require SuperAdmin.

## Admin

Purpose: manage users, settings, roles, notification profiles, OIDC SSO, API-key oversight, audit logs, diagnostics, alerts, and device types.

Required role: SuperAdmin for the Admin route and administrative endpoints.

Related API groups: `/api/v1/admin/*`, `/api/v1/auth/users*`, `/api/v1/admin/oidc-settings`, `/api/v1/api-keys/admin/*`, `/api/v1/audit/*`, `/api/v1/system/diagnostics`.

## Profile

Purpose: manage your own profile, password, and API keys.

Related API:

- `GET /api/v1/auth/me`
- `PATCH /api/v1/auth/me`
- `POST /api/v1/auth/change-password`
- `GET/POST/DELETE /api/v1/api-keys`

Any active authenticated user can create and revoke their own API keys.
