---
title: API Overview
sidebar_position: 1
keywords:
  - API
  - REST
  - OpenAPI
  - automation
---

# API Overview

NetMap has a JSON REST API. Everything the web app does goes through it, so scripts and integrations can read and change the same data.

## Base URL

The API is on the same origin as the web app, under `/api/v1`:

```text
https://netmap.example.com/api/v1
```

A default all-in-one install listens on `http://127.0.0.1:8080`.

## Authentication

Use an API key in the `X-API-Key` header:

```text
X-API-Key: nm_<prefix>_<secret>
```

API keys work only in `X-API-Key`. A key sent as `Authorization: Bearer` returns `401`. A key acts as the user who created it, with that user's permissions.

Health, version, setup status, sign-in and public status pages need no authentication. To make a first call, follow the [API Quick Start](./quick-start.md); for keys and sessions, see [API Authentication](./authentication.md).

## Requests And Responses

Send JSON with `Content-Type: application/json`. Responses are JSON, except file downloads such as exports, backups and the PDF report.

Errors return a `detail` field and a standard status code; see [API Errors](./errors.md).

Timestamps are ISO 8601 strings, but they do not always carry a timezone. Most, such as an API key's `created_at`, have no offset: `2026-10-26T10:29:02.437310`. Times NetMap records itself, such as `created_at` and `last_used_at`, are in UTC. Where an endpoint takes a time, its schema says whether it needs an offset.

Paging is set per endpoint. Syslog events and audit logs take `limit` (default 100, up to 500) and `offset`; many other lists return every item. Each endpoint's parameters are in the [OpenAPI schema](./reference/openapi.md).

## Limits

Each API key can make 120 requests per 60 seconds by default. Network tools, discovery and public status pages have their own limits. See [Rate Limits](./rate-limits.md).

## Versioning

All endpoints are under `/api/v1`. NetMap does not publish a deprecation policy, so pin the NetMap version your automation uses and read the release notes before you upgrade.

## In This Section

| Page | Use it to |
|---|---|
| [API Quick Start](./quick-start.md) | Create a key and make your first calls. |
| [API Authentication](./authentication.md) | Create, use, rotate and revoke keys, and understand sessions. |
| [API Permissions](./permissions.md) | See what each role can do. |
| [API Errors](./errors.md) | Look up a status code or error message. |
| [Rate Limits](./rate-limits.md) | Plan request volume. |
| [Automation](./guides/automation.md) | Build scripts and integrations. |
| [Status Page Integrations](./guides/status-page-integrations.md) | Post incidents and maintenance from other tools. |
| [Endpoint Reference](./reference/endpoints.md) | Find an endpoint and the permission it needs. |
| [OpenAPI And Swagger](./reference/openapi.md) | Read request and response schemas, and try calls. |
