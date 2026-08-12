---
title: Monitoring
sidebar_position: 7
keywords: [monitoring, health, service checks, HTTP monitors]
---

# Monitoring

Monitoring has separate **Devices** and **Monitors** views. Devices represent inventory records and their observed health; Monitors are independent HTTP/HTTPS endpoints. Changes require `monitoring_write`.

## Devices workspace

The Devices view provides summary cards, searchable/filterable/paginated rows, a details panel, heartbeat history, service-check results, uptime, latency, packet loss, last-check time, incidents, and analysis. Sortable columns can be resized and reset; the table keeps fixed widths so one divider does not redistribute other columns.

## Health model

Health is observed versus expected, not a raw ping flag:

- `healthy` means checks meet the expected state;
- `unhealthy` means an expected-online device is failing;
- `unknown` means no reliable observation exists;
- `paused`/disabled/lifecycle states mean the device is not actively checked;
- an expected-offline device is healthy when it is offline intentionally.

Ping, attached service checks, manual status, expected status, monitoring pause, and lifecycle are combined by the server. Prefer the returned `health_status` rather than recomputing it in an integration.

## Controls and fleet data

Administrators can enable/disable global live ping monitoring and set the monitoring interval within the configured safe range. A per-device Pause/Resume control overrides normal checks and is visible in Inventory, Details, Overview, and Monitoring. Favourites are per-user. Search and filters include health, expected/paused state, and favourites.

The page uses a bounded stale-while-revalidate cache: route re-entry paints the last snapshot immediately, then performs a delta refresh when possible or a full refresh when stale. Summary data settles before the device table so a slow table request does not hide fleet totals. A missing last-check value is a null state, not zero latency.

## History, baselines, and incidents

Heartbeat history shows sampled status and RTT over the selected range. Uptime is the proportion of successful observations; latency and packet-loss values are calculated only from available samples. Device analysis reports p50/p95, standard deviation, trend, and an anomaly score when enough samples exist; insufficient data is shown explicitly. Flapping detection identifies repeated state changes over the configured threshold. Incidents include start, end, duration, and longest outage when an outage has closed.

## Service checks

Service checks are device-scoped and can be applied globally or to selected devices. TCP checks use a port or range; UDP checks report reachability limitations because many UDP services do not acknowledge arbitrary probes. HTTP/HTTPS device checks support method, path, expected status, redirects, TLS verification, timeout, and scope. Results show protocol, status, response time, and failure details. Checks can be paused, resumed, edited, or deleted; history is retained according to monitoring retention settings.

### DHCP checks

A DHCP check sends `DHCPINFORM` to UDP 67 and requires a matching `DHCPACK`. It never requests, renews, reserves, or releases a lease. The image grants only low-port bind capability for the UDP 68 reply. Microsoft DHCP commonly ignores an inform whose `ciaddr` is outside a served scope, so Docker bridge mode often needs `network_mode: host`.

## Standalone HTTP/HTTPS monitors

Monitors have their own name, URL, interval, timeout, retry count/interval, enabled/paused state, tags, description, and upside-down mode (a failed request is healthy when failure is expected). Methods support redirect following, maximum redirects, cache busting, and request headers. Bodies may be JSON, form, plain text, or XML subject to the request method and size limits.

Assertions include accepted status codes/ranges, required or forbidden keywords, and JSONPath operators/expected values. Authentication supports Basic, Bearer, OAuth 2.0 client credentials (token URL, client credentials, scopes, audience, auth method), and mutual TLS. Custom CAs, TLS verification, certificate issuer/expiry tracking, and an HTTP proxy are supported.

Headers, bodies, passwords, tokens, proxy credentials/URLs, CA material, and client certificates/private keys are encrypted and write-only. Leave a secret field blank while editing to preserve it. Requests stream at most 2 MiB and do not log decrypted configuration or response bodies. Certificate expiry alerts require the monitor warning option plus the corresponding Admin alert rule.

## Endpoint history and troubleshooting

Endpoint details show uptime, response-time history, heartbeat, recent HTTP status, response size, assertion diagnostics, and certificate issuer/expiry. A failure can be DNS/network, proxy, TLS, OAuth, mTLS, HTTP status, body/JSONPath assertion, timeout, or retry exhaustion; use the detailed result rather than treating every failure as “offline”.

| Symptom | Likely cause | Fix |
|---|---|---|
| device appears offline while intentionally down | expected status is online or monitoring is not paused | set expected offline or pause monitoring |
| all ping checks fail in a container | missing `CAP_NET_RAW` | verify image capabilities and host/network permissions |
| DHCP check fails on Windows Server | `ciaddr` is outside the served scope or bridge networking hides the route | test with host networking and a matching scope |
| endpoint TLS fails | untrusted CA, expired certificate, or verification mismatch | inspect issuer/expiry and configure a trusted CA or verification policy |
| endpoint assertion fails | status, keyword, or JSONPath condition is not met | inspect the assertion detail and correct the expected expression |

## API equivalents

- `GET /api/v1/monitoring/summary`
- `GET /api/v1/monitoring/devices`
- `GET /api/v1/monitoring/devices/{device_id}/history`
- `GET /api/v1/monitoring/devices/{device_id}/analysis`
- `GET/POST /api/v1/monitoring/service-checks`
- `GET/POST/PATCH/DELETE /api/v1/monitors`
- `GET /api/v1/monitors/{monitor_id}/history`
