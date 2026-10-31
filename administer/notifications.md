---
title: Notifications
sidebar_position: 8
keywords: [admin, notifications, methods, email, ntfy, Telegram, Slack, Apprise, email branding]
---

# Notifications

**Admin → Notifications** is where you set up the notification methods used by alert rules, reservation reminders and scheduled discovery, and the look of NetMap's emails. You need `notification_manage`.

## Summary

The tab opens with **Deliveries, Last 14 Days**, showing sent and failed deliveries per day, beside the **Methods**, **Active**, **Sent, 14 days** and **Failed, 14 days** cards. **Notification Methods** shows each method's sends per day, beside **Methods by Type** and **Recent Failures**.

## Notification Methods

Create a named method, test it, and only then attach it to rules. The built-in choices are ntfy, Telegram, Signal, SMTP email, Discord, Slack, Gotify, Pushover, Google Chat, generic JSON webhooks and custom Apprise URLs. An Apprise URL can reach other services, such as Matrix, Mattermost, Webex Teams, Opsgenie, PagerDuty and SMS gateways.

Secrets in a method are encrypted, never shown again after saving, and kept out of logs. Check which rules use a method before you edit, disable or delete it.

Provider errors, TLS or credential failures, blocked private targets and disabled methods are recorded as failed deliveries. Webhook targets follow NetMap's private-target controls.

## Email Branding

SMTP alerts and account emails, such as password resets, welcome emails and [new sign-in emails](./new-sign-in-emails.md), are sent as HTML with a plain-text copy. Account emails use the first enabled SMTP method.

A SuperAdmin sets their look under **Email Branding**:

- the Login banner or clean stripe template;
- brand name, accent colour, installation URL and footer text;
- an optional PNG, JPEG or WebP logo of up to 256 KB; and
- whether to include the support email and URL from [System](./system.md).

A live preview shows the real email before you save. The default NetMap logo is linked from the public NetMap repository, so mail clients never contact your installation, while an uploaded logo is attached to each email. Security wording, reset-link expiry guidance and the email layout are fixed.

## Related Pages

- [Alerts](./alerts.md)
- [Create An Alert Rule](../guides/create-alert-rule.md)
- [Automation API Guide](../api/guides/automation.md)
