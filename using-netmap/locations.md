---
title: Locations
description: Manage sites and locations.
sidebar_position: 6
keywords: [locations, sites]
---

# Locations

Locations are sites attached to devices and subnets. They provide a consistent scope for inventory, topology, and IPAM. Write actions require `topology_write`.

## Workspace tour

The Locations workspace presents site cards/table rows with name, address, colour, assigned-device count, and related map links. Search matches the internal name, display name, and address; sortable columns include name, address, and device count. Select a row to edit it.

## Create and edit a location

Create a site with an internal name, optional display name, street/address text, and optional colour. The internal name is the stable identifier used by APIs and filters; the display name is what readers see. Editing the address or colour changes future links and chips but does not move devices automatically.

## Assign devices and subnets

Assign devices from Device Details, Inventory bulk edit, Topology bulk assignment, or discovery. Inventory offers an explicit **Unassigned** filter. Assign IPAM subnets to a site from the subnet editor; site assignment is independent of a device's VLAN/group.

Selecting a site in Topology scopes the canvas to devices assigned to it. **All Sites** clears that scope. A site filter does not alter the underlying graph or device assignments.

## Map links and privacy

When an address is present, the workspace can open it in the configured external map service. This sends the address to that provider; omit sensitive street details or leave the address blank when external disclosure is not acceptable. NetMap does not geocode or store provider results.

## Colours and deletion

Explicit site colours are used by entity chips and topology/site selectors. Without one, a stable name-based palette colour is shown. Deleting a site requires confirmation and clears the site relationship from assigned devices/subnets; it does not delete those records.

## API equivalents

- `GET /api/v1/topology/sites`
- `POST /api/v1/topology/sites`
- `PATCH /api/v1/topology/sites/{site_id}`
- `DELETE /api/v1/topology/sites/{site_id}`

| Symptom | Cause | Fix |
|---|---|---|
| cannot create site | missing `topology_write` | update role permissions |
| site does not appear on a device | device is unassigned | edit the device or use bulk update |
| topology appears empty | a site scope is active | select **All Sites** or assign devices |
| map link exposes too much detail | address contains sensitive information | remove the address or use an internal-only label |

## Related pages

- [Topology](./topology.md)
- [Inventory](./inventory.md)
- [VLANs And Groups](./vlans.md)
- [IPAM](./ipam.md)
