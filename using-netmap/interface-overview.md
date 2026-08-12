---
title: Interface Overview
sidebar_position: 1
keywords: [interface, navigation, workspace]
---

# Interface Overview

The frontend routes are defined in `frontend/src/routes/index.ts`.

| Workspace | Purpose | Access |
|---|---|---|
| Overview | Network health and activity summary | Authenticated |
| Topology | Device graph, relationships, layouts | Authenticated; writes need `topology_write` |
| Inventory | Device list and import/update workflows | Authenticated; writes need `topology_write` |
| VLANs | Groups and VLAN metadata | Authenticated; writes need `topology_write` |
| Locations | Sites and physical/logical locations | Authenticated; writes need `topology_write` |
| Monitoring | Device and service health | Authenticated; service config needs `monitoring_write` |
| IPAM | Subnets, reservations, leases, conflicts | Authenticated; writes need `ipam_write` |
| Tools | DNS, ping, traceroute, subnet, SNMP tools | tool permissions |
| Security | Syslog/firewall event search | `security_view` |
| Exports | Inventory, firewall, report, backup exports | export permissions; backup requires SuperAdmin |
| Admin | Users, roles, settings, SSO, diagnostics | SuperAdmin |
| Profile | Profile, password, API keys | Authenticated |

## Common layout

The application shell has a sidebar, a top bar, and one workspace at a time. Workspace content is arranged into panels; tables scroll inside their panels rather than moving the entire page. Admin and Monitoring use nested tabs, and direct browser navigation preserves the selected workspace.

Common controls behave consistently:

- search fields filter the current panel as text is entered;
- filter and status controls can be reset to their all-items value;
- sortable column headers change direction when selected again;
- resizable table dividers retain widths in browser storage and double-click resets them;
- destructive actions use a themed confirmation dialog; and
- errors appear as inline messages or toasts with a retry or refresh path.

## Permissions and hidden navigation

Authentication is required for every workspace. The sidebar hides areas the current account cannot use: Security requires `security_view`, Admin requires SuperAdmin, and write controls appear only when the relevant permission is present. A direct URL does not bypass the backend permission check.

## Themes, loading, and empty states

Choose light or dark mode from Profile → Appearance. The selection persists per browser. Loading skeletons indicate an in-flight request; an empty state means the request succeeded but there is no matching data. If a workspace error boundary appears, retry the workspace or navigate away and return after checking the service health endpoint.

## Related pages

- [Using the Application](./user-guide.md)
- [First-Run Setup and Authentication](../installation/first-run-and-authentication.md)
- [Entity Colors and Icons](../product-introduction/terminology.md#device-records-and-state)
- [Administration](./admin.md)
