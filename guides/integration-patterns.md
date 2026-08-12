---
title: Integration Patterns
description: Source-backed patterns for connecting NetMap to scripts and external systems.
sidebar_position: 13
keywords: [integrations, automation, API, CMDB, IPAM, discovery]
---

# Integration Patterns

This page collects provider-neutral integration recipes. Use a dedicated user, a least-privilege role, an expiring API key, HTTPS, and retry logic with a bounded timeout. Never put a key in a repository, URL, or log.

## Read-only inventory and CMDB exports

Grant only inventory-read permissions, create an API key for that user, and poll either JSON or CSV. Prefer JSON when the consumer needs stable field types; use CSV for spreadsheets and scheduled file imports. Treat the response as a snapshot: match records by NetMap device ID when available, then by normalized MAC address, and finally by a carefully reviewed hostname/IP fallback. Do not delete records solely because one poll omits a device.

See [Automation With API Keys](./automation-with-api-keys.md), [Exports](../using-netmap/exports.md), and [API authentication](../api/authentication.md).

## Safe write automation

For device, reservation, or external-allocation automation:

1. Read the current object and retain its ID and `updated_at` value.
2. Validate addresses and ownership before writing.
3. Use idempotent create-or-update logic keyed by a stable external identifier.
4. Retry only timeouts and transient 5xx responses, with exponential backoff.
5. Re-read after a successful write and record the resulting ID.
6. Revoke the key when the integration is retired.

Reservation and external allocation rules are documented in [IPAM](../using-netmap/ipam.md) and [External IPAM](../using-netmap/external-ipam.md). The API does not provide a general-purpose transaction across multiple resources; do not assume a partially completed batch can be rolled back automatically.

## Discovery and health polling

Use the discovery endpoints to start a scan, poll its status, and review observations before importing anything. Scheduled discovery is review-oriented and does not silently mutate inventory. For an external monitor, poll the lightweight health endpoint and use diagnostics only for an authenticated administrative check; do not expose diagnostics publicly.

See [Run Discovery](./run-discovery.md), [Monitoring](../using-netmap/monitoring.md), [Health checks](../operations/health-checks.md), and [API endpoint reference](../api/api-reference.md).

## Syslog sender checklist

NetMap accepts sender traffic on the configured UDP/TCP listener and can restrict senders with `SYSLOG_SENDER_ALLOWLIST`. Configure the sender with the NetMap host, the selected port (default `1514`), and a format that includes a timestamp, hostname, facility, severity, and message. Permit only the sender networks at the host firewall and confirm arrival in Security Events.

The repository does not contain verified, vendor-specific pfSense, OPNsense, rsyslog, or syslog-ng screenshots/configuration recipes. Use each product's current documentation and validate the emitted wire format against a staging listener before relying on it. TLS syslog is also not documented here until the implementation and deployment settings are verified.

## Notifications and identity providers

Notification profiles support the providers listed in [Administration](../using-netmap/admin.md#notification-methods-and-delivery); choose the channel based on delivery guarantees, secret handling, and whether the destination is private. OIDC is provider-neutral: configure issuer, client ID, redirect URI, scopes, and claims as described in [OIDC SSO](../configuration/oidc-sso.md), then use the provider's current guide for application registration. No provider-specific Entra, Authentik, Keycloak, Okta, or Google Workspace recipe is claimed until it has been tested against that provider's current UI and claims behavior.

## Integration boundaries

NetMap is not a CMDB synchronization engine, DHCP lease authority, or vendor parser. Integrations should be explicit, observable, least-privilege, and safe to re-run. Keep source-specific transformations in the integration layer and retain the source identifier in your own system.
