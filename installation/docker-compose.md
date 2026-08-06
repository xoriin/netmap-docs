---
title: Docker Compose
description: Recommended Docker Compose deployment for NetMap.
sidebar_position: 2
keywords: [Docker Compose, deployment]
---

# Docker Compose

The repository's all-in-one deployment uses one service with persistent `/app/data`, `APP_ENV=production`, stable secrets, and `NET_RAW` when active network tools are required.

Use [Quick Start](./quick-start.md) for a copy-paste baseline. For production behind HTTPS, set:

```dotenv
APP_URL=https://netmap.example.com
CORS_ORIGINS=["https://netmap.example.com"]
TRUSTED_HOSTS=["netmap.example.com"]
AUTH_COOKIE_SECURE=true
SECURE_HSTS_ENABLED=true
```

Do not enable `no-new-privileges` if nmap discovery through sudo is required. The Dockerfile installs `sudo` and grants the `netmap` user passwordless access to `/usr/bin/nmap`.

## Minimal Production Shape

```yaml
services:
  netmap:
    image: xoriin/netmap:latest
    restart: unless-stopped
    env_file:
      - ./.env
    environment:
      APP_ENV: production
      APP_PORT: "8080"
      DATA_DIR: /app/data
      DATABASE_URL: sqlite:////app/data/netmap.db
      PUID: "1000"
      PGID: "1000"
    network_mode: host
    volumes:
      - ./data:/app/data
    tmpfs:
      - /tmp
    cap_add:
      - NET_RAW
```

## Verify Compose

```bash
docker compose config
docker compose up -d
docker compose ps
curl --fail http://127.0.0.1:8080/api/health
```

## Common Adjustments

- Change `APP_PORT` if another service already uses `8080`.
- Use `network_mode: host` for MAC discovery.
- Use bridge `ports:` mappings if host networking is not acceptable.
- Set Docker log rotation to avoid unbounded log growth.

## Related Pages

- [Quick Start](./quick-start.md)
- [Ports](../reference/ports.md)
- [Storage](../configuration/storage.md)
