---
title: IPAM
description: Manage subnets, addresses, reservations, DHCP leases, and conflicts.
sidebar_position: 8
keywords: [IPAM, subnet, reservations, DHCP]
---

# IPAM

IPAM manages subnets, address grids, reservations, DHCP lease imports, and conflicts.

API equivalents:

- `/api/v1/ipam/summary`
- `/api/v1/ipam/subnets`
- `/api/v1/ipam/reservations`
- `/api/v1/ipam/dhcp-leases`
- `/api/v1/ipam/conflicts`
- `/api/v1/ipam/vlan-suggestions`

Write actions require `ipam_write`.

## What IPAM Helps With

Use IPAM to understand how address space is used and where conflicts exist. It combines known device IPs, DHCP lease data, and reservation records.

Common tasks:

- create and edit subnets;
- inspect address grids;
- find next available addresses;
- reserve IPs;
- import DHCP leases;
- clear expired reservations;
- review conflicts;
- import subnet suggestions from VLAN groups.

## API Example

```bash
API_URL="https://netmap.example.com"
API_KEY="<api-key>"

curl --fail-with-body \
  --url "${API_URL}/api/v1/ipam/summary" \
  --header "X-API-Key: ${API_KEY}"
```

## Common Problems

| Symptom | Likely cause | Fix |
|---|---|---|
| cannot create subnet | missing `ipam_write` | update role permissions |
| address count seems wrong | stale device/DHCP/reservation data | refresh relevant data sources |
| import from VLAN unavailable | no valid VLAN group suggestions | check group IP range metadata |

## Related Pages

- [Create An IP Reservation](../06-guides/create-ip-reservation.md)
- [Import DHCP Leases](../06-guides/import-dhcp-leases.md)
- [VLANs And Groups](./vlans.md)
