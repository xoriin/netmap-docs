---
title: Internal IPAM Data Model
description: Understand subnets, reservations, DHCP leases, utilization, and conflicts in NetMap IPAM.
sidebar_position: 17
keywords: [IPAM, subnet, reservation, DHCP lease, conflict, utilization]
verified_version: "1.5.0"
---

# Internal IPAM Data Model

This page is for network operators managing private address space. IPAM write actions require the relevant permission; imported lease data must come from a system you are authorized to read.

## The records

| Record | Purpose |
|---|---|
| Subnet | Defines an IPv4/IPv6 CIDR, name, description, gateway, DNS, VLAN, and related metadata. |
| Device address | An address present on an inventory device and counted against matching subnets. |
| Reservation | An address intentionally reserved for a device or purpose. |
| DHCP lease | Imported observed lease data with address and lease-state information. Import does not communicate with DHCP. |
| Conflict | A calculated condition requiring review, such as duplicate address use, overlap, gateway collision, or reservation/lease inconsistency. |

Subnet membership is calculated from normalized numeric IPv4/IPv6 indexes. A record can therefore be counted even when its source fields use different textual formatting. Network and broadcast addresses are treated according to IPAM's address-grid rules rather than assumed to be assignable host addresses.

## Utilization is a view, not a lease

The address grid combines known devices, leases, reservations, and system-reserved addresses. “Free” means no tracked object currently claims the address under the view's rules; it does not guarantee that DHCP, a router, or another untracked system will allow it.

## Conflicts and synchronization

Overlapping subnet definitions, duplicate CIDRs, a gateway inside an incompatible range, duplicate assignments, and VLAN-to-subnet metadata mismatches are different conditions. Resolve the source record rather than deleting a warning blindly. Group/VLAN synchronization chooses one canonical subnet row and may update its metadata; it does not merge arbitrary address allocations.

## Safe workflow

1. Create or verify the subnet CIDR and gateway.
2. Confirm the VLAN/group association and intended DNS metadata.
3. Import DHCP leases from a trusted export if needed.
4. Review utilization and conflicts against device and reservation records.
5. Resolve duplicates or overlaps before creating new reservations.
6. Recheck the address grid after each correction.

Deleting a subnet or reservation can remove the organizing record while leaving external systems unchanged. Export or back up before destructive cleanup.

## Related pages

- [IPAM workspace](../using-netmap/ipam.md)
- [Create an IP Reservation](../guides/create-ip-reservation.md)
- [Import DHCP Leases](../guides/import-dhcp-leases.md)
- [VLAN and IPAM synchronization](../using-netmap/vlans.md)
- [External IP Pools and Assignments](./external-ip-pools-and-assignments.md)
