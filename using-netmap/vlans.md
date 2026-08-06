---
title: VLANs And Groups
description: Manage topology groups and VLAN metadata.
sidebar_position: 5
keywords: [VLANs, groups]
---

# VLANs And Groups

Groups organize topology and can carry VLAN-related metadata such as VLAN ID, IP range, gateway, DHCP range, and DNS servers.

API equivalents:

- `GET /api/v1/topology/groups`
- `POST /api/v1/topology/groups`
- `PATCH /api/v1/topology/groups/{group_id}`
- `DELETE /api/v1/topology/groups/{group_id}`
- `POST /api/v1/topology/groups/reset-device-assignments`

Write actions require `topology_write`.

## When To Use Groups

Use groups when devices belong to a logical network segment, VLAN, department, site zone, or other topology grouping.

Useful metadata includes:

- display name;
- VLAN ID;
- IP range;
- gateway;
- DHCP start/end;
- DNS servers;
- description.

## Relationship With IPAM

VLAN/group metadata can be imported into IPAM as subnet suggestions. Group edits can also sync metadata to a canonical matching IPAM subnet according to the application logic.

## Workflow

1. Open VLANs.
2. Create or edit a group.
3. Add VLAN/subnet metadata.
4. Assign devices to the group from Inventory or Topology.
5. Open IPAM to import or review subnet suggestions.

## Common Problems

| Symptom | Likely cause | Fix |
|---|---|---|
| cannot save group | missing `topology_write` | update role permissions |
| IPAM suggestion missing | group lacks valid IP range | add or correct CIDR/range metadata |
| device appears ungrouped | device not assigned | edit device or use topology bulk update |

## Related Pages

- [IPAM](./ipam.md)
- [Topology](./topology.md)
- [Inventory](./inventory.md)
