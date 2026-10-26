---
title: Ports
sidebar_position: 3
keywords: [ports, firewall, syslog, Docker, reverse proxy, APP_PORT]
---

# Ports

This page lists the network ports NetMap listens on, the setting that controls each one, and when you need to expose it. Port settings are environment variables, so restart NetMap after you change one.

## Summary

| Port | Protocol | Needed when | Purpose | Setting |
|---:|---|---|---|---|
| `8080` | TCP | Always, unless only a reverse proxy reaches NetMap | Web interface, REST API, Swagger UI, OpenAPI schema, health checks | `APP_PORT` |
| `1514` | UDP | You receive UDP syslog | UDP syslog listener | `SYSLOG_UDP_PORT` |
| `1514` | TCP | You receive TCP syslog | TCP syslog listener | `SYSLOG_TCP_PORT` |
| `6514` | TCP | `SYSLOG_TLS_ENABLED=true` with a certificate and key | TLS syslog listener | `SYSLOG_TLS_PORT` |

The all-in-one image exposes `8080/tcp`, `1514/tcp` and `1514/udp`. It doesn't expose `6514`, so publish it yourself if you turn on TLS syslog. Inside the container, the web server reaches the API through a local Unix socket that is never exposed.

## Web And API Port

`APP_PORT` sets the port the all-in-one container's web server listens on. That one port serves:

| Path | Purpose |
|---|---|
| `/` and workspace paths such as `/topology` | The web interface |
| `/api/v1/*` | The versioned REST API |
| `/api/health` and `/api/v1/health` | Health endpoints; see [Health Checks](../operations/health-checks.md) |
| `/api/docs` | Swagger UI |
| `/api/openapi.json` | The OpenAPI schema |

## Syslog Ports

Both syslog listeners default to `1514`, not the privileged port `514`. Binding below `1024` usually needs elevated privileges, so if a sender can only use `514`, forward it to `1514` with a host firewall or NAT rule. Listener settings, the sender allowlist and UDP versus TCP are covered on [Syslog](../configuration/syslog.md).

## Firewall Rules

| Source | Destination | Protocol | Port | Reason |
|---|---|---|---:|---|
| Firewall and router addresses | NetMap host | UDP | `1514` | UDP syslog |
| Firewall and router addresses | NetMap host | TCP | `1514` | TCP syslog |
| User and admin networks | Reverse proxy or NetMap host | TCP | `443` or `8080` | Web interface and API |

`SYSLOG_SENDER_ALLOWLIST` also checks sender addresses inside NetMap. Keep the host firewall rules anyway, because they drop unwanted traffic before it reaches the application.

## Host Networking Or Port Publishing

Use host networking when you need MAC discovery, because ARP needs direct Layer 2 access. With host networking, the container listens on the host directly, so leave out any `ports:` mapping:

```yaml
services:
  netmap:
    image: xoriin/netmap:latest
    network_mode: host
```

Use bridge networking when you don't need Layer 2 discovery and prefer to publish ports explicitly. MAC discovery doesn't cross the Docker bridge.

```yaml
services:
  netmap:
    image: xoriin/netmap:latest
    ports:
      - "8080:8080/tcp"
      - "1514:1514/tcp"
      - "1514:1514/udp"
```

## Behind A Reverse Proxy

A typical HTTPS deployment exposes only `443/tcp`, and the proxy forwards to NetMap on `8080/tcp`. Expose only the proxy to users. The headers the proxy must keep, including `X-API-Key` and the WebSocket upgrade headers, are listed in [Reverse Proxy Problems](../troubleshooting/reverse-proxy-problems.md#required-headers).

## Change A Port

To move the web port, change `APP_PORT` together with the URLs that include it:

```dotenv
APP_PORT=8090
APP_URL=http://localhost:8090
CORS_ORIGINS=["http://localhost:8090"]
```

To move the syslog listeners:

```dotenv
SYSLOG_UDP_PORT=5514
SYSLOG_TCP_PORT=5514
```

Restart NetMap and check the new port answers:

```bash
docker compose up -d
curl --fail http://127.0.0.1:8090/api/health
```

Then update your firewall rules, syslog senders, reverse proxy upstreams and external monitors.

## Related Pages

- [Syslog](../configuration/syslog.md)
- [Reverse Proxy And HTTPS](../installation/reverse-proxy.md)
- [Network Exposure](../security/network-exposure.md)
- [Health Checks](../operations/health-checks.md)
- [Container Problems](../troubleshooting/container-problems.md)
