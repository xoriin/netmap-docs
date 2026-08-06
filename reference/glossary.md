---
title: Glossary
description: Glossary of NetMap terms.
sidebar_position: 4
keywords: [glossary]
---

# Glossary

This glossary defines common NetMap terms used in user, API, operations, and developer documentation.

| Term | Meaning |
|---|---|
| Access token | Short-lived authentication token used by browser/session clients. |
| API key | Long-lived or expiring secret used by automation through the `X-API-Key` header. |
| API-key prefix | Plaintext lookup component of an API key; not sufficient for authentication. |
| Device | A tracked network endpoint or infrastructure asset. |
| Discovery scan | nmap-based scan that identifies hosts in a private range. |
| Firewall database | Separate SQLite database, `firewall.db`, for syslog/firewall events. |
| FTS5 | SQLite full-text search extension used for raw firewall log searching. |
| Group | A topology grouping that can hold VLAN and subnet metadata. |
| IPAM | IP address management: subnets, address grids, reservations, leases, and conflicts. |
| LLDP | Link Layer Discovery Protocol. NetMap includes LLDP scan/neighbour endpoints. |
| Main database | SQLite database, `netmap.db`, for core application state. |
| Observation | Scheduled discovery finding that can be applied or resolved by a user. |
| OIDC | OpenID Connect single sign-on. |
| Permission | Named capability such as `topology_write` or `security_view`. |
| Relationship | Topology link between devices or groups. |
| Service check | TCP/UDP monitoring target associated with a device. |
| Site | Physical or logical location for devices. |
| SuperAdmin | Built-in role that bypasses permission checks and can manage administrative settings. |
| Syslog | Log forwarding protocol accepted by NetMap over configured UDP/TCP ports. |
| VLAN | Virtual LAN metadata stored on topology groups and used by IPAM workflows. |

Related page: [Terminology](../product-introduction/terminology.md).
