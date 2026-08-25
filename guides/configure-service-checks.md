---
title: Configure Service Checks
sidebar_position: 6
keywords: [monitoring, service checks]
---

# Configure Service Checks

Service checks monitor TCP, UDP, DHCP, HTTP, and HTTPS targets associated with devices.

Required permission: `monitoring_write`.

API equivalents:

- `POST /api/v1/monitoring/service-checks`
- `PUT /api/v1/monitoring/service-checks/{target_id}`
- `DELETE /api/v1/monitoring/service-checks/{target_id}`
- `GET/PUT /api/v1/monitoring/service-checks/order-config`
- Legacy alias: `/api/v1/monitoring/port-targets`

Read-only service check list endpoints require authentication.

## What This Does

A service check tracks whether a specific service endpoint on a device is reachable. Use it for ports such as HTTPS, SSH, DNS, controller interfaces, VPN listeners, or application-specific services.

## Before You Begin

Confirm the device exists in inventory. Decide:

- protocol;
- port;
- label/name;
- expected status;
- whether alert rules should watch the check.

## Organise Checks

Use **Alphabetical** mode for automatic sorting by service name. Use **Manual** mode to drag checks into the preferred order. NetMap stores both the selected mode and the manual order, so switching back to Manual restores the operator-defined sequence.

Checks can be edited without deleting and recreating them. The form reports validation and API failures in place instead of exposing raw socket errors such as `Errno 111`; monitoring results use readable states such as **Connection refused** and **Timed Out**.

## Verify

```bash
API_URL="https://netmap.example.com"
API_KEY="<api-key>"

curl --fail-with-body \
  --url "${API_URL}/api/v1/monitoring/service-checks" \
  --header "X-API-Key: ${API_KEY}"
```

## Common Problems

| Symptom | Likely cause | Fix |
|---|---|---|
| cannot create check | missing `monitoring_write` | update role permissions |
| target says down | service unreachable from NetMap host | test with Tools port check |
| duplicate checks | same service added through alias route | review service-check list |
| drag handle is unavailable | ordering is set to Alphabetical | switch ordering to Manual |

## Related Pages

- [Monitoring](../using-netmap/monitoring.md)
- [Create An Alert Rule](./create-alert-rule.md)
- [Tools](../using-netmap/tools.md)
