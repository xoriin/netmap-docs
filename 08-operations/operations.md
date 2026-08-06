---
title: Operations
description: Health checks, logging, backups, restore, upgrades, monitoring, and troubleshooting.
sidebar_position: 9
keywords:
  - operations
  - health
  - backup
  - restore
  - troubleshooting
---

# Operations

## Health Checks

NetMap exposes:

```bash
curl --fail http://127.0.0.1:8080/api/health
curl --fail http://127.0.0.1:8080/api/v1/health
```

Expected response:

```json
{"status":"ok"}
```

The all-in-one Dockerfile healthcheck calls `/api/health` on `127.0.0.1:${APP_PORT}`.

## Logging

In the all-in-one image:

- nginx access logs go to `/dev/stdout`.
- nginx errors go to `/dev/stderr` at `warn`.
- uvicorn log level comes from `LOG_LEVEL`, default `info`.
- Docker Compose examples use the `json-file` driver with size rotation.

View logs:

```bash
docker compose logs --tail=200 netmap
```

Useful searches:

```bash
docker compose logs netmap | grep -i "error"
docker compose logs netmap | grep -i "api key"
docker compose logs netmap | grep -i "firewall"
docker compose logs netmap | grep -i "startup"
```

Documentation gap: source does not define request IDs or structured JSON logging.

## Startup Workers

`backend/app/main.py` starts these services:

- syslog service
- alert monitor
- scheduled discovery
- IP reservation reminder service
- scheduled backup service
- background firewall FTS/retention maintenance

## Backups

Protect all persistent state:

- `/app/data/netmap.db`
- `/app/data/firewall.db`
- WAL/SHM sidecars
- scheduled backup files
- `.env`
- `SECRET_KEY`, `MASTER_KEY`, and secret files

SuperAdmins can download a database backup through `GET /api/v1/exports/backup` and validate/restore backups through `/api/v1/exports/restore/validate` and `/api/v1/exports/restore`.

Filesystem backup:

```bash
cd <install-dir>
docker compose stop
tar -czf "netmap-data-$(date +%Y%m%d-%H%M%S).tar.gz" data .env docker-compose.yml
docker compose up -d
curl --fail http://127.0.0.1:8080/api/health
```

## Restore Procedure

```bash
cd <install-dir>
docker compose down
tar -xzf netmap-data-<timestamp>.tar.gz
docker compose up -d
curl --fail http://127.0.0.1:8080/api/health
```

Then sign in and check Admin diagnostics.

## Upgrades

1. Read `CHANGELOG.md` for the target version.
2. Back up data and secrets.
3. Pull the image.
4. Restart.
5. Verify health.
6. Sign in and check Admin diagnostics, monitoring, syslog status, and critical workflows.

```bash
cd <install-dir>
docker compose pull
docker compose up -d
curl --fail http://127.0.0.1:8080/api/health
```

Rollback requires restoring the previous image and a compatible database backup. Do not assume forward migrations can be reversed.

## Monitoring NetMap Itself

Useful external signals:

- HTTP health endpoint.
- Container restart count.
- Disk free space for `/app/data`.
- Size and growth rate of `firewall.db`.
- Age of last backup.
- Login/API-key `401`, `403`, and `429` rates.
- nginx 5xx rates.
- Presence of worker startup errors in logs.

## Troubleshooting

### Web UI does not load

Symptoms: browser cannot connect or receives gateway errors.

Confirm:

```bash
docker compose ps
docker compose logs --tail=100 netmap
curl --fail http://127.0.0.1:8080/api/health
```

Fix: verify `APP_PORT`, reverse proxy upstream, container health, and logs.

### Login fails with valid credentials

Likely causes: lockout, inactive user, Require SSO for non-SuperAdmin users, wrong password.

Confirm: check Admin users and audit logs from a SuperAdmin account; check container logs for auth errors.

Fix: unlock the user through Admin or `POST /api/v1/auth/users/{user_id}/unlock-login`, reactivate the account, or use the SuperAdmin emergency local login path when SSO is required.

### Active tools fail

Symptoms: ping/traceroute/nmap fail with permission or raw socket errors.

Confirm:

```bash
docker compose logs netmap | grep -i "raw socket\\|cap_net_raw\\|operation not permitted"
```

Fix: run the container with `cap_add: [NET_RAW]`. Do not add `no-new-privileges` to the all-in-one production container when nmap via sudo is required.

### Syslog events do not appear

Confirm:

```bash
docker compose ps
docker compose logs netmap | grep -i syslog
curl --fail http://127.0.0.1:8080/api/v1/syslog/status \
  --header "X-API-Key: <security-view-api-key>"
```

Fix: verify UDP/TCP port reachability, `SYSLOG_ENABLED`, protocol-specific flags, sender allowlist, host firewall, and device forwarding configuration.

### API key returns 429

Likely causes: per-key rate limit or invalid-key source-IP lockout.

Fix: reduce request rate, correct bad secrets, wait for the lockout window, or tune API-key rate-limit settings and restart.
