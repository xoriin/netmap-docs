---
title: Documentation Style Guide
sidebar_position: 10
keywords: [documentation, style, writing, contributing]
---

# Documentation Style Guide

Follow this guide when you add or change a page in the NetMap documentation. It keeps pages short, consistent, and easy to scan.

## Voice And Tone

- Write in the second person: "Select **Save**", not "The user selects Save".
- Describe what the reader sees and does. Leave out source file names, function names, and internal class names; they belong in the [Developer Guide](./development.md) pages only.
- State facts plainly. Don't add notes about how a fact was checked, or "documentation gap" and "verified" remarks. If something is unknown, leave it out and raise an issue instead.
- Use British spelling, as the app does: colour, organise, licence (noun).

## Headings

- Use Title Case for every heading: capitalise each word, including short words such as **And**, **A**, and **To**. For example, "Reverse Proxy And HTTPS" and "Create A Key In The App".
- Keep acronyms, product names, and code as they are written: `X-API-Key`, IPAM, ntfy, pfSense.
- Number the headings of a step-by-step page only when the order matters.

## Page Types And Length

| Page type | Purpose | Limit |
| --- | --- | --- |
| How-to guide | One task, in numbered steps | 600 words |
| Concept or workspace page | What something is and how it behaves | 900 words |
| Reference page | Tables of values, endpoints, or defaults | No limit; keep prose short |

Keep paragraphs to four sentences or fewer and under about 600 characters. When a page grows past its limit, split it by task or by workspace tab.

## UI Labels And Values

- Write UI labels exactly as the app shows them, in bold: **App Settings**, **Upload backup**, **Monitoring → Status pages**.
- Write permissions, settings keys, environment variables, paths, and values in code: `topology_write`, `NETMAP_DATA_DIR`.
- Use the app's names for things. If the app says "Endpoints", don't call them "Monitors".

## API Examples

- Show curl first. Use `$NETMAP_URL` for the base URL and `$NETMAP_API_KEY` for the key.
- Send API keys only in the `X-API-Key` header.
- Show a short, realistic response after each request when it helps the reader.

## One Fact, One Page

Each fact lives on one page. Elsewhere, link to it instead of repeating it. For example, roles and permissions live on [Permissions](../administer/permissions.md), and key handling lives on [API Authentication](../api/authentication.md).

## Callouts

Use at most two callouts (`::: warning`, `::: tip`) per page. Keep them for real risks, such as data loss or exposed secrets.

## Links, Moves, And Redirects

- Link with relative paths to the `.md` file, for example `[Monitoring](../using-netmap/monitoring.md#health-model)`.
- When you add, move, merge, or delete a page, update `SUMMARY.md` and the sidebar in `.vitepress/config.mts` in the same commit.
- When you move or remove a page, add its old path to `.vitepress/legacy-routes.mts` so old links redirect. Older numbered paths, such as `10-security/…`, are derived from it.

## Front Matter

Every page starts with `title`, `sidebar_position`, and `keywords`. Don't add other fields.

## Check Your Change

The build fails on links to missing pages but doesn't check anchors. Build the site, then run the link checker, which also confirms that `SUMMARY.md` and the sidebar list the same pages in the same order:

```bash
npm run build
npm run check-links
```

## Related Pages

- [Contributing Workflow](./contributing-workflow.md)
- [Developer Guide](./development.md)
