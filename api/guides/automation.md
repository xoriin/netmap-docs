---
title: Automation
sidebar_position: 7
keywords: [automation, API key, scripts, integrations, CMDB, IPAM, discovery, Python]
---

# Automation

Patterns for scripts and integrations that call the NetMap API.

## Set Up

1. Create a NetMap user for the integration, with a role that has only the permissions it needs. See [API Permissions](../permissions.md).
2. Sign in as that user and create an API key with an expiry. See [API Authentication](../authentication.md#api-keys).
3. Give the key to the integration as a secret, never in code, a URL or a log.

```bash
export NETMAP_URL="https://netmap.example.com"
export NETMAP_API_KEY="<api-key>"
```

## A Reusable Client

This Python client uses a bounded timeout and retries rate limits, timeouts and server errors with backoff:

```python
import os
import time
import httpx

client = httpx.Client(
    base_url=os.environ["NETMAP_URL"],
    headers={"X-API-Key": os.environ["NETMAP_API_KEY"]},
    timeout=30.0,
)

def call(method, path, **kwargs):
    for attempt in range(5):
        try:
            response = client.request(method, path, **kwargs)
        except httpx.TimeoutException:
            time.sleep(2 ** attempt)
            continue
        if response.status_code == 429 or response.status_code >= 500:
            time.sleep(2 ** attempt)
            continue
        response.raise_for_status()
        return response
    raise RuntimeError(f"{method} {path} failed after retries")

devices = call("GET", "/api/v1/topology/devices").json()
```

Each key can make 120 requests per 60 seconds by default. Do not retry `401`, `403` or `422`; fix the key, permission or request instead. See [API Errors](../errors.md).

## Export Inventory

For a CMDB or spreadsheet feed, give the user `inventory_export` and download a snapshot:

```bash
curl --fail-with-body \
  --url "${NETMAP_URL}/api/v1/exports/inventory?format=json" \
  --header "X-API-Key: ${NETMAP_API_KEY}" \
  --output netmap-inventory.json
```

`format` is `csv` (the default) or `json`. Use JSON when the consumer needs stable field types.

Match records by NetMap device `id`, then by MAC address, and only then by a reviewed hostname or IP address. Do not delete a record in your system just because one export is missing it.

## Write Safely

For devices, IP reservations and external addresses:

1. Read the current object and keep its `id` and `updated_at`.
2. Validate addresses before you write.
3. Create or update based on a stable identifier you store on your side.
4. Send only the fields you are changing in a `PATCH`.
5. Read the object again after the write and record its `id`.

NetMap has no transactions across resources and no idempotency keys on these endpoints. A failed batch is not rolled back, and a create retried after a timeout can create a duplicate, so check before you retry. Do not retry deletes blindly.

Creating a device on a reserved IP address returns `409` unless the request claims the reservation. See [IPAM](../../using-netmap/ipam.md) and [External IPAM](../../using-netmap/external-ipam.md) for the address rules.

## Run Discovery

With `discovery_manage`, start a scan:

```bash
curl --fail-with-body \
  --request POST \
  --url "${NETMAP_URL}/api/v1/discovery/scans" \
  --header "X-API-Key: ${NETMAP_API_KEY}" \
  --header "Content-Type: application/json" \
  --data '{"target":"10.0.0.0/24","scan_type":"ping"}'
```

Targets over 256 addresses also need `"confirm_large_scan": true`, and a scan can cover at most 1,024 addresses by default.

The request returns `202` with the scan queued. Poll `GET /api/v1/discovery/scans/{scan_id}` every few seconds until `status` is `completed`, `failed` or `cancelled`; while it runs, `progress` holds `done` and `total` addresses and `started_at` is set. Only one manual scan runs at a time: a start request while one is queued or running returns `409` with that scan's `scan_id` in the body, so you can poll it instead. A scan that was still running when NetMap restarted ends as `failed`. `POST /api/v1/discovery/scans/{scan_id}/cancel` stops a queued or running manual scan: it returns `202`, a queued scan is `cancelled` at once, and a running one becomes `cancelled` within a few seconds with no results. Cancelling a finished or scheduled scan returns `409`.

Review the results with `GET /api/v1/discovery/observations` before applying them. Applying an observation or importing results also needs `topology_write`. Each user can start one scan per 60 seconds; a faster request returns `429`.

Scheduled discovery needs `automation_manage`. Schedules collect observations for review and do not change inventory on their own. See [Run Discovery](../../guides/run-discovery.md).

## Health Checks

For an external uptime monitor, poll `GET /api/health`. It needs no authentication and returns `{"status":"ok"}`. Use `GET /api/v1/system/diagnostics`, which needs `diagnostics_view`, only for authenticated admin checks. See [Health Checks](../../operations/health-checks.md).

## Status Page Updates

To post incidents and maintenance from another tool, use a status page integration token instead of an API key. See [Status Page Integrations](./status-page-integrations.md).

## Other Integrations

These are configured in NetMap rather than through the API:

- Syslog senders: [Syslog](../../configuration/syslog.md).
- Notification channels: [Administration](../../administer/notifications.md#notification-methods).
- Single sign-on: [OIDC SSO](../../configuration/oidc-sso.md).

## Keep Integrations Safe To Re-Run

Keep source-specific transformations in the integration, store NetMap IDs on your side, and make every run safe to repeat. Revoke the key when the integration is retired.
