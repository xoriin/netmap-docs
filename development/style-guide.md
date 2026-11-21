---
title: Documentation Style Guide
description: Voice, headings, GitBook callouts, front matter, and screenshot paths for NetMap docs.
---

# Documentation Style Guide

Follow this guide when you add or change a page in the NetMap documentation. It keeps pages short, consistent, and easy to scan. GitBook at [docs.netmap.dev](https://docs.netmap.dev) is the published site. The VitePress build is a local preview.

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

A typical page opens with a one-line `description` in front matter, two or three sentences that say where the reader is, then **Before You Start** or **What You'll Learn**, the content, and **Next Steps**.

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

Use GitBook hint blocks, not VitePress `:::` containers. The published site is GitBook; the VitePress preview converts these hints so they still render locally. Use at most two callouts per page. Keep them for real risks, such as data loss or exposed secrets.

```markdown
{% hint style="warning" %}
Do not skip the backup. Rollback requires a compatible database backup.
{% endhint %}
```

Supported styles are `info`, `warning`, `danger`, and `success`. Prefer `warning` or `danger` for irreversible or insecure actions.

## Images

Store screenshots under `.gitbook/assets/screenshots/<section>/<view>-<state>-light.png` and `-dark.png`. Never put loose images in `.gitbook/assets/`. Section folders follow the SUMMARY groups and their child pages, for example:

- `.gitbook/assets/screenshots/get-started/`
- `.gitbook/assets/screenshots/use-netmap/overview/`
- `.gitbook/assets/screenshots/use-netmap/topology/`
- `.gitbook/assets/screenshots/use-netmap/inventory/`
- `.gitbook/assets/screenshots/use-netmap/monitoring/`
- `.gitbook/assets/screenshots/use-netmap/ipam/`
- `.gitbook/assets/screenshots/use-netmap/locations/`
- `.gitbook/assets/screenshots/use-netmap/vlans/`
- `.gitbook/assets/screenshots/use-netmap/status-pages/`
- `.gitbook/assets/screenshots/use-netmap/security-events/`
- `.gitbook/assets/screenshots/use-netmap/tools/`

`.gitbook.yaml` has `root: ./`, so links are root-relative:

```markdown
![Overview for Contoso Ltd, with 412 devices and an offline camera at the Auckland plant.](.gitbook/assets/screenshots/use-netmap/overview/overview-light.png)
```

For light and dark pairs, use a `<picture>` block. Put `prefers-color-scheme: dark` on the dark `<source>`, and put the light file and the alt text on the `<img>`. Alt text describes the UI and the visible Contoso Ltd fact (a site, device, or state), not "screenshot of Overview".

Do not add image references until the file exists in the repository. The canonical shot list, filenames, and alt text live in `/home/xrnrrl/docs-sample/SHOT-LIST.md` (outside this repository) until the shots are committed here.

Example light/dark block:

```html
<figure>
  <picture>
    <source srcset=".gitbook/assets/screenshots/use-netmap/overview/overview-dark.png" media="(prefers-color-scheme: dark)" />
    <img src=".gitbook/assets/screenshots/use-netmap/overview/overview-light.png" alt="Overview for Contoso Ltd, with 412 devices and an offline camera at the Auckland plant." width="800" />
  </picture>
  <figcaption>Overview for Contoso Ltd after sign-in.</figcaption>
</figure>
```

Prefer PNG, about 1600px wide, displayed at `width="800"`.

## Links, Moves, And Redirects

- Link with relative paths to the `.md` file, for example `[Monitoring](../using-netmap/monitoring.md#health-model)`.
- When you add, move, merge, or delete a page, update `SUMMARY.md` and the sidebar in `.vitepress/config.mts` in the same commit.
- When you move or remove a page, add its old path to `.vitepress/legacy-routes.mts` so the VitePress preview redirects. Older numbered paths, such as `10-security/…`, are derived from it. GitBook redirects are configured separately when the docs are published.

## Front Matter

Every page starts with `title` and a one-line `description`. GitBook uses `description` for search snippets. Do not add `sidebar_position` or `keywords`; the sidebar is defined in `.vitepress/config.mts`, and those fields are not used on GitBook.

## Check Your Change

The VitePress build fails on links to missing pages but doesn't check anchors. Build the site, then run the link checker, which also confirms that `SUMMARY.md` and the sidebar list the same pages in the same order:

```bash
npm run build
npm run check-links
```

## Related Pages

- [Contributing Workflow](./contributing-workflow.md)
- [Developer Guide](./development.md)
