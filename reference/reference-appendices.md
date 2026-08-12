---
title: Reference Appendices
description: Index of NetMap's source-backed reference tables and operational catalogs.
sidebar_position: 6
keywords: [reference, matrix, defaults, glossary, API, permissions]
---

# Reference Appendices

The documentation is intentionally split by audience. This page is the index for compact reference material; it does not replace the product guides that explain decisions and procedures.

## Core indexes

| Need | Canonical reference |
|---|---|
| Defaults and limits | [Default values](./default-values.md), [Configuration](../configuration/configuration.md) |
| Ports and protocols | [Ports](./ports.md) |
| Container and persistent paths | [File paths](./file-paths.md), [Docker installation](../installation/docker.md) |
| Terms and abbreviations | [Glossary](./glossary.md), [Terminology](../product-introduction/terminology.md) |
| Release history | [Release changelog](./changelog.md) |
| Known constraints | [Limitations and capacity planning](../product-introduction/limitations-and-capacity-planning.md) |
| API routes and schemas | [API reference](../api/api-reference.md), [OpenAPI and Swagger](../api/openapi-swagger.md) |
| Permissions and roles | [Administration](../using-netmap/admin.md#users-sessions-and-roles), [Security](../security/security.md#authorization-and-role-boundaries) |

## State and data-model references

- [Device records and state](../product-introduction/device-records-and-state.md) explains lifecycle, expected state, and observed health.
- [Monitoring and discovery model](../product-introduction/monitoring-and-discovery-model.md) explains checks, history, scans, and observations.
- [Topology entities](../product-introduction/topology-entities.md) explains devices, groups, sites, relationships, and layouts.
- [IPAM data model](../product-introduction/ipam-data-model.md) explains subnets, addresses, reservations, VLAN links, and public allocations.
- [Security events and notifications](../product-introduction/security-events-and-notifications.md) explains firewall events, alert events, and deliveries.

## Scope of generated references

OpenAPI is the authoritative machine-readable endpoint and schema catalogue. Environment defaults are maintained in the configuration reference, and UI behavior is maintained in the workspace guides. When a value is not listed in these references, consult the generated OpenAPI document or the current configuration source rather than assuming a default.
