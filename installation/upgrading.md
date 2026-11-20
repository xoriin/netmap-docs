---
title: Upgrading
description: Back up a NetMap instance, pull a new image, and verify that it is healthy.
---

# Upgrading

An upgrade replaces the running NetMap image with a newer published release, then starts the container so it can apply any database migrations and serve the new application. Your data stays in the bind-mounted data directory, and your Compose and environment files stay on the host.

Read the release notes first, and take a backup you have confirmed you can restore, before you pull a new image. Migrations run forward when the new image starts. You cannot assume a database can be downgraded, so a compatible backup is the rollback path.

## Before You Start

1. Read the [application changelog](https://github.com/xoriin/netmap/blob/main/CHANGELOG.md) for the version you are moving to.
2. Back up `data/`, environment files, and Compose files. See [Backup And Restore](../operations/backup-and-restore.md).
3. Confirm you can restore that backup.

{% hint style="warning" %}
Do not skip the backup. Rollback requires a compatible database backup. Do not assume database migrations can be downgraded.
{% endhint %}

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

## Next Steps

If the health check fails or the UI does not load, start with [Common Issues](../troubleshooting/common-issues.md) and [Container Problems](../troubleshooting/container-problems.md).
