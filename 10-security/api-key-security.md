---
title: API-Key Security
description: Store and rotate API keys safely.
sidebar_position: 2
keywords: [API key, security]
---

# API-Key Security

API keys are secrets. Store them in server-side secret stores or environment variables. Do not place them in browser code, git, URLs, logs, screenshots, or tickets.

Use a dedicated least-privilege user for automation because keys inherit user permissions and have no per-key scopes.

## Why API Keys Need Care

An API key authenticates as its owning user. If the owner has SuperAdmin, the key has SuperAdmin-level REST access. If the owner has `topology_write`, the key can change inventory and topology. NetMap does not implement per-key scopes, so the user account is the permission boundary.

## Safe Storage Patterns

Use:

- CI/CD secret variables;
- server environment variables;
- a secret manager;
- root-readable deployment files with restricted permissions.

Avoid:

- source control;
- frontend JavaScript;
- shell history;
- query strings;
- screenshots;
- shared notes;
- logs.

## Recommended Automation Account

Create a dedicated user for each major integration. Assign only the required permissions:

| Automation | Suggested permissions |
|---|---|
| inventory export job | `inventory_export` |
| syslog export job | `security_view`, `firewall_export` |
| IPAM sync | `ipam_write` |
| discovery job | `topology_write` |
| monitoring service check manager | `monitoring_write` |

## Rotation

Rotate keys by creating a new key, updating automation, verifying success, and revoking the old key. There is no in-place rotation endpoint.

## Compromise Response

1. Revoke the key.
2. Review audit logs and affected user permissions.
3. Rotate related secrets if the exposure included scripts or environment files.
4. Create a replacement key only after the source of exposure is fixed.

## Related Pages

- [API Keys](../07-api/api-keys.md)
- [Rotating API Keys](../07-api/rotating-api-keys.md)
- [Revoking API Keys](../07-api/revoking-api-keys.md)
