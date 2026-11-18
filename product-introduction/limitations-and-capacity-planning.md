---
title: Limitations And Capacity Planning
sidebar_position: 12
keywords: [capacity planning, SQLite, retention, discovery limits, event volume, sizing, privacy]
---

# Limitations And Capacity Planning

This page helps you size a production instance and understand what NetMap stores and sends. There's no fixed sizing table or maximum fleet size, so test with your own inventory, checks, scan ranges and event rates.

## Architectural Limits

NetMap is one container using two local SQLite databases. Separate databases, short writes and batched clean-up help it cope with load, but SQLite isn't a clustered service. Run one container per data directory, and use reliable local storage rather than a network file system. See [How NetMap Works](./architecture.md#the-all-in-one-image-and-persistent-databases).

## What Drives Capacity

| Driver | What increases the cost | What you can do |
|---|---|---|
| Syslog and firewall events | Senders, message rate, line size, retention, search indexing | Limit senders, tune retention and watch the size of `firewall.db` |
| Monitoring history | Devices, checks, frequency, retention | Start conservatively and keep only the history you use |
| HTTP monitors | Frequency, response time, TLS and proxy work | Limit expensive endpoints; NetMap reads at most 2 MiB of each response |
| Discovery | Range size, reverse DNS, scan time, overlapping schedules | Use narrow private ranges and stagger schedules |
| Topology | Device and link count, browser resources | Test real layouts on the computers your team uses |
| Backups | Database and upload size | Allow temporary and destination space, and time a test restore |

Device count alone isn't a reliable measure. Capacity depends on how workload, retention and host resources combine.

## Defaults That Affect Planning

- Monitoring history and firewall events are kept for **7 days**.
- Discovery asks for confirmation above **256** targets and refuses more than **4,096** targets (a /20) per scan by default. Its time limit starts at **60 seconds** and grows with the target size, up to about four hours for the largest scans.
- Syslog lines are limited to **8,192 bytes**.
- TCP syslog and live syslog connections are each limited to **50**.
- Each API key may make **120 calls per 60 seconds**.

You can change these in the [Configuration Reference](../configuration/configuration.md). Higher limits use more resources, and shorter retention deletes older history permanently.

## Disk Planning

Mount `/app/data` on durable storage and watch free space as well as database size. SQLite doesn't always shrink a file straight after deleting rows. Keep backups outside the container, allow for Docker log rotation, and leave room for write-ahead log files, migrations, exports and backups.

## Establish A Baseline

1. Deploy with production-like storage and network paths.
2. Add a representative set of devices, checks and syslog sources.
3. Watch CPU, memory, database growth, response time, scan time and backup time for at least one retention cycle.
4. Extrapolate with a margin, and alert on host disk and container health from outside NetMap.
5. Increase load gradually, and retest after changing frequency, retention or event sources.

If performance drops, pause schedules or monitors, reduce syslog at the source or shorten retention. Take a backup before structural changes, and never start a second container on the same data to add capacity.

## Time And Retention

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

## Related Pages

- [How NetMap Works](./architecture.md)
- [Monitoring NetMap](../operations/monitoring-netmap.md)
- [Permissions](../administer/permissions.md)
- [Network Exposure](../security/network-exposure.md)
