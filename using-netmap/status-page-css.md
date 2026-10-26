---
title: Status Page Custom CSS
sidebar_position: 17
keywords: [status page, custom CSS, class names, theme]
---

# Status Page Custom CSS

Each page has a **Custom CSS** field, and a SuperAdmin can set default CSS for new pages under **Admin → System → Status page default CSS**. A new page starts with a copy of the default; later changes to the default do not restyle existing pages.

Custom CSS affects only the public status page, never NetMap's own screens. The page is rendered inside a sandboxed frame with no scripts, forms or same-origin access, under its own content security policy that blocks all network requests. The CSS is parsed by a real CSS parser and only a presentation-only subset is accepted. A rejected stylesheet cannot be saved: the editor lists each error with its line and column, and the page keeps its previous, validated CSS.

## Allowed

- Ordinary style rules, using any selector including attribute selectors and the pseudo-classes `:not()`, `:is()`, `:where()`, `:has()`, `:nth-child()`, `:nth-last-child()`, `:nth-of-type()` and `:nth-last-of-type()`.
- The pseudo-elements `::before`, `::after`, `::marker` and `::selection`.
- The at-rules `@media`, `@supports` and `@keyframes`.
- Custom properties (`--name`) and `var()`.
- Colour, maths, gradient, timing and transform functions: `rgb()`, `rgba()`, `hsl()`, `hsla()`, `hwb()`, `lab()`, `lch()`, `oklab()`, `oklch()`, `color-mix()`, `calc()`, `min()`, `max()`, `clamp()`, the `linear-`, `radial-` and `conic-gradient()` functions and their `repeating-` forms, `cubic-bezier()`, `steps()`, and the transform functions (`translate`, `rotate`, `scale`, `skew`, `matrix` and their axis variants).

## Rejected

- `url()` anywhere, including data URLs; `image-set()`; any function not listed above (such as `attr()` or `env()`).
- `@import`, `@font-face` and every other at-rule except the three above.
- The `behavior` and `-moz-binding` properties, and anything with `expression` in the property name.
- HTML delimiters. A `<` anywhere in the stylesheet, `</style`, `<!--` and `-->` are all refused, so write range media queries with `min-` and `max-` features instead of `<` or `<=`. For example, use `@media (max-width: 600px)`, not `@media (width < 600px)`.
- Malformed syntax, rules nested more than three deep, more than 2000 rules, or an overly complex stylesheet.
- A stylesheet larger than **64 KB**.

Use the page's own **Logo** setting for images.

The green operational dot gently breathes. It stays steady when the visitor requests reduced motion; warning, outage and maintenance dots are also steady. This animation does not change the normal data refresh interval. The page follows the visitor's saved NetMap light/dark choice, or the browser/device preference when no choice is saved. In dark mode it uses the visitor's saved dark mode style, **Slate** or **Zinc**. Custom CSS light/dark media queries follow the same choice. Existing custom CSS is preserved and can override the built-in design. Clear the page's Custom CSS and save to return to the default appearance.

## Stable Class Names

These class names are stable. Select on them, and on the `data-*` attributes below, rather than on the document structure.

| Area | Classes |
|---|---|
| Page and header | `sp-page`, `sp-header`, `sp-logo`, `sp-title` |
| Summary | `sp-summary`, `sp-summary-dot`, `sp-summary-label` |
| Notices, incident and maintenance lines | `sp-strip`, `sp-strip-title`, `sp-strip-meta`, `sp-strip-body`, `sp-notice`, `sp-pill` |
| Groups | `sp-groups`, `sp-group`, `sp-group-name`, `sp-group-label`, `sp-group-state`, `sp-group-empty` |
| Rows | `sp-row`, `sp-row-main`, `sp-row-more`, `sp-ident`, `sp-caret`, `sp-uptime`, `sp-row-name`, `sp-state` |
| Heartbeats and graphs | `sp-graphs`, `sp-lane`, `sp-lane-label`, `sp-heartbeats`, `sp-beat`, `sp-beat--healthy`, `sp-beat--unhealthy`, `sp-beat--unknown`, `sp-beat--maintenance`, `sp-axis`, `sp-response`, `sp-response-area`, `sp-response-line`, `sp-response-point`, `sp-response-grid`, `sp-response-empty` |
| Extras | `sp-stats`, `sp-stat` |
| Incident log and past incidents | `sp-log`, `sp-past`, `sp-section-title`, `sp-section-heading`, `sp-section-count`, `sp-incident`, `sp-incident-title`, `sp-incident-meta` |
| Updates | `sp-updates`, `sp-update`, `sp-update-time`, `sp-update-author`, `sp-update-status`, `sp-update-text`, `sp-update-internal` |

Attributes you can match:

| Attribute | Values | On |
|---|---|---|
| `data-state` | `operational`, `degraded`, `down`, `maintenance`, `unknown` | `sp-row` |
| `data-state` | `empty`, `major`, `affected`, `unknown`, `maintenance`, `operational` | `sp-summary`, `sp-group` |
| `data-tone` | `good`, `warning`, `danger`, `neutral` | `sp-uptime` |
| `data-tone` | `info`, `warning`, `danger`, `maintenance`, `neutral` | `sp-pill`, `sp-strip` |
| `data-kind` | `incident`, `maintenance` | `sp-strip`, `sp-incident` |
| `data-level` | `info`, `warning`, `critical` | `sp-notice` |
| `data-severity` | `performance`, `partial`, `major` | `sp-incident` |
| `data-internal` | `true` | `sp-update` |

The built-in style is driven by custom properties you can override on `:root`: `--sp-bg`, `--sp-surface`, `--sp-surface-soft`, `--sp-row-hover`, `--sp-border`, `--sp-text`, `--sp-text-muted`, `--sp-text-faint`, `--sp-accent`, `--sp-success`, `--sp-warning`, `--sp-danger`, `--sp-maintenance`, and the beat colours `--sp-beat-healthy`, `--sp-beat-unhealthy`, `--sp-beat-unknown` and `--sp-beat-maintenance`.

```css
:root {
  --sp-accent: #0b7285;
  --sp-beat-healthy: #1f9d55;
}
.sp-title { letter-spacing: 0.04em; }
.sp-row[data-state="down"] .sp-row-name { font-weight: 700; }
```

## Related Pages

- [Status Pages](./status-pages.md)
- [Admin](../administer/index.md)
