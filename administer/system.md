---
title: System
sidebar_position: 2
keywords: [admin, system, app settings, version, diagnostics, backups, status page default CSS]
---

# System

**Admin → System** holds NetMap's application settings, version, storage and syslog details, runtime diagnostics and backups. A SuperAdmin sees the whole tab. With only `diagnostics_view` or `backup_manage`, you see **System Diagnostics** and **Database Backups** instead, where you can download backups but not restore them.

## Summary And Version

The tab opens with a **Version** card beside six summary cards: **Live ping interval**, **Idle logout**, **Reservation expiry**, scheduled backups, **Syslog listeners** and **Stored events**.

The **Version** card shows the installed version with its channel, such as `Dev: 1.7.0`, and the latest release with **Up to date** or **Update available**. It also opens **What's new**, which appears once for each user and version. Its footer shows when diagnostics were loaded and the process ID, and **Refresh** reloads them. Without internet access, the card shows the installed version only.

Every signed-in user sees the installed version in the expanded sidebar footer, with a link when a newer release exists.

## App Settings

**App Settings** groups its fields into task panels:

| Panel | Covers |
|---|---|
| **Identity and Support** | **App name**, **Login page message**, announcement, and the support email and URL |
| **Session Policy** | **Log out inactive users** and the idle timeout |
| **Monitoring and Network Checks** | Live ping, monitoring interval limits and the public-target policy |
| **IP Reservation Policy** | Reservation defaults, **Reminder lead time (days)** and reminder channels |

Some settings, such as listener ports and secrets, come from the environment instead; see the [Configuration Reference](../configuration/configuration.md).

## Storage, Syslog And Diagnostics

The tab charts **Storage** use, **Device Status at Last Check** and **Backup Size, Last 10**. **Syslog Configuration** shows the listeners and intake, and **Runtime Diagnostics** shows database file sizes, monitoring and syslog counters and the process ID. Use these with the container logs when you investigate resource or start-up problems.

## Backups

**Database Backup & Restore** and **Scheduled Backups** are covered on [Backup And Restore](../operations/backup-and-restore.md).

## Status Page Default CSS

**Status Page Default CSS** is the stylesheet copied into each new [status page](../using-netmap/status-pages.md). Changing it never restyles existing pages, and it follows the same rules as a page's own [custom CSS](../using-netmap/status-page-css.md).

## Related Pages

- [Admin Workspace](./index.md)
- [Backup And Restore](../operations/backup-and-restore.md)
- [Monitoring NetMap](../operations/monitoring-netmap.md)
