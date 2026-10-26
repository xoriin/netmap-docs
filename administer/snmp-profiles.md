---
title: SNMP Profiles
sidebar_position: 7
keywords: [admin, SNMP, SNMPv2c, community, profiles, credentials]
---

# SNMP Profiles

**Admin → SNMP Profiles** stores reusable SNMP credentials for probes, discovery ARP enrichment, and router or layer-3 switch devices. You need `snmp_profile_manage`.

## Summary

- **Profiles by Version** is a ring of your profiles split into **SNMPv3** and **SNMPv2c**.
- **Profiles** lists every profile, **SNMPv3** and **SNMPv2c** count each version, and **Most used port** shows the commonest port.

## Add A Profile

1. In **Add SNMP Profile**, enter a **Name**, such as `Core network SNMP`.
2. Enter the **Community**.
3. Check the **Port** (default 161), **Timeout** in seconds (1 to 15, default 3) and **Retries** (0 to 3, default 1).
4. Select **Create profile**.

Profiles you create here use SNMPv2c.

## Edit Or Delete A Profile

**Profile Library** lists each **Profile** with its **Version**, **Port**, **Timeout** and **Retries**. Select **Edit** to load a profile into the form, change any field and select **Save changes**. Leave **Community** blank to keep the current one, because NetMap never shows a saved community.

Deleting a profile stops it being offered for new checks but doesn't delete any devices.

## Troubleshooting

If SNMP checks fail, check that UDP port 161 is reachable from the container, that the community and any access lists on the device allow NetMap, and that the timeout suits the device. See [Common Issues](../troubleshooting/common-issues.md).

## Related Pages

- [Tools](../using-netmap/tools.md)
- [Run Discovery](../guides/run-discovery.md)
