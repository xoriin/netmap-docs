---
title: NetMap
description: NetMap documentation for installation, operation, administration, APIs, and development.
keywords:
  - NetMap documentation
  - getting started
  - network mapping
  - monitoring
verified_version: "1.5.0"
---

# NetMap

NetMap is a self-hosted application for network inventory, topology, monitoring, IP address management, discovery, syslog, alerting, and administration.

This is the NetMap documentation homepage. It links the product overview, installation, operational workspaces, administration, APIs, troubleshooting, and development guidance. If you are evaluating the product, begin with [What Is NetMap?](./product-introduction/what-is-netmap.md).

> **Version basis:** Reviewed pages describe production NetMap `v1.5.0`. Check the version displayed by your installation before following version-sensitive procedures.

## Explore NetMap

| Goal | Start here |
|---|---|
| Understand the product and intended use | [Product Introduction](./product-introduction/introduction.md) |
| Tour the available workspaces | [NetMap Feature Tour](./product-introduction/features.md) |
| Check whether NetMap fits your environment | [What Is NetMap?](./product-introduction/what-is-netmap.md#where-netmap-fits) |
| Understand deployment and data flow | [How NetMap Works](./product-introduction/architecture.md) |
| Review limitations before deploying | [Product Limitations and Capacity Planning](./product-introduction/limitations-and-capacity-planning.md) |

## Install and operate NetMap

| Goal | Start here |
|---|---|
| Install with Docker Compose | [Quick Start](./installation/quick-start.md) |
| Configure a complete deployment | [Docker Compose](./installation/docker-compose.md) |
| Put NetMap behind HTTPS | [Reverse Proxy and HTTPS](./installation/reverse-proxy.md) |
| Upgrade an existing instance | [Upgrading](./installation/upgrading.md) |
| Check application health | [Health Checks](./operations/health-checks.md) |
| Back up or restore data | [Backups](./operations/backups.md) and [Restores](./operations/restores.md) |
| Recover from a larger failure | [Disaster Recovery](./operations/disaster-recovery.md) |

## Build and monitor your network

| Goal | Start here |
|---|---|
| Add or import devices | [Add a Device](./guides/add-device.md) or [Import Devices](./guides/import-devices.md) |
| Discover hosts | [Run Discovery](./guides/run-discovery.md) |
| Build a network map | [Topology](./using-netmap/topology.md) |
| Monitor devices and services | [Monitoring](./using-netmap/monitoring.md) |
| Configure an alert | [Create an Alert Rule](./guides/create-alert-rule.md) |
| Manage subnets and addresses | [IPAM](./using-netmap/ipam.md) |
| Receive and search syslog | [Syslog](./configuration/syslog.md) and [Search Syslog Events](./guides/search-syslog.md) |

## Administer and automate NetMap

| Goal | Start here |
|---|---|
| Manage users and instance settings | [Administration](./using-netmap/admin.md) |
| Understand roles and access | [Permissions](./security/permissions.md) |
| Configure OIDC sign-in | [OIDC SSO](./configuration/oidc-sso.md) |
| Secure the deployment | [Security Overview](./security/security.md) |
| Automate through the REST API | [API Overview](./api/api-overview.md) |
| Find an endpoint | [Endpoint Inventory](./api/api-reference.md) |
| Contribute to NetMap | [Developer Guide](./development/development.md) |

## If something is not working

Start with [Common Issues](./troubleshooting/common-issues.md), then choose the troubleshooting page for the affected area. Before sharing logs or screenshots, remove credentials, private addresses, database contents, and raw syslog data.
