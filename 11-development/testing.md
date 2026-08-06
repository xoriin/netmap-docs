---
title: Testing
description: Test and validation commands.
sidebar_position: 4
keywords: [testing, pytest, tsc, vite]
---

# Testing

Backend:

```bash
cd <repo-root>/backend
env UV_CACHE_DIR=/tmp/uv-cache uv run --extra dev pytest tests
```

Frontend:

```bash
cd <repo-root>/frontend
npm exec tsc -- --noEmit
node node_modules/vite/bin/vite.js build
```

Documentation:

```bash
cd <repo-root>/documentation
npm run build
```

## When To Run What

| Change type | Minimum validation |
|---|---|
| backend route/service/model | focused pytest plus relevant integration tests |
| authentication/API keys | API-key and auth tests |
| frontend component/workspace | `tsc --noEmit` and Vite build |
| CSS/theme | frontend build plus visual check |
| documentation | VitePress build |
| Docker packaging | all-in-one rebuild and health check |

## Test Data

Do not put real secrets, production hostnames, or private customer data into tests or snapshots.

## Related Pages

- [Backend Development](./backend-development.md)
- [Frontend Development](./frontend-development.md)
- [Cloudflare Pages Deployment](../12-reference/cloudflare-pages.md)
