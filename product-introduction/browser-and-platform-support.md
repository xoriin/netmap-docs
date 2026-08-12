---
title: Browser and Platform Support
description: Understand NetMap's browser requirements, tested platform, responsive expectations, and host architecture support.
sidebar_position: 11
keywords: [browser support, Chromium, JavaScript, responsive, platform, amd64, arm64]
verified_version: "1.5.0"
---

# Browser and Platform Support

This page is for users and deployers evaluating client and host compatibility. NetMap `v1.5.0` does not publish a formal browser-version matrix, so the boundaries below distinguish source requirements from what is continuously tested.

## Browser requirements

NetMap requires JavaScript, cookies, `fetch`, WebSocket support, local storage, modern CSS, and SVG rendering. Use a current desktop browser with security updates enabled.

- **Automated frontend coverage:** Chromium through Playwright.
- **Recommended baseline:** a current Chromium-based desktop browser.
- **Firefox and Safari:** expected to support most standards used by the app, but they are not part of the documented automated compatibility gate for `v1.5.0`.
- **Legacy browsers and Internet Explorer:** unsupported; the application is not transpiled or styled for them.

The UI uses features including `color-mix()`, dynamic viewport units (`dvh`), and a browser-specific directory picker for bulk icon import. A browser lacking one of these may show visual differences or omit directory selection even when core pages load.

## Cookies and storage

Do not use a mode or policy that blocks all cookies or site storage. Authentication relies on an HttpOnly refresh cookie plus a CSRF cookie, while preferences, column widths, local icon packs, topology cache/layout metadata, page sizes, and recent tool data may use local storage. Access tokens are kept in memory and are not stored in local or session storage.

Clearing site data signs the browser out and removes local-only preferences or icon packs. Server-side inventory and layouts remain unless explicitly deleted.

## Screen size and input

NetMap provides responsive rules, but topology canvases, dense monitoring tables, IPAM grids, and administration forms are designed primarily for a desktop-sized viewport and pointer/keyboard input. Small screens may require horizontal scrolling and are not a substitute for a full desktop workflow. There is no native mobile application.

Keyboard focus, dialogs, listboxes, and standard controls should remain usable, but no complete assistive-technology conformance claim is published for `v1.5.0`. Report inaccessible interactions through the project's [documentation issue tracker](https://github.com/xoriin/netmap-docs/issues).

## Server platform

Published Linux container images support `amd64` and `arm64`. The Docker host must support the image architecture, persistent writable storage, the selected network mode, and required capabilities. The browser can run on another operating system; only standards support and network access to NetMap matter.

## Troubleshooting compatibility

If a page is blank or controls fail, update the browser, enable JavaScript/cookies/site storage, disable content blockers for the NetMap origin, and retry in current Chromium. Check the browser console and NetMap logs before deleting site data. See [Common Issues](../troubleshooting/common-issues.md) and [Authentication Problems](../troubleshooting/authentication-problems.md).
