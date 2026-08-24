---
title: Create An IP Reservation
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

An IP reservation records that a specific address should be held for a device, service, user, or operational purpose. Reservations help avoid accidental reuse and make IPAM conflict checks more useful. Creating a reservation does not create an inventory device.

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

## Allocate A Reserved Address To A Device

Open the reservation in IPAM and select **Convert to device** beside the close button. NetMap prefills the device form with the reservation's label, address, MAC, and notes, then warns that the address is reserved and asks for confirmation. Confirming removes the reservation and creates the device as one operation; cancelling leaves the reservation unchanged and does not create the device. A claim-capable role without general IPAM editing receives the same conversion action directly on the reservation row.

This conversion requires both `topology_write` and `ipam_reservation_claim`. NetworkAdmin has both permissions by default, SuperAdmin bypasses named permission checks, and a custom role must be granted both explicitly.

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

- [IPAM](../using-netmap/ipam.md)
- [Import DHCP Leases](./import-dhcp-leases.md)
- [API Errors](../api/errors.md)
