---
title: Using API Keys
description: Make authenticated NetMap API requests with X-API-Key.
sidebar_position: 3
keywords: [API key, curl, Python]
---

# Using API Keys

```bash
API_URL="https://netmap.example.com"
API_KEY="<api-key>"

curl --fail-with-body \
  --request GET \
  --url "${API_URL}/api/v1/auth/me" \
  --header "X-API-Key: ${API_KEY}" \
  --header "Accept: application/json"
```

Expected result: current user JSON.

See [API Keys](./api-keys.md) for lifecycle and security details.

## Environment Variables

Store secrets outside the script:

```bash
export NETMAP_API_URL="https://netmap.example.com"
export NETMAP_API_KEY="<api-key>"
```

Then reference them:

```bash
curl --fail-with-body \
  --url "${NETMAP_API_URL}/api/v1/topology/devices" \
  --header "X-API-Key: ${NETMAP_API_KEY}"
```

## Python Example

```python
import os
import httpx

with httpx.Client(
    base_url=os.environ["NETMAP_API_URL"],
    headers={"X-API-Key": os.environ["NETMAP_API_KEY"]},
    timeout=30.0,
) as client:
    response = client.get("/api/v1/auth/me")
    response.raise_for_status()
    print(response.json())
```

## Common Mistakes

- Sending the key as a bearer token.
- Putting the key in a query string.
- Embedding the key in frontend code.
- Forgetting that proxy rules must preserve `X-API-Key`.

## Related Pages

- [API Authentication](./authentication.md)
- [API-Key Permissions](./api-key-permissions.md)
- [Rate Limits](./rate-limits.md)
