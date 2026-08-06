---
title: Inventory
description: Manage device inventory.
sidebar_position: 4
keywords: [inventory, devices]
---

# Inventory

Use Inventory to search, filter, create, update, delete, favourite, and import devices.

API equivalents:

- `GET /api/v1/topology/devices`
- `POST /api/v1/topology/devices`
- `PATCH /api/v1/topology/devices/{device_id}`
- `DELETE /api/v1/topology/devices/{device_id}`
- `POST /api/v1/topology/devices/import`

Write actions require `topology_write`.

## Who Can Access It

Any authenticated user can view inventory. Create, update, delete, import, and bulk-edit actions require `topology_write`.

## What Inventory Is For

Inventory is the tabular source of device records. Use it when you need to:

- find a device by name, hostname, IP, type, group, or site;
- correct device metadata;
- add devices before drawing topology links;
- import discovered or CSV data;
- mark important devices as favourites;
- open device details.

## Typical Workflow

1. Open Inventory.
2. Search or filter the device list.
3. Select a device to inspect details.
4. Edit fields when metadata is stale.
5. Use import for bulk onboarding.
6. Move to Topology when relationships or layout need attention.

## Example: List Devices

```bash
API_URL="https://netmap.example.com"
API_KEY="<api-key>"

curl --fail-with-body \
  --url "${API_URL}/api/v1/topology/devices" \
  --header "X-API-Key: ${API_KEY}" \
  --header "Accept: application/json"
```

## Common Problems

| Symptom | Likely cause | Fix |
|---|---|---|
| cannot save edits | missing `topology_write` | ask a SuperAdmin to adjust role permissions |
| duplicate-looking devices | discovery/import created separate records | merge manually or correct import data |
| device missing from topology | hidden group/filter or missing graph refresh | check topology filters and reload |

## Related Pages

- [Add A Device](../06-guides/add-device.md)
- [Import Devices](../06-guides/import-devices.md)
- [Topology](./topology.md)
