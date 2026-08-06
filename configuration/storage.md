---
title: Storage
description: Persistent files and directories used by NetMap.
sidebar_position: 2
keywords: [storage, SQLite, data]
---

# Storage

Storage is the most important part of a NetMap deployment to protect. The container can be replaced at any time, but the contents of the data directory hold the application state, audit history, topology, monitoring data, syslog history, encrypted integration settings, and API-key metadata.

## Persistent Data Directory

The default persistent directory inside the container is:

```text
/app/data
```

In Docker Compose, mount this path to a host directory:

```yaml
services:
  netmap:
    image: xoriin/netmap:latest
    volumes:
      - ./data:/app/data
```

The startup validation in `backend/app/core/startup.py` creates `DATA_DIR` if needed and fails startup if it is not writable.

## Database Files

| File | Purpose | Back up? |
|---|---|---:|
| `/app/data/netmap.db` | Main application database: users, devices, topology, IPAM, settings, API-key metadata, alerts, monitoring records | Yes |
| `/app/data/firewall.db` | Syslog/firewall event database | Yes, if log history matters |
| `/app/data/*.db-wal` | SQLite write-ahead log sidecar files | Yes when copying a live database |
| `/app/data/*.db-shm` | SQLite shared-memory sidecar files | Yes when copying a live database |

NetMap uses two SQLite databases so high-volume syslog writes do not block the main application database.

## SQLite WAL Mode

Both databases use SQLite WAL mode. WAL mode improves concurrency, but it also means a live database may have important data in sidecar files.

Safe backup options:

1. Use NetMap's backup feature from the UI or `/api/v1/exports/backup`.
2. Stop the container before copying the data directory.
3. If taking a live filesystem snapshot, include `.db`, `.db-wal`, and `.db-shm` files together.

## Permissions

The all-in-one entrypoint can remap the internal `netmap` user with `PUID` and `PGID`. This lets bind-mounted host directories be owned by the same user that runs the app inside the container.

Example:

```yaml
environment:
  PUID: "1000"
  PGID: "1000"
volumes:
  - <install-dir>/data:/app/data
```

If NetMap cannot write to `/app/data`, startup fails or logs permission errors.

Confirm host permissions:

```bash
ls -ld <install-dir>/data
```

Fix ownership for UID/GID `1000`:

```bash
sudo chown -R 1000:1000 <install-dir>/data
```

## What Is Not Persistent

The all-in-one container uses `/tmp` for nginx temporary directories and the uvicorn Unix socket. Do not treat `/tmp` as persistent state.

The frontend build output is baked into the image at `/usr/share/nginx/html`; do not edit it inside the container.

## Backup Checklist

Back up:

- `data/`
- `.env`
- Compose files
- any files referenced by `SECRET_KEY_FILE`, `MASTER_KEY_FILE`, or `OIDC_CLIENT_SECRET_FILE`
- any external reverse-proxy configuration needed to route traffic back to NetMap

Keep `SECRET_KEY` and `MASTER_KEY` with the backup. Losing those values can break session validation, API-key verification, or encrypted settings.

## Verify Storage Health

```bash
docker compose exec netmap sh -c 'test -w /app/data && ls -lh /app/data'
curl --fail http://127.0.0.1:8080/api/health
```

SuperAdmins can also check `/api/v1/system/diagnostics` for database file sizes.

## Related Pages

- [Backups](../operations/backups.md)
- [Restores](../operations/restores.md)
- [File And Directory Paths](../reference/file-paths.md)
- [Database Problems](../troubleshooting/database-problems.md)
