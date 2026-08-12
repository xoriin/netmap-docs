---
title: Automation With API Keys
sidebar_position: 12
keywords: [automation, API key, scripts]
---

# Automation With API Keys

Use a dedicated least-privilege NetMap user for automation. API keys inherit the owning user's current role and permissions.

Shell pattern:

```bash
API_URL="${NETMAP_API_URL:?set NETMAP_API_URL}"
API_KEY="${NETMAP_API_KEY:?set NETMAP_API_KEY}"

curl --fail-with-body \
  --url "${API_URL}/api/v1/topology/devices" \
  --header "X-API-Key: ${API_KEY}" \
  --header "Accept: application/json"
```

Python pattern:

```python
import os
import httpx

with httpx.Client(
    base_url=os.environ["NETMAP_API_URL"],
    headers={"X-API-Key": os.environ["NETMAP_API_KEY"]},
    timeout=30.0,
) as client:
    response = client.get("/api/v1/topology/devices")
    response.raise_for_status()
    devices = response.json()
```
