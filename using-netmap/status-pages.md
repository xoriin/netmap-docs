---
title: Status Pages
sidebar_position: 14
keywords: [status page, uptime, incidents, maintenance, notices, custom CSS, heartbeat]
---

# Status Pages

A status page is a small, read-only web page that shows whether the things you choose are up. It is built for the people who depend on your network (a team, a customer, the public) rather than for the people who run it. Each page lists hand-picked devices, HTTP monitors and individual service checks in named groups, with an uptime figure and a heartbeat bar for each. On top of that it carries an incident log, one-line notices and scheduled maintenance.

Status pages are managed from **Monitoring → Status pages**. That tab appears only for users with the **Manage status pages** permission (`status_page_manage`). SuperAdmin and the built-in NetworkAdmin role have it; custom roles can be granted it. Anyone with the permission can edit every page. There is no per-page ownership.

## Create a page

The Status pages workspace opens with **Service health across pages**: a ring of monitored services and a legend showing Healthy, Degraded, Unavailable, Maintenance and No data counts. Legend share bars extend across the available width beside the ring, with counts aligned at the right edge. The Monitored services card reports the same total. A service included on several pages is counted for each page. These labels describe the workspace overview; public page states and each page's configured display names retain their existing meaning.

1. Open **Monitoring → Status pages** and choose **New status page**.
2. Enter a **name** and an **address** (the slug). The slug is 1 to 48 lowercase letters, digits or hyphens, and does not start or end with a hyphen. The page is served at `/status/<slug>` on your NetMap address.
3. Choose **Visibility**, then save.
4. In **Groups and items**, add groups and the items each group should show.
5. Use **Preview** to see the page exactly as visitors will see it.

### Public and Private

| Visibility | Who can open `/status/<slug>` |
|---|---|
| **Public**, anyone with the link | Anyone, with no sign-in. The page does not load NetMap's application or call the sign-in endpoints. |
| **Private**, signed-in users only | Any signed-in NetMap user, whatever their role. Without a session the visitor sees the sign-in screen and returns to the page afterwards. |

Public and Private pages are served from separate cached payloads. Switching a page from Public to Private, deleting it, or changing its slug removes the public copy immediately; an anonymous request for the old address then returns `404`, even with a previously valid `ETag`. Content a visitor has already downloaded cannot be recalled. An unknown slug and a Private page look the same to an anonymous visitor.

### Page settings

