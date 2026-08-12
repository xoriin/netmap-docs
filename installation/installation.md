---
title: Installation Overview
sidebar_position: 1
keywords:
  - install
  - deployment
  - Docker
  - Docker Compose
  - networking
verified_version: "1.5.0"
---

# Installation Overview

NetMap is distributed as a self-hosted all-in-one Docker image. The image contains the web server, FastAPI backend, React interface, SQLite databases, monitoring workers, discovery tools, and syslog listener in one container.

This page helps you choose a deployment path. Use [Quick Start](./quick-start.md) when you want a minimal working Compose installation; use the linked pages below when you need to tune the deployment.

## Choose a deployment path

| Goal | Recommended path | Notes |
| --- | --- | --- |
| Install a released image | [Five-Minute Quick Start](./quick-start.md) | Pulls `xoriin/netmap:latest` and stores state in a host directory. |
| Operate a Compose deployment | [Docker Compose](./docker-compose.md) | Covers environment values, ports, capabilities, logging, and networking choices. |
| Try the image with one command | [Docker](./docker.md) | Useful for a disposable test; Compose is easier to maintain. |
| Build the image from source | [Build the All-in-One Image](./docker-compose.md#build-from-source) | Maintainer workflow using the repository's build Compose file. |
| Install without containers | [Native Installation](./native-installation.md) | Contributor/development guidance only; not the supported production deployment. |

## Requirements

- Docker Engine with Compose v2 support.
- A host directory with enough space for `/app/data` and SQLite growth.
- Stable `SECRET_KEY` and `MASTER_KEY` values. Losing either key can make existing sessions, API-key verification, or encrypted settings unusable.
- A host firewall policy for the web and syslog ports you intend to publish.
- Host networking or equivalent Layer-2 access if you need ARP/MAC discovery. Bridge networking is sufficient for ordinary web access, routed probes, and many monitoring checks.

The first start creates the database schema and applies registered migrations. Keep the data directory and secret values when upgrading.

## Decide how the container reaches the network

Use the default Docker bridge network when you want normal port publishing and clear container isolation. Use `network_mode: host` when the container must use the host's LAN address for ARP/MAC discovery or for DHCP checks against a server whose scopes do not include the Docker bridge address.

Host networking changes the port model: the container binds directly to the host, so `ports:` mappings are not used and host ports must be available. See [How NetMap Works](../product-introduction/architecture.md#network-access-and-capabilities) and [Docker Compose](./docker-compose.md) before changing this setting.

## Installation sequence

1. Choose a host directory and create a persistent `data/` subdirectory.
2. Generate and protect `SECRET_KEY` and `MASTER_KEY`.
3. Create an environment file and Compose file; do not put production secrets in a public repository.
4. Run `docker compose config` to catch malformed JSON-valued settings and missing variables.
5. Start the container and wait for `/api/health` to return `{"status":"ok"}`.
6. Complete first-run setup and create the initial SuperAdmin.
7. Review [the installation security checklist](../security/network-exposure.md), create backups, and configure only the network access your use case needs.

## After the first start

Confirm that:

- `/app/data` is a host-mounted persistent directory;
- the web UI opens on the configured address;
- the health endpoint responds successfully;
- the initial administrator can sign in;
- active network tools have the capabilities they need;
- syslog ports are published only if you intend to receive syslog; and
- a backup procedure protects both SQLite databases and the secret material.

## What this section covers next

- [Five-Minute Quick Start](./quick-start.md) — the shortest supported Compose path;
- [Docker Compose](./docker-compose.md) — production-shaped options and source builds;
- [Docker](./docker.md) — direct image execution;
- [Reverse Proxy and HTTPS](./reverse-proxy.md) — TLS termination and forwarded headers;
- [Upgrading](./upgrading.md) — pull, backup, migrate, and verify; and
- [Backup and Restore](./backup-and-restore.md) — preserving or recovering application state.

## Related concepts

- [How NetMap Works](../product-introduction/architecture.md#the-all-in-one-image-and-persistent-databases)
- [How NetMap Works](../product-introduction/architecture.md#network-access-and-capabilities)
- [How NetMap Works](../product-introduction/architecture.md#production-images-and-installed-versions)
- [Configuration Reference](../configuration/configuration.md)
- [Installation Problems](../troubleshooting/installation-problems.md)
