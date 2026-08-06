---
title: Interface Overview
description: NetMap workspace navigation and access rules.
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
