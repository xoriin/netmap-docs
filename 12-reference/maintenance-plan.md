---
title: Documentation Maintenance Plan
description: Staged plan for expanding and maintaining the NetMap documentation.
sidebar_position: 99
keywords:
  - documentation
  - maintenance
  - roadmap
  - source-backed docs
---

# Documentation Maintenance Plan

This page keeps the documentation work maintainable over multiple passes. It is written for contributors and maintainers, not for a specific local environment.

## Documentation Principles

1. Use implementation files as the source of truth.
2. Cross-check existing documentation against source before copying behavior forward.
3. Do not invent features, routes, fields, defaults, installation methods, permissions, or policies.
4. Mark unverifiable behavior exactly as:

```text
Documentation gap: this behaviour could not be verified from the current source.
```

5. Keep pages useful when opened directly from search results.
6. Prefer task-oriented structure with verification steps.
7. Keep deployment paths neutral with placeholders such as `<install-dir>` and `<repo-root>`.

## Current Shape

The VitePress documentation project contains:

- `introduction/`
- `installation/`
- `configuration/`
- `using-netmap/`
- `guides/`
- `api/`
- `operations/`
- `troubleshooting/`
- `security/`
- `development/`
- `reference/`

## Stage 1: Verify Source Evidence

Regenerate a route inventory from the backend:

```bash
cd <repo-root>/backend
env UV_CACHE_DIR=/tmp/uv-cache uv run python - <<'PY'
from app.main import app
schema = app.openapi()
for path, item in schema["paths"].items():
    for method, op in item.items():
        if method not in {"get", "post", "put", "patch", "delete"}:
            continue
        print(method.upper(), path, op.get("summary", ""))
PY
```

Compare the output against [Endpoint Inventory](../07-api/api-reference.md).

## Stage 2: Expand Endpoint Reference

Create endpoint pages under `api/endpoints/` by route group. For each endpoint, include:

- method and path;
- purpose;
- authentication and permissions;
- path parameters;
- query parameters;
- request headers;
- request body;
- success response;
- error responses;
- `curl` example;
- related UI workflow;
- related endpoints.

Suggested order:

1. API keys and authentication.
2. Devices, groups, sites, layouts, relationships.
3. Discovery and observations.
4. Monitoring and alerts.
5. IPAM.
6. Syslog/security.
7. Exports, backup, and restore.
8. Admin, OIDC, audit, and system diagnostics.
9. Tools and LLDP.

## Stage 3: Expand UI Workflows

Every major workflow should include:

- what the task accomplishes;
- prerequisites;
- required permissions;
- numbered steps;
- expected result;
- verification;
- API equivalent;
- common problems;
- related pages.

Priority workflows:

- add a device manually;
- import devices;
- run discovery;
- review scheduled discovery observations;
- build and share a topology layout;
- configure service checks;
- create alert rules;
- import DHCP leases;
- create IP reservations;
- search syslog events;
- export data;
- configure OIDC SSO;
- manage users and roles.

## Stage 4: Resolve Documentation Gaps

Track unresolved gaps in [Documentation Inventory And Gaps](./documentation-inventory.md). Do not remove a gap until source code or an explicit maintainer decision resolves it.

Current gap categories:

- API stability policy;
- deprecation policy;
- vulnerability reporting;
- request ID/tracing behavior;
- reverse proxy examples beyond nginx;
- global pagination/filter/sort/idempotency contracts;
- full `SYSLOG_TLS_*` behavior.

## Stage 5: Validate The Site

```bash
cd <repo-root>/documentation
npm install
npm run build
```

The build output is:

```text
documentation/.vitepress/dist
```

Do not commit `node_modules/`, `.vitepress/cache/`, or `.vitepress/dist/`.
