---
title: What Is NetMap?
description: Learn NetMap's purpose, primary workflows, intended users, and self-hosted deployment model.
sidebar_position: 2
keywords: [NetMap, self-hosted, network mapping, network monitoring, audience]
verified_version: "1.5.0"
---

# What Is NetMap?

NetMap is a self-hosted browser application that brings network inventory, topology, availability monitoring, IP address management, discovery, and syslog context into one operational view. Its supported distribution is an all-in-one Docker image with persistent local storage.

This page is for anyone evaluating NetMap. No account or special role is required to understand the product; actions inside NetMap are permission-controlled.

## The problem it addresses

Small networks often spread their operating knowledge across spreadsheets, router interfaces, monitoring tools, firewall logs, and individual memory. NetMap provides a local source of truth where operators can:

1. record devices, locations, groups, VLANs, and relationships;
2. draw and share a topology map;
3. discover private-network hosts and review changes before importing them;
4. compare observed device state with its expected state;
5. run device, service, and HTTP endpoint checks;
6. manage subnets, reservations, DHCP leases, conflicts, and public-IP allocations;
7. receive and search firewall/syslog events;
8. alert through configured notification providers; and
9. export data or automate REST operations with revocable API keys.

## Intended users

- **Home-lab operators** who want a maintainable map and inventory without a collection of separate services.
- **Small-business IT teams** that need shared operational context and role-based access.
- **Network administrators** managing VLANs, sites, address space, discovery, and availability.
- **Support and security operators** correlating device records with health and firewall events.
- **Automation users** calling the same permission-gated `/api/v1` resources through API keys.

## What self-hosted means

The application, its two SQLite databases, and uploaded/configured data run on infrastructure you control. NetMap is not a hosted service and does not require a cloud account or external database. Some optional features make outbound requests—for example update checks, OIDC, notifications, HTTP monitors, or active network tools. See [Privacy and Data Collection](./privacy-and-data-collection.md).

NetMap does not automatically know the network merely because it is installed. You add or import records, enable discovery where appropriate, configure monitoring, and forward syslog from devices. Active features require network reachability and may need host networking or container capabilities.

## Where NetMap fits

NetMap is a good fit for home labs, small-business and internal IT teams, managed environments with a bounded customer/site scope, and multi-site networks that can reach the application over a trusted path. Common supported workflows are maintaining inventory and topology, reviewing private-network discovery, comparing expected and observed health, tracking internal and public IP allocations, searching firewall/syslog context, and automating permissioned operations through the API.

NetMap is not a hosted SaaS service, a clustered/high-availability monitoring system, a replacement for a full SIEM, a configuration-management system, or an Internet-wide scanner. The supported deployment is the all-in-one Docker image with persistent local storage; native installs and arbitrary multi-container decompositions are outside the supported boundary. SQLite, event retention, discovery limits, and container reachability define practical scale, so very large fleets or high-volume log estates should use a purpose-built platform alongside NetMap. See [Product Limitations and Capacity Planning](./limitations-and-capacity-planning.md) for sizing and [Privacy and Data Collection](./privacy-and-data-collection.md) for data boundaries.

For a workspace-by-workspace view, continue to the [NetMap Feature Tour](./features.md).
