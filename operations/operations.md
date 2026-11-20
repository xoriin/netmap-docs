---
title: Operations
sidebar_position: 9
keywords:
  - operations
  - health
  - backup
  - restore
  - troubleshooting
---

# Operations

This section covers running NetMap once it is installed: checking its health, reading its logs, backing it up and keeping it ready for recovery.

## Pages In This Section

- [Health Checks](./health-checks.md): the health endpoints and what they report.
- [Logging](./logging.md): where logs go and how to search them.
- [Backup And Restore](./backup-and-restore.md): downloads, scheduled backups and restores.
- [Database Migrations](./database-migrations.md): how schema changes run on start-up.
- [Disaster Recovery](./disaster-recovery.md): rebuilding on a new host.
- [Monitoring NetMap](./monitoring-netmap.md): signals to watch from outside.
- [Upgrading](../installation/upgrading.md): moving to a new version.

## Background Services

The all-in-one image is supervised by tini and runs nginx and the API server. When the API starts, it also starts these background services:

- the syslog server;
- the alert monitor;
- scheduled discovery;
- IP reservation reminders;
- scheduled backups;
- HTTP endpoint monitors;
- the status page cache;
- deferred firewall search-index and retention maintenance.

Use `docker compose ps`, `docker compose logs` and the health endpoint to check them, rather than attaching to processes inside the container.

## Routine Care

Each day, check health, container restarts, recent error logs, listener reachability, disk space and alert delivery. Each week, review backup age, database growth, retention, failed notifications and audit activity. Before every upgrade or configuration or key change, take an off-host backup and confirm you can restore it.

## SQLite, WAL And Retention

Both databases use WAL mode with a 20-second busy timeout. Monitoring history and firewall retention delete old rows in committed batches, so a large clean-up does not block the application. Never copy only a live `.db` file: include its `-wal` and `-shm` sidecars, or use the backup download.

Firewall search-index rebuilds and retention clean-up run in the background after start-up. If only the search index is corrupt, it is rebuilt without deleting firewall rows; if the whole firewall database is corrupt, it may be recreated and unrecovered logs lost. Run manual SQLite integrity checks in a maintenance window, and stop writes before any filesystem-level repair.

## Capacity And Tuning

Capacity depends on device count, monitoring interval and history, service checks, syslog volume, discovery ranges and backup retention. Tune intervals and retention before adding volume, and watch `/app/data`, container logs and firewall database growth. See [Limitations And Capacity Planning](../product-introduction/what-is-netmap.md#limitations-and-capacity-planning) for defaults.

## Rotate Secrets And Move Hosts

Changing `SECRET_KEY` affects sessions and API-key signing, and changing `MASTER_KEY` affects encrypted fields. Changing notification or OIDC secrets affects only those integrations. Plan a maintenance window, keep the old values for rollback, then re-test login, API keys, encrypted settings and notifications.

To move hosts, restore data, configuration and keys onto the new host rather than running two containers against one SQLite directory. Changing the domain, ports or proxy also means updating cookies, trusted origins, the OIDC redirect, WebSocket forwarding and your syslog senders.

## Readiness Checklist

Before you call a deployment ready, confirm:

- health and restart behaviour;
- HTTPS and trusted origins;
- least-privilege users and API keys;
- active probe scope and syslog allowlists;
- alert delivery;
- disk and retention limits;
- off-host backups and a tested restore;
- emergency local SuperAdmin access.

## Troubleshooting

- [Container Problems](../troubleshooting/container-problems.md) when the web UI does not load or active tools fail.
- [Authentication Problems](../troubleshooting/authentication-problems.md) when sign-in fails with valid credentials.
- [API-Key Problems](../troubleshooting/api-key-problems.md) when an API key returns 429.
- [Common Issues](../troubleshooting/common-issues.md) for syslog and other workspace problems.
