---
title: Quick Start
description: Install NetMap, create the first account, generate an API key, and make the first API call.
sidebar_position: 1
keywords: [quick start, install, first login, API key]
---

# Quick Start

## 1. Create Directories

```bash
mkdir -p <install-dir>/data
cd <install-dir>
```

## 2. Generate Secrets

```bash
python3 -c "import secrets; print(secrets.token_urlsafe(32))"
python3 -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"
```

## 3. Create Environment File

```dotenv
SECRET_KEY=<secret-key>
MASTER_KEY=<fernet-master-key>
APP_URL=http://localhost:8080
CORS_ORIGINS=["http://localhost:8080"]
TRUSTED_HOSTS=["localhost","127.0.0.1"]
AUTH_COOKIE_SECURE=false
SECURE_HSTS_ENABLED=false
```

Save it as `<install-dir>/.env`.

## 4. Create Compose File

```yaml
services:
  netmap:
    image: xoriin/netmap:latest
    restart: unless-stopped
    env_file:
      - ./.env
    environment:
      APP_ENV: production
      APP_PORT: "8080"
      DATA_DIR: /app/data
      DATABASE_URL: sqlite:////app/data/netmap.db
      PUID: "1000"
      PGID: "1000"
    network_mode: host
    volumes:
      - ./data:/app/data
    tmpfs:
      - /tmp
    cap_add:
      - NET_RAW
```

## 5. Start

```bash
docker compose up -d
docker compose ps
curl --fail http://127.0.0.1:8080/api/health
```

Expected response:

```json
{"status":"ok"}
```

## 6. Create The First Account

Open `http://localhost:8080/` and complete the setup form. The first account becomes the initial administrator.

## 7. Add Your First Device

Open Inventory or Topology and create a device with at least a display name and IP address.

## 8. Generate An API Key

Open Profile, create an API key, and store the plaintext value immediately.

## 9. Test API Access

```bash
API_URL="http://localhost:8080"
API_KEY="<api-key>"

curl --fail-with-body \
  --url "${API_URL}/api/v1/auth/me" \
  --header "X-API-Key: ${API_KEY}" \
  --header "Accept: application/json"
```

Expected result: JSON for the API-key owner.
