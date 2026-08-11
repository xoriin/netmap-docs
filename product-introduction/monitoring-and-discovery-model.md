---
title: Monitoring and Discovery Data Model
description: Distinguish device checks, service checks, HTTP monitors, discovery scans, schedules, and review observations.
sidebar_position: 19
keywords: [monitoring, service check, HTTP monitor, discovery, scan, observation]
verified_version: "1.5.0"
---

# Monitoring and Discovery Data Model

NetMap has separate records for observing an existing inventory and finding possible changes. This page is for operators planning checks or reviewing discovery results.

## Monitoring layers

| Layer | Attached to | What it records |
|---|---|---|
| Device check | Inventory device | Reachability, expected status, health, latency, and history. |
| Service check | Device and configured target | TCP/UDP or protocol-specific availability for a service. |
| Standalone HTTP monitor | URL, independent of inventory | HTTP method, status range, assertions, TLS, authentication, proxy, retries, and response history. |

An HTTP monitor is not automatically a device record. Sensitive headers, bodies, tokens, proxy URLs, certificates, and keys are encrypted and write-only; APIs expose presence flags rather than plaintext.

## Discovery records

- A **scan** is one nmap execution with a target, scan type, status, host/result counts, results, and error/completion times.
- A **schedule** owns recurring target and notification configuration, interval, latest run, and next-run state.
- An **observation** is a review record produced by comparing scheduled results with inventory. Types include new device, IP move, changed fields, and disappeared host.

Observations are not inventory mutations. A user can apply, resolve, or leave one open. Disappeared-host observations require three consecutive missed scheduled scans. A reappearing host can auto-resolve an open disappearance finding and suppress noisy re-raising within the configured churn window.

## What a scan does not prove

A ping sweep does not scan ports. Reverse DNS may add a hostname and may also add delay. A discovered host is not automatically trusted, imported, monitored, or assigned to a group. Discovery only sees targets reachable from the container with its current network mode and capabilities.

## Related pages

- [Monitoring](../using-netmap/monitoring.md)
- [Configure Service Checks](../guides/configure-service-checks.md)
- [Run Discovery](../guides/run-discovery.md)
- [Review Discovery Observations](../guides/scheduled-discovery-observations.md)
- [Network Access Model](./network-access-model.md)
