---
title: Monitoring NetMap
description: Signals to monitor for the NetMap service itself.
sidebar_position: 6
keywords: [operations, monitoring]
---

# Monitoring NetMap

Monitor:

- `/api/health`
- container restarts
- disk usage for `/app/data`
- database file size
- backup freshness
- syslog ingest status
- worker startup errors
- HTTP 5xx rate
- auth `401`, `403`, and `429` spikes

## HTTP Health

Use:

```text
https://netmap.example.com/api/health
```

Expected:

```json
{"status":"ok"}
```

## Disk Usage

The most important host path is the mounted data directory. Watch disk usage because `firewall.db` can grow quickly on noisy networks.

```bash
du -h -d 1 <install-dir>/data
df -h <install-dir>
```

## Log Signals

Watch logs for:

- startup failures;
- database errors;
- syslog listener errors;
- backup failures;
- OIDC provider errors;
- repeated API-key failures;
- tool capability errors.

## Related Pages

- [Health Checks](./health-checks.md)
- [Logging](./logging.md)
- [Syslog](../configuration/syslog.md)
- [Storage](../configuration/storage.md)