| Setting | Notes |
|---|---|
| **Name** | The name shown in the editor list. |
| **Title** | Shown at the top of the page. Leave it empty to use the name. |
| **Logo** | A raster image checked the same way as the email logo. Use **Remove logo** to clear it. |
| **Accent colour** | A `#rrggbb` colour used for links and focus outlines. |
| **Heartbeat window** | **Last hour** (default) or **Last 24 hours**. |
| **Custom CSS** | See [Custom CSS](#custom-css). |

The built-in page uses a Material design in light and dark mode. Its overall status banner is green when operational, yellow for warnings or maintenance, red for an outage, and neutral when status is unavailable. Notice, incident and maintenance bars use matching tinted surfaces, a stronger coloured edge and readable supporting text; informational notices use blue.

Every editor tab keeps the same preview beside its controls in equal-width columns (below them on narrower screens). The selected public/private preview audience is preserved when switching tabs. CSS, title, logo and accent edits render immediately as you type. Unsaved groups, display names, ordering, extras and heartbeat-window changes also appear using real monitoring data. Drafts are not published until you choose **Save settings** or **Save layout**. **Discard changes** restores the saved appearance. The preview refreshes when switching tabs, saving settings/layout or changing incidents; use **Refresh** to reload it after other changes.

## Groups, items and display names

A **group** is a named, collapsible section; groups and the items inside them can be reordered by dragging the handle or with the move up and down arrows. A group can be set to start collapsed.

An **item** is one of:

- a **device**,
- an **endpoint** (an HTTP monitor), or
- a single **service check** on a device, for example "Jellyfin HTTPS" on the media server. A service-check item reports that check's own result, not the device's ping result.

The same source can sit on several pages, with a different display name and different extras on each.

### Display names are required

Every item needs a **display name**, and visitors only ever see group names and display names. There is no fallback to the hostname or IP address, so a page cannot be saved with an unnamed item. The editor shows the real source (marked internal) beside each row, and an ID you can use with the [integration API](../api/guides/status-page-integrations.md).

### Item states

| State | Meaning |
|---|---|
| **Operational** | Healthy by the same observed-versus-expected model Monitoring uses. An expected-offline device that is observed offline is Operational. |
| **Degraded** | Healthy, but an enabled threshold rule (response time above, failed-probe rate, slow service) is currently breaching. |
| **Down** | Unhealthy. |
| **Under maintenance** | Inside an active maintenance window that includes the item. This overrides the other states. |
| **Unknown** | No recent observation, monitoring paused, or no IP address. NetMap never turns a stopped worker into Down or Operational. |

An observation goes stale after twice the check interval (at least 60 seconds), after which the item reads Unknown.

The summary line at the top of the page applies this order: no items is "No systems configured"; more than half of the items Down is "Major outage"; any Down or Degraded item, or a critical notice, is "Some systems are affected"; otherwise any Unknown item is "Status unavailable for some systems"; otherwise any item in maintenance is "Maintenance in progress"; otherwise "All systems operational". Unknown and maintenance are never counted as healthy or as Down.

### Heartbeat bar and uptime

Each row shows 60 heartbeat slots across the page's heartbeat window. Each slot is painted with the worst known health in that slot, grey if nothing was known, and purple if it was inside maintenance. Slots are aligned to the clock, so they step forward on fixed boundaries instead of sliding on every refresh.

The uptime figure on the row is **observed availability** over the heartbeat window: known healthy time divided by known healthy-plus-unhealthy time. Unknown time and maintenance time are excluded, and a long gap between checks is Unknown rather than green. If less than 90% of the window has known data the row shows **Insufficient data**; if there is none it shows **No data**. The figure is not the share of green slots.

### Extras

All extras are off by default. Enable them per item in the editor and the row gains a disclosure arrow; a row without extras does not expand. Expanded metrics sit side by side and wrap on narrow screens; the response chart aligns with the heartbeat bar above it.

| Extra | Shows |
|---|---|
| **Response-time graph** (**RTT graph** for ICMP) | The average successful response time per slot, on the same time axis as the heartbeat bar. Measured points form a line across healthy intervals, with gaps for failed or unknown intervals. A single measurement shows a point; zero stays zero, and empty history says No successful responses. |
| **Uptime over 24 h / 7 d / 30 d** | Availability over the chosen period. |
| **Average response time** | Mean of the successful samples in the heartbeat window. |
| **p95 response time** | Nearest-rank 95th percentile of the same samples. |
| **Failed-check rate** | Failed checks divided by completed known checks. This is not packet loss. |
| **Time since last check** | How long ago the most recent observation was. |

Rows expand with native disclosure elements, so they work without any script.

## Incidents

An incident has a title, a severity (**Performance issues**, **Partial outage** or **Major outage**), a status (**Investigating**, **Identified**, **Monitoring** or **Resolved**), the items it affects, an optional ticket link, and a timeline of updates.

Resolved incidents can be removed from the current page with **Remove from board** in the Incidents tab. This hides them from public and private visitors on that page while retaining their timeline and other pages. Turn on **Show removed incidents** to view their history or choose **Restore to board**. Open incidents must be resolved first; restored incidents still follow the normal 30-day visitor history window.

### Automatic incidents from alert rules

Alert rules have an **Open an incident on status pages** switch and a **Consecutive breaching checks** count; see [Create An Alert Rule](../guides/create-alert-rule.md). When an enabled rule's condition holds for that many consecutive checks, every page that currently shows the affected item gets an incident. The incident:

- opens and publishes immediately, public pages included;
- records which pages it was published to when it opened; adding an item to another page later does not widen it;
- groups different sources only when they share the same rule, condition and identical page set within five minutes;
- moves to **Monitoring** with one update when every source has recovered on fresh, non-breaching checks, and returns to **Investigating** if the condition breaches again;
- is never resolved by the system. A person (or an integration token that created it) marks it **Resolved**.

Notification cooldowns and delivery failures do not affect incidents. Rows never depend on incidents: a failing item turns red whether or not an incident opens. No incidents open for an item on a page while a maintenance window covers it.

### Manual incidents

Choose **Open incident** under **Incidents** in the editor. Pick the pages to publish to, the affected items, a severity, a first update, and optionally a ticket link. The editor shows **Audience before you save**, the full list of pages that will see the text. The title, message and ticket link are published content, so write them for the page audience.

Use **Post an update** to add a timeline line and optionally change the status or ticket link, **Resolve** to close it, and **Publish to another page** to add a page later. Publishing to another page is a deliberate action and does not reveal earlier updates.

### Updates: public and internal

Every update is **public** or **internal**. Public updates appear on every page the update addresses. Internal updates appear only on Private pages (marked **Internal**) and in the editor; they never reach a Public page's data, HTML or cache.

### What visitors see

- On each page, an incident shows only that page's own items under their display names. Items from other pages, source IDs, addresses, hostnames, check URLs, raw errors and alert-rule names are never included.
- Automatic updates are generated per page from structured events and each page's display names, so one page's names do not appear on another.
- A human author is always shown as **Status team**. The person's name stays in the editor.
- An open incident appears as one thin line under the summary. The **Incident log** and **Past incidents** (incidents resolved in the last 30 days, plus finished maintenance as **Planned maintenance**) are folded at the bottom.
- A ticket link is shown only on the pages the incident was published to.

Closed incidents, expired notices and finished maintenance are kept for 365 days after they close and then pruned. Active incidents are never pruned. Deleting a device, monitor or service check removes its page items but not the incident history, which keeps the display name published at the time.

## Notices

A notice is a line of text on one page, with a **level** (info, warning or critical), a title, an optional body and link, and an optional expiry after which it disappears. A critical notice raises the summary to at least "Some systems are affected", but never lowers "Major outage".

Each person has one notice slot per page, and each integration token has one slot per page, so systems do not overwrite one another. In the editor, **Clear my notice** removes your own, and page managers can clear any notice on the page. Links must be `http` or `https`.

## Scheduled maintenance

A maintenance window has a title, description, start, end, affected items and the pages that announce it (by default every page showing an affected item). Times are stored as UTC instants and shown in the visitor's own time zone.

- **Upcoming:** from seven days before the start the window appears as a thin line under the summary.
- **Active:** the affected items on the announced pages show **Under maintenance**, are excluded from availability, and no automatic incidents open for them on those pages. Checks and history carry on. A page that does not announce the window keeps reporting the item normally.
- **Finished:** the window moves to **Past incidents** as **Planned maintenance**.
- Once a window has started, its start, items and pages are fixed. You can move the end or choose **End now**. A finished window can only have its title and description changed.

### Suppress monitoring alerts

Maintenance on a status page changes only what the page shows. The separate **Suppress monitoring alerts** setting also silences alert-rule notifications for those items **throughout NetMap**, not only on the announced pages.

It is deliberately an extra permission: you need both **Manage status pages** and **Manage alert rules** (`alert_write`). A user with only one of them cannot turn it on, and cannot edit or delete a window that has it on. Integration tokens can never set it and cannot change a window that has it.

While suppression is active, matching notifications are held without using up their cooldowns. When the window ends, each item is re-evaluated on fresh observations and a still-breaching condition notifies once, under its normal cooldown. Overlapping windows keep suppression on until the last one ends. Suppressed notifications are not replayed.

## Custom CSS

Each page has a **Custom CSS** field, and a SuperAdmin can set default CSS for new pages under **Admin → System → Status page default CSS**. A new page starts with a copy of the default; later changes to the default do not restyle existing pages.

Custom CSS affects only the public status page, never NetMap's own screens. The page is rendered inside a sandboxed frame with no scripts, forms or same-origin access, under its own content security policy that blocks all network requests. The CSS is parsed by a real CSS parser and only a presentation-only subset is accepted. A rejected stylesheet cannot be saved: the editor lists each error with its line and column, and the page keeps its previous, validated CSS.

### Allowed

- Ordinary style rules, using any selector including attribute selectors and the pseudo-classes `:not()`, `:is()`, `:where()`, `:has()`, `:nth-child()`, `:nth-last-child()`, `:nth-of-type()` and `:nth-last-of-type()`.
- The pseudo-elements `::before`, `::after`, `::marker` and `::selection`.
- The at-rules `@media`, `@supports` and `@keyframes`.
- Custom properties (`--name`) and `var()`.
- Colour, maths, gradient, timing and transform functions: `rgb()`, `rgba()`, `hsl()`, `hsla()`, `hwb()`, `lab()`, `lch()`, `oklab()`, `oklch()`, `color-mix()`, `calc()`, `min()`, `max()`, `clamp()`, the `linear-`, `radial-` and `conic-gradient()` functions and their `repeating-` forms, `cubic-bezier()`, `steps()`, and the transform functions (`translate`, `rotate`, `scale`, `skew`, `matrix` and their axis variants).

### Rejected

- `url()` anywhere, including data URLs; `image-set()`; any function not listed above (such as `attr()` or `env()`).
- `@import`, `@font-face` and every other at-rule except the three above.
- The `behavior` and `-moz-binding` properties, and anything with `expression` in the property name.
- HTML delimiters. A `<` anywhere in the stylesheet, `</style`, `<!--` and `-->` are all refused, so write range media queries with `min-` and `max-` features instead of `<` or `<=`. For example, use `@media (max-width: 600px)`, not `@media (width < 600px)`.
- Malformed syntax, rules nested more than three deep, more than 2000 rules, or an overly complex stylesheet.
- A stylesheet larger than **64 KB**.

Use the page's own **Logo** setting for images.

The green operational dot gently breathes. It stays steady when the visitor requests reduced motion; warning, outage and maintenance dots are also steady. This animation does not change the normal data refresh interval. The page follows the visitor's saved NetMap light/dark choice, or the browser/device preference when no choice is saved. In dark mode it uses the visitor's saved dark mode style, **Slate** or **Zinc**. Custom CSS light/dark media queries follow the same choice. Existing custom CSS is preserved and can override the built-in design. Clear the page's Custom CSS and save to return to the default appearance.

### Stable class names

These class names are stable. Select on them, and on the `data-*` attributes below, rather than on the document structure.

| Area | Classes |
|---|---|
| Page and header | `sp-page`, `sp-header`, `sp-logo`, `sp-title` |
| Summary | `sp-summary`, `sp-summary-dot`, `sp-summary-label` |
| Notices, incident and maintenance lines | `sp-strip`, `sp-strip-title`, `sp-strip-meta`, `sp-strip-body`, `sp-notice`, `sp-pill` |
| Groups | `sp-groups`, `sp-group`, `sp-group-name`, `sp-group-label`, `sp-group-state`, `sp-group-empty` |
| Rows | `sp-row`, `sp-row-main`, `sp-row-more`, `sp-ident`, `sp-caret`, `sp-uptime`, `sp-row-name`, `sp-state` |
| Heartbeats and graphs | `sp-graphs`, `sp-lane`, `sp-lane-label`, `sp-heartbeats`, `sp-beat`, `sp-beat--healthy`, `sp-beat--unhealthy`, `sp-beat--unknown`, `sp-beat--maintenance`, `sp-axis`, `sp-response`, `sp-response-area`, `sp-response-line`, `sp-response-point`, `sp-response-grid`, `sp-response-empty` |
| Extras | `sp-stats`, `sp-stat` |
| Incident log and past incidents | `sp-log`, `sp-past`, `sp-section-title`, `sp-section-heading`, `sp-section-count`, `sp-incident`, `sp-incident-title`, `sp-incident-meta` |
| Updates | `sp-updates`, `sp-update`, `sp-update-time`, `sp-update-author`, `sp-update-status`, `sp-update-text`, `sp-update-internal` |

Attributes you can match:

| Attribute | Values | On |
|---|---|---|
| `data-state` | `operational`, `degraded`, `down`, `maintenance`, `unknown` | `sp-row` |
| `data-state` | `empty`, `major`, `affected`, `unknown`, `maintenance`, `operational` | `sp-summary`, `sp-group` |
| `data-tone` | `good`, `warning`, `danger`, `neutral` | `sp-uptime` |
| `data-tone` | `info`, `warning`, `danger`, `maintenance`, `neutral` | `sp-pill`, `sp-strip` |
| `data-kind` | `incident`, `maintenance` | `sp-strip`, `sp-incident` |
| `data-level` | `info`, `warning`, `critical` | `sp-notice` |
| `data-severity` | `performance`, `partial`, `major` | `sp-incident` |
| `data-internal` | `true` | `sp-update` |

The built-in style is driven by custom properties you can override on `:root`: `--sp-bg`, `--sp-surface`, `--sp-surface-soft`, `--sp-row-hover`, `--sp-border`, `--sp-text`, `--sp-text-muted`, `--sp-text-faint`, `--sp-accent`, `--sp-success`, `--sp-warning`, `--sp-danger`, `--sp-maintenance`, and the beat colours `--sp-beat-healthy`, `--sp-beat-unhealthy`, `--sp-beat-unknown` and `--sp-beat-maintenance`.

```css
:root {
  --sp-accent: #0b7285;
  --sp-beat-healthy: #1f9d55;
}
.sp-title { letter-spacing: 0.04em; }
.sp-row[data-state="down"] .sp-row-name { font-weight: 700; }
```

## What visitors never see

A Public page's data is an explicit allow-list, not a filtered copy of internal data. It contains group names, display names, states, uptime figures, heartbeat slots, the extras you enabled, the page's own incidents with their public updates, notices and maintenance. It never contains IP addresses, hostnames, check URLs, raw errors, device or monitor IDs, item types, alert-rule names, usernames, internal updates, other pages' items, or any token or credential.

All text from people and integrations is shown as plain text, never HTML, and outbound links open with `rel="noopener noreferrer"`.

## Availability and caching

Status pages are served from an in-memory snapshot that is rebuilt whenever something changes and at least every 15 seconds, so visitors never hit the database and a flood of requests cannot slow NetMap. The browser polls every 30 seconds with `If-None-Match`.

- A snapshot carries a `valid_until` deadline at most 30 seconds away. After it expires the server answers `503` with `Retry-After` rather than a stale green result, and the page shows the status as unavailable. The same happens if the browser cannot reach the server.
- On start-up, and while a page's first snapshot is being built, requests get `503` with `Retry-After: 5`.
- Public requests are rate-limited per client IP. Over the limit returns `429`.
- The snapshot cache lives in one process. NetMap runs a single worker, and it takes a lock file named `status-pages.lock` in its data directory to enforce that; a second worker would not serve status pages and would log a warning. Do not run several NetMap workers against one data directory.

## Integration tokens

Outside systems (a backup server, a ticketing tool, a deployment pipeline) can set notices, open and update incidents, and schedule maintenance on chosen pages using page-scoped integration tokens, created under **Integration tokens** in the editor. A token can use only the status integration endpoints, is limited to the pages you choose, and its name is shown publicly as the author of what it posts. See [Status Page Integrations](../api/guides/status-page-integrations.md) for the endpoints, scope rules and `curl` examples.

## Related pages

- [Monitoring](./monitoring.md)
- [Create An Alert Rule](../guides/create-alert-rule.md)
- [Permissions](../administer/permissions.md)
- [Status Page Integrations](../api/guides/status-page-integrations.md)
- [Endpoint Inventory](../api/reference/endpoints.md)
- [Rate Limits](../api/rate-limits.md)
