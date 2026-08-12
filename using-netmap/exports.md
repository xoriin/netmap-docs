---
title: Exports
sidebar_position: 11
keywords: [exports, backup, report]
---

# Exports

The Exports workspace shows available row counts, recent export activity, permissions, and download panels. Export permissions are separate: `inventory_export`, `firewall_export`, and `report_export`. Database backup/restore and scheduled-backup administration require SuperAdmin.

## Data exports

Inventory CSV includes identity, status, type, icon/colour, VLAN/group, subnet, tags, notes, and UTC timestamps. Inventory JSON uses the same fields with arrays/null values preserved for automation. Filenames include a UTC timestamp; CSV is UTF-8 and suitable for spreadsheets.

Firewall CSV/JSON exports apply the active full-text/structured filters and a server-side row limit. Fields include received/event time, source host, source/destination addresses and ports, protocol, action, interface, direction, rule/tracker identifiers, reason, and raw log. Export only the filtered data needed for an investigation.

The PDF network report is a generated snapshot containing a topology/device summary, inventory sample, IP summary, recent firewall counts, top blocked sources/destinations, retention status, and an explicit note where broader certificate/security reporting is not implemented. Generation time and current database availability affect its contents.

## Backups

The manual backup endpoint creates a SQLite database backup and appends an HMAC-SHA256 integrity trailer signed with the instance's signing secret. It is not an encrypted archive. The database contains the main application data; firewall data, environment files, secret files, custom icons, and logs require separate filesystem backup where applicable. Keep the signing secret and encryption keys with the backup, but store them separately from publicly downloadable exports.

Before restore, upload the file to `/api/v1/exports/restore/validate`. Validation checks the signature, expected tables, SQLite integrity, size, and row counts without touching the live database. Restore is a destructive replacement after confirmation; it disposes the engine, copies the validated SQLite content, and requires downtime/verification.

## Scheduled backups

Administrators configure enablement, interval in hours, retention count, and the persistent data backup directory. The background service writes `netmap-backup-<timestamp>.db` files and prunes the oldest files beyond the retention count. The UI/API can list, download, or delete individual scheduled files; filenames are constrained to the backup directory to prevent path traversal.

## Recovery runbook

1. Preserve the current data directory and logs.
2. Confirm the image version and original `SECRET_KEY`, `MASTER_KEY`, signing secret, and OIDC secret files.
3. Validate the selected backup with the restore-validation endpoint.
4. Stop the container or schedule downtime.
5. Restore through the API or the filesystem procedure in [Backups](../operations/backups.md).
6. Start NetMap and verify health, login, devices/topology, IPAM, syslog history, API keys, and scheduled backups.

## API equivalents

- `GET /api/v1/exports/summary`
- `GET /api/v1/exports/inventory?format=csv|json`
- `GET /api/v1/exports/firewall?format=csv|json`
- `GET /api/v1/exports/report.pdf`
- `GET /api/v1/exports/backup`
- `POST /api/v1/exports/restore/validate`
- `POST /api/v1/exports/restore`
- `GET/DELETE /api/v1/exports/scheduled-backups/{filename}`
