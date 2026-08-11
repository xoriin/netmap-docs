---
title: Device Records and State
description: Understand NetMap device identity fields, matching behavior, expected status, lifecycle, and monitoring state.
sidebar_position: 15
keywords: [devices, identity, hostname, MAC, expected status, lifecycle, monitoring]
verified_version: "1.5.0"
---

# Device Records and State

This page is for users and administrators maintaining inventory or interpreting device health. Editing records requires the relevant inventory permission; viewing status depends on workspace access.

## Device identity

| Field | Meaning and behavior |
|---|---|
| Display name | Human-friendly label used in the interface; it may differ from the hostname. |
| Hostname | DNS or discovery name, retained separately from the display name. Reverse DNS may populate discovery results. |
| IP address | Normalized IPv4 or IPv6 address. It is an identity attribute, not proof that the device is reachable. |
| MAC address | Layer-2 identity when discovered or entered. ARP/MAC discovery requires suitable network access. |
| Vendor / operating system | Descriptive or enriched fields; they are not guaranteed for every device. |
| Device type | A built-in or configured classification such as router, switch, server, or camera. |
| Tags and notes | Operator metadata; tags are normalized and deduplicated. |

Discovery can match a host by MAC when available, detect an IP move, and produce a review observation. Matching is not a license to overwrite inventory: scheduled findings remain review-only until applied.

## Four different state concepts

| Concept | Allowed values / meaning | What it answers |
|---|---|---|
| Observed health | `healthy`, `unhealthy`, `unknown`, or `paused` after expected/lifecycle rules are applied | What monitoring currently concludes |
| Expected status | `online` or `offline` | Is reachability expected for this device? |
| Lifecycle | `planned`, `active`, `retired`, or `ignored` | Should this record be treated as part of the active fleet? |
| Monitoring paused | Boolean control layered over health | Should active monitoring be temporarily suppressed? |

An intentionally offline device can be reachable and still be healthy relative to its expectation. A retired or paused device must not be interpreted as an outage. Consumers should use the server-returned `health_status` or the frontend health utility, not raw `status` or `monitor_status` values.

## Empty and changed fields

An empty hostname, MAC, vendor, or OS field means that value is unknown or was not supplied; it is not proof that the device lacks the property. An IP or MAC change may come from DHCP, a replacement device, a discovery mismatch, or an incomplete scan. Review the source scan and observation details before applying a change.

## Related pages

- [Inventory](../using-netmap/inventory.md)
- [Add a Device](../guides/add-device.md)
- [Review Discovery Observations](../guides/scheduled-discovery-observations.md)
- [Monitoring and Discovery Data Model](./monitoring-and-discovery-model.md)
- [NetMap Terminology and Data Model](./terminology.md)
