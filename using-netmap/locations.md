---
title: Locations
sidebar_position: 6
keywords: [locations, sites, map, OpenStreetMap]
---

# Locations

Locations are the sites your devices and subnets belong to, such as an office or a datacentre. They scope Inventory, Topology and IPAM. Anyone signed in can view them, and creating, editing or deleting a location needs `topology_write`.

## The Locations Page

**Devices by Location** is a ring of how many devices each location holds. Beside it are four cards:

- **Total sites**, naming the largest location;
- **Assigned devices**, and across how many sites;
- **Unassigned**, the devices without a site;
- **Links**, the number of topology relationships.

**Needs Details** lists locations with no address, no devices or no colour set. When every location is complete, it says so.

## Find A Location

Search with **Search locations…** to match names, display names, addresses or descriptions. Use the sort list to sort by name, address or devices, and the arrow button beside it to reverse the order. Each card shows the location's name, address and device count.

## Create Or Edit A Location

1. Select **+ New location**, or **Add location** when there are none yet.
2. Enter a **Name**. **Display name**, **Address**, **Description** and **Colour** are optional.
3. Select **Create location**.

To change a location, select it to open its details, then select **Edit location** and **Save changes**. The **Name** is the identifier used by the API and filters; the display name is what you see in the app.

## See A Location On The Map

When a location has an address, its details show a map. Your browser sends the address to OpenStreetMap to find it and loads the map from OpenStreetMap, so leave the address blank or keep it general if it must not leave your network.

Select **View larger map ↗** to open it on OpenStreetMap. If the address cannot be found, select **Search manually ↗**.

## Assign Devices And Subnets

Assign devices from the device details window, Inventory bulk edit, Topology bulk assignment or discovery; Inventory's location filter has an **Unassigned** option. Assign a subnet to a location in the IPAM subnet editor. A location is independent of a device's VLAN or group.

In Topology, choosing a site shows only the devices assigned to it, and **All Sites** shows them all again. This does not change any assignments.

## Delete A Location

Select **Delete** and confirm with **Delete location**. Devices and subnets at that location are not deleted; they become unassigned.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| You cannot create a location | Your role lacks `topology_write` | Ask a SuperAdmin to update your role |
| A device shows no location | It is unassigned | Edit the device or use Inventory bulk edit |
| Topology looks empty | A site is selected | Choose **All Sites**, or assign devices to the site |
| "Address not found on map." | OpenStreetMap could not match the address | Simplify the address, or select **Search manually ↗** |

## Use The API

- `GET /api/v1/topology/sites`
- `POST /api/v1/topology/sites`
- `PATCH /api/v1/topology/sites/{site_id}`
- `DELETE /api/v1/topology/sites/{site_id}`

## Related Pages

- [Topology](./topology.md)
- [Inventory](./inventory.md)
- [VLANs And Groups](./vlans.md)
- [IPAM](./ipam.md)
