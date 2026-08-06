---
title: Local Development
description: Build and validate a NetMap source checkout before submitting a contribution.
sidebar_position: 2
keywords: [development, local setup, contributor]
---

# Local Development

Fork and clone NetMap before using these commands. See [Contributing Workflow](./contributing-workflow.md) for the required remotes, branches, commit steps, and pull-request target.

Work in:

```bash
cd <repo-root>
```

Build and run the all-in-one image from source:

```bash
cp .env.example .env
docker compose -f docker-compose.build.yml up --build -d
curl --fail http://127.0.0.1:8080/api/health
```

Backend tests:

```bash
cd <repo-root>/backend
env UV_CACHE_DIR=/tmp/uv-cache uv run --extra dev pytest tests
```

Frontend type-check and build:

```bash
cd <repo-root>/frontend
npm exec tsc -- --noEmit
node node_modules/vite/bin/vite.js build
```

After validation, commit the change to your feature branch, merge it into your fork's `test` branch, and push `origin test` as described in the contributor workflow.

## Related pages

- [Contributing Workflow](./contributing-workflow.md)
- [Testing](./testing.md)
- [Repository Structure](./repository-structure.md)
