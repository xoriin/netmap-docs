---
title: Welcome to the NetMap Documentation
description: Learn what NetMap does and choose the right documentation path for installing, using, administering, operating, or automating it.
keywords:
  - NetMap documentation
  - network mapping
  - monitoring
  - IPAM
  - syslog
verified_version: "1.5.0-dev"
outline: deep
---

# Welcome to the NetMap Documentation

NetMap is a self-hosted application for understanding and operating a network from one browser interface. It brings together device inventory, topology mapping, monitoring, IP address management (IPAM), discovery, syslog and firewall-event search, alerting, exports, and administration.

It is designed for people who need a practical local source of truth: network administrators, homelab operators, support teams, security analysts, container operators, automation authors, and contributors.

> **Documentation coverage:** This orientation section is verified against NetMap `1.5.0-dev`. Later sections are being reviewed page by page; development-only behavior is labelled where the documentation checklist still requires release confirmation.

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

Read [What Is NetMap?](../02-product-introduction/what-is-netmap.md), then follow the [Quick Start](../03-installation/quick-start.md). Before storing important data, review [Storage](../04-configuration/storage.md), [Secrets Management](../10-security/secrets-management.md), and [Backup and Restore](../03-installation/backup-and-restore.md).

### Use NetMap day to day

Begin with the [Interface Overview](../05-using-netmap/interface-overview.md), then open the workspace you need:

- [Inventory](../05-using-netmap/inventory.md)
- [Topology](../05-using-netmap/topology.md)
- [Monitoring](../05-using-netmap/monitoring.md)
- [IPAM](../05-using-netmap/ipam.md)
- [Security Events](../05-using-netmap/security-events.md)

### Administer or operate NetMap

Use [Administration](../05-using-netmap/admin.md), [Permissions](../10-security/permissions.md), and the [Security Model](../10-security/security-model.md) for access and instance-wide controls. Use [Health Checks](../08-operations/health-checks.md), [Logging](../08-operations/logging.md), [Backups](../08-operations/backups.md), and [Disaster Recovery](../08-operations/disaster-recovery.md) for container operations.

### Automate or contribute

For REST automation, start with [API Authentication](../07-api/authentication.md), [API-Key Permissions](../07-api/api-key-permissions.md), and the [Endpoint Inventory](../07-api/api-reference.md). Contributors should begin with [Repository Structure](../11-development/repository-structure.md), [Development Installation](../03-installation/development-installation.md), and [Testing](../11-development/testing.md).

## Use this documentation confidently

- [How to Use This Documentation](./how-to-use-this-documentation.md) explains search, conventions, permissions, examples, and safety notes.
- [Documentation Version and Product Compatibility](./documentation-version-compatibility.md) matches pages to production, test, and development builds.
- [Quick Links by Goal](./quick-links.md) goes directly to common tasks.
- [Documentation Sitemap](./sitemap.md) lists every published page.
- [Documentation Changelog](./documentation-changelog.md) records material additions and corrections.
- [Reporting Documentation Problems](./reporting-documentation-problems.md) explains how to report inaccurate, missing, or unclear guidance.

The implementation in the named channel is the source of truth. Procedures identify required access, important side effects, and destructive actions where they apply. Examples use reserved addresses and obvious placeholders; never paste real secrets, private network data, or unsanitized screenshots into public reports.
