---
title: How NetMap Works
description: Follow browser, API, syslog, scanner, worker, and database traffic through NetMap.
sidebar_position: 6
keywords: [architecture, React, nginx, FastAPI, SQLite, syslog, workers]
verified_version: "1.5.0"
---

# How NetMap Works

This conceptual architecture is for evaluators, operators, reverse-proxy administrators, and contributors. Ordinary users need no special permission; system configuration and diagnostics generally require administrator or SuperAdmin access.

```mermaid
flowchart LR
    Browser[React browser app] -->|HTTP / WebSocket| Nginx[nginx :8080]
    Client[REST client] -->|X-API-Key or session| Nginx
    Senders[Syslog senders] -->|UDP/TCP :1514| Syslog[Syslog service]
    Nginx -->|Unix socket| API[uvicorn + FastAPI]
    API --> Main[(netmap.db)]
    API --> Firewall[(firewall.db + FTS5)]
    Syslog --> Firewall
    Workers[Monitoring, alerts, discovery, backup, maintenance] --> Main
    Workers --> Firewall
    Workers --> Network[Devices and configured services]
```

## Browser and API requests

nginx serves the compiled React single-page application and proxies `/api` and WebSocket traffic to uvicorn over `/tmp/uvicorn.sock`. FastAPI mounts product routes under `/api/v1`; `/api/health` is the unauthenticated container health endpoint.

Browser sessions use a refresh token in an HttpOnly cookie and keep the access token in memory. External clients may use API keys. Both resolve to a user whose current role and permissions are enforced by the same API dependencies.

## Data paths

Most configuration and operational records use `/app/data/netmap.db`. Firewall/syslog events and their full-text index use `/app/data/firewall.db`. Both databases use SQLite WAL mode and a busy timeout. The split prevents bursts of syslog writes from competing with every main-application transaction.

Uploads and generated persistent files also live below the configured data directory. A durable volume and backups are therefore prerequisites for production use.

## Active and passive services

- The **syslog service** passively listens for configured UDP/TCP input and parses accepted messages.
- **Discovery and tools** actively run network operations such as nmap, ping, DNS, and traceroute on user request or a schedule.
- **Monitoring workers** probe devices, ports, protocols, and HTTP endpoints.
- **Alert, reminder, and notification workers** evaluate saved configuration and may call external providers.
- **Maintenance workers** purge expired history in batches, maintain firewall search, and run scheduled backups.

These workers run with the API process; there is no separate distributed queue. A stopped container stops monitoring, discovery schedules, notifications, syslog reception, and maintenance until it restarts.

## The all-in-one image and persistent databases

The supported production image keeps nginx, uvicorn/FastAPI, the syslog listener, and background workers under one supervised container. nginx serves the SPA and proxies API/WebSocket traffic to uvicorn over `/tmp/uvicorn.sock`; the container exposes HTTP plus optional syslog listeners. Persistent state belongs under `/app/data`; `/tmp` and the Unix socket are runtime-only. Docker capabilities and host networking are added only when active probes or ARP/MAC discovery require them.

NetMap uses two SQLite databases. `netmap.db` stores users, settings, devices, topology, monitoring configuration, IPAM, alerts, and audit data. `firewall.db` stores high-volume syslog/firewall events and the `firewall_events_fts` full-text mirror. Both use WAL mode and busy timeouts, but the split prevents a syslog flood from contending with ordinary application writes. Firewall retention and FTS maintenance run in the background; confirmed whole-firewall corruption can recreate `firewall.db` while preserving the main database, so external backups remain essential.

## Startup and failure behavior

At startup NetMap validates the data directory and required production secrets, initializes both databases and built-in migrations, then starts services. nginx becomes useful only after the uvicorn socket and public health endpoint are ready. Invalid secrets or an unwritable data directory prevent a healthy start.

The firewall database has targeted recovery behavior: a damaged FTS index is rebuilt, while confirmed whole-database corruption causes `firewall.db` and its sidecars to be recreated, losing stored firewall history but preserving `netmap.db`. Always keep backups and inspect container logs after an unexpected rebuild.

For network exposure and probe requirements, see [Network Access Model](./network-access-model.md). For operational backup and recovery procedures, see [Exports](../using-netmap/exports.md) and [Backups](../operations/backups.md).
