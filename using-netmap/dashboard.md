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

## Network Health

**Network Health** pairs a ring showing the healthy share of devices with a column for each status that has devices: **Online**, **Offline**, **Warning**, **Paused**, and **Unknown**. Select a column to open Monitoring filtered to that status. The panel header shows the device count and the last poll time.

## Summary Cards

The cards are shortcuts as well as totals:

- **Total devices** opens Inventory;
- **Online** opens Monitoring;
- **Offline** names up to three offline devices and, when anything is offline, scrolls to **Current Outages**;
- **Groups / VLANs** opens VLANs;
- **Links** opens Topology; and
- **Avg RTT** names the slowest device and opens Monitoring.

Counts use the expected-versus-observed health model. A deliberately expected-offline device is not counted as an unexpected outage; paused, retired, and disabled devices are treated as not actively monitored.

## Alert Bars

When devices or endpoints are offline, an alert bar names up to six of them, and **View** scrolls to **Current Outages**. Dismissing the bar only hides it for the current view; it does not pause monitoring or acknowledge an incident. Users with `discovery_manage` also see a network changes bar when scheduled discovery finds changes; see [Review Discovery Observations](../guides/scheduled-discovery-observations.md).

## Breakdowns

**Device Types** ranks the six most common device types, with **Top Vendors** (the top five) below. **Top Groups** ranks the five largest topology groups, and **Manage** opens VLANs. These panels are summaries, not separate data stores; use Inventory or Topology to change records.

## Favourites

Favourited devices and favourited standalone HTTP/HTTPS monitors appear in one searchable list. Device rows show heartbeat, uptime, response time, and status; endpoint rows show endpoint heartbeat, uptime, and response time. Select a device or an endpoint to open its monitoring pop-up. Favourites are per account, and removing one does not delete or pause the device or endpoint.

## Recently Updated

**Recently Updated** lists the eight most recently changed device records. Use it to check a new device, an edited identity field, or a recent discovery or import result. **+ Device** (`topology_write`) and **Scan** (`discovery_manage`) start those workflows from the panel.

## Side Column

- **Current Outages** lists every offline device, with its address, type, OS, group, and last check, and every offline endpoint with its URL. The list scrolls inside the panel, and **Monitoring** opens Monitoring.
- **Slowest Devices** ranks the five monitored devices with the highest average RTT over the last 24 hours.
- **Endpoints** counts endpoints that are **Up**, **Down**, and **Paused**; **All** opens Monitoring → Endpoints.

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
