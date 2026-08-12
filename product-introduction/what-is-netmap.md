---
title: What Is NetMap
sidebar_position: 2
keywords: [NetMap, self-hosted, network mapping, network monitoring, audience]
verified_version: "1.5.0"
---

# What Is NetMap

NetMap is a self-hosted browser application that brings network inventory, topology, availability monitoring, IP address management, discovery, and syslog context into one operational view. Its supported distribution is an all-in-one Docker image with persistent local storage.

This page is for anyone evaluating NetMap. No account or special role is required to understand the product; actions inside NetMap are permission-controlled.

### The problem it addresses

Small networks often spread their operating knowledge across spreadsheets, router interfaces, monitoring tools, firewall logs, and individual memory. NetMap provides a local source of truth where operators can:

1. record devices, locations, groups, VLANs, and relationships;
2. draw and share a topology map;
3. discover private-network hosts and review changes before importing them;
4. compare observed device state with its expected state;
5. run device, service, and HTTP endpoint checks;
6. manage subnets, reservations, DHCP leases, conflicts, and public-IP allocations;
7. receive and search firewall/syslog events;
8. alert through configured notification providers; and
9. export data or automate REST operations with revocable API keys.

### Intended users

- **Home-lab operators** who want a maintainable map and inventory without a collection of separate services.
- **Small-business IT teams** that need shared operational context and role-based access.
- **Network administrators** managing VLANs, sites, address space, discovery, and availability.
- **Support and security operators** correlating device records with health and firewall events.
- **Automation users** calling the same permission-gated `/api/v1` resources through API keys.

### What self-hosted means

The application, its two SQLite databases, and uploaded/configured data run on infrastructure you control. NetMap is not a hosted service and does not require a cloud account or external database. Some optional features make outbound requests—for example update checks, OIDC, notifications, HTTP monitors, or active network tools. See [Operating Boundaries and Administration](./limitations-and-capacity-planning.md#privacy-and-data-collection).

NetMap does not automatically know the network merely because it is installed. You add or import records, enable discovery where appropriate, configure monitoring, and forward syslog from devices. Active features require network reachability and may need host networking or container capabilities.

### Where NetMap fits

NetMap is a good fit for home labs, small-business and internal IT teams, managed environments with a bounded customer/site scope, and multi-site networks that can reach the application over a trusted path. Common supported workflows are maintaining inventory and topology, reviewing private-network discovery, comparing expected and observed health, tracking internal and public IP allocations, searching firewall/syslog context, and automating permissioned operations through the API.

NetMap is not a hosted SaaS service, a clustered/high-availability monitoring system, a replacement for a full SIEM, a configuration-management system, or an Internet-wide scanner. The supported deployment is the all-in-one Docker image with persistent local storage; native installs and arbitrary multi-container decompositions are outside the supported boundary. SQLite, event retention, discovery limits, and container reachability define practical scale, so very large fleets or high-volume log estates should use a purpose-built platform alongside NetMap. See [Operating Boundaries and Administration](./limitations-and-capacity-planning.md) for sizing and data boundaries.

For a workspace-by-workspace view, continue to the [NetMap Feature Tour](#feature-tour).

## Feature Tour

This tour is for prospective users and newly signed-in operators. Visible workspaces and allowed actions depend on the user's role and permissions; administration and some security functions are intentionally hidden from unauthorized users.

### Operational workspaces

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

### Discovery and change review

Manual and scheduled discovery use `nmap` against private ranges. Scheduled scans create review-only observations for new devices, changed fields, IP moves, and repeatedly missing hosts; they do not silently mutate inventory. Discovery can be disruptive on networks with sensitive equipment, so confirm scope and authorization first.

### Alerts and notifications

Alert rules can evaluate monitoring or event conditions and deliver through configured profiles. Available providers include email and optional integrations such as ntfy, Telegram, Signal, and Apprise-compatible targets. Delivery history helps distinguish a triggered rule from a failed notification.

### Profile and administration

Every user can manage profile preferences and their own API keys. Depending on permissions, administrators can manage users, roles, device types and colors, settings, notification profiles, backups, diagnostics, and generic OIDC single sign-on. SuperAdmin-only operations include sensitive security and system-wide controls.

### API and automation

The REST API is served under `/api/v1`, with an OpenAPI document and Swagger UI. API keys inherit the owning user's current permissions and are subject to rate limits; the live syslog WebSocket does not accept API-key authentication.

### Important expectations

- Empty workspaces usually mean that inventory, monitoring, syslog forwarding, or the relevant integration has not been configured—not that the page is broken.
- Network discovery and probes see only what the container can reach.
- Deleting records, restoring backups, changing security configuration, and applying observations can alter or remove data; follow the specific guide and confirm the target.
- NetMap is not a clustered monitoring or SIEM platform. See [Product Limitations and Capacity Planning](./limitations-and-capacity-planning.md).

Continue with [Using NetMap](../using-netmap/user-guide.md) or start with the [Quick Start](../installation/quick-start.md).
