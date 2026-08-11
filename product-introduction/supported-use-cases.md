---
title: Supported Use Cases
description: Understand the environments and workflows that fit NetMap's production deployment model.
sidebar_position: 4
keywords: [use cases, home lab, small business, managed network, multi-site]
verified_version: "1.5.0"
---

# Supported Use Cases

NetMap is best suited to one self-hosted instance serving a home lab, a small organization, or an operational team with a manageable number of networks and event sources. This evaluation guide does not require a NetMap role; carrying out a workflow requires the corresponding application permissions and authorization to access the network.

## Home labs

Use NetMap to replace a hand-maintained diagram and spreadsheet with linked inventory, topology, monitoring, and IPAM. The all-in-one image keeps deployment compact, while scheduled discovery can flag changes for review.

**Plan for:** a persistent `/app/data` mount, backups, and host networking if ARP/MAC discovery or DHCP checks must operate on the LAN.

## Small businesses and internal IT

Use roles, locations, groups, expected device state, alerts, and shared topology layouts to give a small team a common operational picture. OIDC can integrate sign-in with an existing identity provider, while local SuperAdmin access remains the emergency path.

**Plan for:** HTTPS at a reverse proxy, strong secrets, least-privilege roles, backup testing, and explicit syslog retention.

## Managed environments

A team can inventory and monitor devices for a managed environment, organize records by site and group, export reports, and use API keys for automation. NetMap permissions apply inside one instance; they are not a formal tenant-isolation boundary.

**Plan for:** separate instances when customers or administrative domains require hard data isolation, distinct retention, or independent recovery.

## Multi-site networks

Locations and topology groups can represent multiple sites in one instance. Discovery, monitoring, syslog, and tools work when routing and firewalls permit the NetMap container to reach each site and remote devices can reach the configured listener.

**Plan for:** routed connectivity or a VPN, latency-aware timeouts, source allowlists, DNS behavior, and a deliberate central-versus-per-site deployment choice. NetMap does not deploy remote probes or collectors.

## Common supported workflows

- Build inventory manually, by import, or from reviewed discovery results.
- Map physical and logical relationships and share layout snapshots with other users.
- Monitor whether devices match their expected state and check ports, protocols, or HTTP responses.
- Track private subnets and provider-assigned public ranges.
- Centralize moderate firewall/syslog traffic for search and device context.
- Notify operators about selected conditions.
- Export operational data and automate REST calls with API keys.

If your requirement involves clustering, very high event volume, remote collectors, formal tenancy, or a general-purpose SIEM, read [Unsupported and Out-of-Scope Use Cases](./unsupported-use-cases.md) before deploying.
