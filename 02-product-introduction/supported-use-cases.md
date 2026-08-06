---
title: Supported Use Cases
description: Common ways teams use NetMap.
sidebar_position: 5
keywords: [use cases, workflows]
---

# Supported Use Cases

NetMap supports:

- Maintaining a self-hosted network inventory.
- Mapping physical and logical topology.
- Tracking VLANs, sites, and device relationships.
- Monitoring device and service health.
- Reviewing discovery changes before applying them to inventory.
- Managing IP subnets, reservations, DHCP leases, and conflicts.
- Searching firewall/syslog events.
- Exporting inventory, reports, backups, and logs.
- Automating workflows through API-key-authenticated REST calls.

NetMap is not documented as a horizontally scaled service in the current source. The supported deployment described here is a single all-in-one container with persistent SQLite storage.

## Good Fit

NetMap is a good fit when you want:

- one self-hosted network operations dashboard;
- local control of data;
- Docker-based deployment;
- REST automation with API keys;
- syslog search without running a separate logging stack;
- lightweight IPAM tied to inventory and VLAN metadata.

## Poor Fit Or Requires Maintainer Design

NetMap is not currently documented as:

- a multi-node clustered application;
- a hosted SaaS service;
- a replacement for a full SIEM;
- a high-scale time-series monitoring database;
- a native package-managed service.

Documentation gap: this behaviour could not be verified from the current source for scaling beyond the single-container SQLite deployment.

## Related Pages

- [Architecture](./architecture.md)
- [Quick Start](../03-installation/quick-start.md)
- [API Capability Matrix](../07-api/capability-matrix.md)
