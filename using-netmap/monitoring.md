---
title: Monitoring
sidebar_position: 7
keywords: [monitoring, health, service checks, HTTP monitors]
---

# Monitoring

Monitoring has **Devices**, **Endpoints** and **Status pages** views. This page covers devices and their service checks; see [HTTP Endpoint Monitors](./endpoint-monitors.md) and [Status Pages](./status-pages.md) for the others. Changes need `monitoring_write`, and **Status pages** needs `status_page_manage`.

## Devices View

The Devices view lists your monitored devices with search, filters and pages, and opens a details window for each one with heartbeat history, service-check results, uptime, latency, packet loss, incidents and analysis. Drag a column divider to resize it, or double-click to reset all columns.

The view opens with **Fleet Health**, a ring of the devices matching your filters split into **Healthy**, **Unexpected**, **Unknown**, and **Paused**. Beside it are the **Monitored**, **Healthy**, **Unexpected**, **Avg RTT**, **Monitored ports**, and **Live ping** cards. Select **Healthy** or **Unexpected** to filter the table, **Monitored** to clear those filters, or **Monitored ports** to manage service checks.

Above the device table, **Highest Latency** ranks up to six devices by average RTT. **Devices by VLAN** counts every matching device by its VLAN, including **No VLAN** for unassigned devices. Both start as horizontal bars and follow the device table filters across all matching pages. Changing the table page does not change chart membership.

Use the sliders icon in either chart header to change its style; see [Personal Chart Views](./chart-views.md). **Highest Latency** is a ranking, so it offers bars, columns, line, area, dot plot, number and data table, but not ring, pie, stacked bar, treemap or gauge. Hover or focus a mark to read its full label and value.

## Health Model

Health is observed versus expected, not a raw ping flag:

- `healthy` means checks meet the expected state;
- `unhealthy` means an expected-online device is failing;
- `unknown` means no reliable observation exists;
- `paused`/disabled/lifecycle states mean the device is not actively checked;
- an expected-offline device is healthy when it is offline intentionally.

Ping, attached service checks, manual status, expected status, monitoring pause, and lifecycle are combined by the server. Prefer the returned `health_status` rather than recomputing it in an integration.

## Controls And Fleet Data

Administrators can enable/disable global live ping monitoring and set the monitoring interval within the configured safe range. The interval runs from the start of one scheduled batch to the next: time spent checking devices and services counts toward it. A batch that takes longer than the interval finishes before the next starts; checks do not overlap. A per-device Pause/Resume control overrides normal checks and is visible in Inventory, Details, Overview, and Monitoring. Favourites are per-user. Search and filters include health, expected/paused state, and favourites.

Users with monitoring write permission can run one device's enabled checks immediately with **Check now**, from the header of the device's details window (beside **Pause monitoring**) or from its service-check configuration. It runs the same status probe and service checks as a scheduled cycle for that device only, records normal history, and evaluates alert rules; it is unavailable while the device is paused or not active.

When you return to Monitoring, it shows the last data it loaded straight away and then refreshes. Fleet totals load before the device table, and a device that has never been checked shows no value rather than zero latency.

A device recorded without an IP address is never probed: monitoring, live status, and service checks skip it and show it as Unknown until an address is added.

## History, Baselines And Incidents

Heartbeat history shows sampled status and RTT over the selected range.

In the device details window, move the pointer along the heartbeat to enlarge each check and see its time, status, expected state, RTT and service results; click a check to keep its details open, use the left and right arrow keys to step through checks, and press Escape to close them. New checks animate in at the right-hand end as they arrive.

Uptime is the proportion of successful observations; latency and packet-loss values are calculated only from available samples.

Device analysis reports p50/p95, standard deviation, trend, and an anomaly score when enough samples exist; insufficient data is shown explicitly. Flapping detection identifies repeated state changes over the configured threshold. Incidents include start, end, duration, and longest outage when an outage has closed.

### Zoom The Response Time Chart

The **Response Time** chart in the device details window, endpoint details and an Overview favourite shows a dashed line at the average. It reads the time and RTT of the nearest reading under the pointer, or with the arrow keys.

- Scroll over the chart to zoom into part of the timeline.
- Drag to move along the zoomed timeline.
- Double-click, press Escape or select **Reset zoom** to return to the full range.

## Service Checks

Service checks are device-scoped and can be applied globally or to selected devices. TCP checks use a port or range; UDP checks report reachability limitations because many UDP services do not acknowledge arbitrary probes. HTTP/HTTPS device checks support method, path, expected status, redirects, TLS verification, timeout, and scope. Results show protocol, status, response time, and readable failure details. Checks can be paused, resumed, edited, or deleted; history is retained according to monitoring retention settings.

The list can be kept in automatic alphabetical order or switched to manual order. Manual mode provides a drag handle on each row and stores the chosen sequence. Dragging shows a translucent copy and opens space at the prospective drop position.

### DHCP Checks

A DHCP check sends `DHCPINFORM` to UDP 67 and requires a matching `DHCPACK`. It never requests, renews, reserves, or releases a lease. The image grants only low-port bind capability for the UDP 68 reply. Microsoft DHCP commonly ignores an inform whose `ciaddr` is outside a served scope, so Docker bridge mode often needs `network_mode: host`.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| device appears offline while intentionally down | expected status is online or monitoring is not paused | set expected offline or pause monitoring |
| all ping checks fail in a container | missing `CAP_NET_RAW` | verify image capabilities and host/network permissions |
| DHCP check fails on Windows Server | `ciaddr` is outside the served scope or bridge networking hides the route | test with host networking and a matching scope |

For endpoint failures, see [Endpoint History And Troubleshooting](./endpoint-monitors.md#endpoint-history-and-troubleshooting).

## Use The API

- `GET /api/v1/monitoring/summary`
- `GET /api/v1/monitoring/devices`
- `GET /api/v1/monitoring/devices/{device_id}/history`
- `GET /api/v1/monitoring/devices/{device_id}/analysis`
- `POST /api/v1/monitoring/devices/{device_id}/check`
- `GET/POST /api/v1/monitoring/service-checks`
- `PUT/DELETE /api/v1/monitoring/service-checks/{target_id}`
- `GET/PUT /api/v1/monitoring/service-checks/order-config`

## Related Pages

- [HTTP Endpoint Monitors](./endpoint-monitors.md)
- [Status Pages](./status-pages.md)
- [Configure Service Checks](../guides/configure-service-checks.md)
