---
title: Endpoint Reference
description: Endpoint inventory and schema entry point.
sidebar_position: 11
keywords: [endpoints, routes]
---

# Endpoint Reference

The current route inventory is maintained in [Endpoint Inventory](./api-reference.md). That page lists every route generated from the FastAPI app and groups them by public, authenticated, administrative, topology, discovery, monitoring, alerts, IPAM, security, tools, LLDP, and exports.

Detailed schemas are available at `/api/openapi.json` and `/api/docs`.

Documentation gap: this section still needs source-verified endpoint pages with examples for every public route.

## How To Use The Reference Today

1. Start with [API Overview](./api-overview.md) for base URL, authentication, errors, and rate limits.
2. Use [Endpoint Inventory](./api-reference.md) to find the route group.
3. Open `/api/docs` on your NetMap instance for exact schema fields.
4. Use [API Keys](./api-keys.md) for authentication examples.

## Endpoint Page Standard

Every endpoint page added later should include:

- method and path;
- purpose;
- authentication;
- required role or permission;
- path parameters;
- query parameters;
- request headers;
- request body;
- success response;
- implemented error responses;
- `curl` example;
- Python example where useful;
- related UI workflow;
- related endpoints.

## Priority For Expansion

Expand endpoint groups in this order:

1. API keys and authentication.
2. Devices, groups, sites, layouts, relationships.
3. Discovery and observations.
4. Monitoring and alerts.
5. IPAM.
6. Syslog/security.
7. Exports, backup, and restore.
8. Admin, OIDC, audit, and system diagnostics.
9. Tools and LLDP.

## Related Pages

- [API Authentication](./authentication.md)
- [Using API Keys](./using-api-keys.md)
- [API Errors](./errors.md)
- [Capability Matrix](./capability-matrix.md)
