---
title: Common Issues
description: Symptom-based troubleshooting entry point.
sidebar_position: 1
keywords: [troubleshooting]
---

# Common Issues

Use this page as the first stop when NetMap is unhealthy or behaving unexpectedly.

## First Checks

Start with:

```bash
docker compose ps
docker compose logs --tail=200 netmap
curl --fail http://127.0.0.1:8080/api/health
```

Then use the issue-specific pages in this section.

## Triage By Symptom

| Symptom | Start here |
|---|---|
| Container will not start | [Installation Problems](./installation-problems.md) |
| Login fails | [Authentication Problems](./authentication-problems.md) |
| API key fails | [API-Key Problems](./api-key-problems.md) |
| API returns `403` | [Permission Errors](./permission-errors.md) |
| Data is missing or database errors appear | [Database Problems](./database-problems.md) |
| Works locally but not through domain | [Reverse Proxy Problems](./reverse-proxy-problems.md) |
| Docker health is failing | [Container Problems](./container-problems.md) |
| Need to ask for support | [Diagnostic Information](./diagnostic-information.md) |

## Collect Safe Details

When asking for help, include:

- NetMap version;
- deployment method;
- exact URL path or workspace;
- HTTP status code;
- redacted `detail` response;
- relevant container logs.

Do not include passwords, tokens, API keys, OIDC secrets, or private key material.

## Related Pages

- [Health Checks](../operations/health-checks.md)
- [Logging](../operations/logging.md)
- [Diagnostic Information](./diagnostic-information.md)
