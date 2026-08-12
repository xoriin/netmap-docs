---
title: API Errors
sidebar_position: 7
keywords: [API, errors, status codes]
---

# API Errors

Most explicit application errors use:

```json
{"detail":"Invalid, expired, or revoked API key"}
```

Validation errors use FastAPI's validation structure:

```json
{
  "detail": [
    {
      "loc": ["body", "name"],
      "msg": "Field required",
      "type": "missing"
    }
  ]
}
```

See [API Overview](./api-overview.md#common-status-codes) for status codes.
