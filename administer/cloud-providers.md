---
title: Cloud Providers
sidebar_position: 6
keywords: [admin, cloud providers, external IPs, cloud assets, AWS, Azure, Google Cloud]
---

# Cloud Providers

**Admin → Cloud providers** manages the provider catalogue shared by External IPs and cloud assets. You need `device_catalog_manage`.

## Summary

- **External IPs by Provider** is a ring of your external IP addresses split by provider.
- **Providers** lists every provider, **Built in** counts those seeded on install, **Custom** lists those you added, and **Unassigned IPs** counts addresses with no provider.

## Add A Provider

1. In **New Provider**, enter a **Provider name**, such as Oracle Cloud.
2. Enter **Matching aliases**, separated by commas, such as `OCI, Oracle, Oracle Cloud Infrastructure`.
3. Select **Choose icon** and pick an SVG, PNG, JPEG or WebP file of up to 256 KB.
4. Select **Add provider**.

**Provider Catalogue** lists each provider with its aliases, and lets you **Replace icon** or **Remove** it.

## Built-In Providers

AWS, Azure and Google Cloud are added on install as a convenience. You can edit or remove them, and a removed provider isn't recreated on restart.

Removing a provider doesn't delete any external addresses, provider accounts or devices. Accounts that used it show no provider until you choose another.

## Related Pages

- [External IPAM](../using-netmap/external-ipam.md)
- [Inventory](../using-netmap/inventory.md)
