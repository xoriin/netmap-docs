---
title: Syslog
sidebar_position: 5
keywords: [syslog, firewall, logs]
---

# Syslog

NetMap can receive syslog messages from firewalls, routers, switches, and other network devices. Syslog data is stored in a separate SQLite database, `firewall.db`, so high-volume log writes are isolated from the main inventory and application database.

## When To Enable Syslog

Enable syslog when you want NetMap to provide a searchable firewall/security event surface. Common senders include:

- firewall appliances;
- routers;
- managed switches;
- Linux hosts;
- other systems that can forward RFC-style syslog messages.

Syslog is optional for inventory, topology, monitoring, and IPAM.

## Listener Settings

| Variable | Default | Purpose |
|---|---|---|
| `SYSLOG_ENABLED` | `true` | Starts or disables the syslog service. |
| `SYSLOG_UDP_ENABLED` | `true` | Enables UDP syslog listener. |
| `SYSLOG_TCP_ENABLED` | `true` | Enables TCP syslog listener. |
| `SYSLOG_HOST` | `0.0.0.0` | Bind address for syslog listeners. |
| `SYSLOG_UDP_PORT` | `1514` | UDP listener port. |
| `SYSLOG_TCP_PORT` | `1514` | TCP listener port. |
| `SYSLOG_SENDER_ALLOWLIST` | `[]` | Optional sender IP/CIDR allowlist. |
| `SYSLOG_MAX_LINE_BYTES` | `8192` | Maximum accepted message line size. |
| `SYSLOG_MAX_TCP_CONNECTIONS` | `50` | TCP syslog connection limit. |
| `SYSLOG_WS_MAX_CONNECTIONS` | `50` | Live syslog WebSocket connection limit. |
| `FIREWALL_LOG_RETENTION_DAYS` | `7` | Firewall event retention period. |

Example:

```dotenv
SYSLOG_ENABLED=true
SYSLOG_UDP_ENABLED=true
SYSLOG_TCP_ENABLED=true
SYSLOG_HOST=0.0.0.0
SYSLOG_UDP_PORT=1514
SYSLOG_TCP_PORT=1514
SYSLOG_SENDER_ALLOWLIST=["192.168.1.1","10.0.0.0/8"]
FIREWALL_LOG_RETENTION_DAYS=14
```

Restart NetMap after changing these values.

## Choosing UDP Or TCP

UDP syslog is common and simple, but it does not guarantee delivery. TCP syslog is more reliable when devices support it.

Use UDP when:

- the sender only supports UDP;
- occasional dropped messages are acceptable;
- you want minimal sender-side overhead.

Use TCP when:

- the sender supports it;
- reliable delivery matters more than simplicity;
- you are forwarding logs over less stable links.

## Ports And Firewalls

NetMap defaults to port `1514` rather than privileged port `514`.

When using host networking:

```yaml
services:
  netmap:
    network_mode: host
    environment:
      SYSLOG_UDP_PORT: "1514"
      SYSLOG_TCP_PORT: "1514"
```

When using bridge networking:

```yaml
services:
  netmap:
    ports:
      - "1514:1514/udp"
      - "1514:1514/tcp"
```

Permit traffic only from devices that should send logs.

## Searching Events

The Security workspace uses the syslog API:

- `GET /api/v1/syslog/status`
- `GET /api/v1/syslog/events`
- `GET /api/v1/syslog/searches`
- `POST /api/v1/syslog/searches`
- `DELETE /api/v1/syslog/searches/{search_id}`

Required permission: `security_view`.

Raw log searches use SQLite FTS5 through `firewall_events_fts`, while field-based filters remain available in the syslog route implementation.

## Retention And Maintenance

`FIREWALL_LOG_RETENTION_DAYS` controls how long firewall events are retained. Startup maintenance runs in a background thread so large FTS rebuilds or retention cleanup do not block uvicorn socket creation.

Operational checks:

```bash
docker compose logs netmap | grep -i syslog
curl --fail http://127.0.0.1:8080/api/health
```

Authenticated syslog status check:

```bash
API_URL="https://netmap.example.com"
API_KEY="<security-view-api-key>"

curl --fail-with-body \
  --url "${API_URL}/api/v1/syslog/status" \
  --header "X-API-Key: ${API_KEY}"
```

## Troubleshooting

### Events Do Not Arrive

Check:

- `SYSLOG_ENABLED=true`;
- the correct protocol-specific listener is enabled;
- host firewall allows the chosen protocol and port;
- Docker publishes the port if bridge networking is used;
- sender IP is included in `SYSLOG_SENDER_ALLOWLIST`, if configured;
- the sending device is pointed at the NetMap host and chosen port.

### Events Arrive But Search Is Slow Or Incomplete

Check database size and logs. FTS maintenance runs at startup and may log errors if the FTS index is corrupt. NetMap has a recovery path for FTS shadow-table corruption that rebuilds FTS without deleting the main firewall event table.

### API Returns `403`

The user or API-key owner lacks `security_view`.

### API Returns `401`

The request is unauthenticated, the API key is invalid/expired/revoked, or the owning user is inactive.

Documentation gap: this behaviour could not be verified from the current source for full TLS syslog operation. `SYSLOG_TLS_*` settings exist and should be checked in `backend/app/services/syslog/server.py` before publishing TLS setup steps.

## Related Pages

- [Security Events](../using-netmap/security-events.md)
- [Ports](../reference/ports.md)
- [API Authentication](../api/authentication.md)
- [Database Problems](../troubleshooting/database-problems.md)
