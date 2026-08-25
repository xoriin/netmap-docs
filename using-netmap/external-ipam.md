---
title: External IPAM
sidebar_position: 9
keywords: [external IP, public address, IPAM, allocations]
---

# External IPAM

External IP tracking records publicly routable allocations from an ISP, cloud provider, circuit, customer, NAT, VPN, or service. It is logically separate from internal discovery, DHCP leases, and private subnets but uses the IPAM write permission (`ipam_write`).

## Hierarchy and summary

Open **IPAM → External IPs**. External IPAM is organised as **Provider → Cloud service/area → Allocation → Address**:

- **Provider** is the primary organisational point, such as AWS, Azure, Oracle Cloud, an ISP, or no provider.
- **Cloud service/area** separates workloads such as Amazon EC2, AWS Lambda, Azure Virtual Machines, App Service, Storage, or another operational area.
- **Allocation** records the named public address source, account/subscription, region, description, and one or more provider-supplied ranges.
- **Address** is one usable public IP, optionally carrying tracking metadata and an Inventory-device link.

Provider and service rows start open. Allocations start collapsed, except single-address `/32` and `/128` allocations, and can be expanded from either the row or its chevron. Count badges, address/in-use totals, and utilisation bars summarize each tier. Search covers provider, service, allocation, account, region, CIDR/range, address, device, owner, and label; the status filter narrows records to in-use, reserved, or available addresses.

Provider rows use the brand mark configured under **Admin → Cloud providers**. Providers are reusable catalogue records with names, aliases, and built-in or uploaded marks; removing one leaves its allocations intact under **No provider**. Provider branding is separate from the user-selected icon on each allocation.

## Create and maintain allocations

Choose **Add allocation**, then provide a name, public IP allocation, provider, cloud service/area, account or subscription, region, description, and allocation icon. The allocation icon uses the same searchable icon catalogue as Inventory and Topology, including installed custom icon packs.

The public allocation can be:

- a single IPv4 or IPv6 address such as `8.8.8.8` (normalised to `/32` or `/128`);
- an explicit inclusive range such as `8.8.8.10-8.8.8.13`; or
- a CIDR such as `8.8.8.0/29`.

CIDR network and broadcast addresses are excluded only for IPv4 prefixes up to `/30`; `/31` and IPv6 allocations treat every represented address as usable. Allocations cannot overlap and are limited to 65,536 addresses. Private, loopback, link-local, multicast, unspecified, and other special-purpose ranges are rejected; use **IPAM → Internal networks** for private address space.

Use the allocation row's **Actions** menu to add another unrelated address/range, edit its metadata and icon, or delete the complete allocation. Ranges are edit-time detail inside the allocation dialog rather than extra rows interrupting the address tree.

## Browse and assign addresses

Expand an allocation to see one row per usable address. Select an available row to add a label, state, owner, tags, notes, and optional Inventory-device link. Track states as **in use**, **reserved**, or **available**; totals are calculated from allocation boundaries and explicit tracking records.

Each address row has direct Edit or Assign and Delete actions. Deleting one address from a larger range removes only that IP: NetMap splits the containing range around the gap so neighbouring addresses remain managed, removes that address's tracking record, and retains any linked Inventory device. If it is the allocation's final address, the confirmation explains that the empty allocation will also be removed.

### Add an address to Inventory and Monitoring

Enable **Add to Inventory and Monitoring** while saving an external-IP tracking record when the address represents a device NetMap should monitor. NetMap opens the standard Add Device form with the address, label, tags, and notes prefilled. Review the device type, icon, and monitoring state before creating it.

Leave the option disabled for NAT addresses, virtual IPs, provider gateways, reserved addresses, and other records that should remain IPAM-only. Cancelling the device form does not discard the saved tracking record. This action is shown only to roles permitted to create Inventory devices.

Linked devices appear under **Inventory → Cloud assets**, grouped Provider → Device → Address. Cloud assets is a view of the shared Inventory device records, not a second asset database. Deleting an address or allocation removes External IP tracking but does not silently delete the Inventory device.

## Ownership conventions

Use provider for the ISP/cloud source, cloud service/area for the provider product or operational subsection, account/subscription for the commercial boundary, allocation name for the address source or workload, owner for the internal team/customer, and tags/notes for NAT, VPN, and change references. Keep secrets and credentials out of public-address notes.

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| allocation rejected | invalid address/range, private or special-purpose address, overlap, or more than 65,536 addresses | use a publicly routable allocation with valid boundaries |
| address cannot be assigned | address is outside the allocation or already tracked | choose an available address in the correct allocation |
| allocation cannot be created | overlap with an existing allocation or size over 65,536 | split or adjust the allocation and remove overlap |
| expected service group is missing | allocation has no service/area or legacy records disagree | edit the allocation and select the correct service/area |
| deleting one IP also removes the allocation | it was the allocation's final address | review the confirmation; add another range first if the allocation must remain |
