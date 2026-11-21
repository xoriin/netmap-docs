---
title: Docker Compose
sidebar_position: 3
keywords:
  - Docker Compose
  - deployment
  - host networking
  - syslog
  - source build
---

# Docker Compose

Compose is the recommended way to run NetMap because the service definition keeps the image, persistent data, environment, capabilities, restart policy, and log rotation together. Use [Five-Minute Quick Start](./quick-start.md) for the shortest working deployment; this page explains the choices you make when adapting it.

## Published Image

Use a fixed production tag when you need a reproducible deployment. `latest` is convenient for a first install but changes when a new release is published.

```yaml
services:
  netmap:
    image: xoriin/netmap:latest
```

Keep `/app/data` on a persistent host bind mount. It contains both SQLite databases, WAL/SHM sidecars, application backups, and other state required across container recreation.

## Production-Shaped Service

This is the essential shape of the repository's published-image Compose file. Replace the host data path, secrets, URL, and trusted hosts for your environment.

```yaml
services:
  netmap:
    image: xoriin/netmap:latest
    container_name: netmap
    restart: unless-stopped
    environment:
      APP_ENV: production
      APP_PORT: 8080
      DATA_DIR: /app/data
      DATABASE_URL: sqlite:////app/data/netmap.db
      PUID: 1000
      PGID: 1000
      APP_URL: http://netmap.example.com:8080
      SECRET_KEY: replace-before-start
      MASTER_KEY: replace-before-start
      TRUSTED_HOSTS: '["netmap.example.com"]'
      AUTH_COOKIE_SECURE: "false"
      SECURE_HSTS_ENABLED: "false"
      TRUSTED_PROXY_IPS: '["127.0.0.1"]'
      SYSLOG_ENABLED: "true"
      SYSLOG_UDP_ENABLED: "true"
      SYSLOG_TCP_ENABLED: "true"
      SYSLOG_HOST: 0.0.0.0
      SYSLOG_UDP_PORT: 1514
      SYSLOG_TCP_PORT: 1514
    volumes:
      - ./data:/app/data
    ports:
      - "8080:8080"
      - "5514:1514/udp"
      - "5514:1514/tcp"
    logging:
      driver: json-file
      options:
        max-size: 10m
        max-file: "5"
```

Prefer `env_file: ./.env` instead of placing secrets directly in the Compose YAML. Do not commit `.env` or a file containing either master secret.

## Bridge Networking Or Host Networking

The published Compose file uses Docker bridge networking with explicit port mappings. It is the least surprising choice when you want container isolation and only need routed network access.

Use host networking when NetMap must see the host's Layer-2 network for ARP/MAC discovery, or when a DHCP server rejects the container bridge address in the `ciaddr` field. Replace `ports:` with:

```yaml
network_mode: host
```

Host networking means the container binds directly to the host. The host ports must be free, and the `ports:` section must be removed because Docker does not publish ports for a host-networked container. See [How NetMap Works](../product-introduction/architecture.md#network-access-and-capabilities) for the security and capability implications.

## Capabilities And nmap

The service uses Docker's default capabilities, which include the two the network tools need:

- `NET_RAW` for ICMP and other raw-packet operations;
- `NET_BIND_SERVICE` for low-port binds used by network tooling and DHCP replies.

Do not add `cap_drop: ALL` with only those two. NetMap also uses other default capabilities at startup to prepare `/app/data` and switch to the `PUID`/`PGID` user, and without them the container exits with `mkdir /tmp/nginx/client_body: Permission denied`.

Do not add `no-new-privileges` when using discovery. The image grants the `netmap` user narrowly scoped passwordless sudo access to `/usr/bin/nmap`; blocking that transition prevents privileged nmap discovery. Avoid adding broad capabilities or running the container as root as a workaround.

## Syslog Mappings

Keep the UDP and TCP mappings only for protocols you intend to receive. NetMap's default container listener is port `1514`, not the privileged traditional port `514`.

```yaml
ports:
  - "5514:1514/udp"
  - "5514:1514/tcp"
```

Configure devices to send to the host's published port, or use a host firewall/NAT rule to translate port 514 to 1514. Restrict senders with `SYSLOG_SENDER_ALLOWLIST` when the deployment receives traffic from a known set of devices. See [Syslog configuration](../configuration/syslog.md).

## Read-Only Root And Temporary Storage

The published Compose files keep the container root writable. Do not set `read_only: true`: startup writes to the container filesystem, and the container exits. Keep `/app/data` writable as well; it holds SQLite and application state.

If a hardened environment changes these settings, verify startup, health checks, database writes, discovery, and exports before deploying it broadly.

## Validate And Operate The Service

Before starting or changing a Compose file:

```bash
docker compose config
docker compose up -d
docker compose ps
curl --fail http://127.0.0.1:8080/api/health
```

Useful lifecycle commands:

```bash
docker compose logs --tail=200 netmap
docker compose restart netmap
docker compose stop netmap
docker compose start netmap
docker compose down
```

`docker compose down` removes the container and network but leaves a bind-mounted `./data` directory in place. Back up the data directory and environment file before changing secrets, storage paths, or image versions.

## Build From Source

The repository's `docker-compose.build.yml` is for maintainers and local validation. It builds `docker/aio.Dockerfile` instead of pulling Docker Hub:

```bash
cp .env.example .env
docker compose -f docker-compose.build.yml config
docker compose -f docker-compose.build.yml up --build -d
curl --fail http://127.0.0.1:8080/api/health
```

Run these commands from the repository root. The source-build file mounts `./data`, drops all capabilities before adding the two required capabilities, uses a read-only root, and defaults trusted hosts and CORS for local access. It is not the end-user installation file; use the published-image Compose file for a normal production deployment.

## Related Pages

- [Installation Overview](./installation.md)
- [Five-Minute Quick Start](./quick-start.md)
- [Ports](../reference/ports.md)
- [Configuration Reference](../configuration/configuration.md)
- [Storage](../configuration/storage.md)
- [Reverse Proxy and HTTPS](./reverse-proxy.md)
- [Upgrading](./upgrading.md)
- [Installation Problems](../troubleshooting/installation-problems.md)
