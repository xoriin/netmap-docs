---
title: Installation
description: Install NetMap with Docker Compose and verify the service.
sidebar_position: 3
keywords:
  - install
  - Docker
  - Compose
  - upgrade
  - backup
---

# Installation

This page documents the Docker-based installation methods present in the repository. Native installation is a developer workflow, not a supported production deployment in the current source.

## Requirements

- Docker Engine with Compose support.
- A persistent host directory for `/app/data`.
- A stable `SECRET_KEY` and `MASTER_KEY`.
- `NET_RAW` capability when ICMP ping and active network tools are needed.
- Host networking when MAC discovery through ARP is required.

## Recommended Docker Compose Deployment

Create an application directory:

```bash
mkdir -p <install-dir>/data
cd <install-dir>
```

Generate secrets:

```bash
python3 -c "import secrets; print(secrets.token_urlsafe(32))"
python3 -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"
```

Create `.env`:

```dotenv
SECRET_KEY=<secret-key>
MASTER_KEY=<fernet-master-key>
APP_URL=https://netmap.example.com
CORS_ORIGINS=["https://netmap.example.com"]
TRUSTED_HOSTS=["netmap.example.com"]
AUTH_COOKIE_SECURE=true
SECURE_HSTS_ENABLED=true
LOG_LEVEL=info
EVENT_RETENTION_DAYS=7
FIREWALL_LOG_RETENTION_DAYS=7
SYSLOG_ENABLED=true
SYSLOG_UDP_ENABLED=true
SYSLOG_TCP_ENABLED=true
SYSLOG_UDP_PORT=1514
SYSLOG_TCP_PORT=1514
```

Create `docker-compose.yml`:

```yaml
services:
  netmap:
    image: xoriin/netmap:latest
    restart: unless-stopped
    env_file:
      - ./.env
    environment:
      PUID: "1000"
      PGID: "1000"
      APP_ENV: production
      DATA_DIR: /app/data
      DATABASE_URL: sqlite:////app/data/netmap.db
      APP_PORT: "8080"
    network_mode: host
    volumes:
      - ./data:/app/data
    tmpfs:
      - /tmp
    cap_add:
      - NET_RAW
    logging:
      driver: json-file
      options:
        max-size: 10m
        max-file: "5"
```

Start NetMap:

```bash
docker compose up -d
```

Verify the container and health endpoint:

```bash
docker compose ps
curl --fail http://127.0.0.1:8080/api/health
```

Expected result:

```json
{"status":"ok"}
```

Open `http://<host>:8080/` or your reverse-proxy URL.

## Initial Setup

1. Open the web interface.
2. If no users exist, complete the setup screen to create the first SuperAdmin.
3. Sign in with that account.
4. Open Admin and review system settings, roles, notification profiles, SSO, and diagnostics.
5. Open Profile and create an API key if you need automation.

Verify the API after creating an API key:

```bash
API_URL="https://netmap.example.com"
API_KEY="<api-key>"

curl --fail-with-body \
  --request GET \
  --url "${API_URL}/api/v1/auth/me" \
  --header "X-API-Key: ${API_KEY}" \
  --header "Accept: application/json"
```

Expected result: a JSON object for the user that owns the API key.

## Development Compose

The live repository contains `docker-compose.build.yml` for maintainers who need to build the all-in-one image from source. End users should normally use `docker-compose.yml`, which pulls the published image.

```bash
cp .env.example .env
docker compose -f docker-compose.build.yml up --build -d
```

Validate the local source-built service:

```bash
curl --fail http://127.0.0.1:8080/api/health
```

## Updating

Back up `<install-dir>/data` and `.env` first:

```bash
cd <install-dir>
tar -czf "netmap-backup-$(date +%Y%m%d-%H%M%S).tar.gz" data .env docker-compose.yml
```

Pull and restart:

```bash
docker compose pull
docker compose up -d
curl --fail http://127.0.0.1:8080/api/health
```

Database tables are created and migrated by startup code in `backend/app/db/session.py`.

## Backup

Protect:

- `data/netmap.db`
- `data/firewall.db`
- SQLite WAL/SHM sidecars
- `.env` or any environment file used by Compose
- `SECRET_KEY`, `MASTER_KEY`, and any `*_FILE` secret files
- Scheduled backup files if you use the built-in backup feature

For a filesystem backup, stop the container first or use the app backup endpoint/UI to avoid copying a moving SQLite WAL set.

## Restore

1. Stop NetMap.
2. Restore `data/`, `.env`, and Compose configuration.
3. Keep the same `SECRET_KEY` and `MASTER_KEY`; encrypted settings and API-key HMAC validation depend on stable secrets.
4. Start NetMap.
5. Verify `/api/health`, sign in, and check Admin diagnostics.

## Uninstall

```bash
cd <install-dir>
docker compose down
```

Remove the data directory only after confirming backups:

```bash
rm -rf <install-dir>
```

This deletes application state.
