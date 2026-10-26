---
title: NetMap
keywords:
  - NetMap documentation
  - getting started
  - network mapping
  - monitoring
---

# NetMap

NetMap is a self-hosted application for network inventory, topology, monitoring, IP address management, discovery, syslog, alerting, and administration.

If you are evaluating NetMap, start with [What Is NetMap](./product-introduction/what-is-netmap.md). The version you are running is shown on the **System** tab in Admin.

## Explore NetMap

| Goal | Start here |
|---|---|
| Understand the product and intended use | [What Is NetMap](./product-introduction/what-is-netmap.md) |
| Tour the available workspaces | [Interface Tour](./using-netmap/interface-overview.md) |
| Check whether NetMap fits your environment | [Where NetMap Fits](./product-introduction/what-is-netmap.md#where-netmap-fits) |
| Understand deployment and data flow | [How NetMap Works](./product-introduction/architecture.md) |
| Review limitations before deploying | [Limitations And Capacity Planning](./product-introduction/limitations-and-capacity-planning.md) |

## Install And Operate NetMap

| Goal | Start here |
|---|---|
| Install with Docker Compose | [Five-Minute Quick Start](./installation/quick-start.md) |
| Configure a complete deployment | [Docker Compose](./installation/docker-compose.md) |
| Put NetMap behind HTTPS | [Reverse Proxy And HTTPS](./installation/reverse-proxy.md) |
| Upgrade an existing instance | [Upgrading](./installation/upgrading.md) |
| Check application health | [Health Checks](./operations/health-checks.md) |
| Back up or restore data | [Backup And Restore](./operations/backup-and-restore.md) |
| Recover from a larger failure | [Disaster Recovery](./operations/disaster-recovery.md) |

## Build And Monitor Your Network

| Goal | Start here |
|---|---|
| Add or import devices | [Add A Device](./guides/add-device.md) or [Import Devices](./guides/import-devices.md) |
| Discover hosts | [Run Discovery](./guides/run-discovery.md) |
| Build a network map | [Topology](./using-netmap/topology.md) |
| Monitor devices and services | [Monitoring](./using-netmap/monitoring.md) |
| Monitor websites and APIs | [HTTP Endpoint Monitors](./using-netmap/endpoint-monitors.md) |
| Configure an alert | [Create An Alert Rule](./guides/create-alert-rule.md) |
| Manage subnets and addresses | [IPAM](./using-netmap/ipam.md) |
| Receive and search syslog | [Syslog](./configuration/syslog.md) and [Search Syslog Events](./guides/search-syslog.md) |

## Administer And Automate NetMap

| Goal | Start here |
|---|---|
| Manage users and instance settings | [Admin Workspace](./administer/index.md) |
| Understand roles and access | [Permissions](./administer/permissions.md) |
| Configure OIDC sign-in | [OIDC SSO](./configuration/oidc-sso.md) |
| Secure the deployment | [Security Overview](./security/index.md) |
| Automate through the REST API | [API Overview](./api/index.md) |
| Find an endpoint | [Endpoint Reference](./api/reference/endpoints.md) |
| Contribute to NetMap | [Developer Guide](./development/development.md) |

## If Something Is Not Working

Start with [Common Issues](./troubleshooting/common-issues.md), then choose the troubleshooting page for the affected area. Before sharing logs or screenshots, remove credentials, private addresses, database contents, and raw syslog data.
