---
title: Container Problems
description: Troubleshoot Docker runtime issues.
sidebar_position: 8
keywords: [Docker, container]
---

# Container Problems

Container problems include failed startup, unhealthy status, missing capabilities, bad volume permissions, and incorrect network mode.

## Inspect Runtime State

Check:

```bash
docker compose ps
docker compose logs --tail=200 netmap
docker inspect --format '{{json .State.Health}}' <container-name>
```

Active network tools require `NET_RAW`. MAC discovery requires host networking.

## Common Causes

| Symptom | Likely cause | Fix |
|---|---|---|
| container exits immediately | missing `SECRET_KEY` or `MASTER_KEY` in production | set real secrets |
| healthcheck fails | app did not bind web port or startup failed | read logs and verify `APP_PORT` |
| permission denied on `/app/data` | host directory ownership mismatch | set `PUID`/`PGID` or fix ownership |
| ping/traceroute fail | missing `NET_RAW` | add `cap_add: [NET_RAW]` |
| MAC discovery missing | bridge networking | use `network_mode: host` |
| syslog not reachable | port not published or host firewall blocked | publish/open TCP/UDP port |

## Verify After Fixing

```bash
docker compose up -d
docker compose ps
curl --fail http://127.0.0.1:8080/api/health
```

## Related Pages

- [Docker Compose](../installation/docker-compose.md)
- [Ports](../reference/ports.md)
- [Storage](../configuration/storage.md)
