---
title: Dashboard
sidebar_position: 2
keywords: [dashboard, overview]
---

# Overview Dashboard

The Overview workspace summarizes live network health, inventory changes, and device activity.

## Who Can Access It

Any authenticated user can open Overview.

## When To Use It

Use Overview as the first stop after signing in. It is intended to answer:

- is the network healthy right now?
- how many devices are known?
- are there monitoring changes or incidents to investigate?
- did recent inventory/discovery activity change the state of the network?

## Data Sources

The workspace uses dashboard and monitoring summary data:

- `GET /api/v1/dashboard/summary`
- `GET /api/v1/monitoring/summary`

## What To Check

Review:

- fleet health;
- device counts;
- recent activity;
- monitoring summaries;
- changes that should be followed up in Inventory, Topology, Monitoring, Security, or IPAM.

## Summary cards

The cards are shortcuts as well as totals:

- **Total devices** opens Inventory;
- **Online** opens Monitoring with the healthy filter;
- **Offline** expands the offline-device alert;
- **Average RTT** opens Monitoring;
- **Groups/VLANs** opens VLANs; and
- **Links** opens Topology.

Counts use the expected-versus-observed health model. A deliberately expected-offline device is not counted as an unexpected outage; paused, retired, and disabled devices are treated as not actively monitored.

## Health and breakdown panels

The health panel shows healthy, unhealthy, unknown, and paused totals for active inventory devices. The device-type panel ranks the types present in inventory and applies the configured type labels. The top-groups panel ranks topology groups by device membership. These panels are summaries, not separate data stores; use Inventory or Topology to change records.

## Offline alert

When unexpected offline devices exist, the alert bar can be expanded to show each device's address, type, group, and last-check time. Select a device or use the Inventory link to investigate it. Dismissing the alert only hides it for the current view; it does not pause monitoring or acknowledge an incident.

## Recently updated

Recently updated lists the most recently changed device records. It is useful for checking a new device, an edited identity field, or a recent discovery/import result. Select the device from Inventory or its details view for full history.

## Favourites

Favourited devices and favourited standalone HTTP/HTTPS monitors appear in one searchable list. Device rows show heartbeat, uptime, response time, and status; endpoint rows show endpoint heartbeat, uptime, and response time. Favourites are per account. Removing a favourite does not delete or pause the device or endpoint.

## Freshness and empty states

Overview loads summary data and monitoring data separately. Summary cards can appear before detailed rows finish loading. A loading skeleton means a request is in flight; “No monitoring data yet” means the monitoring summary has not produced rows, while “No favourites found” means the current search matches nothing. Re-enter the workspace to refresh stale data, then check Monitoring if the fleet data remains old.

## API Equivalent

```bash
API_URL="https://netmap.example.com"
API_KEY="<api-key>"

curl --fail-with-body \
  --url "${API_URL}/api/v1/dashboard/summary" \
  --header "X-API-Key: ${API_KEY}"
```

## Common Problems

| Symptom | Likely cause | Fix |
|---|---|---|
| Overview does not load | unauthenticated session | sign in again |
| Monitoring counts look stale | background refresh in progress | open Monitoring for detailed device rows |
| API returns `401` | missing/invalid auth | check token or API key |

## Related Pages

- [Monitoring](./monitoring.md)
- [Inventory](./inventory.md)
- [API Authentication](../api/authentication.md)
