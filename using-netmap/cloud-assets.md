---
title: Cloud Assets
sidebar_position: 5
keywords: [inventory, cloud assets, cloud resources, external IPs, providers]
---

# Cloud Assets

**Inventory → Cloud assets** lists saved cloud resources together with External IPs addresses, with provider, location, type, monitoring, and favourite filters, and search. It opens with a **Cloud Assets by Type** ring beside the **Cloud assets**, **Linked devices**, **Offline**, and **Not linked** cards; select **Offline** or **Not linked** to filter the list. Monitoring and latency come from the linked Inventory device; an unlinked row shows **Not monitored**. Manage addresses themselves in [External IPs](./external-ipam.md).

## Add And Manage Cloud Assets

- **Add cloud asset** (requires `ipam_write`) records a name, type, provider, account, region, and description. Names are unique per provider account.
- **Types:** built-in types are Server, Load balancer, Database, Storage, Network, and Other. **Add type…** in the type picker creates a custom type; a name that matches an existing type reuses it.
- **Add to Inventory** is on by default when you also have `topology_write`: after saving, the device form opens prefilled from the asset, and the new device is linked. Turn it off to pick an existing device or leave the asset unlinked.
- **Asset Overview:** select a row, then double-click a field to edit it (`ipam_write`). **Link device**, **Unlink**, **Add to Inventory**, **Open device**, and **Show in Devices** manage and follow the device link. A copy button beside an address's **IP address** or a resource's **Name** copies the value. Creating a device for an address that an existing device already uses offers to link that device instead.
- Cloud assets cannot be deleted from the workspace or the API.

## Use The API

`GET`/`POST /api/v1/ipam/external/assets`, `PATCH /api/v1/ipam/external/assets/{asset_id}`, `GET`/`POST /api/v1/ipam/external/asset-types`.

## Related Pages

- [External IPAM](./external-ipam.md)
- [Inventory](./inventory.md)
- [Cloud Providers](../administer/cloud-providers.md)
