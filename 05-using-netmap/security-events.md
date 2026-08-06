---
title: Security Events
description: Search syslog and firewall events.
sidebar_position: 9
keywords: [security, syslog, firewall]
---

# Security Events

The Security workspace searches firewall/syslog events and saved searches.

API equivalents:

- `GET /api/v1/syslog/status`
- `GET /api/v1/syslog/events`
- `GET /api/v1/syslog/searches`
- `POST /api/v1/syslog/searches`
- `DELETE /api/v1/syslog/searches/{search_id}`

Required permission: `security_view`.

## What This Workspace Is For

Use Security when you need to investigate firewall activity or syslog messages. It is the broad search surface for log data; topology only fetches selected-device security summaries on demand.

## Typical Workflow

1. Open Security.
2. Confirm syslog status.
3. Search raw logs or filter by available fields.
4. Save useful searches.
5. Export results if your role includes `firewall_export`.

## API Example

```bash
API_URL="https://netmap.example.com"
API_KEY="<security-view-api-key>"

curl --fail-with-body \
  --url "${API_URL}/api/v1/syslog/events?q=deny" \
  --header "X-API-Key: ${API_KEY}"
```

## Common Problems

| Symptom | Likely cause | Fix |
|---|---|---|
| Security route hidden | missing security role/permission | ask SuperAdmin to update role |
| no events | no syslog forwarding | check syslog sender and ports |
| export unavailable | missing `firewall_export` | update role or ask an admin |

## Related Pages

- [Syslog](../04-configuration/syslog.md)
- [Search Syslog Events](../06-guides/search-syslog.md)
- [Ports](../12-reference/ports.md)
