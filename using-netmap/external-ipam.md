---
title: External IP Pools And Assignments
description: Track provider-assigned public address allocations separately from internal IPAM.
sidebar_position: 9
keywords: [external IP, public address, IPAM, allocations]
---

# External IP Pools And Assignments

External IP tracking records publicly routable allocations from an ISP, cloud provider, circuit, customer, NAT, VPN, or service. It is logically separate from internal discovery, DHCP leases, and private subnets but uses the IPAM write permission (`ipam_write`).

## Pools and summary

Choose **Add subnet → External range** in IPAM. Enter a provider-supplied arbitrary range such as `8.8.8.10-8.8.8.13` or a CIDR such as `8.8.8.0/29`, plus provider, account/circuit reference, purpose, and description. The summary reports pools, total addresses, in-use, reserved, available, and utilisation.

Explicit ranges include both endpoints. CIDR network/broadcast addresses are excluded only for IPv4 prefixes up to `/30`; `/31` and IPv6 allocations treat every represented address as usable. A pool must contain at least two usable addresses, cannot overlap another pool, and is limited to 65,536 addresses so browsing remains bounded. Private, loopback, link-local, multicast, and unspecified ranges are rejected; use internal IPAM for those.

## Browse and assign addresses

Open a pool for a paginated address map. Select an available address to create an assignment with address, allocation/pool, label, state, owner, service, tags, and notes. Track states as **in use**, **reserved**, or **available**; totals are calculated from the pool boundaries and explicit assignments. An assignment must remain inside its pool and cannot duplicate another assignment.

Edit assignment metadata or state without moving it to another pool; delete and recreate when the address changes. Edit pools only after checking dependent assignments. Deleting a pool is destructive to contained assignments and requires confirmation.

## Ownership conventions

Use provider for the ISP/cloud source, account or circuit for the commercial allocation, owner for the internal team/customer, service for the exposed workload, and tags/notes for NAT/VPN/change references. Keep secrets and credentials out of public-address notes.

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| range rejected | private/special-purpose address or fewer than two usable addresses | use a public allocation with valid boundaries |
| assignment rejected | address is outside the pool or already assigned | choose an available address in the correct pool |
| pool cannot be created | overlap with an existing allocation or size over 65,536 | split/adjust the allocation and remove overlap |
| delete is blocked or surprising | contained assignments exist | export/record assignments, then confirm the destructive delete |
