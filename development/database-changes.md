---
title: Database Changes
sidebar_position: 6
keywords: [database, migration]
---

# Database Changes

Add SQLAlchemy models under `backend/app/models/` and keep startup/migration behavior aligned with existing DB initialization code.

Update backup and restore documentation if new persistent files are introduced.

## Main And Firewall Databases

NetMap intentionally separates persistent state:

- `netmap.db` for normal application data;
- `firewall.db` for firewall/syslog events.

Choose the database based on write pattern and ownership. High-volume syslog data belongs in the firewall database. Normal application state belongs in the main database.

## Change Checklist

1. Add or update the SQLAlchemy model.
2. Ensure model imports are included where startup initialization expects them.
3. Add migration/startup upgrade logic consistent with the existing project.
4. Add or update Pydantic schemas.
5. Update API route handling.
6. Add tests for fresh databases and upgraded databases.
7. Update backup/restore documentation if persistent state changes.
8. Update API reference documentation if fields are exposed.

## Testing Guidance

Run:

```bash
cd <repo-root>/backend
env UV_CACHE_DIR=/tmp/uv-cache uv run --extra dev pytest tests
```

For targeted schema changes, add focused tests near the affected feature area.

## Related Pages

- [Database Migrations](../operations/database-migrations.md)
- [Storage](../configuration/storage.md)
- [Backend Development](./backend-development.md)
