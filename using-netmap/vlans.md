---
title: VLANs And Groups
description: Manage topology groups and VLAN metadata.
sidebar_position: 5
keywords: [VLANs, groups]
---

# VLANs And Groups

Groups organise topology and can carry VLAN metadata. The workspace provides a summary, searchable/resizable table, and editor. Write actions require `topology_write`.

## Group fields

Create or edit a group with an internal name, display name, optional VLAN ID, CIDR/IP range, gateway, DHCP start/end, DNS servers, description, and colour. VLAN IDs are numeric when supplied; ranges and gateways must be valid addresses/CIDRs. An explicit colour is used for chips and topology zones; without one, the stable entity-colour palette is derived from the canonical name.

## Assignments and reset

Assign devices from Inventory, Device Details, Topology bulk selection, or discovery. An explicit `topology_group_id` is distinct from an inferred group label supplied by topology relationships. **Reset device assignments** clears explicit assignments for the selected group after confirmation; it does not delete the group, devices, or inferred relationship labels.

The table can search by name, display name, VLAN ID, range, gateway, or DNS text and sort its available columns. Drag a column divider to resize it; double-click to restore default widths. The widths are browser-local preferences.

## IPAM synchronisation

VLAN metadata can be imported into IPAM as subnet suggestions. When a group edit matches multiple subnet rows by CIDR and VLAN, the canonical row already using that group CIDR wins. This prevents a DNS-only edit from violating the unique CIDR constraint. Review the resulting IPAM row rather than assuming every matching row was changed.

## Delete and troubleshoot

Deleting a group requires confirmation. Devices are not deleted, but their explicit group assignment is cleared and topology/IPAM relationships may change. Before deleting, review assigned devices and matching subnets.

| Symptom | Likely cause | Fix |
|---|---|---|
| cannot save group | missing `topology_write` | update role permissions |
| IPAM suggestion missing | group lacks a valid range/CIDR | correct the group range and retry |
| device appears ungrouped | no explicit assignment | assign it from Inventory, Details, or Topology |
| duplicate CIDR warning | multiple matching subnet rows | retain the canonical row and merge/remove the duplicate through IPAM |

## API equivalents

- `GET /api/v1/topology/groups`
- `POST /api/v1/topology/groups`
- `PATCH /api/v1/topology/groups/{group_id}`
- `DELETE /api/v1/topology/groups/{group_id}`
- `POST /api/v1/topology/groups/reset-device-assignments`

## Related pages

- [IPAM](./ipam.md)
- [Topology](./topology.md)
- [Inventory](./inventory.md)
