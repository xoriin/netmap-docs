---
title: Status Page Integrations
sidebar_position: 15
keywords: [status page, integration token, API, incidents, notices, maintenance, Idempotency-Key]
---

# Status Page Integrations

Existing API keys inherit their owner's full role and cannot be limited to certain pages, so they are not suitable for an outside system that should only post to a status page. Integration tokens are for that case.

Create them in **Monitoring → Status pages**, under **Integration tokens**, with **Create integration token**:

- **Name.** Shown **publicly** as the author of that token's notices and incident updates, so use a name you are happy for visitors to read (for example `backup-server`). It is not hidden from Public pages.
- **Pages it may post to.** At least one.
- **Expiry.** Optional.

The secret (`nmsp_<prefix>_<secret>`) is shown once; **Copy secret** before closing the dialog. NetMap stores only a hash. A token can be revoked at any time, and **Last used** is tracked.

A token can use only the status integration endpoints below and has no other API access. It is tied to the user who created it: if that user is disabled or loses **Manage status pages**, the token stops working immediately. Expiry, revocation and page scope are checked on every request.

## Endpoints

All paths are under `/api/v1/status-integrations`.

| Method and path | Purpose |
|---|---|
| `PUT /pages/{slug}/notice` | Set this token's notice on a page, replacing its previous one |
| `DELETE /pages/{slug}/notice` | Clear this token's notice on a page |
| `POST /incidents` | Open an incident for `items` or for named `pages` |
| `POST /incidents/{id}/updates` | Add an update, optionally changing the status or ticket link |
| `POST /incidents/{id}/resolve` | Resolve an incident this token created |
| `POST /maintenance` | Schedule a presentation-only maintenance window |
| `PATCH /maintenance/{id}` | Change a window this token created |
| `DELETE /maintenance/{id}` | Delete a window this token created |

## Scope Rules

- A token may name only pages it was granted. Naming another page returns `403`.
- A token can update or resolve only the incidents it created, and only while every page in that incident's audience is still within its scope. It cannot touch incidents opened by NetMap or by a person, or other tokens' notices.
- A token can change or delete only maintenance windows it created, and never one with alert suppression on. It cannot set `suppress_alerts`.
- Unknown IDs and IDs outside the token's reach return the same `404`, so IDs cannot be probed.
- Item references are `{"device": 12}`, `{"monitor": 3}` or `{"device": 12, "service_check": 7}`. They must be items shown on at least one page the token is allowed to use, and the incident or window is published on exactly the pages that show them. The editor shows each item's ID.

## Common Behaviour

| | |
|---|---|
| Base path | `/api/v1/status-integrations` |
| Authentication | `Authorization: Bearer nmsp_<prefix>_<secret>` |
| `Idempotency-Key` | **Required** on notice set, incident open, incident update, incident resolve and maintenance create. Up to 120 characters. Keys are scoped to the token and operation and kept for 24 hours. A retry with the same key and body returns the original result with `Idempotent-Replayed: true`; the same key with a different body returns `422`. Notice clear, maintenance update and maintenance delete do not use a key. |
| Write limit | 60 writes per minute per token. Over the limit returns `429` with `Retry-After`. |
| Audit | Every call is recorded in the audit log with the token name. |

## Examples

Set a notice, clearing and replacing this token's previous notice on the page:

```bash
curl -X PUT https://netmap.example.com/api/v1/status-integrations/pages/main/notice \
  -H "Authorization: Bearer nmsp_abc123def456_REPLACE_WITH_SECRET" \
  -H "Idempotency-Key: nightly-backup-2026-10-19" \
  -H "Content-Type: application/json" \
  -d '{"level": "warning", "title": "Nightly backup running", "body": "Reports may be slow until 03:00.", "link": "https://example.com/backups", "expires_at": "2026-10-20T03:00:00Z"}'
```

Clear this token's notice on the page:

```bash
curl -X DELETE https://netmap.example.com/api/v1/status-integrations/pages/main/notice \
  -H "Authorization: Bearer nmsp_abc123def456_REPLACE_WITH_SECRET"
```

Open an incident against items (published on the pages showing them):

