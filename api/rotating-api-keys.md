---
title: Rotating API Keys
sidebar_position: 5
keywords: [API key, rotation]
---

# Rotating API Keys

Rotating an API key means replacing it with a new key and revoking the old one. NetMap does not expose an in-place rotation endpoint, so rotation is a create, deploy, verify, revoke workflow.

## Before You Begin

Confirm:

- you can create a key as the automation user;
- you know where the old key is stored;
- you can update the automation secret safely;
- you can verify the automation after the change.

## Steps

1. Create a new key.
2. Store it in your automation secret store.
3. Deploy automation with the new secret.
4. Verify `GET /api/v1/auth/me` succeeds.
5. Revoke the old key.
6. Verify the old key returns `401`.

There is no in-place rotation endpoint.

## Verification Request

```bash
API_URL="https://netmap.example.com"
API_KEY="<new-api-key>"

curl --fail-with-body \
  --url "${API_URL}/api/v1/auth/me" \
  --header "X-API-Key: ${API_KEY}"
```

## After Revocation

Test the old key and confirm it fails:

```bash
API_URL="https://netmap.example.com"
OLD_API_KEY="<old-api-key>"

curl --fail-with-body \
  --url "${API_URL}/api/v1/auth/me" \
  --header "X-API-Key: ${OLD_API_KEY}"
```

Expected result: `401`.

## Related Pages

- [Generating API Keys](./generating-api-keys.md)
- [Revoking API Keys](./revoking-api-keys.md)
- [API-Key Security](../security/api-key-security.md)
