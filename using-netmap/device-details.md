---
title: Device Details
sidebar_position: 5
keywords: [devices, details, inventory, monitoring]
---

# Device Details

The device details view is the record-level editor used from Overview, Inventory, Topology, Monitoring, IPAM, and Security. The same device record is shared by those workspaces, so an edit is visible everywhere after refresh.

## Open and edit a record

Select a device row, node, result, or linked IP. Users with `topology_write` can double-click an editable value, type a replacement, then press Enter or leave the field to save. Escape cancels. Read-only users see values but no edit affordance. Delete is irreversible and requires confirmation.

## Identity and classification fields

The form and details view support:

| Field | Guidance |
|---|---|
| Display name | Friendly label shown in lists and topology; may be blank when hostname/IP is available. |
| Hostname | DNS name or local host label; keep it distinct from display name when both are useful. |
| IP address | A valid IPv4 or IPv6 address; it is used for monitoring and security-event correlation. |
| MAC address | Normalised hardware address when known; discovery may populate it. |
| Vendor / OS | Free-text enrichment displayed in inventory and details. |
| Device type / icon | Built-in or custom type; the selected type supplies the default icon. |
| Status | Manual seed value (`online`, `offline`, `warning`, or `unknown`); monitoring can provide the observed state. |
| Lifecycle | `planned`, `active`, `retired`, or `ignored`; non-active records are not treated as active outages. |

Health is resolved from observed state, expected status, monitoring pause, and lifecycle. Do not interpret the raw manual status as the final health badge. An expected-offline device is intentional; a paused, retired, or ignored device is not actively monitored.

## Organisation and enrichment

Assign a VLAN/group explicitly or leave it unassigned. A topology group label can also be inferred from relationships; inference does not create an explicit group assignment. Assign a location/site to include the device in site filters. Subnet accepts CIDR notation. Tags are comma-separated values and notes are free text. An SNMP profile can be selected for eligible enrichment; credentials remain protected by the profile and are not shown in the device record.

## Monitoring and favourites

Pause or resume monitoring from the details header. Paused devices show a paused state rather than an outage and do not receive normal checks. Favourites are per-user and affect the Overview favourites list only; favouriting never changes monitoring or inventory data.

## Activity and SNMP ARP enrichment

The Activity tab is available to users with security-event permission. It correlates firewall activity to the device IP and isolates firewall-database failures from the main device view. With an SNMP profile, **SNMP ARP preview** lists proposed field changes without writing them. Review the current and suggested values, then choose **Apply updates**; no-change previews are safe to dismiss. Refresh Inventory after applying enrichment.

## Delete a device

Use Delete only after checking topology links, monitoring history, observations, reservations, and security references. The API performs the supported relationship cleanup, but deletion removes the device record and cannot be undone through the UI. Export or record required information first.

## Troubleshooting state

- A stale badge may mean the monitoring refresh is still running; compare the last-check time in Monitoring.
- `unknown` means no reliable observation is available, not necessarily that the device is offline.
- `warning` indicates a partial or degraded check.
- Ping failures in a container can result from missing `CAP_NET_RAW`; verify the image capability and host networking requirements.
- Expected offline, paused, retired, and ignored records should not be treated as unexpected outages.

## Related pages

- [Inventory](./inventory.md)
- [Monitoring](./monitoring.md)
- [Add A Device](../guides/add-device.md)
- [Import Devices](../guides/import-devices.md)
- [Security Events](./security-events.md)
