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

**Delivery History** lists each notification's **Sent** time, **Rule**, **Device**, the line of the **Message** that says what happened, how it was **Sent via** and the **Result**. Use it to tell a rule that didn't fire from a notification that failed to send. **Failed only** narrows the list to notifications a provider rejected.

Click a notification, or select it and press Enter, to open it:

- **What Was Sent** shows the exact text, with **Copy**.
- **Delivery** shows when it was sent, which notification method sent it, the provider's result or error, the rule and its trigger, and the device or endpoint.
- **Same Alert, Other Methods** shows how the same alert went through your other methods, for example sent by email but rejected by Discord.

Notifications are kept for 30 days. The message text is recorded from NetMap 1.8.0; older notifications show **Not recorded**.

## Related Pages

- [Notifications](./notifications.md)
- [Create An Alert Rule](../guides/create-alert-rule.md)
- [Monitoring](../using-netmap/monitoring.md)
