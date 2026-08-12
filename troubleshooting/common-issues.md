---
title: Common Issues
sidebar_position: 1
keywords: [troubleshooting, diagnostics, recovery]
---

# Common Issues

Use this page as the first triage pass. Record the installed version/channel, reproduce once, identify whether the failure is container, proxy, authentication, database, network, workspace, or provider related, then collect the smallest safe diagnostic set. Do not delete databases or rotate keys before preserving a backup and logs.

## First checks

```bash
docker compose ps
docker compose logs --tail=200 netmap
curl --fail http://127.0.0.1:8080/api/health
docker compose exec netmap sh -c 'test -w /app/data && ls -lh /app/data'
```

Confirm the image tag and `/app/VERSION`, data-directory ownership, free disk, reverse-proxy URL/origins, and whether the issue reproduces with a direct local request. Redact passwords, API keys, OIDC/client secrets, webhook URLs, private keys, and sensitive raw logs before sharing diagnostics.

## Triage by symptom

| Symptom | First place to look | Next action |
|---|---|---|
| install exits or health fails | [Installation Problems](./installation-problems.md) | inspect secrets, writable data, migrations, and port conflicts |
| UI unavailable or 502 | [Container Problems](./container-problems.md) and [Reverse Proxy Problems](./reverse-proxy-problems.md) | verify nginx, uvicorn socket, proxy headers, WebSocket upgrade, and health |
| permission denied | [Permission Errors](./permission-errors.md) | distinguish `401` authentication from `403` live role permission |
| database locked/corrupt | [Database Problems](./database-problems.md) | identify main versus firewall DB, stop risky writes, validate a backup |
| login/session/SSO fails | [Authentication Problems](./authentication-problems.md) | check cookies/HTTPS, clocks, lockouts, issuer/JWKS, and required SSO |
| API key fails | [API-Key Problems](./api-key-problems.md) | verify `X-API-Key` format, owner state, role, expiry, and rate limit |
| discovery/tools find nothing | [Run Discovery](../guides/run-discovery.md) and [Network Tools](../using-netmap/tools.md) | check target scope, capabilities, host networking, routing, DNS, and public-target policy |
| SNMP/LLDP empty | [Administration](../using-netmap/admin.md#snmp-profiles-and-lldp) | verify UDP 161, credentials, ACLs, device support, and Layer-2 visibility |
| monitoring status stale/wrong | [Monitoring](../using-netmap/monitoring.md#health-model) | check expected/paused/lifecycle state, cache freshness, interval, worker, and ping capability |
| service/HTTP check fails | [Monitoring](../using-netmap/monitoring.md#endpoint-history-and-troubleshooting) | inspect protocol, DNS, proxy, TLS, auth, assertion, timeout, and scope details |
| syslog absent/live stream stale | [Security Events](../using-netmap/security-events.md#troubleshooting) | verify listeners, mappings, allowlist, WebSocket proxy, connection cap, and parser |
| topology/IPAM/layout issue | [Topology](../using-netmap/topology.md#troubleshooting) or [IPAM](../using-netmap/ipam.md#troubleshooting) | clear filters, validate relationships/CIDRs, and check database locks |

## Safe escalation package

Collect health output, relevant redacted logs, container status, version/tag, environment variable names (not values), data-directory file sizes, request path/status, timestamp with timezone, and reproduction steps. For database problems include the result of restore validation rather than uploading a live database. For security incidents preserve logs first and follow [Security Incident Response](../security/security.md#incident-response).

## Related pages

- [Diagnostic Information](./diagnostic-information.md)
- [Installation Problems](./installation-problems.md)
- [Database Problems](./database-problems.md)
- [Authentication Problems](./authentication-problems.md)