```bash
curl -X POST https://netmap.example.com/api/v1/status-integrations/incidents \
  -H "Authorization: Bearer nmsp_abc123def456_REPLACE_WITH_SECRET" \
  -H "Idempotency-Key: ticket-INC-1042-open" \
  -H "Content-Type: application/json" \
  -d '{"title": "Email delivery delayed", "severity": "partial", "message": "We are investigating delayed mail.", "items": [{"device": 12, "service_check": 7}, {"monitor": 3}], "ticket_url": "https://tickets.example.com/INC-1042", "ticket_label": "Ticket INC-1042"}'
```

Open an incident with no items by naming pages instead (give `items` or `pages`, not both):

```bash
curl -X POST https://netmap.example.com/api/v1/status-integrations/incidents \
  -H "Authorization: Bearer nmsp_abc123def456_REPLACE_WITH_SECRET" \
  -H "Idempotency-Key: isp-outage-open" \
  -H "Content-Type: application/json" \
  -d '{"title": "ISP outage", "severity": "major", "message": "Our provider reports an outage.", "pages": ["main"]}'
```

The response (`201`) contains the incident `id`, `status`, `severity`, `opened_at`, `ticket` and the page slugs. Use the id below.

Add an update and change the status (set `"is_public": false` for an update only Private pages show):

```bash
curl -X POST https://netmap.example.com/api/v1/status-integrations/incidents/41/updates \
  -H "Authorization: Bearer nmsp_abc123def456_REPLACE_WITH_SECRET" \
  -H "Idempotency-Key: ticket-INC-1042-update-1" \
  -H "Content-Type: application/json" \
  -d '{"message": "A fix is being rolled out.", "status": "identified"}'
```

Resolve an incident:

```bash
curl -X POST https://netmap.example.com/api/v1/status-integrations/incidents/41/resolve \
  -H "Authorization: Bearer nmsp_abc123def456_REPLACE_WITH_SECRET" \
  -H "Idempotency-Key: ticket-INC-1042-resolve" \
  -H "Content-Type: application/json" \
  -d '{"reason": "Mail queue drained."}'
```

Schedule presentation-only maintenance (times must include a UTC offset):

```bash
curl -X POST https://netmap.example.com/api/v1/status-integrations/maintenance \
  -H "Authorization: Bearer nmsp_abc123def456_REPLACE_WITH_SECRET" \
  -H "Idempotency-Key: switch-firmware-2026-10-24" \
  -H "Content-Type: application/json" \
  -d '{"title": "Core switch firmware upgrade", "description": "Expect a short interruption.", "starts_at": "2026-10-24T22:00:00+10:00", "ends_at": "2026-10-24T22:30:00+10:00", "items": [{"device": 12}], "pages": ["main"]}'
```

Change or remove a window this token created:

```bash
curl -X PATCH https://netmap.example.com/api/v1/status-integrations/maintenance/8 \
  -H "Authorization: Bearer nmsp_abc123def456_REPLACE_WITH_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"ends_at": "2026-10-24T23:00:00+10:00"}'

curl -X DELETE https://netmap.example.com/api/v1/status-integrations/maintenance/8 \
  -H "Authorization: Bearer nmsp_abc123def456_REPLACE_WITH_SECRET"
```

## Fields And Limits

| Field | Limit |
|---|---|
| `title` | 200 characters |
| `message`, maintenance `description` | 5000 characters |
| notice `body` | 2000 characters |
| `link`, `ticket_url` | 2048 characters, `http` or `https` |
| `ticket_label` | 120 characters; needs a `ticket_url` |
| `severity` | `performance`, `partial` or `major` |
| `status` | `investigating`, `identified`, `monitoring` or `resolved` |
| notice `level` | `info`, `warning` or `critical` |
| `items`, `pages` | up to 500 items and 100 pages per request |

## Errors

| Status | Meaning |
|---|---|
| `400` | `Idempotency-Key` missing or longer than 120 characters |
| `401` | Missing, invalid, expired, revoked or creator-disabled token. Repeated failures from one address lock that address out. |
| `403` | Page outside the token's scope, or an attempt to enable or change alert suppression |
| `404` | Unknown record, or a record the token may not reach |
| `409` | The request conflicts with the record's state, or a request with the same `Idempotency-Key` is still in progress |
| `422` | Invalid body, or the `Idempotency-Key` was already used with a different body |
| `429` | Over 60 writes a minute (with `Retry-After`), or too many failed token attempts |

## Related Pages

- [Status Pages](../../using-netmap/status-pages.md)
- [Permissions](../../security/permissions.md)
- [Endpoint Reference](../reference/endpoints.md)
- [Rate Limits](../rate-limits.md)
