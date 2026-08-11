---
title: External IP Pools and Assignments
description: Understand how NetMap tracks provider-assigned public IP ranges separately from internal IPAM.
sidebar_position: 18
keywords: [external IP, public IP, address pool, assignment, provider allocation]
verified_version: "1.5.0"
---

# External IP Pools and Assignments

External IP tracking is for administrators and operators who manage provider-assigned public addresses. It is separate from internal subnet IPAM and does not configure a provider, router, or firewall.

## Pool versus assignment

An **external IP pool** represents a provider allocation or public CIDR/range. An **assignment** records one address from that pool with a label and optional provider, account, owner, service, tags, and notes. Assignment status distinguishes operational use such as `in_use` and `reserved`.

## Validation rules

- Private, loopback, link-local, multicast, and other special-purpose ranges are rejected.
- Overlapping external allocations are blocked.
- An assignment must belong to a pool and remain inside that pool.
- An address cannot be assigned twice.
- Resizing or deleting a pool cannot orphan an existing assignment.

These checks protect the inventory model; they do not prove that a provider has actually routed the address or that a service is reachable from the Internet.

## Planning example

Record the provider's public allocation as a pool, then create assignments for addresses used by a reverse proxy, mail service, VPN, or reserved future service. Keep provider account and ownership fields current enough for incident response, and avoid putting credentials in notes.

## Related pages

- [IPAM workspace](../using-netmap/ipam.md)
- [Privacy and Data Collection](./privacy-and-data-collection.md)
- [Network Exposure](../security/network-exposure.md)
- [Internal IPAM Data Model](./ipam-data-model.md)
