---
title: Upgrading
sidebar_position: 7
keywords: [upgrade, update]
---

# Upgrading

## Before You Upgrade

1. Read `CHANGELOG.md`.
2. Back up `data/`, environment files, and Compose files.
3. Confirm you can restore the backup.

## Upgrade

```bash
cd <install-dir>
docker compose pull
docker compose up -d
curl --fail http://127.0.0.1:8080/api/health
```

## Verify

- Sign in.
- Check Admin diagnostics.
- Check Inventory, Topology, Monitoring, IPAM, and Security if those features are in use.
- Confirm scheduled discovery, alerts, syslog, and backups are running if configured.

Rollback requires a compatible database backup. Do not assume database migrations can be downgraded.
