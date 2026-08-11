---
title: Single-Container Architecture
description: Understand NetMap's image processes, supervision, Unix socket, ports, and persistent paths.
sidebar_position: 7
keywords: [container, processes, tini, nginx, uvicorn, ports, persistent storage]
verified_version: "1.5.0"
---

# Single-Container Architecture

This page is for deployers and operators. Docker host access is required to configure, inspect, or restart the container; application roles do not grant host access.

## What the image contains

The production image combines the compiled React application, nginx, Python 3.12, FastAPI/uvicorn, nmap and network tools, SQLite access, syslog listeners, and background services. It does not require a separate database or web-server container.

```mermaid
flowchart TD
    Tini[tini, container PID 1] --> Entry[entrypoint]
    Entry --> Uvicorn[uvicorn as netmap user]
    Entry --> Nginx[nginx]
    Nginx -->|/tmp/uvicorn.sock| Uvicorn
    Uvicorn --> Services[syslog and background service threads]
    Uvicorn --> Data[/app/data]
```

`tini` is PID 1 and forwards signals/reaps children. The entrypoint optionally maps the `netmap` account to `PUID`/`PGID`, prepares writable paths, starts uvicorn as that unprivileged user, waits for its Unix socket, then starts nginx. If either primary process exits, the entrypoint terminates the other and the container exits so the restart policy can act.

## Interfaces and ports

| Interface | Container default | Purpose |
|---|---:|---|
| HTTP | `8080/tcp` | SPA, REST API, health endpoint, and proxied WebSocket |
| Syslog | `1514/udp` | UDP syslog ingestion |
| Syslog | `1514/tcp` | TCP syslog ingestion |
| Syslog TLS | `6514/tcp` when enabled | Optional TLS listener |
| Internal socket | `/tmp/uvicorn.sock` | nginx-to-uvicorn traffic; do not publish |

The supplied Compose file publishes host HTTP `8080` and maps host syslog `5514` to container `1514`. Host mappings are deployment choices; confirm the actual compose file rather than assuming defaults.

## Persistent and ephemeral paths

- `/app/data` is persistent and must be mounted. It contains the SQLite databases and application-managed files.
- `/app/VERSION` and `/app/CHANGELOG.md` are baked into the image.
- `/tmp/uvicorn.sock` and other `/tmp` files are ephemeral and are recreated on start.

Removing or replacing a container is safe only when `/app/data` is mounted outside its writable layer. Deleting the volume or bind-mount contents permanently deletes application data.

## Capabilities and privilege

The image runs application work as the `netmap` user. The supplied Compose deployment drops all capabilities and adds `NET_RAW` and `NET_BIND_SERVICE`; the image grants `ping` the raw-socket file capability and allows only `/usr/bin/nmap` through passwordless sudo. Removing these provisions can make ICMP, DHCP, or nmap functions fail even while the web UI remains healthy.

## Health and recovery

Docker checks `http://127.0.0.1:8080/api/health`. If the container is unhealthy, inspect logs for secret validation, data-directory permissions, migrations, socket startup, or database recovery. Do not delete database files as a first troubleshooting step. See [Container Problems](../troubleshooting/container-problems.md) and [Backup and Restore](../installation/backup-and-restore.md).
