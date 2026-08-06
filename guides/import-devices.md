---
title: Import Devices
description: Import multiple devices into inventory.
sidebar_position: 2
keywords: [import, devices, inventory]
---

# Import Devices

## What This Does

Imports device records in bulk.

## Required Permissions

`topology_write`.

## API Equivalent

Endpoint: `POST /api/v1/topology/devices/import`.

Request model: `DeviceBulkImportRequest`.

Documentation gap: this page needs field-level import examples from `backend/app/schemas/topology.py` and frontend import parser behavior in `frontend/src/utils/csv.ts`.

## Before You Begin

Clean import data before loading it. Confirm:

- device names are meaningful;
- IP addresses are valid;
- MAC addresses are normalized where available;
- device types match existing options or expected custom types;
- group and site names are consistent.

## Workflow

1. Open Inventory.
2. Start the import flow.
3. Upload or paste data according to the UI.
4. Review parsed rows.
5. Fix validation errors.
6. Import only the intended rows.
7. Verify devices appear in Inventory and Topology.

## API Endpoint

```text
POST /api/v1/topology/devices/import
```

Request model: `DeviceBulkImportRequest`.

## Related Pages

- [Inventory](../using-netmap/inventory.md)
- [Add A Device](./add-device.md)
- [Endpoint Inventory](../api/api-reference.md)
