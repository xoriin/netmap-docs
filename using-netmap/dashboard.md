---
title: Dashboard
description: Use the Overview workspace.
sidebar_position: 2
keywords: [dashboard, overview]
---

# Dashboard

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
