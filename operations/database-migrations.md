---
title: Database Migrations
sidebar_position: 5
keywords: [database, migrations]
---

# Database Migrations

NetMap uses SQLite with startup initialization and migration code in `backend/app/db/session.py` and `backend/app/db/firewall_session.py`.

Do not manually edit SQLite files unless restoring from backup or following maintainer instructions.

Documentation gap: this page needs a maintained list of every migration identifier and schema change.

## Databases

| Database | Purpose |
|---|---|
| `netmap.db` | Main application state |
| `firewall.db` | Firewall/syslog event state |

Both databases use WAL mode and a `busy_timeout`.

## Operator Guidance

Before upgrading:

1. Back up `data/`.
2. Back up secrets.
3. Pull the new image.
4. Start NetMap.
5. Watch logs during startup.
6. Verify `/api/health`.

```bash
docker compose logs --tail=200 netmap
curl --fail http://127.0.0.1:8080/api/health
```

## Developer Guidance

When adding persistent fields or tables:

- add/update SQLAlchemy models;
- add startup migration logic consistent with existing code;
- add tests for existing database upgrade behavior;
- update API schemas and documentation;
- update backup/restore docs if persistent files change.

## Troubleshooting

If startup fails after an upgrade, stop and preserve the current `data/` directory before attempting fixes. Do not delete database files unless the maintainer explicitly confirms that is the intended recovery path.

Related pages:

- [Storage](../configuration/storage.md)
- [Backups](./backups.md)
- [Database Problems](../troubleshooting/database-problems.md)
