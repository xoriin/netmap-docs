---
title: Reverse Proxy And HTTPS
sidebar_position: 6
keywords: [reverse proxy, HTTPS, nginx, websocket]
---

# Reverse Proxy And HTTPS

Reverse proxies must preserve:

- `Host`
- `X-Forwarded-For`
- `X-Forwarded-Proto`
- `Upgrade`
- `Connection`
- `X-API-Key`

Set production URL variables:

```dotenv
APP_URL=https://netmap.example.com
CORS_ORIGINS=["https://netmap.example.com"]
TRUSTED_HOSTS=["netmap.example.com"]
AUTH_COOKIE_SECURE=true
SECURE_HSTS_ENABLED=true
```

nginx example:

```nginx
server {
    listen 443 ssl http2;
    server_name netmap.example.com;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_read_timeout 600s;
    }
}
```

Documentation gap: this behaviour could not be verified from the current source for Caddy, Traefik, and Nginx Proxy Manager-specific examples.
