---
title: Exports
sidebar_position: 11
keywords: [exports, backup, report]
---

# Exports

The Exports workspace shows available row counts, recent export activity, permissions, and download panels. Export permissions are separate: `inventory_export`, `firewall_export`, and `report_export`. Database backup/restore and scheduled-backup administration require SuperAdmin.

## Data exports

Inventory CSV includes identity, status, type, icon/colour, VLAN/group, subnet, tags, notes, and UTC timestamps. Inventory JSON uses the same fields with arrays/null values preserved for automation. Filenames include a UTC timestamp; CSV is UTF-8 and formula-like text is prefixed so spreadsheets treat it as text rather than executable formulas.

Firewall CSV/JSON exports apply the active full-text/structured filters and a server-side row limit. Fields include received/event time, source host, source/destination addresses and ports, protocol, action, interface, direction, rule/tracker identifiers, reason, and raw log. Export only the filtered data needed for an investigation.

The PDF network report is a generated snapshot containing a topology/device summary, inventory sample, IP summary, recent firewall counts, top blocked sources/destinations, retention status, and an explicit note where broader certificate/security reporting is not implemented. Generation time and current database availability affect its contents.

## Backups

The primary manual workflow creates a portable `.nmbak` encrypted and authenticated with AES-256-GCM from a Scrypt-derived passphrase. NetMap does not store the passphrase. The legacy `/backup` endpoint still creates an instance-signed, unencrypted `.db` for compatibility. The database contains the main application data; firewall data, environment files, secret files, custom icons, and logs require separate filesystem backup where applicable.

Before restore, upload the file to `/api/v1/exports/restore/validate`, passing an encrypted backup's passphrase in `X-NetMap-Backup-Passphrase`. Validation checks authenticated encryption or the legacy signature, expected tables, SQLite integrity, size, and row counts without touching the live database. Uploads stop at 256 MB. Restore is a destructive replacement after confirmation and requires downtime/verification.

## Scheduled backups

Administrators configure enablement, interval in hours, retention count, and the persistent data backup directory. The background service writes signed but unencrypted `netmap-backup-<timestamp>.db` files and prunes the oldest files beyond the retention count. Use an encrypted host volume/filesystem for that directory. The UI/API can list, download, or delete individual scheduled files; filenames are constrained to the backup directory to prevent path traversal.

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
- `POST /api/v1/exports/backup/encrypted`
- `POST /api/v1/exports/restore/validate`
- `POST /api/v1/exports/restore`
- `GET/DELETE /api/v1/exports/scheduled-backups/{filename}`
