---
title: Five-Minute Quick Start
sidebar_position: 2
keywords:
  - quick start
  - install
  - Docker Compose
  - first login
verified_version: "1.5.0"
---

# Five-Minute Quick Start

This procedure starts the published NetMap image with Docker Compose and the default bridge network. It is suitable for a first local deployment. For ARP/MAC discovery or Microsoft DHCP checks that need the host's LAN address, switch to host networking after reading [Docker Compose](./docker-compose.md).

## Before you begin

You need:

- Docker Engine and Docker Compose v2;
- a host directory where NetMap can write persistent data; and
- TCP access to the web port from your browser.

Do not expose the initial setup page directly to the public internet. Put NetMap behind an HTTPS reverse proxy or restrict the port with your firewall before inviting users.

## 1. Create the installation directory

```bash
mkdir -p "$PWD/netmap/data"
cd "$PWD/netmap"
```

The `data/` directory will contain `netmap.db`, `firewall.db`, their SQLite sidecars, and application backups. Do not delete it when recreating the container.

## 2. Generate the required secrets

Run these commands on a machine with Python 3:

```bash
python3 -c 'import secrets; print(secrets.token_urlsafe(32))'
python3 -c 'import base64, os; print(base64.urlsafe_b64encode(os.urandom(32)).decode())'
```

The first output is the `SECRET_KEY`. The second is a Fernet-compatible `MASTER_KEY`. Generate each once, copy the values exactly, and keep them in a password manager or secret store. Do not regenerate them during an upgrade.

## 3. Create `.env`

Save this file as `netmap/.env`, replacing both placeholders and changing `PUID`/`PGID` if necessary. Run `id` on the host to see your user and group IDs.

```dotenv
APP_ENV=production
APP_PORT=8080
APP_URL=http://localhost:8080
DATA_DIR=/app/data
DATABASE_URL=sqlite:////app/data/netmap.db

SECRET_KEY=<paste-the-secret-key>
MASTER_KEY=<paste-the-fernet-master-key>

CORS_ORIGINS=["http://localhost:8080"]
TRUSTED_HOSTS=["localhost","127.0.0.1"]
AUTH_COOKIE_SECURE=false
SECURE_HSTS_ENABLED=false

PUID=1000
PGID=1000
LOG_LEVEL=info
```

For an HTTPS deployment, replace the URL/origin/host values and enable the secure cookie and HSTS settings only after TLS is working. See [Reverse Proxy and HTTPS](./reverse-proxy.md).

## 4. Create `docker-compose.yml`

```yaml
services:
  netmap:
    image: xoriin/netmap:latest
    container_name: netmap
    restart: unless-stopped
    env_file:
      - ./.env
    volumes:
      - ./data:/app/data
    ports:
      - "8080:8080"
      - "5514:1514/udp"
      - "5514:1514/tcp"
    tmpfs:
      - /tmp
    cap_drop:
      - ALL
    cap_add:
      - NET_RAW
      - NET_BIND_SERVICE
    logging:
      driver: json-file
      options:
        max-size: 10m
        max-file: "5"
```

The syslog mappings are optional. Remove them if this installation will not receive syslog. Keep `NET_RAW` for ICMP/network tools and `NET_BIND_SERVICE` for low-port operations such as DHCP checks.

## 5. Validate and start

```bash
docker compose config
docker compose up -d
docker compose ps
curl --fail http://127.0.0.1:8080/api/health
```

The health request should return:

```json
{"status":"ok"}
```

If the container is still starting, wait a few seconds and repeat the health request. Check logs with `docker compose logs --tail=200 netmap` if it does not become healthy.

## 6. Complete first-run setup

Open `http://localhost:8080/` and complete the setup form. The first account becomes the initial SuperAdmin. Then:

1. Review Admin → System and confirm the application URL and retention values.
2. Confirm that the data directory is writable and persistent.
3. Add a test device in Inventory and run a safe monitoring check.
4. Configure a backup before adding production data.

## 7. Optional API smoke test

Create an API key from Profile → API keys. Copy it immediately; the plaintext secret is shown only once.

```bash
API_KEY='<paste-the-api-key>'
curl --fail-with-body \
  --url http://localhost:8080/api/v1/auth/me \
  --header "X-API-Key: ${API_KEY}" \
  --header 'Accept: application/json'
```

The response should identify the account that owns the key. See [API Keys](../api/api-keys.md) before using keys in automation.

## Stop, start, and remove

Stop the service without deleting data:

```bash
docker compose stop
```

Start it again:

```bash
docker compose start
```

Remove the container and network while retaining the bind-mounted data:

```bash
docker compose down
```

Do not run `docker compose down -v` for this bind-mounted installation unless you have deliberately reviewed what else the Compose project owns.

## Next steps

- [Docker Compose](./docker-compose.md) for host networking, ports, logging, and source builds;
- [Choose a Data Directory](../configuration/storage.md) for ownership and backup planning;
- [Configure Environment Variables](../configuration/environment-variables.md);
- [Add a Device](../guides/add-device.md); and
- [Verify a New Installation](../operations/health-checks.md).
