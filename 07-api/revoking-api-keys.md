---
title: Revoking API Keys
description: Revoke own or all-user API keys.
sidebar_position: 6
keywords: [API key, revoke]
---

# Revoking API Keys

Owner revoke:

```text
DELETE /api/v1/api-keys/{key_id}
```

SuperAdmin revoke:

```text
DELETE /api/v1/api-keys/admin/{key_id}
```

Revoked keys are no longer active and authenticate as invalid.

## When To Revoke

Revoke a key when:

- automation no longer needs it;
- the key may have been exposed;
- the owning user is changing responsibilities;
- you replaced it during rotation;
- the key was created for temporary testing.

## Owner Revocation Example

```bash
API_URL="https://netmap.example.com"
API_KEY="<current-api-key>"
KEY_ID="<key-id>"

curl --fail-with-body \
  --request DELETE \
  --url "${API_URL}/api/v1/api-keys/${KEY_ID}" \
  --header "X-API-Key: ${API_KEY}"
```

## SuperAdmin Revocation Example

```bash
API_URL="https://netmap.example.com"
API_KEY="<superadmin-api-key>"
KEY_ID="<key-id>"

curl --fail-with-body \
  --request DELETE \
  --url "${API_URL}/api/v1/api-keys/admin/${KEY_ID}" \
  --header "X-API-Key: ${API_KEY}"
```

## Verify

The revoked key should return `401` on the next request.

## Related Pages

- [Rotating API Keys](./rotating-api-keys.md)
- [API-Key Security](../10-security/api-key-security.md)
