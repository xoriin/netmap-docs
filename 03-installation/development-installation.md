---
title: Development Installation
description: Set up NetMap for local development.
sidebar_position: 5
keywords: [development, local setup]
---

# Development Installation

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
