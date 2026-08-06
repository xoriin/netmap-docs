---
title: Release Process
description: Test and production release workflow.
sidebar_position: 7
keywords: [release, test, prod]
---

# Release Process

This page describes a neutral release workflow for maintainers. It does not assume a specific local checkout folder layout.

Flow:

1. Develop changes on a branch.
2. Run backend, frontend, packaging, and documentation validation.
3. Open a pull request or merge through the project's normal review process.
4. Update `CHANGELOG.md` for user-visible changes.
5. Publish release artifacts from the release branch.
6. Push a `v*` tag when ready to publish a production image and GitHub Release.

## Branch Guidance

| Branch type | Purpose |
|---|---|---|
| feature branch | isolated development and review |
| staging branch | optional pre-release image validation |
| production release branch | source for production release artifacts |

## Validation Before Promotion

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

## Changelog

Update `CHANGELOG.md` for user-visible changes, security hardening, API behavior, and operational changes. GitHub releases are generated from changelog content on `v*` tags.

## Related Pages

- [Testing](./testing.md)
- [Changelog](../12-reference/changelog.md)
- [Cloudflare Pages Deployment](../12-reference/cloudflare-pages.md)
