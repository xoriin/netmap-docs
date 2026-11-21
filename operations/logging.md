---
title: Logging
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

## In-App Log

**Tools → Logs** shows recent NetMap log entries in the browser for users with the `diagnostics_view` permission. It holds entries in memory only (5,000 by default) and starts empty after a restart, so use the container log for anything older. Secrets are redacted before an entry is stored. See [Tools](../using-netmap/tools.md#logs).

Its settings are separate from `LOG_LEVEL`:

```dotenv
# Entries kept, 100–100000
APP_LOG_CAPACITY=5000
# Lowest level kept: DEBUG, INFO, WARNING, ERROR or CRITICAL
APP_LOG_LEVEL=INFO
# Longest stored message, 200–20000 characters
APP_LOG_MAX_MESSAGE_CHARS=2000
# Also keep HTTP access lines (fills the log quickly)
APP_LOG_INCLUDE_ACCESS=false
```

Restart after changing them.

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

- [Diagnostic Information](../troubleshooting/diagnostic-information.md)
- [Syslog](../configuration/syslog.md)
- [API-Key Problems](../troubleshooting/api-key-problems.md)
