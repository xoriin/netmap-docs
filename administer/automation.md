---
title: Automation
sidebar_position: 10
keywords: [admin, automation, scheduled scans, discovery, change observations]
---

# Automation

**Admin → Automation** is where you schedule discovery scans and review the changes they find. You need `automation_manage` or `discovery_manage`.

## Summary

- **Changes Found, Last 14 Days** shows changes per day, split into **New devices**, **Address changes** and **Disappeared**.
- **Schedules** counts your scan ranges, **Active** shows how many are paused, **Next run** names the next schedule due, and **Open changes** shows how many have been resolved.

## Schedule A Scan

1. In **New Schedule**, enter a **Target** as an IP address, CIDR or range, such as `192.168.1.0/24`, and optionally a **Name**.
2. Choose a **Scan type**: **Ping only — host discovery** or **Ping + port scan — common ports**.
3. Choose an **Interval**, from **Every 15 minutes** to **Every 24 hours**.
4. Optionally choose a **Group** and a notification method under **Notify on change**.
5. Leave **Enable immediately** ticked to start the schedule now, then select **Create schedule**.

**Scheduled Scans** lists each schedule's **Scan type**, **Interval**, **Last run** and **Next run**. Select **Run now**, **Pause** or **Resume**, or **Delete**.

## Review Changes

Scheduled scans never change your inventory by themselves. Each change they find appears in **Change Observations**, where you can select **Acknowledge** or **Resolve**. [Run Discovery](../guides/run-discovery.md#scheduled-discovery) explains how to apply a change to your inventory.

## Related Pages

- [Run Discovery](../guides/run-discovery.md)
- [Notifications](./notifications.md)
- [Topology](../using-netmap/topology.md)
