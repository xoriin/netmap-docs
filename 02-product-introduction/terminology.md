---
title: Terminology
description: Common NetMap terms used throughout the documentation.
sidebar_position: 4
keywords: [glossary, terminology]
---

# Terminology

| Term | Meaning |
|---|---|
| Device | A tracked network endpoint or infrastructure asset. |
| Relationship | A topology link between devices or groups. |
| Group | A topology grouping that may include VLAN/subnet metadata. |
| VLAN | Network segmentation metadata stored on topology groups. |
| Site | A physical or logical location for devices. |
| Subnet | An IPAM network range. |
| Reservation | An IP address reservation in IPAM. |
| DHCP lease | Imported lease data used by IPAM. |
| Observation | A scheduled discovery finding that must be reviewed before inventory changes. |
| Service check | A monitored TCP/UDP target associated with a device. |
| API key | A revocable secret that authenticates REST calls as its owning user. |

## Permission Terms

| Term | Meaning |
|---|---|
| Authenticated | The user or API key is valid. |
| Authorized | The authenticated user has the role or permission needed for the action. |
| SuperAdmin | Built-in role with all permissions and administrative access. |
| Custom role | Role created by a SuperAdmin through the role-permissions system. |

## Deployment Terms

| Term | Meaning |
|---|---|
| All-in-one image | Docker image that includes frontend, nginx, FastAPI, workers, and syslog service. |
| Host networking | Docker mode where the container uses the host network namespace. Required for MAC discovery through ARP. |
| Bridge networking | Docker mode with explicit port publishing. Easier to isolate, but ARP discovery does not cross the bridge. |
| WAL | SQLite write-ahead logging mode, which creates sidecar files that matter for live backups. |

## Related Pages

- [Features](./features.md)
- [Architecture](./architecture.md)
- [Glossary](../12-reference/glossary.md)
| SuperAdmin | Built-in administrative role with all permissions. |
