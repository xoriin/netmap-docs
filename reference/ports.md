---
title: Ports
sidebar_position: 3
keywords: [ports, firewall, syslog, Docker, reverse proxy]
---

# Ports

This page lists the network ports NetMap uses and explains when each port needs to be exposed. It is written for Docker Compose operators, firewall administrators, and reverse-proxy maintainers.

## Summary

| Port | Protocol | Direction | Required | Purpose | Setting |
|---:|---|---|---:|---|---|
| `8080` | TCP | inbound to NetMap | Yes for direct access | Web UI, REST API, Swagger UI, OpenAPI JSON, health endpoint | `APP_PORT` |
| `1514` | UDP | inbound to NetMap | Only if receiving UDP syslog | UDP syslog listener | `SYSLOG_UDP_PORT` |
| `1514` | TCP | inbound to NetMap | Only if receiving TCP syslog | TCP syslog listener | `SYSLOG_TCP_PORT` |
| `6514` | TCP | inbound to NetMap | Only if TLS syslog is enabled and verified | TLS syslog setting | `SYSLOG_TLS_PORT` |
| Unix socket | local container only | internal | Yes | nginx to uvicorn FastAPI connection | `/tmp/uvicorn.sock` |

## Web UI And REST API

The all-in-one image serves both the web interface and the API through nginx. By default nginx listens on `APP_PORT=8080`.

Paths served on the web/API port include:

| Path | Purpose |
|---|---|
| `/` | React single-page application |
| `/overview`, `/topology`, and other workspace paths | React routes served by the SPA fallback |
| `/api/health` | container health endpoint |
| `/api/v1/health` | API health endpoint |
| `/api/v1/*` | versioned REST API |
| `/api/docs` | Swagger UI |
| `/api/openapi.json` | generated OpenAPI schema |

When NetMap is behind a reverse proxy, expose only the reverse proxy to users and have the proxy forward to the NetMap web port.

## Syslog Ports

NetMap can receive syslog over UDP and TCP. The default for both is `1514`, not privileged port `514`.

Use `1514` unless you have a specific reason to receive on `514`. Binding to `514` usually requires elevated privileges or host-level port forwarding because it is below `1024`.

Example firewall intent:

| Source | Destination | Protocol | Port | Reason |
|---|---|---|---:|---|
| firewall/router IPs | NetMap host | UDP | `1514` | UDP syslog forwarding |
| firewall/router IPs | NetMap host | TCP | `1514` | TCP syslog forwarding |
| user/admin networks | reverse proxy or NetMap host | TCP | `443` or `8080` | Web UI and API |

If `SYSLOG_SENDER_ALLOWLIST` is configured, NetMap also checks sender IPs at the application layer. Host firewall rules are still recommended because they reject unwanted traffic before it reaches the application.

## Docker Compose With Host Networking

Host networking is recommended when MAC discovery is needed because ARP-based discovery requires direct Layer 2 access.

With host networking, do not use a `ports:` mapping. The container listens directly on the host network:

```yaml
services:
  netmap:
    image: xoriin/netmap:latest
    network_mode: host
    environment:
      APP_PORT: "8080"
      SYSLOG_UDP_PORT: "1514"
      SYSLOG_TCP_PORT: "1514"
```

Verify:

```bash
curl --fail http://127.0.0.1:8080/api/health
```

## Docker Compose With Bridge Networking

Bridge networking can be used for the web UI and API, but MAC discovery through ARP will not cross the Docker bridge.

Example mappings:

```yaml
services:
  netmap:
    image: xoriin/netmap:latest
    ports:
      - "8080:8080/tcp"
      - "1514:1514/tcp"
      - "1514:1514/udp"
```

Use bridge networking when you do not need Layer 2 discovery and prefer explicit port publishing.

## Reverse Proxy Ports

A typical HTTPS deployment exposes only `443/tcp` publicly. The reverse proxy forwards to NetMap on `8080/tcp`.

The proxy must preserve:

- `Host`
- `X-Forwarded-For`
- `X-Forwarded-Proto`
- `Upgrade`
- `Connection`
- `X-API-Key`

The `X-API-Key` header matters for automation. If the proxy strips it, API-key clients will receive authentication failures even when the key is valid.

## Changing Ports

Change the web port:

```dotenv
APP_PORT=8090
APP_URL=https://netmap.example.com
CORS_ORIGINS=["https://netmap.example.com"]
```

Change syslog ports:

```dotenv
SYSLOG_UDP_PORT=5514
SYSLOG_TCP_PORT=5514
```

Restart after changes:

```bash
docker compose up -d
curl --fail http://127.0.0.1:8090/api/health
```

Update firewalls, router/syslog forwarders, reverse proxy upstreams, and external monitors whenever ports change.

## Troubleshooting

### Web port does not respond

Confirm the container is running:

```bash
docker compose ps
docker compose logs --tail=100 netmap
```

Confirm the health endpoint:

```bash
curl --fail http://127.0.0.1:8080/api/health
```

If `APP_PORT` was changed, use the configured port.

### Syslog events do not arrive

Check whether the sender can reach the host and whether the protocol matches NetMap's enabled listener:

```bash
docker compose logs netmap | grep -i syslog
```

Then verify:

- `SYSLOG_ENABLED=true`
- `SYSLOG_UDP_ENABLED=true` for UDP forwarding
- `SYSLOG_TCP_ENABLED=true` for TCP forwarding
- sender IP is allowed by `SYSLOG_SENDER_ALLOWLIST`, if configured
- host firewall allows the chosen port/protocol

### API keys fail through the proxy

If direct requests work but proxied requests fail, confirm the proxy forwards `X-API-Key`.

```bash
API_URL="https://netmap.example.com"
API_KEY="<api-key>"

curl --fail-with-body \
  --url "${API_URL}/api/v1/auth/me" \
  --header "X-API-Key: ${API_KEY}"
```

Expected result: current user JSON. A `401` through the proxy with success directly against NetMap usually indicates a proxy/header issue.

## Related Pages

- [Configuration Ports](../configuration/ports.md)
- [Reverse Proxy And HTTPS](../installation/reverse-proxy.md)
- [Syslog](../configuration/syslog.md)
- [Health Checks](../operations/health-checks.md)
