---
title: Backups
description: Backup NetMap data and secrets.
sidebar_position: 3
keywords: [backup]
---

# Backups

Backups protect the part of NetMap that cannot be recreated from the Docker image. Treat backups as an operational requirement before upgrades, configuration changes, and restore testing.

## What To Back Up

Back up:

- `data/`
- `.env`
- `docker-compose.yml`
- any secret files referenced by `SECRET_KEY_FILE`, `MASTER_KEY_FILE`, or `OIDC_CLIENT_SECRET_FILE`
- reverse-proxy configuration needed to reach NetMap

The data directory contains both the main app database and firewall/syslog database.

## Filesystem Backup

Stop NetMap before a simple filesystem backup so SQLite WAL sidecars are in a consistent state:

```bash
cd <install-dir>
docker compose stop
tar -czf "netmap-backup-$(date +%Y%m%d-%H%M%S).tar.gz" data .env docker-compose.yml
docker compose up -d
```

Verify:

```bash
curl --fail http://127.0.0.1:8080/api/health
```

## Application Backup

SuperAdmins can use the backup endpoint:

```text
GET /api/v1/exports/backup
```

Use the UI Exports/Admin backup controls where available. This is preferable when you cannot stop the container.

## Retention

Keep enough restore points to recover from:

- accidental deletion;
- failed upgrade;
- database corruption;
- compromised administrator or API key;
- unnoticed syslog volume growth.

## Backup Verification

A backup is not complete until it has been restored in a safe test location. Verify:

- `/api/health` returns `{"status":"ok"}`;
- login works;
- devices and topology load;
- IPAM data is present;
- security/syslog history is present if expected;
- API keys behave as expected.

## Related Pages

- [Storage](../04-configuration/storage.md)
- [Restores](./restores.md)
- [Disaster Recovery](./disaster-recovery.md)
