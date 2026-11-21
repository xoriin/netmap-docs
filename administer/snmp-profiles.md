---
title: SNMP Profiles
sidebar_position: 7
keywords: [admin, SNMP, SNMPv2c, SNMPv3, community, USM, profiles, credentials]
---

# SNMP Profiles

**Admin → SNMP Profiles** stores reusable SNMP credentials for probes, discovery ARP enrichment, and router or layer-3 switch devices. You need `snmp_profile_manage`.

## Summary

- **Profiles by Version** is a ring of your profiles split into **SNMPv3** and **SNMPv2c**.
- **Profiles** lists every profile, **SNMPv3** and **SNMPv2c** count each version, and **Most used port** shows the commonest port.

## Add A Profile

1. In **Add SNMP Profile**, enter a **Name**, such as `Core network SNMP`.
2. Choose the **Version**: **SNMPv2c** or **SNMPv3**.
3. Enter the credentials for that version (see below).
4. Check the **Port** (default 161), **Timeout** in seconds (1 to 15, default 3) and **Retries** (0 to 3, default 1).
5. Select **Create profile**.

### SNMPv2c

Enter the **Community** (up to 128 characters).

### SNMPv3

1. Enter the **Username** the device expects.
2. Choose the **Security level**. The form shows only the fields that level uses:

| Security level | Authentication | Privacy (encryption) |
|---|---|---|
| `noAuthNoPriv` | None | None |
| `authNoPriv` | **Auth protocol** and **Auth key** | None |
| `authPriv` (default) | **Auth protocol** and **Auth key** | **Privacy protocol** and **Privacy key** |

3. Choose the **Auth protocol**: `MD5`, `SHA`, `SHA-224`, `SHA-256` (default), `SHA-384` or `SHA-512`.
4. Choose the **Privacy protocol**: `DES`, `AES` (default, AES-128), `AES-192` or `AES-256`.
5. Enter the keys. Each key must be 8 to 256 characters.
6. Optionally enter a **Context name**, for devices that expose data per context.

Match the protocols to the device's SNMPv3 user exactly; a mismatch looks the same as a timeout. Prefer `authPriv` with SHA-256 or stronger and AES where the device supports them, because `noAuthNoPriv` and `authNoPriv` send data unencrypted.

NetMap encrypts the community and both keys with the master key before storing them, and never shows them again.

## Edit Or Delete A Profile

**Profile Library** lists each **Profile** with its **Version** (`v2c` or `v3`), **Port**, **Timeout** and **Retries**. Select **Edit** to load a profile into the form, change any field and select **Save changes**. The **Community**, **Auth key** and **Privacy key** fields show "leave blank to keep": leave them blank to keep the saved secret, or type a new value to replace it. Clearing **Context name** removes it.

Profiles created before NetMap 1.8.2 stay SNMPv2c. To move a device to SNMPv3, edit its profile, change the **Version** and enter the SNMPv3 credentials.

Deleting a profile stops it being offered for new checks but doesn't delete any devices.

## Where Profiles Are Used

SNMPv2c and SNMPv3 profiles both work for the **SNMP Probe** in [Tools](../using-netmap/tools.md), discovery ARP enrichment, and LLDP scans. The SNMP Probe's manual option (typing a community instead of choosing a profile) is SNMPv2c only; to probe with SNMPv3, save a profile first.

## Troubleshooting

If SNMP checks fail, check that UDP port 161 is reachable from the container, that the community or SNMPv3 username, security level, protocols and keys match the device, that any access lists on the device allow NetMap, and that the timeout suits the device. See [Common Issues](../troubleshooting/common-issues.md).

## Related Pages

- [Tools](../using-netmap/tools.md)
- [Run Discovery](../guides/run-discovery.md)
