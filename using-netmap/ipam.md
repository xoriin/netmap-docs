---
title: IPAM
description: Manage internal subnets, addresses, reservations, DHCP leases, and conflicts.
sidebar_position: 8
keywords: [IPAM, subnet, reservations, DHCP]
---

# IPAM

IPAM manages internal address space from one workspace: summary cards, conflict review, VLAN suggestions, subnets, reservations, DHCP leases, and address grids. Write actions require `ipam_write`.

## Summary and subnet list

The summary reports subnet count, total/used/free addresses, utilisation, conflicts, imported leases, and reservations. Subnet rows can be searched, sorted, and inspected for CIDR, site/VLAN, gateway, DHCP range, DNS, device/lease/reservation counts, and utilisation. Counting uses indexed IPv4/IPv6 membership, so large inventories do not require a full scan for every row.

Create an IPv4 or IPv6 subnet with CIDR, name, gateway, DHCP start/end, VLAN/group, site, DNS servers, and notes. Validation rejects malformed addresses, impossible ranges, overlaps, and conflicting gateway/DHCP/reservation values. IPv6 displays address space and membership, but very large ranges are represented through calculated counts rather than rendering every address.

Editing a subnet updates metadata and synchronises supported VLAN fields. Deleting requires confirmation and checks dependent reservations/assignments first; it does not silently delete unrelated devices or imported lease data.

## Address grid and allocation

Open a subnet to browse addresses. Filters and labels distinguish network/broadcast or reserved addresses, known devices, active DHCP leases, conflicts, and free addresses; tooltips show the source record. Large subnets are paginated/virtualised rather than rendered as an unbounded grid. **Next available** accepts the subnet and optional exclusions but is a suggestion, not a reservation until saved.

## Reservations

Create a single-IP reservation with address, label, MAC, notes, owner, expiry, and subnet. A range reservation accepts a validated start/end range and creates the supported records. Addresses remain immutable after creation; edit metadata or delete and recreate to move one. Optional default expiry prefills 90 days. Expiry reminders require enablement, a lead time, and a saved notification method; delivery is one-time per expiry event. Delete expired reservations is a confirmed bulk operation with a result count.

## Conflicts

Conflicts identify duplicate addresses, overlapping subnets, gateway/DHCP-range collisions, and reservation/lease/device disagreements. Open the source records from the conflict row, correct the underlying device/subnet/lease/reservation, then refresh. A conflict is not resolved by hiding it or deleting a current lease without understanding its source.

## DHCP leases

Import supported plain-text lease exports from the DHCP server. Parsed fields include IP address, MAC, hostname, expiry, active state, and source. Preview/import reports accepted and rejected rows; duplicate/current records are updated according to the importer rather than creating a second active lease. **Clear imported leases** is destructive to imported rows only; re-import from the authoritative server when needed.

## VLAN suggestions and performance

Import VLAN/group ranges as subnet suggestions. Select the desired suggestions and review duplicates before creating rows. When several rows match a group by CIDR/VLAN, the canonical row already using the group CIDR wins, preventing unique-CIDR failures during metadata synchronisation.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| cannot create or edit | missing `ipam_write` | update role permissions |
| CIDR rejected | malformed address, overlap, or special-purpose range | correct the CIDR and inspect conflicting subnets |
| unique-CIDR error after VLAN import | duplicate matching subnet rows | retain the canonical row and merge/remove the duplicate |
| utilisation looks stale | device/lease/reservation data changed | refresh IPAM and re-import authoritative leases |
| address grid is not exhaustive | large IPv4/IPv6 range | use filters/search and summary counts; do not expect every address to render |

## API equivalents

- `/api/v1/ipam/summary`
- `/api/v1/ipam/subnets`
- `/api/v1/ipam/reservations`
- `/api/v1/ipam/dhcp-leases`
- `/api/v1/ipam/conflicts`
- `/api/v1/ipam/vlan-suggestions`

## Related pages

- [Create An IP Reservation](../guides/create-ip-reservation.md)
- [Import DHCP Leases](../guides/import-dhcp-leases.md)
- [VLANs And Groups](./vlans.md)
- [Locations](./locations.md)
