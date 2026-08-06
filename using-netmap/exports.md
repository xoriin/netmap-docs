---
title: Exports
description: Export inventory, firewall logs, reports, backups, and scheduled backup files.
sidebar_position: 11
keywords: [exports, backup, report]
---

# Exports

Export permissions are separate:

- Inventory export: `inventory_export`.
- Firewall export: `firewall_export`.
- PDF report export: `report_export`.
- Database backup/restore: SuperAdmin.

API equivalents:

- `GET /api/v1/exports/inventory`
- `GET /api/v1/exports/firewall`
- `GET /api/v1/exports/report.pdf`
- `GET /api/v1/exports/backup`
- `POST /api/v1/exports/restore/validate`
- `POST /api/v1/exports/restore`
- `/api/v1/exports/scheduled-backups`
