---
title: Documentation Inventory And Gaps
description: Evidence-backed inventory of documented areas and unresolved source gaps.
sidebar_position: 12
keywords:
  - documentation inventory
  - evidence
  - gaps
  - audit
---

# Documentation Inventory And Gaps

## Inventory

| Area | Evidence | User-facing behavior | Documentation page | Status |
|---|---|---|---|---|
| Product purpose | `README.md`, frontend routes, backend routers | Self-hosted network mapping, monitoring, IPAM, syslog, admin | `introduction.md` | Verified |
| Architecture | `main.py`, Dockerfile, nginx template, DB sessions | Single container with nginx, uvicorn, React, SQLite, workers | `introduction.md` | Verified |
| Installation | `docker/aio.Dockerfile`, `docker-compose.yml`, `.env.example` | Docker all-in-one deployment | `installation.md` | Verified |
| Health | `main.py`, `api/v1/router.py`, Dockerfile healthcheck | `/api/health`, `/api/v1/health` return `{"status":"ok"}` | `operations.md` | Verified |
| Configuration | `core/config.py`, `core/startup.py`, env example | Environment-driven settings with production secret checks | `configuration.md` | Verified |
| Authentication | `api/deps.py`, `auth.py`, auth services | Cookie/bearer/API-key auth; OIDC optional | `api-overview.md`, `security.md` | Verified |
| API keys | `api_keys.py`, `models/api_key.py`, `services/api_keys/*`, schemas, tests | Self-service and SuperAdmin lifecycle, HMAC storage, rate limits | `api-keys.md` | Verified |
| Roles/permissions | `models/user.py`, `services/rbac/permissions.py`, `api/deps.py` | Built-in/custom roles with named permissions | `security.md`, `api-reference.md` | Verified |
| UI workspaces | `frontend/src/routes/index.ts`, `frontend/src/features/*` | 12 workspace routes with role-gated Security/Admin | `user-guide.md` | Verified |
| Endpoint inventory | Generated FastAPI OpenAPI, router dependencies | REST route list under `/api/v1` plus `/api/health` | `api-reference.md` | Verified |
| Operations | `main.py`, Dockerfile, nginx template, exports routes | Workers, logs, health, backup/restore, upgrade | `operations.md` | Partially verified |
| Reverse proxy | nginx template, entrypoint, CORS config | Must preserve forwarded and WebSocket headers | `configuration.md` | Partially verified |
| Developer workflow | package files, tests, source layout | generic contributor workflow and validation commands | `development.md` | Verified |

## Documentation Gaps

Use this exact wording when behavior cannot be verified:

```text
Documentation gap: this behaviour could not be verified from the current source.
```

Known gaps from this pass:

| Gap | Area to resolve |
|---|---|
| Documentation gap: this behaviour could not be verified from the current source. There is no explicit public API stability policy. | Maintainer decision; likely `README.md`, `CONTRIBUTING.md`, or a docs policy page. |
| Documentation gap: this behaviour could not be verified from the current source. There is no explicit API deprecation policy. | Maintainer decision and OpenAPI route metadata conventions. |
| Documentation gap: this behaviour could not be verified from the current source. There is no source-backed vulnerability reporting process. | Add `SECURITY.md` or equivalent. |
| Documentation gap: this behaviour could not be verified from the current source. There is no documented request ID or tracing policy. | Logging/middleware design decision. |
| Documentation gap: this behaviour could not be verified from the current source. Caddy, Traefik, and Nginx Proxy Manager examples are not present as verified project files. | Add tested reverse-proxy examples. |
| Documentation gap: this behaviour could not be verified from the current source. Global pagination, sorting, filtering, and idempotency contracts do not exist across all endpoints. | API design decision; route-specific docs should remain endpoint-specific. |
| Documentation gap: this behaviour could not be fully verified in this documentation pass. `SYSLOG_TLS_*` settings exist, but TLS listener behavior should be checked directly in `backend/app/services/syslog/server.py` before publishing TLS syslog guidance. | `services/syslog/server.py` implementation review and test. |

## Validation Performed

- Read the documentation prompt.
- Read shared `docs/CODEBASE.md`.
- Read FastAPI app and router registration.
- Generated OpenAPI from the backend app with `uv run python`.
- Read API-key model, schema, service, throttle, and auth dependency.
- Read settings and startup validation.
- Read Dockerfile, entrypoint, nginx template, Compose files, and env example.
- Read frontend route definitions.

## Validation Still Recommended

Before publishing this docs set as a website:

```bash
find documentation -name '*.md' -print
python -m json.tool <(curl --silent http://127.0.0.1:8080/api/openapi.json)
docker compose config
```

Shell process substitution may not be available in every shell; use a temporary file when needed.
