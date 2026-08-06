---
title: Locations
description: Manage sites and locations.
sidebar_position: 6
keywords: [locations, sites]
---

# Locations

Locations are represented as sites and can be attached to devices.

API equivalents:

- `GET /api/v1/topology/sites`
- `POST /api/v1/topology/sites`
- `PATCH /api/v1/topology/sites/{site_id}`
- `DELETE /api/v1/topology/sites/{site_id}`

Write actions require `topology_write`.

## When To Use Locations

Use locations when the same NetMap instance tracks devices across multiple places or logical sites. Locations make topology and inventory easier to filter and understand.

Examples:

- home lab rack;
- branch office;
- data closet;
- cloud/VPN segment;
- customer site;
- floor or building.

## Workflow

1. Open Locations.
2. Create a site with a clear name.
3. Add optional metadata where the UI exposes it.
4. Assign devices to the site from device details, inventory, topology, or bulk actions.
5. Use the site context when reading topology and inventory.

## API Usage

```bash
API_URL="https://netmap.example.com"
API_KEY="<api-key>"

curl --fail-with-body \
  --url "${API_URL}/api/v1/topology/sites" \
  --header "X-API-Key: ${API_KEY}"
```

## Common Problems

| Symptom | Cause | Fix |
|---|---|---|
| cannot create site | missing `topology_write` | update role permissions |
| site does not appear on device | device not assigned | edit device or use bulk update |
| API returns `404` on update | wrong site ID | list sites and retry |

## Related Pages

- [Topology](./topology.md)
- [Inventory](./inventory.md)
- [VLANs And Groups](./vlans.md)
