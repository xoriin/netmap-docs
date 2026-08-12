---
title: Native Installation
sidebar_position: 4
keywords: [native installation]
---

# Native Installation

Documentation gap: this behaviour could not be verified from the current source.

The repository contains FastAPI backend and React frontend source, but production packaging is centered on Docker. Native production installation is not documented as a supported deployment method in the verified source files.

Use [Local Development](../development/local-development.md) for local source work.

## Why This Page Exists

Users often look for native install instructions when deploying self-hosted software. For NetMap, the verified production path is the all-in-one Docker image. This page prevents an unsupported install path from being mistaken for a missing article.

## What Would Need To Be Defined

A supported native installation guide would need source-backed decisions for:

- supported operating systems;
- Python version and virtual environment layout;
- Node.js version and frontend build location;
- nginx or alternative static asset serving;
- uvicorn process supervision;
- syslog listener permissions;
- nmap sudoers configuration;
- `/app/data` equivalent path;
- service user and file ownership;
- upgrade and migration commands;
- backup and restore procedure.

Until those decisions exist, use Docker Compose for production deployments.

## Related Pages

- [Docker Compose](./docker-compose.md)
- [Local Development](../development/local-development.md)
- [File And Directory Paths](../reference/file-paths.md)
