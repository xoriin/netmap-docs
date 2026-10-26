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
| Exports | Inventory, firewall, report exports | export permissions |
| Admin | Users, roles, settings, SSO, diagnostics | SuperAdmin; delegated permissions show only their matching sections |
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

Authentication is required for every workspace. The sidebar hides areas the current account cannot use: Security requires `security_view`, Admin requires SuperAdmin or a delegated administrative permission, and write controls appear only when the relevant permission is present. A direct URL does not bypass the backend permission check.

## Themes, loading, and empty states

Switch between light and dark mode with **Light mode**/**Dark mode** at the foot of the sidebar (in **More** on phones). Choose the dark style, **Slate** (cool blue-grey) or **Zinc** (neutral charcoal), in Profile → Preferences → **Dark mode style**. Both choices persist per browser. Loading skeletons indicate an in-flight request; an empty state means the request succeeded but there is no matching data. If a workspace error boundary appears, retry the workspace or navigate away and return after checking the service health endpoint.

## Phone layout

At a viewport width of 760px or less, NetMap switches to a phone layout:

- the sidebar is replaced by bottom tabs for **Home**, **Inventory**, **Monitor**, and **Map**, plus **More**; the Inventory tab shows the open discovery observation count;
- **More** opens a sheet with the remaining workspaces, the light/dark mode switch, Docs, and **Sign out**;
- Inventory, Monitoring, IPAM, and Admin show their sections as a switcher above the workspace;
- Inventory and Monitoring filters fold behind a **Filters** button that shows the number of active filters;
- the Monitoring device and monitor tables and the Status pages list become card lists; and
- the device monitoring pop-up fills the screen, and other dialogs open as sheets from the bottom of the screen.

## Related pages

- [Using the Application](./user-guide.md)
- [First-Run Setup and Authentication](../installation/first-run-and-authentication.md)
- [Entity Colors and Icons](../product-introduction/terminology.md#device-records-and-state)
- [Administration](./admin.md)
