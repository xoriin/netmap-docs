---
title: Logging
description: Runtime logs and diagnostic searches.
sidebar_position: 2
keywords: [logs, diagnostics]
---

# Logging

NetMap logs through the container runtime. In the all-in-one image, nginx and uvicorn run in the same container under `tini`, and Docker captures stdout/stderr.

## View Logs

```bash
docker compose logs --tail=200 netmap
```

nginx writes access logs to stdout and errors to stderr. uvicorn uses `LOG_LEVEL`, default `info`.

Documentation gap: this behaviour could not be verified from the current source for request IDs or structured logging.

## Configure Log Level

Set:

```dotenv
LOG_LEVEL=info
```

Accepted values are the uvicorn log levels used by the entrypoint:

- `debug`
- `info`
- `warning`
- `error`
- `critical`

Restart after changing `LOG_LEVEL`.

## Docker Log Rotation

The repository Compose examples use Docker's `json-file` logging driver with size rotation. A production Compose file should keep this or an equivalent log rotation policy:

```yaml
logging:
  driver: json-file
  options:
    max-size: 10m
    max-file: "5"
```

Without rotation, syslog-heavy or error-heavy deployments can consume disk space on the host.

## Useful Searches

```bash
docker compose logs netmap | grep -i "error"
docker compose logs netmap | grep -i "api key"
docker compose logs netmap | grep -i "syslog"
docker compose logs netmap | grep -i "firewall"
docker compose logs netmap | grep -i "backup"
docker compose logs netmap | grep -i "oidc"
```

## Sensitive Data

Do not paste logs publicly until you have reviewed them for:

- API keys;
- bearer tokens;
- usernames and email addresses;
- internal IP addresses and hostnames;
- OIDC issuer/client information;
- notification URLs or secrets.

## Related Pages

- [Diagnostic Information](../09-troubleshooting/diagnostic-information.md)
- [Syslog](../04-configuration/syslog.md)
- [API-Key Problems](../09-troubleshooting/api-key-problems.md)
