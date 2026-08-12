---
title: Topology
description: Use the topology graph, layouts, relationships, search, path mode, and bulk actions.
sidebar_position: 3
keywords: [topology, graph, layouts, relationships]
---

# Topology

Topology turns inventory records into an interactive map of devices, group zones, sites, and relationships. Viewing requires authentication; changing graph data or layouts requires `topology_write`.

## Workspace tour

The canvas occupies the centre, with a toolbar/ribbon for search, fit, layout, display preferences, Path mode, exports, and named layouts. The entity list can search and select devices, links, and groups. The mini-map shows the current model extent; the details panel edits the selected entity. Site filtering, online/offline counts, and a live refresh indicator describe the current graph view rather than the entire database.

## Canvas navigation and display

Drag empty canvas space to pan, use the wheel or trackpad to zoom, select a node or edge to open details, and use Fit to frame visible elements. The mini-map viewport rectangle can be clicked to pan without changing zoom. Search accepts a device name, hostname, or IP; selecting a result centres it and briefly pulses the match. The location filter offers **All Sites** or one site. Device icons, labels, group visibility, and hidden-group search are independent display preferences and persist with the autosaved layout.

Group zones contain their member devices; a relationship can connect devices, groups, or a device to its parent zone. Path mode accounts for both drawn edges and membership hops, so a device-to-switch route can pass through a VLAN/group zone even when no direct edge is drawn. If no route exists, the endpoints remain selected and the UI reports no path.

Status changes produce a short pulse on the affected node. Online/offline counts update with the graph refresh and respect the active site/group filters.

## Entity lists and bulk assignment

Use the Devices, Links, and Groups lists to search, hover, select, and toggle visibility. Shift-drag an empty canvas area to box-select devices; ordinary drag still pans. The floating bulk bar assigns the selected devices to a group/VLAN or site, including clearing an assignment. Bulk changes require `topology_write` and are confirmed before submission.

## Devices, links, and relationship editing

Add a device from the topology toolbar to create it and place it immediately. Discovery opens the scan/review flow; import only the reviewed rows. To create a link, choose source and target endpoints, relationship type, direction, optional link speed, and notes. The endpoint picker searches by IP, hostname, or display name and supports keyboard navigation. Edit or delete a selected link from the details panel; direction controls determine whether source-to-target, target-to-source, or both states are allowed. Link speed presets are shown in the edge label and influence edge width; speed is presentation metadata, not a bandwidth test.

## Layout controls and persistence

Fit frames the current graph, Reset returns the default view, and Auto-arrange recalculates positions. Auto-arrange and group-shape controls can change saved positions, so save deliberately. Group layout supports rows or rings, with device spacing and devices-per-row/ring limits. Node size, label size, group-zone opacity, and edge-label size are display preferences; Reset one group restores that group's layout without deleting its devices or links.

Autosave is debounced while dragging. The server-side `__autosave__` layout wins over local storage when its timestamp is newer, and the initial load is completed before saves are enabled. Named layouts are independent snapshots: create, load, or delete them from the Layouts modal; loading immediately applies and autosaves the canvas state. The autosave layout cannot be shared or deleted.

## Sharing layouts

Owners can generate a 12-character share code, copy it, revoke it, or import a code. A preview endpoint shows the snapshot before import. Import creates an independent copy for the importing user; a name collision receives an automatic suffix. Revoking a code prevents future imports but does not alter copies already imported.

## Export

PNG exports a raster image for quick sharing, SVG exports a scalable graph with labels and sanitised custom icon paths, and PDF produces a report-style page. Export the visible/current layout after fitting it; very large graphs may need a smaller selection or adjusted label sizes. Export permissions are separate from write permissions where configured.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| nodes are missing | site/group filter or hidden group | clear filters and use the Groups list's show-all action |
| layout changes do not persist | stale local data or database lock | reload, reset the group, then retry after checking health |
| link cannot be created | endpoint is filtered, duplicate, or direction is invalid | clear filters and select valid distinct endpoints |
| path shows no route | no drawn edge or membership hop connects endpoints | create the missing relationship or select connected endpoints |
| shared layout cannot be imported | code revoked, expired by policy, or mistyped | request a fresh code from the owner |

## Related pages

- [Inventory](./inventory.md)
- [Device Details](./device-details.md)
- [Share A Topology Layout](../guides/share-topology-layout.md)
- [VLANs And Groups](./vlans.md)
