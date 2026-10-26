---
title: Backup And Restore
sidebar_position: 3
keywords: [backup, restore, nmbak, SQLite, BACKUP_DIR, scheduled backups]
---

# Backup And Restore

This page shows you how to back up NetMap and restore it. A restore needs both the data and the exact secrets that protected it.

## What To Back Up

- `data/`, which holds the main database `netmap.db`, the syslog database `firewall.db`, their WAL and SHM sidecar files, and the default scheduled backup folder
- `.env` and `docker-compose.yml`
- Any secret files referenced by `SECRET_KEY_FILE`, `MASTER_KEY_FILE` or `OIDC_CLIENT_SECRET_FILE`
- Your reverse proxy configuration

Keep the original `SECRET_KEY` and `MASTER_KEY` with your backups. Restoring a database without them can break sign-in, API-key verification and encrypted settings.

## Back Up The Whole Installation

Stop NetMap first so the SQLite sidecar files are consistent:

```bash
cd <install-dir>
docker compose stop
tar -czf "netmap-backup-$(date +%Y%m%d-%H%M%S).tar.gz" data .env docker-compose.yml
docker compose up -d
curl --fail http://127.0.0.1:8080/api/health
```

## Download An Application Backup

Application backups contain only the main database. Use a filesystem backup when you also need `firewall.db`, secrets or other files.

1. Open **Admin → System**. You need `backup_manage`.
2. Under **Download a backup**, select **Download encrypted backup**.
3. Enter and confirm a passphrase of at least 12 characters, then save the `.nmbak` file.

NetMap doesn't store the passphrase, so keep it in a password manager, separate from the backup. A wrong passphrase or a modified file is rejected. **Download unencrypted .db** gives a signed but unencrypted copy for compatibility. The API routes are listed under [Exports And Backups](../api/reference/endpoints.md#exports-and-backups).

## Schedule Backups

Only a SuperAdmin can change the schedule. In **Admin → System → Scheduled Backups**, turn on **Enable scheduled backups**, choose the **Interval**, **Filename prefix**, **Date format** and **Keep last**, then select **Save schedule**.

Scheduled backups are signed but unencrypted, because NetMap holds no passphrase for them. Keep their folder on an encrypted volume with restrictive permissions. A prefix starts with a letter or number, uses only letters, numbers, underscores and hyphens, and is up to 60 characters. UTC time and a unique suffix are added to each filename.

Backups go to `/app/data/backups` unless you set `BACKUP_DIR`. To use another folder, mount it into the container, set `BACKUP_DIR` to its container path, give the NetMap user write access, and recreate the container. Keep the `.netmap-backups.json` manifest with the files so NetMap can list and prune them.

## Restore An Application Backup

Only a SuperAdmin can restore. Restore uploads are limited to 256 MB.

1. Open **Admin → System** and choose the `.nmbak` or `.db` file under **Restore from backup**.
2. For a `.nmbak` file, enter the **Backup passphrase**.
3. Select **Upload backup**. NetMap checks the encryption or signature, the expected tables and SQLite integrity without changing the live database.
4. Review the counts of devices, users and subnets, select **Restore** followed by the file name, then confirm with **Restore database**.

A `.nmbak` file can move between installations, but its encrypted integration settings still need the original `MASTER_KEY`. A signed `.db` file also needs the source installation's signing secret.

## Restore The Whole Installation

```bash
cd <install-dir>
docker compose down
tar -xzf netmap-backup-<timestamp>.tar.gz
docker compose up -d
curl --fail http://127.0.0.1:8080/api/health
```

## Check A Restore

A backup isn't proven until you have restored it somewhere safe. After the health check returns `{"status":"ok"}`, sign in and check that devices, topology, IPAM subnets and reservations, and any expected syslog history are present. Then open the diagnostics in **Admin → System** and test one API key.

| Symptom | Likely cause | Fix |
|---|---|---|
| Container fails to start | Data directory not writable | Fix host ownership or `PUID`/`PGID` |
| Sign-in or session problems | Wrong `SECRET_KEY` | Restore the original secret |
| Encrypted settings fail | Wrong `MASTER_KEY` | Restore the original key |
| `.nmbak` validation fails | Wrong passphrase or modified file | Use the original passphrase and an unmodified file |
| Recent data missing | Incomplete copy of a running database | Restore a stopped-container backup, or include the sidecar files |

## Related Pages

- [Storage](../configuration/storage.md)
- [Secrets Management](../security/secrets-management.md)
- [Disaster Recovery](./disaster-recovery.md)
- [Database Problems](../troubleshooting/database-problems.md)
