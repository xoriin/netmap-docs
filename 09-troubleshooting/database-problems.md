---
title: Database Problems
description: Troubleshoot SQLite database issues.
sidebar_position: 6
keywords: [SQLite, database]
---

# Database Problems

NetMap uses `netmap.db` and `firewall.db`.

Startup validates `DATA_DIR` exists and is writable. Firewall database corruption has specific recovery paths in `firewall_session.py`.

Before any manual database action, create a backup.

## Symptoms

- Container exits during startup.
- UI loads but inventory or topology data is missing.
- Security/syslog search fails or returns no data.
- Logs mention malformed SQLite schema, database disk image errors, locked database, or permission denied.
- Admin diagnostics show unexpected database sizes.

## Confirm The Data Directory

```bash
docker compose exec netmap sh -c 'ls -lah /app/data && test -w /app/data'
```

If this fails, the container user cannot write to the mounted volume.

## Confirm Container Logs

```bash
docker compose logs --tail=200 netmap
```

Search for database messages:

```bash
docker compose logs netmap | grep -Ei "sqlite|database|malformed|locked|permission"
```

## Main Database Versus Firewall Database

`netmap.db` stores core application state. Problems here can affect login, inventory, topology, monitoring, IPAM, settings, roles, and API keys.

`firewall.db` stores firewall/syslog events. Problems here should primarily affect Security/syslog features. The source includes recovery handling for certain firewall DB and FTS corruption cases.

## Common Fixes

| Cause | Fix |
|---|---|
| `/app/data` not writable | Fix host ownership or set correct `PUID`/`PGID`. |
| Live backup copied without WAL sidecars | Restore from a stopped-container backup or include `.db-wal` and `.db-shm`. |
| Disk full | Free host disk space, then restart. |
| Firewall FTS corruption | Restart and review logs; FTS rebuild handling exists for shadow-table corruption. |
| Main database corruption | Restore from backup. |

## Verify Recovery

```bash
curl --fail http://127.0.0.1:8080/api/health
```

Then sign in and check the affected workspace.

## Related Pages

- [Storage](../04-configuration/storage.md)
- [Backups](../08-operations/backups.md)
- [Restores](../08-operations/restores.md)
