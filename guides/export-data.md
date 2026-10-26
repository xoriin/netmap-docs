---
title: Export Data
sidebar_position: 11
keywords: [export, CSV, JSON, PDF, backup]
---

# Export Data

Permissions:

- `inventory_export` for inventory export.
- `firewall_export` for firewall event export.
- `report_export` for PDF reports.
- `backup_manage` for database backups; SuperAdmin for restore.

API equivalents:

- `GET /api/v1/exports/inventory`
- `GET /api/v1/exports/firewall`
- `GET /api/v1/exports/report.pdf`
- `GET /api/v1/exports/backup`
- `POST /api/v1/exports/backup/encrypted`

## What This Does

Exports let you take NetMap data into other tools, create reports, archive evidence, and back up application state.

## Export Types

| Export | Purpose |
|---|---|
| Inventory | Device records for spreadsheets or automation |
| Firewall | Syslog/firewall events for investigation or archive |
| PDF report | Human-readable network report |
| Backup | Database backup for recovery |

CSV exports prefix text that begins like a spreadsheet formula (`=`, `+`, `-`, or `@`, including
after whitespace) so opening untrusted device or event fields in a spreadsheet does not execute the
text as a formula. JSON exports preserve the original value.

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
| backup denied | missing `backup_manage` (restore: not SuperAdmin) | update role permissions, or use a SuperAdmin account for restore |

## Related Pages

- [Exports](../using-netmap/exports.md)
- [Backup And Restore](../operations/backup-and-restore.md)
- [API Authentication](../api/authentication.md)
