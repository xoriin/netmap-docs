---
title: Repository Structure
description: NetMap workspace and source layout.
sidebar_position: 1
keywords: [repository, structure]
---

# Repository Structure

This page describes the public source layout. Contributor local checkout folders, local branch directories, editor settings, and personal automation rules are outside the documentation scope.

Backend: `backend/app`.

Frontend: `frontend/src`.

Docker packaging: `docker`.

Hosted documentation: `documentation/`.

Project notes: `docs/`.

## Top-Level Folders

| Path | Purpose |
|---|---|
| `backend/` | FastAPI backend, routes, schemas, models, services, tests |
| `frontend/` | React SPA, workspaces, shared components, hooks, styles |
| `docker/` | all-in-one Dockerfile, nginx template, entrypoint |
| `documentation/` | VitePress documentation site |
| `docs/` | project architecture, design, planning, and maintainer notes |
| `scripts/` | release and maintenance scripts |
| `assets/` | screenshots and media used by the project |

## Documentation

The root `documentation/` directory is a VitePress project intended for GitHub and Cloudflare Pages hosting.

The `docs/` directory contains project notes that may be useful to contributors but are not the public documentation site.

## Local Checkout

Clone the repository into any working directory:

```bash
git clone https://github.com/xoriin/netmap.git
cd netmap
```

Run commands from the repository root unless a page says to enter `backend/`, `frontend/`, or `documentation/`.

## Related Pages

- [Backend Development](./backend-development.md)
- [Frontend Development](./frontend-development.md)
- [Release Process](./release-process.md)
