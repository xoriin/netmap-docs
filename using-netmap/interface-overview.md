---
title: Interface Tour
sidebar_position: 1
keywords: [interface, navigation, workspace, sidebar, phone layout, user guide]
---

# Interface Tour

NetMap has one workspace for each area of your network, listed in the sidebar. This page shows what each workspace is for and how the interface behaves. You need to sign in to use any workspace.

## Workspaces

| Workspace | What you do there | Who can use it |
|---|---|---|
| [Overview](./overview.md) | See live network health, inventory changes and device activity | Everyone; changes need `topology_write` |
| [Topology](./topology.md) | Map devices, groups, sites and relationships, and save layouts | Everyone; changes need `topology_write` |
| [Inventory](./inventory.md) | Search, filter, import and update devices | Everyone; changes need `topology_write` |
| [VLANs](./vlans.md) | Manage topology groups and VLANs | Everyone; changes need `topology_write` |
| [Locations](./locations.md) | Manage sites and physical locations | Everyone; changes need `topology_write` |
| [Monitoring](./monitoring.md) | Check device uptime, latency and service health | Everyone; changes need `monitoring_write` |
| [IPAM](./ipam.md) | Manage subnets, reservations, DHCP leases and public addresses | Everyone; changes need `ipam_write` |
| [Tools](./tools.md) | Run DNS, ping, traceroute, port and SNMP checks | The matching tool permission |
| [Security](./security-events.md) | Search firewall and syslog events | `security_view` |
| [Exports](./exports.md) | Download inventory, firewall logs and reports | The matching export permission |
| [Admin](../administer/index.md) | Manage users, settings, alerts and system data | SuperAdmin, or a delegated administrative permission |
| [Profile](./profile.md) | Update your account, password, preferences and API keys | Everyone |

Each permission is described on [Permissions](../administer/permissions.md).

## Common Layout

The application shell has a sidebar, a top bar, and one workspace at a time. Workspace content is arranged into panels; tables scroll inside their panels rather than moving the entire page. Admin and Monitoring use nested tabs, and direct browser navigation preserves the selected workspace.

Common controls behave consistently:

- search fields filter the current panel as text is entered;
- filter and status controls can be reset to their all-items value;
- sortable column headers change direction when selected again;
- resizable table dividers retain widths in browser storage and double-click resets them;
- destructive actions use a themed confirmation dialog; and
- errors appear as inline messages or toasts with a retry or refresh path.

## Permissions And Hidden Navigation

Authentication is required for every workspace. The sidebar hides areas the current account cannot use: Security requires `security_view`, Admin requires SuperAdmin or a delegated administrative permission, and write controls appear only when the relevant permission is present. A direct URL does not bypass the backend permission check.

## Themes, Loading And Empty States

Switch between light and dark mode with **Light mode**/**Dark mode** at the foot of the sidebar (in **More** on phones). Choose the dark style, **Slate** (cool blue-grey) or **Zinc** (neutral charcoal), in Profile → Preferences → **Dark mode style**. Both choices persist per browser. Loading skeletons indicate an in-flight request; an empty state means the request succeeded but there is no matching data.

If a workspace error boundary appears, retry the workspace or navigate away and return after checking the service health endpoint.

## Phone Layout

At a viewport width of 760px or less, NetMap switches to a phone layout:

- the sidebar is replaced by bottom tabs for **Home**, **Inventory**, **Monitor**, and **Map**, plus **More**; the Inventory tab shows the open discovery observation count;
- **More** opens a sheet with the remaining workspaces, the light/dark mode switch, Docs, and **Sign out**;
- Inventory, Monitoring, IPAM, and Admin show their sections as a switcher above the workspace;
- Inventory and Monitoring filters fold behind a **Filters** button that shows the number of active filters;
- the Monitoring device and endpoint tables, the Status pages list, and the VLANs list become card lists;
- the Tools tabs sit in one row that you swipe sideways; and
- the device and endpoint monitoring pop-ups fill the screen, and other dialogs open as sheets from the bottom of the screen.

## Related Pages

- [First-Run Setup And Authentication](../installation/first-run-and-authentication.md)
- [Profile](./profile.md)
- [Admin](../administer/index.md)
- [Glossary](../reference/glossary.md)
