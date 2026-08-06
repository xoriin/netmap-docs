---
title: Create An Alert Rule
description: Configure alert rules and test notifications.
sidebar_position: 7
keywords: [alerts, notifications]
---

# Create An Alert Rule

Alert rule management requires `alert_write`.

API equivalents:

- `GET /api/v1/alerts/rules`
- `POST /api/v1/alerts/rules`
- `PATCH /api/v1/alerts/rules/{rule_id}`
- `DELETE /api/v1/alerts/rules/{rule_id}`
- `POST /api/v1/alerts/rules/{rule_id}/test`

Notification delivery records are available at `GET /api/v1/alerts/deliveries`.

## What This Does

Alert rules watch device and service health conditions and send notifications through configured channels or notification profiles.

## Before You Begin

Confirm:

- monitoring is collecting the signal you want to alert on;
- notification settings or profiles are configured;
- your role has `alert_write`;
- the target device or service check exists.

## Verify

Use the test endpoint after creating a rule:

```bash
API_URL="https://netmap.example.com"
API_KEY="<alert-write-api-key>"
RULE_ID="<rule-id>"

curl --fail-with-body \
  --request POST \
  --url "${API_URL}/api/v1/alerts/rules/${RULE_ID}/test" \
  --header "X-API-Key: ${API_KEY}"
```

## Common Problems

| Symptom | Likely cause | Fix |
|---|---|---|
| `400` on test | no notification channels | configure notification profile/channel |
| `404` | wrong rule, device, or service check ID | list resources and retry |
| `422` | threshold required for selected rule type | include required threshold field |
| no deliveries | rule inactive or condition not met | inspect rule and monitoring data |

## Related Pages

- [Monitoring](../05-using-netmap/monitoring.md)
- [Administration](../05-using-netmap/admin.md)
- [API Errors](../07-api/errors.md)
