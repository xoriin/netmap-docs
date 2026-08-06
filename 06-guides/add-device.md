---
title: Add A Device
description: Add a device to NetMap inventory.
sidebar_position: 1
keywords: [device, inventory]
---

# Add A Device

## What This Does

Creates a device record that can appear in inventory, topology, monitoring, IPAM, and related security-event lookups.

## Before You Begin

You need a role with `topology_write`.

## Steps

1. Open Inventory or Topology.
2. Create a device.
3. Enter identifying fields such as name, IP address, hostname, MAC address, type, group, and site where available.
4. Save.

## Expected Result

The device appears in Inventory and can be used in topology relationships.

## API Equivalent

```bash
API_URL="https://netmap.example.com"
API_KEY="<api-key>"

curl --fail-with-body \
  --request POST \
  --url "${API_URL}/api/v1/topology/devices" \
  --header "X-API-Key: ${API_KEY}" \
  --header "Content-Type: application/json" \
  --data '{"name":"core-switch","ip_address":"192.168.1.2"}'
```

Confirm the exact request schema in `/api/docs` before automating; device fields are defined in `backend/app/schemas/topology.py`.
