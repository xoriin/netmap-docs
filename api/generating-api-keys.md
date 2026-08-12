---
title: Generating API Keys
sidebar_position: 2
keywords: [API key, generate]
---

# Generating API Keys

Any active authenticated user can create their own API keys.

Endpoint:

```text
POST /api/v1/api-keys
```

Request:

```json
{
  "name": "automation",
  "expires_in_days": 90
}
```

`expires_in_days` may be `30`, `90`, `365`, or `null`.

The plaintext key is returned once in the `key` field.
