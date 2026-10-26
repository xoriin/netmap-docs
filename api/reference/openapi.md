---
title: OpenAPI And Swagger
sidebar_position: 11
keywords: [OpenAPI, Swagger]
---

# OpenAPI And Swagger

NetMap publishes a generated OpenAPI schema and a Swagger UI. Both are public and need no authentication.

| Resource | Path |
|---|---|
| OpenAPI JSON | `/api/openapi.json` |
| Swagger UI | `/api/docs` |

ReDoc is not enabled.

```bash
curl --fail-with-body "${NETMAP_URL}/api/openapi.json"
```

The schema is titled `NetMap API` and its version is the installed NetMap version. Operations are grouped by NetMap capability.

## Using Swagger UI

Open `/api/docs`, select **Authorize**, and enter an API key under `ApiKeyAuth` to send test requests as the key's owner. Protected operations show a lock and accept `ApiKeyAuth` or `BearerAuth`; public operations such as health and sign-in have no lock.

The Swagger UI files ship with NetMap, so the page works without a public CDN and within NetMap's default content security policy.

Use the schema for request and response fields, parameters and validation rules. Use the [Endpoint Reference](./endpoints.md) for the permission each endpoint needs.

## Related Pages

- [Endpoint Reference](./endpoints.md)
- [API Authentication](../authentication.md)
- [API Errors](../errors.md)
