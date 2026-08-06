---
title: Search Syslog Events
description: Search firewall and syslog events.
sidebar_position: 10
keywords: [syslog, firewall, search]
---

# Search Syslog Events

Required permission: `security_view`.

API equivalents:

- `GET /api/v1/syslog/events`
- `GET /api/v1/syslog/searches`
- `POST /api/v1/syslog/searches`
- `DELETE /api/v1/syslog/searches/{search_id}`

Raw log search uses FTS5 for `q=` searches while retaining field searches.

## What This Does

Syslog search lets security and operations users inspect firewall and device events stored in NetMap's `firewall.db`. Use it to investigate blocked traffic, source/destination activity, raw log text, and device-related events.

## Before You Begin

Confirm syslog is enabled and senders are forwarding to the NetMap host. If sender restrictions are configured, the sender IP must match `SYSLOG_SENDER_ALLOWLIST`.

## Steps

1. Open Security.
2. Review current syslog status.
3. Enter a search query or set field filters.
4. Adjust time range or other filters available in the UI.
5. Save frequent searches if you need to reuse them.
6. Export results if your role has firewall export permission.

## API Example

```bash
API_URL="https://netmap.example.com"
API_KEY="<security-view-api-key>"

curl --fail-with-body \
  --url "${API_URL}/api/v1/syslog/events?q=blocked" \
  --header "X-API-Key: ${API_KEY}" \
  --header "Accept: application/json"
```

## Expected Result

The response returns a firewall event list. In the UI, matching events appear in the Security table.

## Common Problems

| Symptom | Likely cause | Fix |
|---|---|---|
| `403` | missing `security_view` | update role permissions |
| no events | no syslog senders or wrong port | check sender config and NetMap syslog ports |
| search misses raw log text | FTS issue or wrong query | check logs and try a field-specific filter |
| export unavailable | missing `firewall_export` | use a role with export permission |

## Related Pages

- [Syslog](../configuration/syslog.md)
- [Security Events](../using-netmap/security-events.md)
- [Ports](../reference/ports.md)
