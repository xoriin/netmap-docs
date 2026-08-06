---
title: Health Checks
description: Health endpoints and monitoring examples.
sidebar_position: 1
keywords: [health, monitoring]
---

# Health Checks

NetMap has two lightweight health endpoints. The all-in-one Docker image uses `/api/health` for the Docker healthcheck, and the versioned API router also exposes `/api/v1/health`.

## Endpoints

| Endpoint | Authentication | Purpose |
|---|---|---|
| `/api/health` | public | container and reverse-proxy health |
| `/api/v1/health` | public | versioned API health |

## Manual Check

```bash
curl --fail http://127.0.0.1:8080/api/health
curl --fail http://127.0.0.1:8080/api/v1/health
```

Expected:

```json
{"status":"ok"}
```

## Docker Check

```bash
docker compose ps
```

The Dockerfile healthcheck calls:

```bash
python3 -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:${APP_PORT}/api/health', timeout=5)"
```

## External Monitoring

Point external uptime monitors at the public HTTPS URL:

```text
https://netmap.example.com/api/health
```

Use a short timeout. The endpoint is public and does not require an API key.

## What Health Does Not Prove

A passing health check confirms the web/API process is responding. It does not prove:

- syslog senders are connected;
- scheduled discovery is running correctly;
- notification delivery succeeds;
- database backups are fresh;
- every worker is healthy.

Use Admin diagnostics and logs for deeper checks.

## Related Pages

- [Monitoring NetMap](./monitoring-netmap.md)
- [Logging](./logging.md)
- [Installation Problems](../09-troubleshooting/installation-problems.md)
