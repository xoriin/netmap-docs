---
title: Repository Structure
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

## Key Source Files

| Path | Purpose |
|---|---|
| `backend/app/main.py` | FastAPI app entrypoint |
| `backend/app/api/v1/` | Versioned REST route handlers |
| `backend/app/api/deps.py` | Authentication and permission dependencies |
| `backend/app/core/config.py` | Environment settings |
| `backend/app/db/session.py` | Main SQLite setup |
| `backend/app/db/firewall_session.py` | Firewall SQLite setup |
| `frontend/src/routes/index.ts` | SPA route definitions |
| `frontend/src/features/` | Workspace components |
| `docker/aio.Dockerfile` | Production all-in-one image build |
| `docker/aio-entrypoint.sh` | Runtime process startup |
| `docker/aio-nginx.conf.template` | Bundled nginx config template |
| `documentation/` | VitePress documentation project |

## Documentation

The root `documentation/` directory contains the public documentation source and its VitePress configuration.

The `docs/` directory contains project notes that may be useful to contributors but are not the public documentation site.

## Contributor Checkout

Create a GitHub fork and clone that fork into any working directory:

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/netmap.git
cd netmap
git remote add upstream https://github.com/xoriin/netmap.git
git fetch upstream
```

Run commands from the repository root unless a page says to enter `backend/`, `frontend/`, or `documentation/`. Continue with [Contributing Workflow](./contributing-workflow.md) to create the `test` branch and submit the change.

## Related Pages

- [Backend Development](./backend-development.md)
- [Frontend Development](./frontend-development.md)
- [Contributing Workflow](./contributing-workflow.md)
