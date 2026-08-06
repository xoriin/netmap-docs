---
title: Run Discovery
description: Run an nmap discovery scan.
sidebar_position: 3
keywords: [discovery, nmap, scan]
---

# Run Discovery

## What This Does

Runs nmap discovery against a private target range and records scan results for review/import.

## Required Permissions

`topology_write`.

## Operational Requirements

- nmap is installed in the all-in-one image.
- nmap runs through passwordless sudo for the `netmap` user.
- Host networking is required for MAC discovery through ARP.

## API Equivalent

`POST /api/v1/discovery/scans` with `DiscoveryStart`.

Common errors:

- `400` for invalid target ranges.
- `429` when discovery rate limit is active.
