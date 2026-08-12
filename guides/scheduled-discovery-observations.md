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

Required permission: `topology_write`.

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

1. Open the discovery observations surface in the UI.
2. Review each observation type and details.
3. Apply observations that should update inventory.
4. Resolve observations that are expected or not useful.
5. Use resolve-all only after reviewing the impact.

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
