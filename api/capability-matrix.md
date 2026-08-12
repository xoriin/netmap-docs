---
title: Capability Matrix
sidebar_position: 10
keywords: [capability matrix, permissions]
---

# Capability Matrix

This page summarizes what the browser UI can do and whether the same capability can be automated with an API key.

Key rule: API keys can call REST endpoints that the owning user could call. They do not support the syslog live WebSocket.

| Capability | UI | API key | Required permission | Endpoint |
|---|---:|---:|---|---|
| View dashboard | Yes | Yes | authenticated | `GET /api/v1/dashboard/summary` |
| View devices | Yes | Yes | authenticated | `GET /api/v1/topology/devices` |
| Create devices | Yes | Yes | `topology_write` | `POST /api/v1/topology/devices` |
| Import devices | Yes | Yes | `topology_write` | `POST /api/v1/topology/devices/import` |
| Manage topology links | Yes | Yes | `topology_write` | `/api/v1/topology/relationships*` |
| Manage layouts | Yes | Yes | authenticated, owner rules | `/api/v1/topology/layouts*` |
| Run discovery | Yes | Yes | `topology_write` | `/api/v1/discovery/*` |
| View monitoring | Yes | Yes | authenticated | `/api/v1/monitoring/*` read endpoints |
| Configure service checks | Yes | Yes | `monitoring_write` | monitoring service-check write endpoints |
| Manage IPAM | Yes | Yes | `ipam_write` | IPAM write endpoints |
| Search syslog | Yes | Yes | `security_view` | `/api/v1/syslog/events` |
| Manage saved syslog searches | Yes | Yes | `security_view` | `/api/v1/syslog/searches*` |
| Run passive tools | Yes | Yes | `tools_passive` | DNS, reverse DNS, subnet calculator |
| Run active tools | Yes | Yes | `tools_active` | ping, traceroute, port check, SNMP probe |
| Export inventory | Yes | Yes | `inventory_export` | `GET /api/v1/exports/inventory` |
| Export firewall logs | Yes | Yes | `firewall_export` | `GET /api/v1/exports/firewall` |
| Generate PDF report | Yes | Yes | `report_export` | `GET /api/v1/exports/report.pdf` |
| Manage users | Yes | Yes | SuperAdmin | `/api/v1/auth/users*` |
| Manage OIDC | Yes | Yes | SuperAdmin | `/api/v1/admin/oidc-settings*` |
| Manage all API keys | Yes | Yes | SuperAdmin | `/api/v1/api-keys/admin/*` |
| Live syslog stream | Yes | No | JWT-first-frame | WebSocket implementation |

Use [Endpoint Inventory](./api-reference.md) for route grouping and [API-Key Permissions](./api-key-permissions.md) for the permission model.
