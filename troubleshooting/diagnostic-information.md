---
title: Diagnostic Information
sidebar_position: 9
keywords: [diagnostics, support]
---

# Diagnostic Information

Collect:

- NetMap version from `GET /api/v1/system/version`.
- Health endpoint result.
- Container logs.
- Compose configuration with secrets redacted.
- Admin diagnostics output with private data reviewed.
- Exact API endpoint, status code, and `detail` body for API failures.

Do not include API keys, passwords, tokens, private keys, or screenshots showing secrets.

## Commands

```bash
curl --fail http://127.0.0.1:8080/api/health
docker compose ps
docker compose logs --tail=200 netmap
```

Version check:

```bash
curl --fail http://127.0.0.1:8080/api/v1/system/version
```

SuperAdmin diagnostics through the API:

```bash
API_URL="https://netmap.example.com"
API_KEY="<superadmin-api-key>"

curl --fail-with-body \
  --url "${API_URL}/api/v1/system/diagnostics" \
  --header "X-API-Key: ${API_KEY}"
```

## Redaction Checklist

Remove:

- API keys;
- JWTs;
- refresh tokens;
- passwords;
- OIDC secrets;
- notification webhook URLs;
- private keys;
- sensitive public IPs or hostnames.

## Related Pages

- [Logging](../operations/logging.md)
- [Common Issues](./common-issues.md)
- [Security Model](../security/security-model.md)
