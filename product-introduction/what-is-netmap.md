---
title: What Is NetMap
sidebar_position: 2
keywords: [NetMap, self-hosted, network mapping, network monitoring, audience]
---

# What Is NetMap

NetMap is a self-hosted web application that brings network inventory, topology, availability monitoring, IP address management, discovery and syslog into one place. You run it as a single all-in-one Docker image with persistent local storage.

## The Problem It Solves

Small networks often keep their knowledge in spreadsheets, router pages, separate monitoring tools, firewall logs and people's memory. NetMap gives you one local source of truth where you can:

- record devices, locations, groups, VLANs and the links between them;
- draw and share a topology map;
- discover private-network hosts and review changes before importing them;
- compare each device's observed state with the state you expect;
- run device, service and HTTP endpoint checks;
- manage subnets, reservations, DHCP leases, conflicts and public IP addresses;
- receive and search firewall and syslog events;
- send alerts through notification providers; and
- export data or automate tasks through the REST API with revocable API keys.

## Who It Is For

- **Home-lab operators** who want a map and inventory without running several separate services.
- **Small-business IT teams** who need shared context and role-based access.
- **Network administrators** who manage VLANs, sites, address space, discovery and availability.
- **Support and security staff** who match device records against health and firewall events.
- **Automation users** who call the same permission-checked `/api/v1` resources with API keys.

## What Self-Hosted Means

NetMap, its two SQLite databases and your data run on infrastructure you control. It isn't a hosted service and needs no cloud account or external database. Some optional features make outbound requests, such as update checks, OIDC, notifications, HTTP monitors and network tools; see [Privacy And Data Collection](./limitations-and-capacity-planning.md#privacy-and-data-collection).

NetMap doesn't learn your network just by being installed. You add or import records, turn on discovery, set up monitoring and forward syslog from your devices. Active features only see what the container can reach, and may need host networking or extra container capabilities.

## Where NetMap Fits

NetMap suits home labs, small-business and internal IT teams, and multi-site networks that can reach it over a trusted path. Typical work is keeping inventory and topology current, reviewing discovery, tracking health and IP addresses, searching syslog and automating tasks through the API.

NetMap isn't a hosted service, a clustered or high-availability monitoring system, a full SIEM, a configuration-management tool or an internet-wide scanner. SQLite, event retention, discovery limits and container reachability set its practical scale, so very large fleets or log estates need a purpose-built platform alongside it. See [Limitations And Capacity Planning](./limitations-and-capacity-planning.md).

## Feature Tour

The [Interface Tour](../using-netmap/interface-overview.md) walks through each workspace. What you see depends on your role: administration and some security functions are hidden from users without the matching [permissions](../administer/permissions.md).

A few things to expect when you start:

- An empty workspace usually means that inventory, monitoring, syslog forwarding or an integration hasn't been set up yet.
- Discovery and probes only see what the container can reach. Confirm your scope and authorisation before scanning, as scans can disturb sensitive equipment.
- Deleting records, restoring backups and applying discovery observations can change or remove data, so follow the guide for each one.

## Next Steps

- [Quick Start](../installation/quick-start.md)
- [Interface Tour](../using-netmap/interface-overview.md)
- [Architecture](./architecture.md)
