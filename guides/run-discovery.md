---
title: Run Discovery
sidebar_position: 3
keywords: [discovery, nmap, scan, inventory]
---

# Run Discovery

Discovery runs nmap against private targets and presents detected devices for review before import. It requires `topology_write`. NetMap does not silently overwrite inventory from an ad-hoc scan.

## Requirements and safety

The all-in-one image includes nmap and grants the `netmap` user passwordless sudo for `/usr/bin/nmap`. MAC/ARP discovery requires host networking because ARP does not cross a Docker bridge. Only scan networks you own or are authorised to test. Public and special-purpose targets are rejected; administrator settings control confirmation thresholds and maximum scan size.

## Target formats and scan modes

Targets may be a single IPv4/IPv6 address, CIDR, comma-separated addresses/ranges, or a private `start-end` range. NetMap preserves the entered range for display but normalises it to CIDR arguments before invoking nmap. **Ping sweep** discovers responsive hosts and reverse-DNS names without scanning ports. **Basic port detection** adds the configured lightweight port probe and takes longer.

Large ranges show an estimate before confirmation. Host-count limits, discovery rate limits, and `discovery_process_timeout_seconds` protect the scheduler and container; reverse DNS time counts against the timeout. A scan that exceeds a configured maximum must be reduced rather than forced through the UI.

## Start a scan

1. Open Topology or the Discovery workspace and choose **Discover**.
2. Enter the target(s), choose ping sweep or basic port detection, and select an optional group and location.
3. Choose optional SNMP enrichment: a saved profile or manual community where supported. Never paste secrets into notes.
4. Confirm the estimate and start the scan.
5. Watch progress and wait for the results; cancel or close only when you accept losing the in-progress result.
6. Review each detected row before importing.

The result identifies IP, reverse-DNS hostname, MAC/vendor when available, open-port data for port scans, and whether a row matches an existing device.

## MAC, vendor, and SNMP enrichment

ARP/MAC results require host networking. In bridge mode, discovery can still find IPs but MAC/vendor fields may be empty; enter them manually or rerun with host networking. SNMP can enrich supported network devices and may suggest ARP-derived fields. Saved profile credentials remain protected; preview proposed changes before applying them.

## Review and import behavior

Existing-device matching uses available identity data such as IP/MAC. You can select **new devices only**, import selected rows, fill missing fields on existing records, or explicitly allow selected field overrides. Fill-missing is non-destructive; override can replace existing metadata and should be reviewed field by field. Skipped duplicates and validation failures remain visible in the result summary.

## Scheduled discovery

Create a schedule with target, mode, interval, optional group/location, and a saved notification profile. Schedules can be edited, paused, run immediately, or deleted by users with write permission. Scheduled runs create review-only observations rather than mutating inventory. See [Review Discovery Observations](./scheduled-discovery-observations.md) for apply/resolve workflows and Wi-Fi churn suppression.

## History and troubleshooting

Discovery history records status, timestamps, target/mode, result counts, and errors for completed and failed scans. Retention follows the application's configured history policy.

| Symptom | Likely cause | Fix |
|---|---|---|
| no MAC addresses | Docker bridge or missing raw-network capability | use `network_mode: host` and verify the image capabilities |
| empty result | target is unreachable, filtered, or outside the private range | verify routing and target format, then retry a small CIDR |
| scan times out | reverse DNS, oversized range, or slow probes | reduce the range, use ping sweep, or increase the administrator timeout carefully |
| `429` | discovery rate limit | wait for the window to clear |
| `sudo`/nmap error | image or host dependency/capability issue | inspect container logs and verify `/usr/bin/nmap` and the permitted sudo rule |
| hostname is missing | no PTR response | configure reverse DNS or treat the IP as the identity |

## API equivalents

- `POST /api/v1/discovery/scans`
- `GET /api/v1/discovery/scans`
- `POST /api/v1/discovery/schedules`
- `PATCH /api/v1/discovery/schedules/{schedule_id}`
- `POST /api/v1/discovery/schedules/{schedule_id}/run`

Related request model: `DiscoveryStart`.
