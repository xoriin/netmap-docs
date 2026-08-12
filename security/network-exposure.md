---
title: Network Exposure
sidebar_position: 5
keywords: [network exposure, TLS, syslog]
---

# Network Exposure

Use HTTPS for browser and API access. Restrict `CORS_ORIGINS` and `TRUSTED_HOSTS`.

Syslog listeners accept network traffic on configured ports. Use `SYSLOG_SENDER_ALLOWLIST` where practical and restrict host firewall rules.

Active tools can generate network traffic. Public active targets are disabled by default unless `ACTIVE_NETWORK_PUBLIC_TARGETS_ENABLED=true` or equivalent system setting allows them.

## Web And API Exposure

Expose NetMap through HTTPS for normal use. A typical deployment exposes only the reverse proxy on `443/tcp`, with the proxy forwarding to NetMap's internal web/API port.

Set:

```dotenv
APP_URL=https://netmap.example.com
CORS_ORIGINS=["https://netmap.example.com"]
TRUSTED_HOSTS=["netmap.example.com"]
AUTH_COOKIE_SECURE=true
SECURE_HSTS_ENABLED=true
```

## Header Requirements

Reverse proxies must preserve:

- `Host`;
- `X-Forwarded-For`;
- `X-Forwarded-Proto`;
- `Upgrade`;
- `Connection`;
- `X-API-Key`.

`X-API-Key` is required for automation. WebSocket upgrade headers are required for live features.

## Syslog Exposure

Syslog ports should usually be reachable only from known network devices. Use both host firewall rules and `SYSLOG_SENDER_ALLOWLIST`.

Example allowlist:

```dotenv
SYSLOG_SENDER_ALLOWLIST=["192.168.1.1","10.0.0.0/8"]
```

## Active Network Tools

Active tools include ping, traceroute, port checks, nmap discovery, SNMP probing, and LLDP scanning. They should be available only to roles that need them.

Keep public targets disabled unless your deployment has a clear operational reason:

```dotenv
ACTIVE_NETWORK_PUBLIC_TARGETS_ENABLED=false
```

## Related Pages

- [Reverse Proxy And HTTPS](../installation/reverse-proxy.md)
- [Ports](../reference/ports.md)
- [Syslog](../configuration/syslog.md)
- [Permissions](./permissions.md)
