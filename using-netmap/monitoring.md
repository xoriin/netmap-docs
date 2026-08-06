---
title: Monitoring
description: View device health, configure service checks, and monitor HTTP endpoints.
sidebar_position: 7
keywords: [monitoring, health, service checks]
---

# Monitoring

Monitoring has separate Devices and Monitors views. Devices shows fleet health, latency, history, analysis, and attached service checks. Monitors tracks HTTP/HTTPS endpoints independently of inventory devices.

API equivalents:

- `GET /api/v1/monitoring/summary`
- `GET /api/v1/monitoring/devices`
- `GET /api/v1/monitoring/devices/{device_id}/history`
- `GET /api/v1/monitoring/devices/{device_id}/analysis`
- `GET /api/v1/monitoring/service-checks`
- `POST /api/v1/monitoring/service-checks`
- `DELETE /api/v1/monitoring/service-checks/{target_id}`
- `GET /api/v1/monitors`
- `POST /api/v1/monitors`
- `PATCH /api/v1/monitors/{monitor_id}`
- `GET /api/v1/monitors/{monitor_id}/history`
- `DELETE /api/v1/monitors/{monitor_id}`

Service-check and standalone-monitor changes require `monitoring_write`.

## Standalone HTTP/HTTPS Monitors

Choose the Monitors tab and select **Add monitor**. Alongside the URL, method, interval, timeout, retry count, TLS verification, and redirect behavior, a monitor can define:

- accepted HTTP codes as comma-separated values and ranges, such as `200-299,301,304`;
- custom headers and JSON, form, text, or XML request bodies;
- Basic, Bearer, OAuth2 client-credentials, or mutual-TLS authentication;
- a proxy, custom CA, redirect limit, separate retry interval, and cache busting;
- required or forbidden keywords and JSON-path response assertions;
- an inverted result for endpoints expected to fail;
- tags, a description, and certificate-expiry warnings.

Credentials, request headers and bodies, proxy URLs, and certificate/key material are encrypted. They are never shown again after saving; leave a secret field blank while editing to keep its stored value.

Click a monitor row for uptime, response distribution, recent HTTP results, assertion diagnostics, response sizes, and certificate issuer/expiry information. Certificate notifications require both the monitor's expiry-warning option and a `Standalone monitor certificate nearing expiry` rule in Admin → Alerts.

## What To Watch

Monitoring helps answer:

- which devices are currently up or down?
- how has latency changed over time?
- are configured services reachable?
- which devices need operational follow-up?

## Typical Workflow

1. Open Monitoring.
2. Review fleet summary.
3. Sort or filter device rows.
4. Open a device history or analysis view.
5. Add service checks for critical ports if you have `monitoring_write`.
6. Configure alert rules for important conditions.

## API Example

```bash
API_URL="https://netmap.example.com"
API_KEY="<api-key>"

curl --fail-with-body \
  --url "${API_URL}/api/v1/monitoring/devices" \
  --header "X-API-Key: ${API_KEY}"
```

## Related Pages

- [Configure Service Checks](../guides/configure-service-checks.md)
- [Create An Alert Rule](../guides/create-alert-rule.md)
- [Monitoring NetMap](../operations/monitoring-netmap.md)
