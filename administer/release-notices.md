---
title: Release Notices
sidebar_position: 2
keywords: [release notices, breaking changes, upgrade warning, notice feed, NOTICE_FEED_URL]
---

# Release Notices

NetMap can show short notices from the NetMap project, such as a warning about a breaking change before you upgrade. They appear as banners above every page and are listed under **Admin → System → Release Notices**.

## What You See

| Severity | Shown to | Goes away when |
|---|---|---|
| Info | Everyone | Each user selects **Dismiss** |
| Warning | Everyone | Each user selects **Dismiss** |
| Breaking | SuperAdmins | A SuperAdmin selects **Acknowledge** (once, for everyone) |

A notice can be limited to certain NetMap versions and dates, so you only see notices that apply to the version you run. Notices are plain text with at most one https link.

## Privacy And Turning It Off

The NetMap server reads one public file over https a minute after it starts and then every 6 hours. The request sends nothing about your installation: no ID, version, counts or settings. If the file cannot be reached, for example on an air-gapped network, nothing is shown and nothing else is affected.

- Turn notices off under **Admin → System → Release Notices → Show notices from the NetMap project**.
- **Check now** reads the file immediately and shows when it was last checked or why the last check failed.
- `NOTICE_FEED_URL` changes where the file is read from; set it to an empty value to disable the feed entirely.

## The Feed File

The default file is `notices.json` on the `main` branch of [xoriin/netmap-notices](https://github.com/xoriin/netmap-notices). Changes reach installations within about 6 hours.

```json
{
  "notices": [
    {
      "id": "v2-postgres",
      "severity": "breaking",
      "title": "NetMap 2.0 moves to PostgreSQL",
      "message": "Back up before upgrading and read the migration guide first.",
      "link": "https://docs.netmap.dev/",
      "show_below": "2.0.0",
      "starts": "2026-12-01",
      "ends": null
    }
  ]
}
```

| Field | Required | Rules |
|---|---|---|
| `id` | Yes | Lowercase letters, digits and hyphens, up to 64 characters. Never change it: dismissals and acknowledgements are stored against it. |
| `severity` | No | `info` (default), `warning` or `breaking` |
| `title` | Yes | Up to 120 characters |
| `message` | Yes | Up to 1000 characters, shown as plain text |
| `link` | No | An `https://` address, shown as **Read more** |
| `show_from` | No | Show to this version and later, e.g. `1.8.0` |
| `show_below` | No | Show to versions before this one, e.g. `2.0.0` |
| `starts`, `ends` | No | Dates (`YYYY-MM-DD`, UTC) between which the notice is shown |

At most 20 notices are read and the file may be up to 64 KB. An entry that breaks a rule is skipped and the rest are still shown. Development builds show every notice regardless of version.

## Audit Events

| Event | Meaning |
|---|---|
| `notice.acknowledged` | A SuperAdmin acknowledged a breaking notice |
| `admin.notice_feed_changed` | A SuperAdmin turned the feed on or off |

## Use The API

- `GET /api/v1/notices` — notices for the signed-in user
- `POST /api/v1/notices/{id}/dismiss` — hide an info or warning notice for yourself
- `POST /api/v1/notices/{id}/acknowledge` — acknowledge a breaking notice (SuperAdmin)
- `GET /api/v1/admin/notices`, `POST /api/v1/admin/notices/refresh` — feed status and check now (SuperAdmin)
