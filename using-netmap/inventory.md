---
title: Inventory
description: Manage device inventory.
sidebar_position: 4
keywords: [inventory, devices]
---

# Inventory

Inventory is the authoritative, searchable device table. It combines the fleet summary, filters, a resizable device grid, a details drawer, and write actions for users with `topology_write`.

API equivalents:

- `GET /api/v1/topology/devices`
- `POST /api/v1/topology/devices`
- `PATCH /api/v1/topology/devices/{device_id}`
- `DELETE /api/v1/topology/devices/{device_id}`
- `POST /api/v1/topology/devices/import`

## Who Can Access It

Any authenticated user can view inventory. Create, update, delete, import, and bulk-edit actions require `topology_write`.

## Workspace tour

The header contains the device total and refresh state. The toolbar provides search, status/favourite/group/site/type filters, Add device, Scan, Import, and the bulk-actions menu. The grid shows identity, health, type, group/VLAN, location, and monitoring information; select a row to open its overview drawer. Pagination and page size are local browser preferences.

## Search, filters, and sorting

Search matches rendered identity fields, including display name, hostname, IP address, MAC address, vendor, and operating-system text. Filters can be combined:

- Status uses resolved health (`online`, `offline`, `warning`, `unknown`) plus `paused` and `disabled`; expected-offline devices are not unexpected outages.
- Group/VLAN includes explicit assignments and inferred topology-group labels.
- Device type lists only types present in the current inventory and resets to “All types” if the selected type disappears.
- Location includes each site and an explicit `Unassigned` option.
- Favourites limits rows to devices favourited by the current user.

Click a sortable header to change direction. IP columns use numeric address ordering rather than lexical string ordering.

## Typical workflow

1. Open Inventory.
2. Search or filter the device list.
3. Select a device to inspect its details.
4. Edit fields when metadata is stale.
5. Use import for bulk onboarding.
6. Move to Topology when relationships or layout need attention.

## Columns and selection

Drag a column divider to resize one column. The first drag freezes the currently rendered widths; widths are saved in `netmap.inv_col_widths_v1`. Double-click a divider to reset the flexible defaults. Wide grids scroll horizontally without shrinking row backgrounds. Select individual rows or use the header selection control; the bulk menu appears when at least one row is selected.

Bulk actions can assign a group/VLAN, device type, or location (including clearing a value), pause or resume monitoring, and delete devices. Every destructive operation asks for confirmation. Bulk edits require `topology_write`; deleting a device also removes or detaches related records according to the API device-delete rules.

## Details drawer and manual editing

Selecting a row opens the device overview drawer. It includes health, heartbeat/RTT information, identity and metadata, favourite state, monitoring controls, and links to related security activity when the user has security permission. Double-click editable fields, press Enter to save, Escape to cancel, or leave the field to blur-save. Use [Add A Device](../guides/add-device.md) for the complete field workflow.

## Import and export

Import accepts `.csv` and `.json`. The modal parses the file locally, previews rows, marks invalid rows, and enables import only for valid records. Correct rejected rows and upload again rather than assuming a partial import succeeded. See [Import Devices](../guides/import-devices.md) for the column contract and duplicate handling.

Inventory export is available from the Exports workspace for supported formats and permissions; use the direct inventory view for interactive filtering before exporting.

## Colours, icons, and permissions

Group/VLAN, location, and device-type values render as stable entity chips. Explicit configured colours win; otherwise a stable name hash selects a palette colour. The Profile appearance preference can disable tinting while preserving icons and layout. Built-in device types use standard icons; custom types use their configured icon. Native option colours are not relied on, so pickers use the same swatch component as the table.

Viewing requires authentication. Creating, editing, bulk updating, importing, and deleting require `topology_write`; security summaries additionally require the security-view permission. A hidden action is normally a permission or lifecycle restriction, not a failed save.

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
| type filter is empty | no device currently uses that type | clear the filter or add a device of that type |
| colours differ from a screenshot | entity-colour preference is disabled | re-enable colours in Profile → Appearance |
| import shows rejected rows | invalid field, duplicate, or unsupported alias | correct the listed row errors and retry |

## Related Pages

- [Add A Device](../guides/add-device.md)
- [Import Devices](../guides/import-devices.md)
- [Topology](./topology.md)
- [Monitoring](./monitoring.md)
