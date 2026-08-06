---
title: Quick Links by Goal
description: Go directly to NetMap installation, setup, daily-use, administration, automation, troubleshooting, and recovery tasks.
keywords:
  - quick links
  - common tasks
  - NetMap guides
verified_version: "1.5.0-dev"
---

# Quick Links by Goal

Choose the outcome closest to what you need. Read the linked page's prerequisites before changing configuration or data.

## Install or upgrade NetMap

| Goal | Start here |
|---|---|
| Understand what you are deploying | [What Is NetMap?](../02-product-introduction/what-is-netmap.md) |
| Start a new Docker Compose installation | [Quick Start](../03-installation/quick-start.md) |
| Configure a complete Compose deployment | [Docker Compose](../03-installation/docker-compose.md) |
| Use `docker run` instead | [Docker](../03-installation/docker.md) |
| Choose ports and listeners | [Ports](../04-configuration/ports.md) |
| Put NetMap behind HTTPS | [Reverse Proxy and HTTPS](../03-installation/reverse-proxy.md) |
| Upgrade an existing instance | [Upgrading](../03-installation/upgrading.md) |
| Diagnose a failed start | [Installation Problems](../09-troubleshooting/installation-problems.md) |

## Build your inventory and map

| Goal | Start here |
|---|---|
| Add one device | [Add a Device](../06-guides/add-device.md) |
| Import many devices | [Import Devices](../06-guides/import-devices.md) |
| Discover hosts with nmap | [Run Discovery](../06-guides/run-discovery.md) |
| Review scheduled discovery changes | [Review Discovery Observations](../06-guides/scheduled-discovery-observations.md) |
| Work with the network canvas | [Topology](../05-using-netmap/topology.md) |
| Share a saved topology layout | [Share a Topology Layout](../06-guides/share-topology-layout.md) — **Development channel** |
| Manage groups and VLANs | [VLANs and Groups](../05-using-netmap/vlans.md) |
| Manage sites or locations | [Locations](../05-using-netmap/locations.md) |

## Monitor devices and services

| Goal | Start here |
|---|---|
| Understand monitoring views | [Monitoring](../05-using-netmap/monitoring.md) |
| Configure a service check | [Configure Service Checks](../06-guides/configure-service-checks.md) |
| Create an alert rule | [Create an Alert Rule](../06-guides/create-alert-rule.md) |
| Check whether NetMap itself is healthy | [Health Checks](../08-operations/health-checks.md) |
| Investigate container output | [Logging](../08-operations/logging.md) |

## Manage addresses and network data

| Goal | Start here |
|---|---|
| Understand NetMap IPAM | [IPAM](../05-using-netmap/ipam.md) |
| Import DHCP leases | [Import DHCP Leases](../06-guides/import-dhcp-leases.md) |
| Reserve an address | [Create an IP Reservation](../06-guides/create-ip-reservation.md) |
| Export inventory or reports | [Export Data](../06-guides/export-data.md) |

## Search security events

| Goal | Start here |
|---|---|
| Configure syslog ingestion | [Syslog](../04-configuration/syslog.md) |
| Search firewall or syslog events | [Search Syslog Events](../06-guides/search-syslog.md) |
| Understand the Security workspace | [Security Events](../05-using-netmap/security-events.md) |
| Review network exposure | [Network Exposure](../10-security/network-exposure.md) |

## Administer access and security

| Goal | Start here |
|---|---|
| Use the Admin workspace | [Administration](../05-using-netmap/admin.md) |
| Understand roles and named permissions | [Permissions](../10-security/permissions.md) |
| Configure OIDC single sign-on | [OIDC SSO](../04-configuration/oidc-sso.md) — **Development channel** |
| Protect application secrets | [Secrets Management](../10-security/secrets-management.md) |
| Diagnose a sign-in failure | [Authentication Problems](../09-troubleshooting/authentication-problems.md) |

## Automate through the API

API-key access is currently tracked as a **Development channel** capability in the master checklist.

| Goal | Start here |
|---|---|
| Choose an authentication method | [API Authentication](../07-api/authentication.md) |
| Create an API key | [Generating API Keys](../07-api/generating-api-keys.md) |
| Make the first authenticated request | [Using API Keys](../07-api/using-api-keys.md) |
| Understand inherited permissions | [API-Key Permissions](../07-api/api-key-permissions.md) |
| Find a route | [Endpoint Inventory](../07-api/api-reference.md) |
| Read the generated API schema | [OpenAPI and Swagger](../07-api/openapi-swagger.md) |
| Troubleshoot a request | [API Errors](../07-api/errors.md) and [API-Key Problems](../09-troubleshooting/api-key-problems.md) |

## Back up, restore, or recover

| Goal | Start here |
|---|---|
| Plan and create backups | [Backups](../08-operations/backups.md) |
| Restore backed-up data | [Restores](../08-operations/restores.md) |
| Prepare for a larger failure | [Disaster Recovery](../08-operations/disaster-recovery.md) |
| Investigate database symptoms | [Database Problems](../09-troubleshooting/database-problems.md) |
| Gather safe diagnostic details | [Diagnostic Information](../09-troubleshooting/diagnostic-information.md) |

## Contribute to NetMap

| Goal | Start here |
|---|---|
| Understand the source tree | [Repository Structure](../11-development/repository-structure.md) |
| Set up a development environment | [Development Installation](../03-installation/development-installation.md) |
| Work on the backend or frontend | [Backend Development](../11-development/backend-development.md) or [Frontend Development](../11-development/frontend-development.md) |
| Run validation | [Testing](../11-development/testing.md) |
| Understand promotion and releases | [Release Process](../11-development/release-process.md) |

## Related pages

- [Welcome to the NetMap Documentation](./welcome-to-netmap-documentation.md)
- [How to Use This Documentation](./how-to-use-this-documentation.md)
- [Documentation Sitemap](./sitemap.md)

