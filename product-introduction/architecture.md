---
title: Architecture
description: NetMap runtime components and how requests flow through the system.
sidebar_position: 3
keywords: [architecture, FastAPI, React, SQLite, Docker]
---

# Architecture

```mermaid
flowchart LR
    Browser[Browser SPA] --> Nginx[nginx]
    Client[API client] --> Nginx
    Device[Syslog sender] --> Syslog[Syslog service]
    Nginx --> Uvicorn[uvicorn Unix socket]
    Uvicorn --> API[FastAPI /api/v1]
    API --> Auth[Auth dependencies]
    Auth --> Services[Services]
    Services --> MainDB[(netmap.db)]
    Syslog --> FirewallDB[(firewall.db)]
    Services --> FirewallDB
    Services --> Workers[Background workers]
    Workers --> MainDB
    Workers --> FirewallDB
```

Verified source:

- App entrypoint: `backend/app/main.py`.
- API router mount: `app.include_router(api_router, prefix="/api/v1")`.
- nginx proxy: `docker/aio-nginx.conf.template`.
- entrypoint process supervision: `docker/aio-entrypoint.sh` and `tini`.
- main DB session: `backend/app/db/session.py`.
- firewall DB session: `backend/app/db/firewall_session.py`.

Background services start during FastAPI startup: syslog, alert monitor, scheduled discovery, IP reservation reminders, scheduled backups, and firewall startup maintenance.
