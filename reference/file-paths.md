---
title: File And Directory Paths
description: Important paths used by NetMap.
sidebar_position: 2
keywords: [paths, files]
---

# File And Directory Paths

This reference lists important paths in the production all-in-one container and public source tree. Use it when configuring volumes, backups, troubleshooting, or contributing a change.

## Runtime Container Paths

| Path | Purpose |
|---|---|
| `/app/data` | Persistent data directory |
| `/app/data/netmap.db` | Main SQLite DB |
| `/app/data/firewall.db` | Firewall/syslog SQLite DB |
| `/app/data/*.db-wal` | SQLite write-ahead log sidecars |
| `/app/data/*.db-shm` | SQLite shared-memory sidecars |
| `/tmp/uvicorn.sock` | Internal uvicorn socket |
| `/tmp/nginx/*` | nginx temporary directories created by the all-in-one entrypoint |
| `/usr/share/nginx/html` | Built frontend assets |
| `/etc/netmap/.env` | Optional mounted env file |
| `/app/VERSION` | Installed version file |

## Source Tree Paths

| Path | Purpose |
|---|---|
| `backend/app/main.py` | FastAPI app entrypoint |
| `backend/app/api/v1/` | Versioned REST route handlers |
| `backend/app/api/deps.py` | Authentication and permission dependencies |
| `backend/app/core/config.py` | Environment settings |
| `backend/app/db/session.py` | Main SQLite setup |
| `backend/app/db/firewall_session.py` | Firewall SQLite setup |
| `frontend/src/routes/index.ts` | SPA route definitions |
| `frontend/src/features/` | Workspace components |
| `docker/aio.Dockerfile` | Production all-in-one image build |
| `docker/aio-entrypoint.sh` | Runtime process startup |
| `docker/aio-nginx.conf.template` | Bundled nginx config template |
| `documentation/` | VitePress documentation project |

## Paths To Back Up

Back up these host-side files and directories:

```text
<install-dir>/data
<install-dir>/.env
<install-dir>/docker-compose.yml
```

Also back up any files referenced by:

- `SECRET_KEY_FILE`
- `MASTER_KEY_FILE`
- `OIDC_CLIENT_SECRET_FILE`

## Paths Not To Edit In A Running Container

Do not manually edit:

- `/usr/share/nginx/html`, because it is generated frontend build output;
- `/tmp/uvicorn.sock`, because it is runtime IPC;
- SQLite files while NetMap is running, unless you are using a SQLite-safe backup method.

## Verify Paths

```bash
docker compose exec netmap sh -c 'ls -lah /app/data && test -w /app/data'
docker compose exec netmap sh -c 'test -f /app/VERSION && cat /app/VERSION'
```

## Related Pages

- [Storage](../configuration/storage.md)
- [Backups](../operations/backups.md)
- [Restores](../operations/restores.md)
- [Docker Compose](../installation/docker-compose.md)
