---
title: Docker CLI
sidebar_position: 4
keywords: [Docker, docker run, container, deployment]
---

# Docker CLI

Docker Compose is easier to maintain, but `docker run` is useful for a quick test or an environment that already manages containers outside Compose. This page keeps the direct-container path distinct from [Docker Compose](./docker-compose.md).

## Prepare The Host

```bash
INSTALL_DIR=/srv/netmap
sudo mkdir -p "$INSTALL_DIR/data"
sudo chown -R "$(id -u):$(id -g)" "$INSTALL_DIR"
```

Create `$INSTALL_DIR/netmap.env` using the secret-generation procedure in the [Five-Minute Quick Start](./quick-start.md#_2-generate-the-required-secrets):

```dotenv
APP_ENV=production
APP_PORT=8080
APP_URL=http://localhost:8080
DATA_DIR=/app/data
DATABASE_URL=sqlite:////app/data/netmap.db
SECRET_KEY=<secret-key>
MASTER_KEY=<fernet-master-key>
CORS_ORIGINS=["http://localhost:8080"]
TRUSTED_HOSTS=["localhost","127.0.0.1"]
AUTH_COOKIE_SECURE=false
SECURE_HSTS_ENABLED=false
PUID=1000
PGID=1000
```

Protect this file because it contains both master secrets:

```bash
chmod 600 "$INSTALL_DIR/netmap.env"
```

## Start With Bridge Networking

This variant publishes the web and syslog ports explicitly:

```bash
docker run -d --name netmap --restart unless-stopped --env-file "$INSTALL_DIR/netmap.env" --volume "$INSTALL_DIR/data:/app/data" --publish 8080:8080 --publish 5514:1514/udp --publish 5514:1514/tcp --log-driver json-file --log-opt max-size=10m --log-opt max-file=5 xoriin/netmap:latest
```

Remove the syslog publish options if this installation will not receive syslog. Use a fixed image tag instead of `latest` when reproducible upgrades are required.

## Start With Host Networking

Use host networking when NetMap needs Layer-2 access for ARP/MAC discovery or must use the host's LAN address for DHCP checks. Replace the bridge command's publish options with `--network host`:

```bash
docker run -d --name netmap --restart unless-stopped --network host --env-file "$INSTALL_DIR/netmap.env" --volume "$INSTALL_DIR/data:/app/data" --log-driver json-file --log-opt max-size=10m --log-opt max-file=5 xoriin/netmap:latest
```

Do not combine `--network host` with `--publish`; Docker does not publish ports for a host-networked container. Ensure ports 8080 and 1514 are free on the host.

## Verify And Inspect

```bash
docker ps --filter name=netmap
curl --fail http://127.0.0.1:8080/api/health
docker logs --tail=200 netmap
```

The health request should return `{"status":"ok"}`. Open `http://localhost:8080/` to complete first-run setup. If it fails, inspect logs for invalid secrets, an unwritable data directory, port conflicts, or migration errors.

## Lifecycle And Updates

```bash
docker stop netmap
docker start netmap
docker restart netmap
docker logs -f netmap
```

Remove the container while retaining the bind-mounted data:

```bash
docker rm -f netmap
```

To update, back up the data directory and environment file, pull the image, remove the old container, and rerun the same command with the same volume and secret values:

```bash
docker pull xoriin/netmap:latest
docker rm -f netmap
# Re-run the bridge or host-network command above.
```

Keep `SECRET_KEY`, `MASTER_KEY`, and `/app/data` unchanged. Startup applies registered database migrations. See [Upgrading](./upgrading.md) for release and rollback guidance.

## Related Pages

- [Installation Overview](./installation.md)
- [Five-Minute Quick Start](./quick-start.md)
- [Docker Compose](./docker-compose.md)
- [Ports](../reference/ports.md)
- [Storage](../configuration/storage.md)
- [How NetMap Works](../product-introduction/architecture.md#network-access-and-capabilities)
- [Container Problems](../troubleshooting/container-problems.md)
