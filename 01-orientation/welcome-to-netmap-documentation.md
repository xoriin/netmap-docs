---
title: Welcome to the NetMap Documentation
description: Choose the right path for installing, using, administering, operating, automating, or contributing to NetMap.
keywords:
  - NetMap documentation
  - getting started
  - network mapping
  - monitoring
  - IPAM
verified_version: "1.5.0-dev"
---

# Welcome to the NetMap Documentation

NetMap is a self-hosted application for keeping a device inventory, drawing network topology, monitoring devices and services, managing IP addresses, discovering hosts, searching syslog events, and administering access. This documentation helps you move from a new installation to routine operation and recovery without assuming that you already know NetMap's terminology.

This documentation set was verified against the **NetMap 1.5.0 development channel**. Some linked pages describe features that the master documentation checklist still classifies as development-only; those links are labelled **Development channel**. Check the version shown in your NetMap sidebar or Admin workspace before following version-sensitive instructions.

## Choose your path

### I am installing NetMap for the first time

Start with [What Is NetMap?](../02-product-introduction/what-is-netmap.md) if you want a short product overview. Then use the [Quick Start](../03-installation/quick-start.md) for a Docker Compose deployment and [Environment Variables](../04-configuration/environment-variables.md) for production configuration.

Before storing important data, read [Storage](../04-configuration/storage.md), [Secrets Management](../10-security/secrets-management.md), and [Backup and Restore](../03-installation/backup-and-restore.md).

### I use NetMap day to day

Begin with the [Interface Overview](../05-using-netmap/interface-overview.md), then open the guide for your workspace:

- [Inventory](../05-using-netmap/inventory.md) for device records.
- [Topology](../05-using-netmap/topology.md) for the network map and links.
- [Monitoring](../05-using-netmap/monitoring.md) for device and service health.
- [IPAM](../05-using-netmap/ipam.md) for subnets, leases, reservations, and conflicts.
- [Security Events](../05-using-netmap/security-events.md) for syslog and firewall-event search.

The [Quick Links by Goal](./quick-links.md) page takes you directly to common procedures.

### I administer NetMap

Use [Administration](../05-using-netmap/admin.md) for the Admin workspace, [Permissions](../10-security/permissions.md) for access control, and the [Security Model](../10-security/security-model.md) for deployment responsibilities. Configuration that affects the whole installation is grouped under [Configuration Reference](../04-configuration/configuration.md).

### I operate or recover the container

Use [Health Checks](../08-operations/health-checks.md), [Logging](../08-operations/logging.md), and [Monitoring NetMap](../08-operations/monitoring-netmap.md) for routine operations. For data protection and recovery, continue to [Backups](../08-operations/backups.md), [Restores](../08-operations/restores.md), and [Disaster Recovery](../08-operations/disaster-recovery.md).

### I automate NetMap

Start with [API Authentication](../07-api/authentication.md), then review [API-Key Permissions](../07-api/api-key-permissions.md) and the [Endpoint Inventory](../07-api/api-reference.md). API-key access is currently tracked as a **Development channel** capability in the documentation checklist.

### I contribute to NetMap

Begin with [Repository Structure](../11-development/repository-structure.md), [Development Installation](../03-installation/development-installation.md), and [Testing](../11-development/testing.md). The developer pages describe the `dev` → `test` → production workflow and the validation expected before promotion.

## Find your way around

- [How to Use This Documentation](./how-to-use-this-documentation.md) explains search, page conventions, version labels, examples, and permissions.
- [Quick Links by Goal](./quick-links.md) groups common tasks by outcome.
- [Documentation Sitemap](./sitemap.md) lists the complete published page tree.
- [Glossary](../12-reference/glossary.md) defines NetMap-specific and networking terms used throughout the site.

## Trust and safety

The implementation in the named channel is the source of truth for these pages. Procedures identify required access, important side effects, and destructive actions where they apply. Examples use reserved addresses and obvious placeholders; replace them with values from your own environment, and never paste real secrets into issue reports or screenshots.

