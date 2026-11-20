---
title: What Is NetMap
description: What NetMap is for, who it suits, and how to plan for its limits.
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

NetMap, its two SQLite databases and your data run on infrastructure you control. It isn't a hosted service and needs no cloud account or external database. Some optional features make outbound requests, such as update checks, OIDC, notifications, HTTP monitors and network tools; see [Privacy And Data Collection](#privacy-and-data-collection).

NetMap doesn't learn your network just by being installed. You add or import records, turn on discovery, set up monitoring and forward syslog from your devices. Active features only see what the container can reach, and may need host networking or extra container capabilities.

## Where NetMap Fits

NetMap suits home labs, small-business and internal IT teams, and multi-site networks that can reach it over a trusted path. Typical work is keeping inventory and topology current, reviewing discovery, tracking health and IP addresses, searching syslog and automating tasks through the API.

NetMap isn't a hosted service, a clustered or high-availability monitoring system, a full SIEM, a configuration-management tool or an internet-wide scanner. SQLite, event retention, discovery limits and container reachability set its practical scale, so very large fleets or log estates need a purpose-built platform alongside it. The [limitations](#limitations-and-capacity-planning) below explain how to plan for that.

## Feature Tour

The [Interface Tour](../using-netmap/interface-overview.md) walks through each workspace. What you see depends on your role: administration and some security functions are hidden from users without the matching [permissions](../administer/permissions.md).

A few things to expect when you start:

- An empty workspace usually means that inventory, monitoring, syslog forwarding or an integration hasn't been set up yet.
- Discovery and probes only see what the container can reach. Confirm your scope and authorisation before scanning, as scans can disturb sensitive equipment.
- Deleting records, restoring backups and applying discovery observations can change or remove data, so follow the guide for each one.

## Limitations And Capacity Planning

This section helps you size a production instance and understand what NetMap stores and sends. There's no fixed sizing table or maximum fleet size, so test with your own inventory, checks, scan ranges and event rates.

### Architectural Limits

NetMap is one container using two local SQLite databases. Separate databases, short writes and batched clean-up help it cope with load, but SQLite isn't a clustered service. Run one container per data directory, and use reliable local storage rather than a network file system. See [How NetMap Works](./architecture.md#the-all-in-one-image-and-persistent-databases).

### What Drives Capacity

| Driver | What increases the cost | What you can do |
|---|---|---|
| Syslog and firewall events | Senders, message rate, line size, retention, search indexing | Limit senders, tune retention and watch the size of `firewall.db` |
| Monitoring history | Devices, checks, frequency, retention | Start conservatively and keep only the history you use |
| HTTP monitors | Frequency, response time, TLS and proxy work | Limit expensive endpoints; NetMap reads at most 2 MiB of each response |
| Discovery | Range size, reverse DNS, scan time, overlapping schedules | Use narrow private ranges and stagger schedules |
| Topology | Device and link count, browser resources | Test real layouts on the computers your team uses |
| Backups | Database and upload size | Allow temporary and destination space, and time a test restore |

Device count alone isn't a reliable measure. Capacity depends on how workload, retention and host resources combine.

### Defaults That Affect Planning

- Monitoring history and firewall events are kept for **7 days**.
- Discovery asks for confirmation above **256** targets and refuses more than **4,096** targets (a /20) per scan by default. Its time limit starts at **60 seconds** and grows with the target size, up to about four hours for the largest scans.
- Syslog lines are limited to **8,192 bytes**.
- TCP syslog and live syslog connections are each limited to **50**.
- Each API key may make **120 calls per 60 seconds**.

You can change these in the [Configuration Reference](../configuration/configuration.md). Higher limits use more resources, and shorter retention deletes older history permanently.

### Disk Planning

Mount `/app/data` on durable storage and watch free space as well as database size. SQLite doesn't always shrink a file straight after deleting rows. Keep backups outside the container, allow for Docker log rotation, and leave room for write-ahead log files, migrations, exports and backups.

### Establish A Baseline

1. Deploy with production-like storage and network paths.
2. Add a representative set of devices, checks and syslog sources.
3. Watch CPU, memory, database growth, response time, scan time and backup time for at least one retention cycle.
4. Extrapolate with a margin, and alert on host disk and container health from outside NetMap.
5. Increase load gradually, and retest after changing frequency, retention or event sources.

If performance drops, pause schedules or monitors, reduce syslog at the source or shorten retention. Take a backup before structural changes, and never start a second container on the same data to add capacity.

### Time And Retention

NetMap stores every timestamp in UTC and the browser shows it in your local time zone. Schedules, retention, session lifetimes, API key expiry and certificate warnings all compare against the server clock, so a skewed host clock makes them run early or late.

Retention deletes old history and events; it doesn't archive them. Expiry makes a session, key or reservation invalid after its deadline, and pausing stops activity without deleting history. Take a backup before changing retention.

## Privacy And Data Collection

NetMap has no built-in analytics or telemetry. Most of your data stays on the NetMap host, and outbound traffic happens only for features you use.

### What The Server Stores

Depending on the features you use, `/app/data` can hold:

- user accounts, password hashes, roles, sessions, SSO links, API key details and audit logs;
- device records, addresses, locations, relationships, VLANs, subnets, DHCP leases and public IP addresses;
- discovery results, health history, monitor settings, alert history and notification deliveries;
- raw and parsed syslog, which may contain usernames, addresses or URLs from your devices;
- encrypted secrets, such as notification credentials and the OIDC client secret; and
- backup files created by NetMap.

Only selected secrets are encrypted, not the whole database. Protect the host, data directory, backups, logs and `MASTER_KEY`. See [Secrets Management](../security/secrets-management.md).

### What The Browser Stores

The browser holds the sign-in cookies plus preferences such as table widths, page sizes, topology layout data, icon packs and recent tool values. Anyone with access to the browser profile can see these, so clear site data on a shared computer.

### Outbound Requests

| Destination | When |
|---|---|
| GitHub | When the app checks for a new release or loads release notes |
| Your OIDC provider | When single sign-on is set up or used |
| Notification providers | When an alert is sent by email, ntfy, Telegram, Signal or Apprise |
| HTTP monitor targets and proxy | On each check of a configured monitor |
| DNS and network targets | During discovery, monitoring and network tools |

To reduce outbound traffic, leave optional integrations off and block destinations at your firewall. Update information, SSO or notifications then stop working.

### Your Responsibilities

- Only collect networks and logs you're authorised to process.
- Use HTTPS, least-privilege roles, syslog allow lists and a restrictive firewall.
- Set retention to suit your operational and legal needs.
- Protect and test backups, and remove retired copies securely.
- Check what alert messages contain before sending them to outside providers.

## Next Steps

- [Quick Start](../installation/quick-start.md)
- [Interface Tour](../using-netmap/interface-overview.md)
- [How NetMap Works](./architecture.md)
