---
title: Share A Topology Layout
sidebar_position: 5
keywords: [topology, layouts, share]
---

# Share A Topology Layout

Saved layouts belong to a user. A layout can be shared with a generated code and imported by another user as an independent snapshot.

API equivalents:

- `POST /api/v1/topology/layouts/{layout_id}/share`
- `DELETE /api/v1/topology/layouts/{layout_id}/share`
- `GET /api/v1/topology/layouts/shared/{code}`
- `POST /api/v1/topology/layouts/import`

Authentication is required. Owner rules are enforced by the topology router.

## What This Does

Layout sharing lets one user hand another user a copy of topology positions and display preferences. Imported layouts are snapshots; they do not stay synchronized with the original.

## Required Permissions

Authentication is required. Layout ownership rules are enforced by the topology router. Creating and managing devices still requires `topology_write`, but layout ownership is per user.

## Steps

1. Open Topology.
2. Arrange the map.
3. Save a named layout.
4. Open the Layouts modal.
5. Generate a share code for the layout.
6. Send the code to another NetMap user through a trusted channel.
7. The other user imports the code and receives their own layout copy.

## Example Import

```bash
API_URL="https://netmap.example.com"
API_KEY="<api-key>"
SHARE_CODE="<share-code>"

curl --fail-with-body \
  --request POST \
  --url "${API_URL}/api/v1/topology/layouts/import" \
  --header "X-API-Key: ${API_KEY}" \
  --header "Content-Type: application/json" \
  --data "{\"code\":\"${SHARE_CODE}\"}"
```

## Common Problems

| Symptom | Likely cause | Fix |
|---|---|---|
| code not found | code was typed wrong or revoked | ask owner to regenerate/share again |
| imported layout name changed | name collision | NetMap auto-suffixes copy names |
| layout does not update after owner changes it | imported copy is independent | re-import a new shared snapshot |

## Related Pages

- [Topology](../using-netmap/topology.md)
- [Endpoint Inventory](../api/api-reference.md)
