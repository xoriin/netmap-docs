---
title: Quick Links by Goal
description: Go directly to NetMap installation, setup, daily-use, administration, automation, troubleshooting, and recovery tasks.
keywords:
  - quick links
  - common tasks
  - NetMap guides
verified_version: "1.5.0"
---

# Quick Links by Goal

Choose the outcome closest to what you need. Read the linked page's prerequisites before changing configuration or data.

## Install or upgrade NetMap

| Goal | Start here |
|---|---|
| Understand what you are deploying | [What Is NetMap?](../product-introduction/what-is-netmap.md) |
| Start a new Docker Compose installation | [Quick Start](../installation/quick-start.md) |
| Configure a complete Compose deployment | [Docker Compose](../installation/docker-compose.md) |
| Use `docker run` instead | [Docker](../installation/docker.md) |
| Choose ports and listeners | [Ports](../configuration/ports.md) |
| Put NetMap behind HTTPS | [Reverse Proxy and HTTPS](../installation/reverse-proxy.md) |
| Upgrade an existing instance | [Upgrading](../installation/upgrading.md) |
| Diagnose a failed start | [Installation Problems](../troubleshooting/installation-problems.md) |

## Build your inventory and map

| Goal | Start here |
|---|---|
| Add one device | [Add a Device](../guides/add-device.md) |
| Import many devices | [Import Devices](../guides/import-devices.md) |
| Discover hosts with nmap | [Run Discovery](../guides/run-discovery.md) |
| Review scheduled discovery changes | [Review Discovery Observations](../guides/scheduled-discovery-observations.md) |
| Work with the network canvas | [Topology](../using-netmap/topology.md) |
| Share a saved topology layout | [Share a Topology Layout](../guides/share-topology-layout.md) |
| Manage groups and VLANs | [VLANs and Groups](../using-netmap/vlans.md) |
| Manage sites or locations | [Locations](../using-netmap/locations.md) |

## Monitor devices and services

| Goal | Start here |
|---|---|
| Understand monitoring views | [Monitoring](../using-netmap/monitoring.md) |
| Configure a service check | [Configure Service Checks](../guides/configure-service-checks.md) |
| Create an alert rule | [Create an Alert Rule](../guides/create-alert-rule.md) |
| Check whether NetMap itself is healthy | [Health Checks](../operations/health-checks.md) |
| Investigate container output | [Logging](../operations/logging.md) |

## Manage addresses and network data

| Goal | Start here |
|---|---|
| Understand NetMap IPAM | [IPAM](../using-netmap/ipam.md) |
| Import DHCP leases | [Import DHCP Leases](../guides/import-dhcp-leases.md) |
| Reserve an address | [Create an IP Reservation](../guides/create-ip-reservation.md) |
| Export inventory or reports | [Export Data](../guides/export-data.md) |

## Search security events

| Goal | Start here |
|---|---|
| Configure syslog ingestion | [Syslog](../configuration/syslog.md) |
| Search firewall or syslog events | [Search Syslog Events](../guides/search-syslog.md) |
| Understand the Security workspace | [Security Events](../using-netmap/security-events.md) |
| Review network exposure | [Network Exposure](../security/network-exposure.md) |

## Administer access and security

| Goal | Start here |
|---|---|
| Use the Admin workspace | [Administration](../using-netmap/admin.md) |
| Understand roles and named permissions | [Permissions](../security/permissions.md) |
| Configure OIDC single sign-on | [OIDC SSO](../configuration/oidc-sso.md) |
| Protect application secrets | [Secrets Management](../security/secrets-management.md) |
| Diagnose a sign-in failure | [Authentication Problems](../troubleshooting/authentication-problems.md) |

## Automate through the API

| Goal | Start here |
|---|---|
| Choose an authentication method | [API Authentication](../api/authentication.md) |
| Create an API key | [Generating API Keys](../api/generating-api-keys.md) |
| Make the first authenticated request | [Using API Keys](../api/using-api-keys.md) |
| Understand inherited permissions | [API-Key Permissions](../api/api-key-permissions.md) |
| Find a route | [Endpoint Inventory](../api/api-reference.md) |
| Read the generated API schema | [OpenAPI and Swagger](../api/openapi-swagger.md) |
| Troubleshoot a request | [API Errors](../api/errors.md) and [API-Key Problems](../troubleshooting/api-key-problems.md) |

## Back up, restore, or recover

| Goal | Start here |
|---|---|
| Plan and create backups | [Backups](../operations/backups.md) |
| Restore backed-up data | [Restores](../operations/restores.md) |
| Prepare for a larger failure | [Disaster Recovery](../operations/disaster-recovery.md) |
| Investigate database symptoms | [Database Problems](../troubleshooting/database-problems.md) |
| Gather safe diagnostic details | [Diagnostic Information](../troubleshooting/diagnostic-information.md) |

## Contribute to NetMap

| Goal | Start here |
|---|---|
| Understand the source tree | [Repository Structure](../development/repository-structure.md) |
| Set up a development environment | [Local Development](../development/local-development.md) |
| Work on the backend or frontend | [Backend Development](../development/backend-development.md) or [Frontend Development](../development/frontend-development.md) |
| Run validation | [Testing](../development/testing.md) |
| Submit a change through a fork and the test branch | [Contributing Workflow](../development/contributing-workflow.md) |

## Related pages

- [Welcome to the NetMap Documentation](./welcome-to-netmap-documentation.md)
- [How to Use This Documentation](./how-to-use-this-documentation.md)
- [Documentation Sitemap](./sitemap.md)
