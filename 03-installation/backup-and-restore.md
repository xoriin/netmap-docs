---
title: Backup And Restore
description: Protect and restore NetMap persistent data.
sidebar_position: 8
keywords: [backup, restore, SQLite]
---

# Backup And Restore

Protect:

- `/app/data/netmap.db`
- `/app/data/firewall.db`
- WAL/SHM sidecars
- scheduled backup files
- `.env`
- secret files referenced by `SECRET_KEY_FILE`, `MASTER_KEY_FILE`, or `OIDC_CLIENT_SECRET_FILE`

Filesystem backup:

```bash
cd <install-dir>
docker compose stop
tar -czf "netmap-backup-$(date +%Y%m%d-%H%M%S).tar.gz" data .env docker-compose.yml
docker compose up -d
```

Restore:

```bash
cd <install-dir>
docker compose down
tar -xzf netmap-backup-<timestamp>.tar.gz
docker compose up -d
curl --fail http://127.0.0.1:8080/api/health
```

SuperAdmins can also use the backup and restore API endpoints under `/api/v1/exports`.
