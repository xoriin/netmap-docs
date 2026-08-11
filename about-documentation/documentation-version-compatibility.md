---
title: Documentation Version and Product Compatibility
description: Match this production-focused documentation to the version installed on your NetMap instance.
keywords:
  - documentation version
  - compatibility
  - installed version
verified_version: "1.5.0"
---

# Documentation Version and Product Compatibility

Use the version installed in your NetMap instance—not the newest version advertised online—to decide whether a procedure applies. No NetMap permission is required to read this page.

> **Version basis:** This documentation was based on the production release of NetMap `v1.5.0` at the time of writing. A page-level `verified_version` records the production version used for that page. It does not guarantee compatibility with another release.

## Find your installed version

After signing in, look at the version near the bottom of the NetMap sidebar. A SuperAdmin can also open **Admin → System** and read **Version → Installed**.

For the production release covered here, the interface displays `v1.5.0`. The installed version is read from the version file baked into the application image.

The `GET /api/v1/system/version` endpoint supplies the installed version to the interface. It also checks GitHub tags for a newer semantic version. That online check can fail without changing the installed version; the Admin page then shows the latest version as unavailable.

## Interpret page labels

Reviewed pages use frontmatter such as:

```yaml
verified_version: "1.5.0"
```

The value `1.5.0` means the page was checked against production NetMap v1.5.0. An absent `verified_version` means the page has not yet completed the current page-level source review.

This site documents the production product. Contributor builds and changes awaiting review may behave differently; use the [Contributing Workflow](../development/contributing-workflow.md) when testing a source change.

## Choose the correct instructions

1. Record the version shown by your instance.
2. Check the page's `verified_version` or version note.
3. Prefer an exact version match.
4. If the page is newer, review the product [Changelog](../reference/changelog.md) and compare the described controls with your interface before acting.
5. For upgrades and restores, follow instructions that cover both the version you are moving **from** and the version you are moving **to**; database and secret-handling changes can make assumptions unsafe.

## When the interface and documentation disagree

- Confirm that your browser is connected to the intended NetMap instance.
- Use the installed label, not a cached Docker tag or the newest GitHub tag.
- Refresh the page after an image upgrade and confirm that the container was recreated from the pulled image.
- Check whether you are running `latest`, a fixed production version tag, or a locally built image.
- Search the [Documentation Changelog](./documentation-changelog.md) for a correction or coverage change.
- If the discrepancy remains, [report a documentation problem](./reporting-documentation-problems.md) with the page URL and your installed version.

Do not include API keys, secrets, database files, private addresses, raw syslog, or unsanitized screenshots in a public report.

## Related pages

- [How to Use This Documentation](./how-to-use-this-documentation.md)
- [Documentation Changelog](./documentation-changelog.md)
- [Reporting Documentation Problems](./reporting-documentation-problems.md)
- [Product Changelog](../reference/changelog.md)
- [Upgrading](../installation/upgrading.md)
