---
title: Backend Development
description: FastAPI backend development notes.
sidebar_position: 2
keywords: [backend, FastAPI]
---

# Backend Development

Key files:

- `backend/app/main.py`
- `backend/app/api/deps.py`
- `backend/app/api/v1/router.py`
- `backend/app/api/v1/*.py`
- `backend/app/schemas/*.py`
- `backend/app/models/*.py`
- `backend/app/services/*`

Validate:

```bash
cd <repo-root>/backend
env UV_CACHE_DIR=/tmp/uv-cache uv run --extra dev pytest tests
```
