---
title: Create An Alert Rule
sidebar_position: 7
keywords: [alerts, notifications, monitoring]
---

# Create An Alert Rule

Alert rules are evaluated by the background alert worker. A rule selects an event type, target scope, optional threshold/service/monitor, enabled state, cooldown, and notification methods. Changes require `alert_write`. The incident option is in **Admin → Alerts**, in the rule form.

## Supported event types

Device rules cover offline, online recovery, warning, any status change, unexpected state, expected state restored, RTT above a threshold, packet loss above a percentage, and flapping (four or more status changes in the last hour). Service rules cover one/all service checks down or slow above a response threshold. Standalone monitor rules cover endpoint down, slow response, and certificate expiry within the monitor's configured lead days.

Expected-status rules compare observed health with the device's expected state, so an intentionally offline device does not create an unexpected outage. Down/online and service transitions are edge-triggered; thresholds can repeat after cooldown. Cooldowns suppress duplicate notifications but do not erase the underlying event.

## Open an incident on status pages

Each rule has an **Open an incident on status pages** switch and a **Consecutive breaching checks** count (1 to 20, default 3), stored as `open_incident` and `incident_min_failures` in the [alert-rule API](../api/api-reference.md#monitoring-alerts-ipam-security-tools). When the switch is on and the rule's condition holds for that many checks in a row, every [status page](../using-netmap/status-pages.md) that shows the affected device, service check or monitor gets an incident, published immediately. Endpoint monitors also wait for their own retry count; the larger of the two applies.

The switch is on by default for device offline, unexpected state, service down and monitor down rules, and off for the threshold and noise rules. It is not available for recovery or any-status-change rules. Incidents are independent of notifications, so a notification cooldown or a failed delivery never delays or prevents one. The incident moves to Monitoring when every source has recovered. No incident opens for an item on a page while a maintenance window covers it. Existing rules are updated automatically on upgrade.

## Lifecycle

1. Confirm monitoring and notification methods are working.
2. Create a rule with the event type, target scope, threshold where required, cooldown, and enabled methods.
3. Save and use **Test** to send a sample delivery.
4. Pause/resume or edit the rule as conditions change; delete only after confirmation.
5. Review alert events and delivery history for status, target, result, detail, and timestamps.

Scheduled maintenance windows can suppress a rule's notifications for the items they cover, when the window has **Suppress monitoring alerts** on. That setting needs both Manage status pages and `alert_write`; see [Status Pages](../using-netmap/status-pages.md#suppress-monitoring-alerts).

Disabled notification profiles are skipped. A rule can target all devices/checks/monitors or one selected resource where supported. Recovery events are separate deliveries when the condition clears.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| no event | worker not running, scope mismatch, or condition not met | check worker logs, monitoring data, and target scope |
| repeated messages | cooldown too short or high event volume | increase cooldown and narrow the target |
| no delivery | method disabled, invalid credentials, or provider error | test the method and inspect delivery detail |
| test returns `422` | required threshold missing | set RTT/service/slow threshold for that rule type |
| expected-offline alert | expected status is online or rule is raw-status based | set expected offline or use the expected-state rule |

## API equivalents

- `GET/POST /api/v1/alerts/rules`
- `PATCH/DELETE /api/v1/alerts/rules/{rule_id}`
- `POST /api/v1/alerts/rules/{rule_id}/test`
- `GET /api/v1/alerts/deliveries`
