---
title: Topology Entities
description: Understand groups, VLAN metadata, sites, relationships, direction, link speed, and inferred membership in NetMap.
sidebar_position: 16
keywords: [topology, groups, VLAN, sites, relationships, link speed]
verified_version: "1.5.0"
---

# Topology Entities

This page explains how topology records fit together. Users can view maps according to permission; creating groups, sites, or relationships requires the corresponding write permission.

## Groups and VLANs

A topology group is a logical container used to organize devices on the canvas. Group metadata may include a VLAN ID, subnet CIDR, gateway, DNS, description, and color. NetMap stores this as operational metadata; it does not configure a switch, router, VLAN, or DHCP server.

When a device carries a group name without a `topology_group_id`, the UI may show inferred membership. Name matching is a fallback for display and should not be confused with a foreign-key assignment.

Group edits can synchronize metadata to one canonical internal IPAM subnet. If multiple subnet rows match a group's CIDR and VLAN, the row already using that group CIDR is preferred. This prevents a DNS-only group edit from creating duplicate CIDRs.

## Sites and locations

A site is a physical or logical location with a name, optional display name, description, address, and color. Site membership is independent of topology-group membership: one device can belong to a site and a group, or neither. Sites support organization, filtering, and visual context; they do not define network reachability.

## Relationships

A relationship connects a source device to a target device and may include:

- a free-form relationship type;
- `allow_outbound` and `allow_inbound` direction flags;
- notes; and
- an optional manual `link_speed_mbps` value from 1 to 1,000,000.

Direction flags describe the modeled relationship, not packet inspection. Link speed is operator-entered metadata used for edge labels and visual width; it is not negotiated or measured by NetMap.

Topology can also represent containment-like hops between devices and parent zones during path highlighting. A drawn edge is not required for every visual relationship shown on the canvas.

## Deletion and consistency

Deleting a group or site may leave devices without that association, depending on the relationship's delete behavior. Deleting a relationship removes the map edge but does not delete either device. Before bulk updates or group synchronization, confirm the selected records and review the resulting IPAM metadata.

## Related pages

- [Topology workspace](../using-netmap/topology.md)
- [VLANs and Groups](../using-netmap/vlans.md)
- [Locations](../using-netmap/locations.md)
- [Share a Topology Layout](../guides/share-topology-layout.md)
- [Internal IPAM Data Model](./ipam-data-model.md)
