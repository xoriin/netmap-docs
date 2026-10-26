---
title: Review Discovery Observations
sidebar_position: 4
keywords: [scheduled discovery, observations]
---

# Review Discovery Observations

Scheduled discovery creates review-only observations for new devices, MAC-matched IP moves, field changes, and disappeared hosts. It does not silently mutate inventory.

API equivalents:

- `GET /api/v1/discovery/observations`
- `PATCH /api/v1/discovery/observations/{observation_id}`
- `POST /api/v1/discovery/observations/{observation_id}/apply`
- `POST /api/v1/discovery/observations/resolve-all`

Required permission: `discovery_manage`. Applying a change also needs `topology_write`.

## What This Does

This workflow lets you review what scheduled discovery found before NetMap changes inventory. It is designed to reduce noise from temporary offline devices and Wi-Fi churn.

## Observation Types

Verified behavior includes observations for:

- new devices;
- MAC-matched IP moves;
- device field changes;
- disappeared hosts after repeated missed scheduled scans.

Hosts that reappear can auto-resolve disappeared observations. Resolving a new-device observation suppresses re-raising for that device identity according to the implementation rules.

## Steps

1. On Overview or Inventory, find the bar that reads *N network changes detected*, with a count for each type, and select **Review**.
2. In **Network changes**, read each row's type, summary, address details, and proposed field values. Select a row to go to Inventory, or to Monitoring for a disappeared host.
3. Select **Add to inventory** for a new device, or **Apply to device** for an IP or field change, to make the change.
4. Select **Acknowledge** (green label) to mark a change as seen and keep it listed, or **Clear** (red label) to dismiss it permanently.
5. Select **Clear all** only after reviewing every row. With five or more changes, type `clear` to confirm.

## Common Problems

| Symptom | Likely cause | Fix |
|---|---|---|
| observation cannot be applied | missing required details | rerun discovery schedule |
| disappeared host reappears | intermittent device | review auto-resolved state |
| `403` | missing `topology_write` | update role permissions |

## Related Pages

- [Run Discovery](./run-discovery.md)
- [Inventory](../using-netmap/inventory.md)
- [Topology](../using-netmap/topology.md)
