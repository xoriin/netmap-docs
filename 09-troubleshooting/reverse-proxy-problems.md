---
title: Reverse Proxy Problems
description: Troubleshoot proxy, HTTPS, CORS, and WebSocket issues.
sidebar_position: 7
keywords: [reverse proxy, CORS, websocket]
---

# Reverse Proxy Problems

Common causes:

- Wrong `APP_URL`.
- Missing origin in `CORS_ORIGINS`.
- Missing hostname in `TRUSTED_HOSTS`.
- Proxy strips `X-API-Key`.
- Proxy does not pass WebSocket upgrade headers.
- `AUTH_COOKIE_SECURE=true` while using plain HTTP.

Fix proxy headers and restart NetMap after configuration changes.

## Symptoms

- UI loads but API calls fail.
- Login succeeds directly by IP but fails through the domain.
- API keys work against NetMap directly but fail through the proxy.
- WebSocket/live features disconnect.
- Browser console shows CORS errors.

## Required Headers

Forward:

```nginx
proxy_set_header Host $host;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection $connection_upgrade;
```

Also preserve `X-API-Key`.

## Configuration To Check

```dotenv
APP_URL=https://netmap.example.com
CORS_ORIGINS=["https://netmap.example.com"]
TRUSTED_HOSTS=["netmap.example.com"]
AUTH_COOKIE_SECURE=true
```

## Verify

```bash
curl --fail https://netmap.example.com/api/health
```

Then test API-key auth through the proxy:

```bash
curl --fail-with-body \
  --url "https://netmap.example.com/api/v1/auth/me" \
  --header "X-API-Key: <api-key>"
```

## Related Pages

- [Reverse Proxy And HTTPS](../03-installation/reverse-proxy.md)
- [Ports](../12-reference/ports.md)
- [API-Key Problems](./api-key-problems.md)
