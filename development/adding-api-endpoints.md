---
title: Adding API Endpoints
description: Add route handlers that support session and API-key authentication.
sidebar_position: 5
keywords: [API, endpoint, FastAPI]
---

# Adding API Endpoints

Use `get_current_user` or a permission dependency built on it. API-key support is automatic for these dependencies.

Add:

1. Pydantic schema.
2. Router function.
3. Permission dependency.
4. Service logic where needed.
5. Tests.
6. Documentation.

Check `/api/openapi.json` after changes.

## Permission Selection

Use an existing permission when the endpoint fits an existing capability. Add a new permission only when the action cannot be safely represented by the current set.

Examples:

| Endpoint type | Dependency |
|---|---|
| read current user | `get_current_user` |
| edit inventory/topology | `require_topology_write` |
| read security/syslog data | `require_security_view` |
| passive network tool | `require_tools_passive` |
| active network tool | `require_tools_active` |
| SuperAdmin setting | `require_super_admin` |

## API-Key Support

Do not parse `X-API-Key` inside a route. Use the shared dependencies. `get_current_user` already checks API keys before bearer tokens or cookies.

## Documentation Checklist

Update:

- endpoint inventory;
- API guide examples;
- UI workflow page, if visible in the SPA;
- configuration docs, if new settings are added;
- security docs, if permissions or auth behavior changes.

## Related Pages

- [Backend Development](./backend-development.md)
- [API Authentication](../api/authentication.md)
- [Endpoint Reference](../api/endpoint-reference.md)
