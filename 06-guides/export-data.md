---
title: Export Data
description: Export inventory, firewall logs, reports, and backups.
sidebar_position: 11
keywords: [export, CSV, JSON, PDF, backup]
---

# Export Data

Permissions:

- `inventory_export` for inventory export.
- `firewall_export` for firewall event export.
- `report_export` for PDF reports.
- SuperAdmin for database backup and restore.

API equivalents:

- `GET /api/v1/exports/inventory`
- `GET /api/v1/exports/firewall`
- `GET /api/v1/exports/report.pdf`
- `GET /api/v1/exports/backup`

## What This Does

Exports let you take NetMap data into other tools, create reports, archive evidence, and back up application state.

## Export Types

| Export | Purpose |
|---|---|
| Inventory | Device records for spreadsheets or automation |
| Firewall | Syslog/firewall events for investigation or archive |
| PDF report | Human-readable network report |
| Backup | Database backup for recovery |

## Example

```bash
API_URL="https://netmap.example.com"
API_KEY="<inventory-export-api-key>"

curl --fail-with-body \
  --url "${API_URL}/api/v1/exports/inventory" \
  --header "X-API-Key: ${API_KEY}" \
  --output inventory-export
```

## Common Problems

| Symptom | Likely cause | Fix |
|---|---|---|
| `403` | missing export permission | update role permissions |
| empty firewall export | no matching events | widen filters or confirm syslog ingest |
| backup denied | not SuperAdmin | use a SuperAdmin account/key |

## Related Pages

- [Exports](../05-using-netmap/exports.md)
- [Backups](../08-operations/backups.md)
- [API Authentication](../07-api/authentication.md)
