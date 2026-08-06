---
title: Reporting Documentation Problems
description: Report inaccurate, missing, unclear, unsafe, or broken NetMap documentation without exposing sensitive information.
keywords:
  - report documentation
  - documentation issue
  - broken link
  - correction
verified_version: "1.5.0-dev"
---

# Reporting Documentation Problems

Report documentation that is inaccurate, incomplete, unclear, unsafe, outdated, or difficult to navigate in the separate [NetMap documentation issue tracker](https://github.com/xoriin/netmap-docs/issues). Reading or reporting documentation does not require a NetMap role, but opening an issue requires a GitHub account.

## Choose the correct repository

| What you found | Report it at |
|---|---|
| Incorrect instructions, missing explanation, broken documentation link, terminology problem, or documentation-site issue | [xoriin/netmap-docs issues](https://github.com/xoriin/netmap-docs/issues/new) |
| The NetMap application behaves incorrectly even when the documentation is followed | [xoriin/netmap issues](https://github.com/xoriin/netmap/issues/new) |
| A security concern or possible vulnerability | Follow the security guidance below; do not publish technical details or sensitive evidence. |

If you are unsure whether the problem is in the product or the documentation, start in `xoriin/netmap-docs` and explain what you observed. A maintainer can move or cross-reference the report.

## Before opening an issue

1. Confirm the version and channel shown in the NetMap sidebar or **Admin → System → Version**.
2. Check the page's `verified_version` and any **Development channel** note.
3. Search the [documentation issues](https://github.com/xoriin/netmap-docs/issues) for an existing report.
4. Refresh the page and retry the link or procedure where it is safe to do so.
5. Do not repeat a destructive operation merely to reproduce a documentation problem.

## Open a useful documentation report

Open a [new documentation issue](https://github.com/xoriin/netmap-docs/issues/new) and include:

- a concise title describing the documentation problem;
- the documentation page title and URL, or its repository file path;
- your installed NetMap version and channel;
- the relevant heading, step, field, command, or link;
- what the documentation currently says;
- what you observed or expected instead;
- why the difference matters, especially if it could cause data loss, exposure, downtime, or incorrect access;
- a suggested correction, if you know one.

For a broken link, include both the page containing the link and the link text. For unclear wording, explain the decision or action you could not complete. For missing documentation, describe the outcome you were trying to achieve rather than proposing only a page title.

## Protect sensitive information

Public GitHub issues are not a safe place for operational data. Before submitting, remove or replace:

- passwords, API keys, session cookies, OIDC secrets, SNMP communities, notification credentials, and encryption keys;
- database files, backups, exported reports, or configuration files containing secrets;
- private IP addresses, MAC addresses, hostnames, usernames, email addresses, and physical addresses;
- raw syslog events, firewall logs, browser storage, request headers, and diagnostic output that identifies your network;
- screenshots containing real inventory, topology, account, or security-event data.

Use obvious placeholders such as `https://netmap.example.com`, `192.0.2.10`, and `YOUR_NETMAP_API_KEY`. Crop and sanitize screenshots before attaching them.

## Report security-sensitive documentation problems

The NetMap project does not currently publish a private security-disclosure channel. Do not include exploit steps, secrets, logs, database files, or private network data in a public issue.

If documentation appears to expose readers to a security vulnerability:

1. Open a minimal issue in the [NetMap application tracker](https://github.com/xoriin/netmap/issues/new).
2. State only the affected area and potential impact at a high level.
3. Say that you have technical details requiring a private channel.
4. Wait for maintainer direction before sharing evidence.

## Expected result

After submission, GitHub assigns the report an issue number and URL. Use that issue for clarification and status updates. A documentation correction may result in a page change, a cross-link, a new troubleshooting entry, a version-coverage note, or a recorded documentation gap.

Opening an issue does not guarantee a product change or a specific response time. Product defects and feature requests are evaluated in the application repository.

## Related pages

- [How to Use This Documentation](./how-to-use-this-documentation.md)
- [Documentation Version and Product Compatibility](./documentation-version-compatibility.md)
- [Documentation Changelog](./documentation-changelog.md)
- [Documentation Sitemap](./sitemap.md)
- [Vulnerability Reporting](../10-security/vulnerability-reporting.md)

