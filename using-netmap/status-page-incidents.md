---
title: Status Page Incidents And Maintenance
sidebar_position: 16
keywords: [status page, incidents, notices, maintenance, suppress monitoring alerts]
---

# Status Page Incidents And Maintenance

This page shows you how to tell visitors about problems and planned work on a [status page](./status-pages.md): incidents, notices and scheduled maintenance. You manage them in the page editor, and you need **Manage status pages** (`status_page_manage`).

## Incidents

An incident has a title, a severity (**Performance issues**, **Partial outage** or **Major outage**), a status (**Investigating**, **Identified**, **Monitoring** or **Resolved**), the items it affects, an optional ticket link, and a timeline of updates.

To hide a resolved incident from one page, select **Remove from board** in the Incidents tab; its timeline and other pages are kept. Turn on **Show removed incidents** to see it again or select **Restore to board**.

### Automatic Incidents From Alert Rules

Alert rules have an **Open an incident on status pages** switch and a **Consecutive breaching checks** count; see [Create An Alert Rule](../guides/create-alert-rule.md). When an enabled rule's condition holds for that many consecutive checks, every page that currently shows the affected item gets an incident. The incident:

- opens and publishes immediately, public pages included;
- records which pages it was published to when it opened; adding an item to another page later does not widen it;
- groups different sources only when they share the same rule, condition and identical page set within five minutes;
- moves to **Monitoring** with one update when every source has recovered on fresh, non-breaching checks, and returns to **Investigating** if the condition breaches again;
- is never resolved by the system. A person (or an integration token that created it) marks it **Resolved**.

Notification cooldowns and delivery failures don't affect incidents, and a failing item turns red whether or not an incident opens. No incident opens for an item while a maintenance window on that page covers it.

### Manual Incidents

Choose **Open incident** under **Incidents** in the editor. Pick the pages to publish to, the affected items, a severity, a first update, and optionally a ticket link. The editor shows **Audience before you save**, the full list of pages that will see the text. The title, message and ticket link are published content, so write them for the page audience.

Use **Post an update** to add a timeline line and optionally change the status or ticket link, **Resolve** to close it, and **Publish to another page** to add a page later. Publishing to another page is a deliberate action and does not reveal earlier updates.

### Public And Internal Updates

Every update is **public** or **internal**. Public updates appear on every page the update addresses. Internal updates appear only on Private pages (marked **Internal**) and in the editor; they never reach a Public page's data, HTML or cache.

### What Visitors See

- On each page, an incident shows only that page's own items under their display names. Items from other pages, source IDs, addresses, hostnames, check URLs, raw errors and alert-rule names are never included.
- A human author is always shown as **Status team**. The person's name stays in the editor.
- An open incident appears as one thin line under the summary. The **Incident log** and **Past incidents** (incidents resolved in the last 30 days, plus finished maintenance as **Planned maintenance**) are folded at the bottom.
- A ticket link is shown only on the pages the incident was published to.

Closed incidents, expired notices and finished maintenance are kept for 365 days after they close and then pruned. Active incidents are never pruned. Deleting a device, monitor or service check removes its page items but not the incident history, which keeps the display name published at the time.

## Notices

A notice is a line of text on one page, with a **level** (info, warning or critical), a title, an optional body and link, and an optional expiry after which it disappears. A critical notice raises the summary to at least "Some systems are affected", but never lowers "Major outage".

Each person has one notice slot per page, and each integration token has one slot per page, so systems do not overwrite one another. In the editor, **Clear my notice** removes your own, and page managers can clear any notice on the page. Links must be `http` or `https`.

## Scheduled Maintenance

A maintenance window has a title, description, start, end, affected items and the pages that announce it (by default every page showing an affected item). Times are stored as UTC instants and shown in the visitor's own time zone.

- **Upcoming:** from seven days before the start the window appears as a thin line under the summary.
- **Active:** the affected items on the announced pages show **Under maintenance**, are excluded from availability, and no automatic incidents open for them on those pages. Checks and history carry on. A page that does not announce the window keeps reporting the item normally.
- **Finished:** the window moves to **Past incidents** as **Planned maintenance**.
- Once a window has started, its start, items and pages are fixed. You can move the end or choose **End now**. A finished window can only have its title and description changed.

### Suppress Monitoring Alerts

Maintenance on a status page changes only what the page shows. The separate **Suppress monitoring alerts** setting also silences alert-rule notifications for those items **throughout NetMap**, not only on the announced pages.

It is deliberately an extra permission: you need both **Manage status pages** and **Manage alert rules** (`alert_write`). A user with only one of them cannot turn it on, and cannot edit or delete a window that has it on. Integration tokens can never set it and cannot change a window that has it.

While suppression is active, matching notifications are held without using up their cooldowns. When the window ends, each item is re-evaluated on fresh observations and a still-breaching condition notifies once, under its normal cooldown. Overlapping windows keep suppression on until the last one ends. Suppressed notifications are not replayed.

## Related Pages

- [Status Pages](./status-pages.md)
- [Create An Alert Rule](../guides/create-alert-rule.md)
- [Status Page Integrations](../api/guides/status-page-integrations.md)
- [Permissions](../administer/permissions.md)
