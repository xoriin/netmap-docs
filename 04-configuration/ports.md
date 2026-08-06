---
title: Ports
description: Configure NetMap network ports for web, API, syslog, Docker, and reverse proxy deployments.
sidebar_position: 3
keywords: [ports, syslog, http]
---

# Ports

NetMap uses one web/API port and optional syslog listener ports. The values are configured through environment variables and require a restart after changes.

| Port | Protocol | Purpose | Config |
|---:|---|---|---|
| `8080` | TCP | all-in-one web UI/API default | `APP_PORT` |
| `1514` | UDP | syslog UDP default | `SYSLOG_UDP_PORT` |
| `1514` | TCP | syslog TCP default | `SYSLOG_TCP_PORT` |
| `6514` | TCP | syslog TLS setting | `SYSLOG_TLS_PORT` |

The all-in-one container exposes `8080`, `1514/tcp`, and `1514/udp` in the Dockerfile.

## Web/API Port

`APP_PORT` controls the nginx listener inside the all-in-one container. It serves:

- the React web interface;
- `/api/v1/*` REST endpoints;
- `/api/health`;
- `/api/docs`;
- `/api/openapi.json`.

Example:

```dotenv
APP_PORT=8090
APP_URL=http://localhost:8090
CORS_ORIGINS=["http://localhost:8090"]
```

Verify:

```bash
curl --fail http://127.0.0.1:8090/api/health
```

## Syslog Ports

By default, NetMap receives syslog on `1514/udp` and `1514/tcp`. These are non-privileged alternatives to the traditional syslog port `514`.

Example:

```dotenv
SYSLOG_ENABLED=true
SYSLOG_UDP_ENABLED=true
SYSLOG_TCP_ENABLED=true
SYSLOG_UDP_PORT=1514
SYSLOG_TCP_PORT=1514
```

If a firewall or router can only send to `514`, prefer host firewall/NAT forwarding to NetMap's non-privileged port unless you have verified the container can bind privileged ports in your environment.

## Host Networking Versus Port Publishing

Host networking:

```yaml
network_mode: host
```

Use this when you need MAC discovery through ARP. Do not add `ports:` mappings when using host networking.

Bridge networking:

```yaml
ports:
  - "8080:8080/tcp"
  - "1514:1514/tcp"
  - "1514:1514/udp"
```

Use this when explicit Docker port publishing is preferred and Layer 2 discovery is not required.

## Reverse Proxy Deployment

For HTTPS deployments, expose `443/tcp` on the proxy and forward to NetMap's web/API port.

The reverse proxy must forward `X-API-Key` for automation and WebSocket upgrade headers for live features.

## Related

- [Reference Ports](../12-reference/ports.md)
- [Reverse Proxy And HTTPS](../03-installation/reverse-proxy.md)
- [Syslog](./syslog.md)
