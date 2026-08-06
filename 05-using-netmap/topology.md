---
title: Topology
description: Use topology graph, layouts, relationships, search, path mode, and bulk actions.
sidebar_position: 3
keywords: [topology, graph, layouts, relationships]
---

# Topology

Use Topology to map devices, groups, sites, and relationships.

Common actions:

- View graph data.
- Search for a device and pan/zoom to it.
- Create or edit relationships.
- Use Path mode to highlight a path between endpoints.
- Save named layouts.
- Share layout codes and import shared layouts.
- Select multiple devices and bulk-assign group or site.

Write actions require `topology_write`.

API equivalents are under `/api/v1/topology/*`.

## What Topology Shows

Topology turns inventory records into a graph. Devices, groups, sites, and relationships are visualized so operators can understand how the network is connected.

## Common Workflows

1. Search for a device.
2. Pan and zoom the map.
3. Create or edit links.
4. Use Path mode to inspect connectivity between endpoints.
5. Save a named layout.
6. Share a layout code.
7. Bulk-select devices and assign group or site.

## Permissions

Viewing topology requires authentication. Creating or changing devices, groups, sites, or relationships requires `topology_write`.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| cannot edit map data | missing `topology_write` | update role permissions |
| shared layout not found | revoked or mistyped code | request a new code |
| device missing | inventory filter or missing record | check Inventory and graph data |

## Related Pages

- [Inventory](./inventory.md)
- [Share A Topology Layout](../06-guides/share-topology-layout.md)
- [VLANs And Groups](./vlans.md)
