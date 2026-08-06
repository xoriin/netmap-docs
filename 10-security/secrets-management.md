---
title: Secrets Management
description: Manage NetMap secrets safely.
sidebar_position: 4
keywords: [secrets, MASTER_KEY, SECRET_KEY]
---

# Secrets Management

Protect:

- `SECRET_KEY`
- `MASTER_KEY`
- `OIDC_CLIENT_SECRET`
- notification secrets
- SNMP community/profile secrets
- API keys

Production startup requires `SECRET_KEY` and `MASTER_KEY` or their file variants.

Keep secrets with backups. Losing `MASTER_KEY` may make encrypted settings unusable.

## Required Production Secrets

Production startup requires:

- `SECRET_KEY` or `SECRET_KEY_FILE`;
- `MASTER_KEY` or `MASTER_KEY_FILE`.

Generate examples:

```bash
python3 -c "import secrets; print(secrets.token_urlsafe(32))"
python3 -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"
```

## Secret Files

File-based secrets are useful with Docker secret managers or host-managed files:

```dotenv
SECRET_KEY_FILE=/run/secrets/netmap_secret_key
MASTER_KEY_FILE=/run/secrets/netmap_master_key
```

The files must be readable by the container process.

## Rotation Caution

Do not rotate `MASTER_KEY` casually. It protects encrypted stored settings. A planned rotation process must account for decrypting and re-encrypting existing values.

API keys are rotated separately by creating a new key and revoking the old one.

## Related Pages

- [API-Key Security](./api-key-security.md)
- [Backups](../08-operations/backups.md)
- [Installation Problems](../09-troubleshooting/installation-problems.md)
