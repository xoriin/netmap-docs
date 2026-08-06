---
title: NetMap
keywords:
  - NetMap documentation
  - network mapping
  - monitoring
  - IPAM
  - syslog
verified_version: "1.5.0"
outline: deep
---

# NetMap

NetMap is a self-hosted application for understanding and operating a network from one browser interface. It brings together device inventory, topology mapping, monitoring, IP address management (IPAM), discovery, syslog and firewall-event search, alerting, exports, and administration.

It is designed for people who need a practical local source of truth: network administrators, homelab operators, support teams, security analysts, container operators, automation authors, and contributors.

> **Version basis:** This documentation was based on the production release of NetMap `v1.5.0` at the time of writing. Check the version shown by your installation before following version-sensitive procedures.

## What NetMap brings together

- **Inventory:** Record devices, identity fields, lifecycle, expected state, groups, VLANs, locations, tags, and notes.
- **Topology:** Map devices, group zones, sites, relationships, link direction, layouts, and visual preferences.
- **Monitoring:** Track device reachability, latency, service checks, HTTP/HTTPS endpoints, history, and alert conditions.
- **IPAM:** Manage internal subnets, reservations, DHCP leases, conflicts, utilization, and external address pools.
- **Discovery:** Scan permitted private targets and review observations before changing inventory.
- **Security events:** Receive syslog, search parsed firewall events, save searches, and correlate activity with devices.
- **Operations:** Export data, create and restore backups, inspect health, and collect diagnostic information.
- **Administration and automation:** Manage users, roles, permissions, integrations, OIDC, notifications, API keys, and audit history.

## How it fits together

NetMap is delivered as one Docker container. nginx serves the React interface and proxies API and WebSocket traffic to FastAPI over a local Unix socket. Background services handle monitoring, discovery schedules, alert evaluation, notification delivery, backups, reminders, and syslog maintenance.

Application data is stored locally in two SQLite databases:

- `netmap.db` contains inventory, topology, users, settings, monitoring, IPAM, alerts, and other application records.
- `firewall.db` isolates higher-volume syslog and firewall-event writes from the main application database.

Active operations such as discovery, ping, traceroute, SNMP, and service checks make network connections from the NetMap container. Deployment, permissions, and network exposure therefore matter as much as the interface itself.

## Start here

### Install NetMap

Read [What Is NetMap?](./product-introduction/what-is-netmap.md), then follow the [Quick Start](./installation/quick-start.md). Before storing important data, review [Storage](./configuration/storage.md), [Secrets Management](./security/secrets-management.md), and [Backup and Restore](./installation/backup-and-restore.md).

### Use NetMap day to day

Begin with the [Interface Overview](./using-netmap/interface-overview.md), then open the workspace you need:

- [Inventory](./using-netmap/inventory.md)
- [Topology](./using-netmap/topology.md)
- [Monitoring](./using-netmap/monitoring.md)
- [IPAM](./using-netmap/ipam.md)
- [Security Events](./using-netmap/security-events.md)

### Administer or operate NetMap

Use [Administration](./using-netmap/admin.md), [Permissions](./security/permissions.md), and the [Security Model](./security/security-model.md) for access and instance-wide controls. Use [Health Checks](./operations/health-checks.md), [Logging](./operations/logging.md), [Backups](./operations/backups.md), and [Disaster Recovery](./operations/disaster-recovery.md) for container operations.

### Automate or contribute

For REST automation, start with [API Authentication](./api/authentication.md), [API-Key Permissions](./api/api-key-permissions.md), and the [Endpoint Inventory](./api/api-reference.md). Contributors should begin with [Repository Structure](./development/repository-structure.md), [Local Development](./development/local-development.md), and [Testing](./development/testing.md).

## Use this documentation confidently

- [How to Use This Documentation](./orientation/how-to-use-this-documentation.md) explains search, conventions, permissions, examples, and safety notes.
- [Documentation Version and Product Compatibility](./orientation/documentation-version-compatibility.md) explains how this v1.5.0 documentation applies to other installed versions.
- [Quick Links by Goal](./orientation/quick-links.md) goes directly to common tasks.
- [Documentation Sitemap](./orientation/sitemap.md) lists every published page.
- [Documentation Changelog](./orientation/documentation-changelog.md) records material additions and corrections.
- [Reporting Documentation Problems](./orientation/reporting-documentation-problems.md) explains how to report inaccurate, missing, or unclear guidance.

Production NetMap v1.5.0 is the source used for this documentation. Procedures identify required access, important side effects, and destructive actions where they apply. Examples use reserved addresses and obvious placeholders; never paste real secrets, private network data, or unsanitized screenshots into public reports.
