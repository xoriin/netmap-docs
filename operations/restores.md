---
title: Restores
sidebar_position: 4
keywords: [restore]
---

# Restores

Restore NetMap by restoring the persistent data and the exact secrets used to protect it.

## Before You Restore

Confirm you have:

- `data/`;
- `.env`;
- `docker-compose.yml`;
- any secret files referenced by the environment;
- the original `SECRET_KEY`;
- the original `MASTER_KEY`.

Restoring database files without the matching secrets can break encrypted settings or API-key verification.

## Restore Steps

```bash
cd <install-dir>
docker compose down
tar -xzf netmap-backup-<timestamp>.tar.gz
docker compose up -d
curl --fail http://127.0.0.1:8080/api/health
```

## Verify

After the health check passes:

1. Sign in.
2. Open Inventory and confirm devices are present.
3. Open Topology and confirm graph/layout data.
4. Open IPAM and confirm subnets/reservations.
5. Open Security if syslog history was expected.
6. Check Admin diagnostics.
7. Test one API key or create a new one.

## Common Problems

| Symptom | Cause | Fix |
|---|---|---|
| Container fails startup | data directory not writable | fix host ownership or `PUID`/`PGID` |
| Login/session issues | wrong `SECRET_KEY` | restore the original secret |
| encrypted settings fail | wrong `MASTER_KEY` | restore the original Fernet key |
| missing recent data | incomplete live SQLite copy | restore from stopped-container backup or include WAL sidecars |

## Related Pages

- [Backups](./backups.md)
- [Storage](../configuration/storage.md)
- [Disaster Recovery](./disaster-recovery.md)
