---
title: Installation Problems
sidebar_position: 2
keywords: [install, startup]
---

# Installation Problems

## Container exits immediately

Likely causes: missing production secrets, placeholder secrets, invalid Fernet `MASTER_KEY`, unwritable `DATA_DIR`, invalid retention values.

Confirm:

```bash
docker compose logs --tail=200 netmap
```

Fix the reported environment variable and restart.

## Health Check Fails

Confirm the configured web port and health endpoint:

```bash
docker compose config | grep APP_PORT
curl --fail http://127.0.0.1:8080/api/health
```

If `APP_PORT` is not `8080`, use the configured port.

## Data Directory Permission Failure

Confirm:

```bash
ls -ld <install-dir>/data
docker compose logs netmap | grep -i permission
```

Fix ownership to match `PUID`/`PGID`:

```bash
sudo chown -R 1000:1000 <install-dir>/data
docker compose up -d
```

## Invalid Production Secrets

Production rejects missing or placeholder `SECRET_KEY` and `MASTER_KEY` values. Generate real values:

```bash
python3 -c "import secrets; print(secrets.token_urlsafe(32))"
python3 -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"
```

## Related Pages

- [Quick Start](../installation/quick-start.md)
- [Storage](../configuration/storage.md)
- [Secrets Management](../security/secrets-management.md)
