---
title: Documentation Version and Product Compatibility
description: Match NetMap documentation to an installed production, test, or development build and interpret version and channel labels.
keywords:
  - documentation version
  - compatibility
  - release channel
  - installed version
verified_version: "1.5.0-dev"
---

# Documentation Version and Product Compatibility

Use the version installed in your NetMap instance—not the newest version advertised online—to decide whether a procedure applies. This page is for all NetMap users, administrators, operators, API consumers, and contributors; no NetMap permission is required to read it.

This documentation snapshot was verified on 6 August 2026 against the `1.5.0` source in the development, test, and production worktrees. A page-level `verified_version` identifies the source used for that page. It does not guarantee compatibility with an older image.

## Find your installed version

After signing in, look at the version near the bottom of the NetMap sidebar. A SuperAdmin can also open **Admin → System** and read **Version → Installed**.

NetMap formats the label as follows:

| Returned values | Example label | Meaning |
|---|---|---|
| Version with no channel | `v1.5.0` | Production-shaped or otherwise unlabelled build |
| Version with `Test` channel | `Test: 1.5.0` | Test-channel build |
| Version with `Dev` channel | `Dev: 1.5.0` | Development-channel build |

The backend reads the installed version from `/app/VERSION` first. `APP_VERSION` is a fallback when no usable version file is available. It reads the channel from `/app/VERSION_CHANNEL` first, then falls back to `APP_CHANNEL`.

The `GET /api/v1/system/version` endpoint supplies the same `current` and `channel` values to the interface. It also checks GitHub tags for a newer semantic version. That online check can fail without changing the installed version; the Admin page then shows the latest version as unavailable.

## Understand the release channels

| Channel | Typical source or image | Intended use | Documentation rule |
|---|---|---|---|
| Production | A version-tagged `xoriin/netmap` image, including `latest` when published from a `v*` tag | Normal installations | Follow pages verified for the same or an explicitly compatible production version. |
| Test | `xoriin/netmap:test`, built from the `test` branch | Validate a candidate image before production promotion | Use test or development documentation for the same version and expect unreleased behavior. |
| Development | The `dev/` source tree or a local source build | Active development and contributor testing | Use pages marked for the development channel and verify behavior against source. |

The current CI workflow publishes the test image from the `test` branch. A `v*` tag publishes versioned and `latest` production images and creates the matching GitHub Release. A normal push to `main` builds for validation but does not publish a production image.

### Local development channel label

The source checkout contains `VERSION_CHANNEL` with the value `Dev`, and the backend can read that file when it is available at runtime. The current all-in-one Dockerfile copies `VERSION` but not `VERSION_CHANNEL`, and the development Compose file does not set `APP_CHANNEL`. A local AIO build may therefore show `v1.5.0` instead of `Dev: 1.5.0` unless you explicitly supply `APP_CHANNEL=Dev` as part of the build or runtime environment.

Treat the source tree and image provenance as authoritative when that local channel label is absent.

## Interpret page labels

Reviewed pages use frontmatter such as:

```yaml
verified_version: "1.5.0-dev"
```

Interpret common forms as follows:

| Label | Interpretation |
|---|---|
| `1.5.0` | Checked against the released or production source for 1.5.0 |
| `1.5.0-test` | Checked against the 1.5.0 test channel |
| `1.5.0-dev` | Checked against 1.5.0 development source; behavior may not exist in an older release |
| **Development channel** in page text | The documentation checklist still requires release review for that behavior |

An absent `verified_version` means the page has not yet completed the current source-backed review. Do not assume that an older page covers your installed build merely because its title matches the feature.

## Choose the correct instructions

1. Record the version and channel shown by your instance.
2. Check the page's `verified_version` or version note.
3. Prefer an exact version and channel match.
4. If the page is newer, review the product [Changelog](../12-reference/changelog.md) and compare the described controls with your interface before acting.
5. Do not use development-only instructions for a production instance unless the feature is present and release metadata confirms its promotion.
6. For upgrades and restores, follow the page written for the version you are moving **from** and the version you are moving **to**; database and secret-handling changes can make assumptions unsafe.

## When the interface and documentation disagree

- Confirm that your browser is connected to the intended NetMap instance.
- Use the installed label, not a cached Docker tag or the newest GitHub tag.
- Refresh the page after an image upgrade and confirm that the container was recreated from the pulled image.
- Check whether you are running `latest`, a fixed version tag, `test`, or a locally built image.
- Search the [Documentation Changelog](./documentation-changelog.md) for a correction or coverage change.
- If the discrepancy remains, [report a documentation problem](./reporting-documentation-problems.md) with the page URL and your installed version/channel.

Do not include API keys, secrets, database files, private addresses, raw syslog, or unsanitized screenshots in a public report.

## Related pages

- [How to Use This Documentation](./how-to-use-this-documentation.md)
- [Documentation Changelog](./documentation-changelog.md)
- [Reporting Documentation Problems](./reporting-documentation-problems.md)
- [Product Changelog](../12-reference/changelog.md)
- [Upgrading](../03-installation/upgrading.md)
