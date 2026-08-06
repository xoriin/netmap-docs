---
title: Import DHCP Leases
description: Import DHCP lease data into IPAM.
sidebar_position: 8
keywords: [DHCP, IPAM, leases]
---

# Import DHCP Leases

DHCP lease import updates IPAM lease visibility.

Required permission: `ipam_write`.

API equivalent:

`POST /api/v1/ipam/dhcp-leases/import` with `DhcpImportRequest`.

Documentation gap: this page needs parser-specific file examples from `backend/app/services/ipam/dhcp_parser.py`.

## What This Does

DHCP lease import brings external lease data into NetMap so IPAM can show leased addresses alongside known devices and reservations.

## Before You Begin

Confirm:

- you have `ipam_write`;
- the lease data is from a trusted source;
- the target subnet exists or can be created;
- the imported file does not expose secrets before sharing it with anyone.

## After Import

Check:

- `GET /api/v1/ipam/dhcp-leases`;
- subnet address grid;
- conflict list;
- IPAM summary.

## Common Problems

| Symptom | Likely cause | Fix |
|---|---|---|
| import rejected | request does not match parser/schema | check `/api/docs` and parser docs |
| leases not visible in subnet | subnet mismatch | verify CIDR and lease IPs |
| conflicts appear | lease overlaps device/reservation | review IPAM conflict list |

## Related Pages

- [IPAM](../using-netmap/ipam.md)
- [Create An IP Reservation](./create-ip-reservation.md)
- [Storage](../configuration/storage.md)
