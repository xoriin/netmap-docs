---
title: Alerts
sidebar_position: 9
keywords: [admin, alerts, alert rules, triggers, cooldown, delivery history]
---

# Alerts

**Admin → Alerts** is where you create and manage alert rules and check their delivery history. You need `alert_write`. For a step-by-step walkthrough, see [Create An Alert Rule](../guides/create-alert-rule.md).

## Summary

- **Alerts Sent, Last 14 Days** shows alert notifications per day, split into **Sent** and **Failed**.
- **Rules** counts your rules, **Active** names any paused rules, **Sent, 14 days** shows the share delivered, and **Failed, 14 days** shows the date of the last failure.
- **Rules by Trigger** ranks triggers by how many rules use each one, and **Recently Triggered** lists the rules that fired most recently.

## Alert Rules

The **Alert Rules** table lists each rule's **Name**, **Trigger**, **Device / Service**, **Channels**, **Cooldown** and **Status**. In each row you can:

- select **Test** to send a test notification;
- select **Pause** or **Enable**;
- select **Edit** to change the rule in **Edit Rule**; or
- select **Delete**.

A rule needs a **Rule name**, a **Trigger** and at least one notification channel. Triggers cover devices going offline, coming back, flapping or entering an unexpected state; ping loss or response time above a threshold; service checks going down or slowing; and HTTP endpoints going down, slowing or nearing certificate expiry.

**Cooldown** runs from 5 minutes to 24 hours. Tick **Open an incident on status pages** to open an incident automatically on the pages that show the affected items; see [Status Page Incidents And Maintenance](../using-netmap/status-page-incidents.md).

## Delivery History

**Delivery History** lists each notification's **Sent** time, **Rule**, **Target** and **Result**. Use it to tell a rule that didn't fire from a notification that failed to send.

## Related Pages

- [Notifications](./notifications.md)
- [Create An Alert Rule](../guides/create-alert-rule.md)
- [Monitoring](../using-netmap/monitoring.md)
