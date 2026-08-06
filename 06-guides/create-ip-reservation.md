---
title: Create An IP Reservation
description: Reserve an IP address in IPAM.
sidebar_position: 9
keywords: [IPAM, reservation]
---

# Create An IP Reservation

IP reservations are managed through IPAM.

Required permission: `ipam_write`.

API equivalents:

- `POST /api/v1/ipam/reservations`
- `PATCH /api/v1/ipam/reservations/{reservation_id}`
- `DELETE /api/v1/ipam/reservations/{reservation_id}`
- `DELETE /api/v1/ipam/reservations/expired`

Use `GET /api/v1/ipam/subnets/{subnet_id}/next-available` to find an available address.

## What This Does

An IP reservation records that a specific address should be held for a device, service, user, or operational purpose. Reservations help avoid accidental reuse and make IPAM conflict checks more useful.

## Before You Begin

Confirm:

- the subnet exists;
- the address is inside the subnet;
- the address is not already used by a known device or lease unless that is intentional;
- you have `ipam_write`.

## Steps

1. Open IPAM.
2. Select a subnet.
3. Find an available address or enter a known address.
4. Create the reservation with useful owner/purpose notes where available.
5. Review conflicts after saving.

## API Example

Use `/api/docs` for the exact `IpReservationCreate` fields before automating.

```bash
API_URL="https://netmap.example.com"
API_KEY="<ipam-write-api-key>"

curl --fail-with-body \
  --url "${API_URL}/api/v1/ipam/reservations" \
  --header "X-API-Key: ${API_KEY}"
```

## Related Pages

- [IPAM](../05-using-netmap/ipam.md)
- [Import DHCP Leases](./import-dhcp-leases.md)
- [API Errors](../07-api/errors.md)
