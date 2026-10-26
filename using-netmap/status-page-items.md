---
title: Status Page Groups And Items
sidebar_position: 15
keywords: [status page, groups, items, display names, heartbeat, uptime, extras]
---

# Status Page Groups And Items

This page explains what a [status page](./status-pages.md) shows for each item: its group, display name, state, heartbeat bar, uptime and optional extras. You arrange them under **Groups and items** in the page editor.

## Groups And Items

A **group** is a named, collapsible section; groups and the items inside them can be reordered by dragging the handle or with the move up and down arrows. A group can be set to start collapsed.

An **item** is one of:

- a **device**,
- an **endpoint** (an HTTP monitor), or
- a single **service check** on a device, for example "Jellyfin HTTPS" on the media server. A service-check item reports that check's own result, not the device's ping result.

The same source can sit on several pages, with a different display name and different extras on each.

## Display Names Are Required

Every item needs a **display name**, and visitors only ever see group names and display names. There is no fallback to the hostname or IP address, so a page cannot be saved with an unnamed item. The editor shows the real source (marked internal) beside each row, and an ID you can use with the [integration API](../api/guides/status-page-integrations.md).

## Item States

| State | Meaning |
|---|---|
| **Operational** | Healthy by the same observed-versus-expected model Monitoring uses. An expected-offline device that is observed offline is Operational. |
| **Degraded** | Healthy, but an enabled threshold rule (response time above, failed-probe rate, slow service) is currently breaching. |
| **Down** | Unhealthy. |
| **Under maintenance** | Inside an active maintenance window that includes the item. This overrides the other states. |
| **Unknown** | No recent observation, monitoring paused, or no IP address. NetMap never turns a stopped worker into Down or Operational. |

An observation goes stale after twice the check interval (at least 60 seconds), after which the item reads Unknown.

The summary line at the top of the page applies this order: no items is "No systems configured"; more than half of the items Down is "Major outage"; any Down or Degraded item, or a critical notice, is "Some systems are affected"; otherwise any Unknown item is "Status unavailable for some systems"; otherwise any item in maintenance is "Maintenance in progress"; otherwise "All systems operational". Unknown and maintenance are never counted as healthy or as Down.

## Heartbeat Bar And Uptime

Each row shows 60 heartbeat slots across the page's heartbeat window. Each slot is painted with the worst known health in that slot, grey if nothing was known, and purple if it was inside maintenance. Slots are aligned to the clock, so they step forward on fixed boundaries instead of sliding on every refresh.

The uptime figure on the row is **observed availability** over the heartbeat window: known healthy time divided by known healthy-plus-unhealthy time. Unknown time and maintenance time are excluded, and a long gap between checks is Unknown rather than green. If less than 90% of the window has known data the row shows **Insufficient data**; if there is none it shows **No data**. The figure is not the share of green slots.

## Extras

All extras are off by default. Enable them per item in the editor and the row gains a disclosure arrow; a row without extras does not expand. 

| Extra | Shows |
|---|---|
| **Response-time graph** (**RTT graph** for ICMP) | The average successful response time per slot, on the same time axis as the heartbeat bar. Measured points form a line across healthy intervals, with gaps for failed or unknown intervals. A single measurement shows a point; zero stays zero, and empty history says No successful responses. |
| **Uptime over 24 h / 7 d / 30 d** | Availability over the chosen period. |
| **Average response time** | Mean of the successful samples in the heartbeat window. |
| **p95 response time** | Nearest-rank 95th percentile of the same samples. |
| **Failed-check rate** | Failed checks divided by completed known checks. This is not packet loss. |
| **Time since last check** | How long ago the most recent observation was. |

Rows expand with native disclosure elements, so they work without any script.

## Related Pages

- [Status Pages](./status-pages.md)
- [Status Page Incidents And Maintenance](./status-page-incidents.md)
- [Monitoring](./monitoring.md)
