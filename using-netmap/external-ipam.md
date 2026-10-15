---
title: External IPAM
sidebar_position: 9
keywords: [external IP, public address, IPAM, locations]
---

# External IPAM

External IP tracking is a flat register of the publicly routable addresses you hold — from an ISP, a cloud provider, a circuit, a customer, NAT, VPN, or a service. Each row is one address: what it is for, which device holds it, and whether it is in use, reserved, or free. It is separate from internal discovery, DHCP leases, and private subnets, and uses the IPAM write permission (`ipam_write`).

Open **IPAM → External IPs**. The summary cards show **Addresses**, **In use**, **Available**, and **Locations**.

## Add an address

Choose **Add external IP**. The only required field is the address.

The address field accepts:

- a single IPv4 or IPv6 address, such as `203.0.113.7`;
- a CIDR, such as `203.0.113.0/29`; or
- an inclusive range, such as `203.0.113.10-203.0.113.13`.

A count under the field shows how many addresses the entry represents before you save. One add can create at most **256** addresses (a `/24` in IPv4, a `/120` in IPv6); larger entries are refused with the count shown. For IPv4 CIDRs of `/30` or larger, the network and broadcast addresses are left out; IPv6 CIDRs leave out the subnet-router anycast address. An address can only be tracked once — adding one that already exists is refused and nothing from that add is saved.

For a single address, the form also offers **Location**, **Status**, **Device**, and **Purpose**, with **Owner**, **URL**, **Tags**, and **Notes** under **More details**. When the entry covers more than one address, the per-address fields are hidden and every created address gets the chosen location and status, which defaults to **Available** — so a range you have just been given shows up as free capacity.

### Locations

Locations are optional. **Location** is a pick-or-create list: choose an existing location (shown under its provider and account), leave it as **Unassigned**, or pick **+ Create location…** to add one inline with its provider, account, name, and region. Provider, account, and location are organisation only — never something you have to set up before recording an address.

### Add to Inventory and Monitoring

Turn on **Also add to Inventory and Monitoring** when the address belongs to a device NetMap should monitor. After the address is saved, the standard Add Device form opens with the address and details prefilled; review the device type, icon, and monitoring state before creating it. Cancelling that form keeps the saved address. Leave the option off for NAT addresses, virtual IPs, provider gateways, and reserved addresses. The option is shown only to roles that can create Inventory devices.

## Browse and filter

The table lists **Address**, **Purpose**, **Device**, **Status**, **Owner**, and **Tags**. Search covers addresses, purpose, device, owner, and tags; the status filter narrows to in-use, reserved, or available addresses, and **Clear filters** resets both.

**Group by** organises the table by **Location** (the default), **Provider**, **Status**, or **Nothing**. Group headings are collapsible and show how many addresses they hold and how many are free. Addresses without a location appear under **Unassigned**. When grouped by location, a group's heading carries **Edit location** and **Delete location**.

## Edit, release, and delete

Use a row's **Edit** action to change the address, location, status, purpose, device link, owner, URL, tags, or notes. **Mark available** releases an address in one step: it clears the device link and purpose and sets the status to available, without deleting the address or the Inventory device.

**Delete** removes the address from the register. A linked Inventory device is never deleted with it.

A location that still holds addresses cannot be deleted — move or remove its addresses first. Likewise, a provider account cannot be deleted while it has locations.

## Upgrading from 1.6.0 or earlier

Before 1.7.0, External IPs were organised as **Provider → Cloud service/area → Allocation → Address**, and linked devices appeared under **Inventory → Cloud assets**. Upgrading converts this automatically, with nothing to do by hand:

- Every tracked address is kept, with its label (now **Purpose**), owner, tags, notes, URL, and device link.
- Free addresses inside an allocation become rows with the status **Available**, so remaining capacity is still visible.
- Each migrated address gets a note recording the allocation it came from, such as `From allocation: Public web endpoints · Amazon EC2`, so the old organisation can be re-filed into locations.
- Allocations that had no location appear under **Unassigned**.
- An allocation larger than 256 addresses keeps all of its tracked addresses, but its free addresses are not expanded. External IPs shows a dismissible notice naming the location; add a smaller range afterwards if you want to track free addresses there.

The upgrade checks that every address it should carry forward was written. If the counts do not match, the whole upgrade is rolled back and the database is left as it was.

**Inventory → Cloud assets** has been removed. A cloud asset was always an ordinary Inventory device, so those devices remain in Inventory.

## Ownership conventions

Use the location for where an address lives (a region, datacentre, or site), the provider account for the commercial boundary, **Purpose** for what the address does, **Owner** for the internal team or customer, and tags or notes for NAT, VPN, and change references. Keep secrets and credentials out of address notes.

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| "Too large — N addresses, limit is 256" | the entry covers more than 256 addresses | add the block in smaller pieces |
| "… is already tracked" | the address is already in the register | find and edit the existing row instead |
| "Enter a valid IP address, CIDR, or range" | the entry could not be parsed | check the address, prefix, or both ends of the range |
| "Move or remove this location's addresses first" | the location still holds addresses | move its addresses to another location or Unassigned, then delete it |
| a large migrated block shows no free addresses | it was over 256 addresses and was not expanded during upgrade | add the range you want to track in pieces of 256 or fewer |
