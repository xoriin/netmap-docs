---
title: OpenAPI And Swagger
sidebar_position: 9
keywords: [OpenAPI, Swagger]
---

# OpenAPI And Swagger

OpenAPI JSON:

```text
/api/openapi.json
```

Swagger UI:

```text
/api/docs
```

ReDoc is not configured in `backend/app/main.py`.

Swagger UI assets are bundled with the NetMap image. Opening `/api/docs` does not
depend on a public JavaScript CDN and remains compatible with NetMap's default
content-security policy.

Use generated OpenAPI as schema reference, and this documentation for workflow and security context. Select **Authorize** in Swagger to send a registered NetMap API key with test requests.

## What OpenAPI Is Good For

Use OpenAPI to inspect:

- request body schema names;
- response model names;
- path and query parameters;
- validation constraints;
- generated operation IDs;
- available HTTP methods.

Protected operations show a lock and accept either `ApiKeyAuth` or `BearerAuth`.
Public operations, such as health and login, remain unlocked.

## What This Documentation Adds

The generated schema does not fully explain:

- operational workflows;
- security consequences;
- role intent;
- API-key lifecycle;
- reverse proxy requirements;
- backup and restore context;
- known limitations.

Use both sources together.

## Local Check

```bash
curl --fail http://127.0.0.1:8080/api/openapi.json
```

Swagger UI:

```text
http://127.0.0.1:8080/api/docs
```

## Related Pages

- [Endpoint Reference](./endpoint-reference.md)
- [API Authentication](./authentication.md)
- [API Errors](./errors.md)
