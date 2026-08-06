---
title: What Is NetMap?
description: Plain-language overview of NetMap and the problems it solves.
sidebar_position: 1
keywords: [overview, self-hosted, network mapping]
---

# What Is NetMap?

NetMap is a self-hosted application for mapping and monitoring networks. It combines inventory, topology, device health, service checks, IP address management, syslog/firewall event search, exports, and administration in one browser interface.

The application is intended for network administrators, homelab operators, security analysts, and support teams that need a local operational source of truth.

NetMap is packaged as a single Docker container running nginx, a React single-page application, FastAPI, uvicorn, SQLite, syslog listeners, and background workers.

## What Problem It Solves

Small and medium networks often end up split across spreadsheets, router pages, monitoring tools, firewall logs, and memory. NetMap gives operators one place to track devices, topology, IP address usage, service health, and security events.

## What It Includes

- Inventory for network devices.
- Topology graph for devices, groups, sites, and links.
- nmap discovery and scheduled discovery observations.
- Monitoring summaries, history, and service checks.
- IPAM for subnets, reservations, DHCP leases, and conflicts.
- Syslog/firewall event ingestion and search.
- User, role, SSO, notification, backup, and diagnostic administration.
- REST API access through API keys.

## Deployment Model

The verified production deployment is the all-in-one Docker image. NetMap does not require a separate database service in the documented deployment; it uses SQLite files under `/app/data`.

## Where To Go Next

- [Features](./features.md)
- [Architecture](./architecture.md)
- [Quick Start](../installation/quick-start.md)
- [API Keys](../api/api-keys.md)
