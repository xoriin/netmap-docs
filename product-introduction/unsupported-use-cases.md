---
title: Unsupported and Out-of-Scope Use Cases
description: Review NetMap's explicit deployment boundaries, scale expectations, and non-goals.
sidebar_position: 5
keywords: [unsupported, out of scope, non-goals, clustering, SIEM, tenancy]
verified_version: "1.5.0"
---

# Unsupported and Out-of-Scope Use Cases

This page helps evaluators avoid deploying NetMap for a requirement the production `v1.5.0` design does not meet. It is a support boundary, not a claim that an unlisted experiment is impossible.

## Not a supported deployment model

- **Multi-node or active-active clustering.** NetMap uses local SQLite files and has no distributed lock, replication, or leader-election design.
- **Multiple containers sharing one data directory.** SQLite files must not be concurrently served by multiple NetMap application instances.
- **Kubernetes or network-filesystem database storage as a documented production target.** The published deployment is one Docker container with local persistent storage.
- **A native host package.** Source-based development is documented for contributors; the supported end-user packaging is the all-in-one image.
- **Horizontally scaled background workers or remote probes.** Scanners and monitors execute from the NetMap container.

## Not a replacement for

- a full SIEM, compliance archive, or forensic evidence store;
- a high-cardinality, long-retention time-series platform;
- a configuration-management, patching, or remote-control system;
- an authoritative DNS, DHCP, routing, or switch controller;
- a full enterprise CMDB or formal multi-tenant service-management platform;
- packet capture, flow analysis, IDS/IPS, or vulnerability scanning.

Discovery and monitoring observe networks; they do not configure discovered devices. Scheduled discovery findings are review-only until a user applies them.

## Scale boundary

There is no published universal maximum device or event count. Performance depends on host CPU, memory, storage latency, retention, scan ranges, monitor frequency, and event rate. The design includes WAL mode, indexed queries, batched retention, and a separate event database, but it remains a single-container SQLite application.

Treat high-volume syslog, multi-million-row history, wide discovery ranges, and large fleets as capacity-planning exercises. Validate with representative traffic and backup/restore tests. See [Product Limitations and Capacity Planning](./limitations-and-capacity-planning.md).

## Security boundary

Application roles restrict features within one deployment; they are not a hard tenant boundary. NetMap should not be exposed directly to an untrusted network. Put browser/API access behind HTTPS, restrict syslog and management ports, and use separate deployments where legal, customer, or security boundaries require isolation.

## If you have already exceeded the boundary

1. Stop adding load or additional application replicas.
2. Preserve `/app/data` and take a validated backup before changing architecture.
3. Reduce retention or event sources through documented settings; understand that retention deletes historical rows.
4. Split independent administrative domains into separate instances when appropriate.
5. Use a dedicated SIEM or time-series platform for workloads requiring its guarantees, while retaining NetMap for inventory and topology if useful.

See also [Supported Use Cases](./supported-use-cases.md), [The Two-Database Design](./two-database-design.md), and [Backup and Restore](../installation/backup-and-restore.md).
