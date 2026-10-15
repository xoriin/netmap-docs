---
title: Backups
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

In **Admin → System**, choose **Download encrypted backup**, enter and confirm a passphrase of at
least 12 characters, and save the resulting `.nmbak` file. The passphrase is not stored by NetMap;
keep it in a password manager separate from the backup.

The encrypted API endpoint is:

```text
POST /api/v1/exports/backup/encrypted
```

with JSON body `{"passphrase":"..."}`. It uses authenticated encryption, so a wrong passphrase or
modified file is rejected. The legacy instance-signed, unencrypted endpoint remains available for
compatibility:

```text
GET /api/v1/exports/backup
```

Both application endpoints back up only the main application database. Include `firewall.db`,
environment/secret files, and other persistent files in a filesystem backup when required.

Scheduled backups are signed but unencrypted because NetMap does not retain an interactive backup
passphrase. Put the data/backup directory on an encrypted host volume or filesystem and restrict its
permissions.

## Retention

Keep enough restore points to recover from:

- accidental deletion;
- failed upgrade;
- database corruption;
- compromised administrator or API key;
- unnoticed syslog volume growth.

Application restore uploads are limited to 256 MB.

## Backup Verification

A backup is not complete until it has been restored in a safe test location. Verify:

- `/api/health` returns `{"status":"ok"}`;
- login works;
- devices and topology load;
- IPAM data is present;
- security/syslog history is present if expected;
- API keys behave as expected.

## Related Pages

- [Storage](../configuration/storage.md)
- [Restores](./restores.md)
- [Disaster Recovery](./disaster-recovery.md)


## Scheduled destination and filenames

From 1.7.0, scheduled backups can be written to an operator-configured `BACKUP_DIR`. Mount the host folder into the
container, pass its absolute container path as `BACKUP_DIR`, and give the NetMap container user write
permission. For example, mount `/srv/netmap-backups:/mnt/backups` and set `BACKUP_DIR=/mnt/backups`.
Recreate the container after changing its environment. The default remains `/app/data/backups`.

**Admin → System → Scheduled backups** shows the effective destination. Filename prefix and date
order can be changed beside the schedule; prefixes start with a letter or number and contain only
letters, numbers, underscores and hyphens, up to 60 characters. UTC time and a unique suffix are
appended automatically. Keep the `.netmap-backups.json` manifest with custom-named files so NetMap can
list and retain them. Existing default-directory backups remain listed after changing the destination.
Scheduled backups contain only the main database.
