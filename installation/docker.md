---
title: Docker
description: Run the all-in-one NetMap image with Docker.
sidebar_position: 3
keywords: [Docker, container]
---

# Docker

Docker Compose is recommended because it records volumes, environment, restart policy, and capabilities. A direct `docker run` command can be useful for testing:

```bash
docker run --rm \
  --network host \
  --cap-add NET_RAW \
  -e APP_ENV=production \
  -e SECRET_KEY="<secret-key>" \
  -e MASTER_KEY="<fernet-master-key>" \
  -e APP_URL="http://localhost:8080" \
  -e CORS_ORIGINS='["http://localhost:8080"]' \
  -e TRUSTED_HOSTS='["localhost","127.0.0.1"]' \
  -v <install-dir>/data:/app/data \
  xoriin/netmap:latest
```

Verify:

```bash
curl --fail http://127.0.0.1:8080/api/health
```
