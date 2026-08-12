---
title: Disaster Recovery
sidebar_position: 7
keywords: [disaster recovery]
---

# Disaster Recovery

Recovery order:

1. Stop the container.
2. Restore `data/`.
3. Restore `.env` and secret files.
4. Restore Compose configuration.
5. Start the container.
6. Verify health.
7. Sign in and check Admin diagnostics.

Without the original secrets, encrypted integration settings and API-key validation may fail.

## Recovery Priorities

1. Preserve the current failed data directory before making changes.
2. Restore the most recent known-good backup.
3. Restore the matching `SECRET_KEY` and `MASTER_KEY`.
4. Bring up the container with the same or compatible image version.
5. Verify health and core workflows.

## Minimum Viable Recovery Test

```bash
curl --fail http://127.0.0.1:8080/api/health
```

Then verify:

- login;
- Inventory;
- Topology;
- Monitoring;
- IPAM;
- Security/syslog, if used;
- API-key authentication.

## Rollback After Failed Upgrade

Use a database backup from before the upgrade. Do not assume that a database migrated by a newer version can be safely used by an older image.

## Related Pages

- [Backups](./backups.md)
- [Restores](./restores.md)
- [Upgrading](../installation/upgrading.md)
