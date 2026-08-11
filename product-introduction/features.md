---
title: NetMap Feature Tour
description: Tour every production NetMap workspace and its major capabilities.
sidebar_position: 3
keywords: [feature tour, workspaces, inventory, topology, monitoring, IPAM, syslog]
verified_version: "1.5.0"
---

# NetMap Feature Tour

This tour is for prospective users and newly signed-in operators. Visible workspaces and allowed actions depend on the user's role and permissions; administration and some security functions are intentionally hidden from unauthorized users.

## Operational workspaces

| Workspace | What it provides |
|---|---|
| **Overview** | Fleet totals, health summaries, recent changes, groups, device types, offline notices, and favourite-device detail. |
| **Topology** | Interactive devices, groups, sites, and links; search, path highlighting, a mini-map, saved layouts, share-code import, export, and bulk assignment. |
| **Inventory** | Searchable device records, status and identity fields, favourites, import/export, filters, resizable columns, and bulk editing. |
| **VLANs / Groups** | Topology groups with VLAN, subnet, gateway, DNS, color, and membership metadata, including IPAM synchronization. |
| **Locations** | Physical or logical sites used to organize and filter devices. |
| **Monitoring** | Fleet health, uptime and latency history, expected state, pause controls, device checks, service checks, and detailed HTTP monitors. |
| **IPAM** | IPv4/IPv6 subnets, address grids, reservations, DHCP leases, conflict detection, available-address lookup, reminders, and separate public-IP pools and assignments. |
| **Security** | UDP/TCP syslog and parsed firewall events, full-text raw-log search, filters, live updates, saved searches, and export. |
| **Tools** | Permission- and rate-limited ping, traceroute, DNS, port, SNMP, and related diagnostic operations. |
| **Exports** | Data exports and generated reports available to the current user's permissions. |

## Discovery and change review

Manual and scheduled discovery use `nmap` against private ranges. Scheduled scans create review-only observations for new devices, changed fields, IP moves, and repeatedly missing hosts; they do not silently mutate inventory. Discovery can be disruptive on networks with sensitive equipment, so confirm scope and authorization first.

## Alerts and notifications

Alert rules can evaluate monitoring or event conditions and deliver through configured profiles. Available providers include email and optional integrations such as ntfy, Telegram, Signal, and Apprise-compatible targets. Delivery history helps distinguish a triggered rule from a failed notification.

## Profile and administration

Every user can manage profile preferences and their own API keys. Depending on permissions, administrators can manage users, roles, device types and colors, settings, notification profiles, backups, diagnostics, and generic OIDC single sign-on. SuperAdmin-only operations include sensitive security and system-wide controls.

## API and automation

The REST API is served under `/api/v1`, with an OpenAPI document and Swagger UI. API keys inherit the owning user's current permissions and are subject to rate limits; the live syslog WebSocket does not accept API-key authentication.

## Important expectations

- Empty workspaces usually mean that inventory, monitoring, syslog forwarding, or the relevant integration has not been configured—not that the page is broken.
- Network discovery and probes see only what the container can reach.
- Deleting records, restoring backups, changing security configuration, and applying observations can alter or remove data; follow the specific guide and confirm the target.
- NetMap is not a clustered monitoring or SIEM platform. See [Product Limitations and Capacity Planning](./limitations-and-capacity-planning.md).

Continue with [Using NetMap](../using-netmap/user-guide.md) or start with the [Quick Start](../installation/quick-start.md).
