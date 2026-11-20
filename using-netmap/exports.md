---
title: Exports
description: Download inventory, firewall events, and PDF reports, or back up the NetMap database.
---

# Exports

The Exports workspace groups inventory and PDF report downloads above the firewall export controls. On wide screens, a separate information column shows available row counts, recent export activity, the last download time, and a CSV/JSON/PDF format guide. The page has a maximum width for readability; smaller screens stack these sections. Only download panels and format guidance permitted for your role are shown.

Export permissions are separate: `inventory_export`, `firewall_export`, and `report_export`. Database backup/restore and scheduled-backup administration require `backup_manage`; restore is SuperAdmin-only.

| Export | Purpose | Permission |
|---|---|---|
| Inventory | Device records for spreadsheets or automation | `inventory_export` |
| Firewall | Syslog/firewall events for investigation or archive | `firewall_export` |
| PDF report | Human-readable network report | `report_export` |
| Backup | Database backup for recovery | `backup_manage` (restore: SuperAdmin) |

## Before You Start

You need a signed-in account with the permission for the export you want. For a backup restore, use a SuperAdmin account and confirm you have a validated copy first.

## Data Exports

Inventory CSV includes identity, status, type, icon/colour, VLAN/group, subnet, tags, notes, and UTC timestamps. Inventory JSON uses the same fields with arrays/null values preserved for automation. Filenames include a UTC timestamp; CSV is UTF-8 and formula-like text is prefixed so spreadsheets treat it as text rather than executable formulas.

CSV exports prefix text that begins like a spreadsheet formula (`=`, `+`, `-`, or `@`, including after whitespace) so opening untrusted device or event fields in a spreadsheet does not execute the text as a formula. JSON exports preserve the original value.

Firewall CSV/JSON exports apply the active full-text/structured filters and a server-side row limit. Fields include received/event time, source host, source/destination addresses and ports, protocol, action, interface, direction, rule/tracker identifiers, reason, and raw log. Export only the filtered data needed for an investigation.

The PDF network report is a generated snapshot containing a topology/device summary, inventory sample, IP summary, recent firewall counts, top blocked sources/destinations, retention status, and an explicit note where broader certificate/security reporting is not implemented. Generation time and current database availability affect its contents.

## Backups

The primary manual workflow creates a portable `.nmbak` encrypted and authenticated with AES-256-GCM from a Scrypt-derived passphrase. NetMap does not store the passphrase. The legacy `/backup` endpoint still creates an instance-signed, unencrypted `.db` for compatibility. The database contains the main application data; firewall data, environment files, secret files, custom icons, and logs require separate filesystem backup where applicable.

Before restore, upload the file to `/api/v1/exports/restore/validate`, passing an encrypted backup's passphrase in `X-NetMap-Backup-Passphrase`. Validation checks authenticated encryption or the legacy signature, expected tables, SQLite integrity, size, and row counts without touching the live database. Uploads stop at 256 MB. Restore is a destructive replacement after confirmation and requires downtime/verification.

## Scheduled Backups

Administrators configure enablement, interval in hours, retention count, and the persistent data backup directory. The background service writes signed but unencrypted `netmap-backup-<timestamp>.db` files and prunes the oldest files beyond the retention count. Use an encrypted host volume/filesystem for that directory. The UI/API can list, download, or delete individual scheduled files; filenames are constrained to the backup directory to prevent path traversal.

## Recovery Runbook

1. Preserve the current data directory and logs.
2. Confirm the image version and original `SECRET_KEY`, `MASTER_KEY`, signing secret, and OIDC secret files.
3. Validate the selected backup with the restore-validation endpoint.
4. Stop the container or schedule downtime.
5. Restore through the API or the filesystem procedure in [Backup And Restore](../operations/backup-and-restore.md).
6. Start NetMap and verify health, login, devices/topology, IPAM, syslog history, API keys, and scheduled backups.

## API Equivalents

- `GET /api/v1/exports/summary`
- `GET /api/v1/exports/inventory?format=csv|json`
- `GET /api/v1/exports/firewall?format=csv|json`
- `GET /api/v1/exports/report.pdf`
- `GET /api/v1/exports/backup`
- `POST /api/v1/exports/backup/encrypted`
- `POST /api/v1/exports/restore/validate`
- `POST /api/v1/exports/restore`
- `GET/DELETE /api/v1/exports/scheduled-backups/{filename}`

To download inventory with a key whose owner has `inventory_export`:

```bash
curl --fail-with-body \
  --url "${NETMAP_URL}/api/v1/exports/inventory" \
  --header "X-API-Key: ${NETMAP_API_KEY}" \
  --output inventory-export
```

## Common Problems

| Symptom | Likely cause | Fix |
|---|---|---|
| `403` | missing export permission | update role permissions |
| empty firewall export | no matching events | widen filters or confirm syslog ingest |
| backup denied | missing `backup_manage` (restore: not SuperAdmin) | update role permissions, or use a SuperAdmin account for restore |

## Next Steps

- [Backup And Restore](../operations/backup-and-restore.md)
- [API Authentication](../api/authentication.md)
