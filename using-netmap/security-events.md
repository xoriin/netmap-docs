---
title: Security Events
sidebar_position: 9
keywords: [security, syslog, firewall, events]
---

# Security Events

The Security workspace is the broad firewall/syslog search surface. It is separate from topology's selected-device activity view and stores events in `firewall.db` so log volume does not lock the main inventory database. Viewing requires `security_view`; filtered export requires `firewall_export`.

## Ingestion

Configure a firewall, router, switch, or host to forward syslog to the NetMap host and the enabled listener. Defaults are UDP `1514` and TCP `1514`; bridge mode requires publishing both protocol ports, while host mode binds them directly. UDP is lightweight but lossy; TCP provides a persistent stream with a configured connection limit. Messages are capped by `SYSLOG_MAX_LINE_BYTES` (default 8192), and `SYSLOG_MAX_TCP_CONNECTIONS` limits concurrent TCP senders.

`SYSLOG_SENDER_ALLOWLIST` accepts sender IPs/CIDRs. Rejected senders are logged as rejected, including the proxy/trusted-client interpretation where configured. Restrict the allowlist to expected devices and test with a single sender before broadening it.

NetMap accepts common RFC-style and firewall log formats. Parsed fields include timestamp, source/destination addresses and ports, action, protocol, interface, rule, and reason. Unrecognised messages remain available as raw logs rather than being discarded. Syslog over TLS settings may exist in deployments, but the current published listener support must be verified against the image before promising a TLS sender configuration; use UDP/TCP unless TLS support is confirmed.

## Search and filters

Search raw text with full-text matching or combine structured filters for address, port, protocol, action, interface, rule, reason, and time range. The FTS5 mirror indexes `firewall_events.raw_log`; field filters continue to use the parsed columns. Saved searches are named filters owned by the creating user; apply or delete them from the workspace.

## Live events and device correlation

The live stream uses an authenticated WebSocket and reconnects when the connection drops, subject to `SYSLOG_WS_MAX_CONNECTIONS`. API-key authentication is intentionally not supported for this WebSocket; use a browser session or the polling API. Selecting a device activity view correlates events by the device IP and returns an isolated empty/error result if the firewall database is unavailable; it does not make topology perform a broad log aggregation.

## Export and retention

Export the current filtered result as CSV or JSON with `firewall_export`; limits and active filters are included in the request. `FIREWALL_LOG_RETENTION_DAYS` controls retention (default 7). Cleanup deletes rows in committed batches, and FTS maintenance/rebuild runs after startup so large databases do not delay health checks. Plan disk space for raw logs plus the FTS index.

## Corruption recovery

Schema-level corruption of `firewall.db` triggers controlled disposal, removal of the firewall database/WAL/SHM sidecars, and recreation. FTS shadow-table corruption is handled separately by rebuilding the FTS index without deleting the main event table. Treat automatic recovery as data loss for unrecovered raw events; restore from an external backup when required.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| no events arrive | listener disabled, wrong port/protocol, firewall, or bridge mapping | check `SYSLOG_*`, publish ports, and inspect container logs |
| sender rejected | allowlist excludes its address or proxy trust is wrong | correct the CIDR/forwarded-client configuration |
| fields are empty | unsupported sender format | retain/search the raw log and add a parser mapping if supported |
| search is slow/incomplete | FTS maintenance or index corruption | check startup logs and allow the rebuild to finish |
| live stream disconnects | WebSocket limit, proxy upgrade, or expired session | verify proxy WebSocket support and reconnect with a browser session |
| `403` | missing `security_view`/`firewall_export` | update the role or API-key owner permissions |

## API equivalents

- `GET /api/v1/syslog/status`
- `GET /api/v1/syslog/events`
- `GET/POST /api/v1/syslog/searches`
- `DELETE /api/v1/syslog/searches/{search_id}`
- WebSocket live stream (browser session authentication)

## Related pages

- [Syslog](../configuration/syslog.md)
- [Search Syslog Events](../guides/search-syslog.md)
- [Ports](../reference/ports.md)
