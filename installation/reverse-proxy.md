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
```

With an `https://` `APP_URL`, sign-in cookies are marked `Secure` automatically. Set
`AUTH_COOKIE_SECURE` only to override that; NetMap logs a warning at startup if it is `false` while
`APP_URL` uses HTTPS.

HSTS is opt-in. Set `SECURE_HSTS_ENABLED=true` once NetMap will only ever be served over HTTPS on
this hostname and the proxy forwards the original protocol correctly. Browsers then refuse plain
HTTP for that hostname for `SECURE_HSTS_MAX_AGE` seconds (one year by default), and this cannot be
withdrawn early. NetMap logs a warning at startup while HSTS is off.

nginx example:

```nginx
server {
    client_max_body_size 256m;
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
