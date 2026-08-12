---
title: Environment Variables
sidebar_position: 1
keywords: [environment, variables, settings]
---

# Environment Variables

The complete verified table is maintained in [Configuration Reference](./configuration.md).

Important production variables:

- `APP_ENV=production`
- `SECRET_KEY`
- `MASTER_KEY`
- `APP_URL`
- `CORS_ORIGINS`
- `TRUSTED_HOSTS`
- `AUTH_COOKIE_SECURE`
- `SECURE_HSTS_ENABLED`
- `DATA_DIR`
- `DATABASE_URL`

Settings are loaded at startup from environment variables, `.env`, and `/etc/netmap/.env`.
